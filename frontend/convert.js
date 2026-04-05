const fs = require('fs');
const path = require('path');

function convert(file, name) {
    const content = fs.readFileSync(path.join('../views', file), 'utf8');
    
    // Extract #app contents (we match everything inside <div id="app" v-cloak> ... </div> before <script>)
    const appMatch = content.match(/<div id="app"[^>]*>([\s\S]*?)<\/div>\s*<script>/);
    let templateContent = '';
    if (appMatch) {
       templateContent = `<div id="app">\n${appMatch[1]}\n</div>`;
    } else {
       // fallback for login which might just have script block without id="app"
       const bodyMatch = content.match(/<body[^>]*>([\s\S]*?)<\/body>/);
       templateContent = bodyMatch ? bodyMatch[1].replace(/<script>[\s\S]*?<\/script>/,'') : content;
    }
    
    // Extract script logic (Vue logic)
    const scriptMatch = content.match(/<script>\s*([\s\S]*?)<\/script>/);
    let scriptContent = '';
    if (scriptMatch) {
        scriptContent = scriptMatch[1];
        // Convert "new Vue({...})" to "export default {...}"
        scriptContent = scriptContent.replace(/new Vue\(\{([\s\S]*)\}\);/, 'export default {$1};');
        scriptContent = scriptContent.replace(/el:\s*['"]#app['"],/g, '');
    }

    const vueContent = `<template>\n${templateContent}\n</template>\n\n<script>\n${scriptContent}\n</script>\n`;
    
    fs.mkdirSync('src/views', { recursive: true });
    fs.writeFileSync(`src/views/${name}.vue`, vueContent, 'utf8');
}

convert('login.html', 'Login');
convert('dashboard.html', 'Dashboard');
convert('staff.html', 'Staff');

