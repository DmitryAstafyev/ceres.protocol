const path = require('path');
const colors = require('colors/safe');
const fs = require('fs');

const sh = function(taskOrCallback, path, ...commands){
    return new Promise((resolve) => {
        const jake = require('jake');
        jake.exec(commands.map((command) => {
            return `(cd ${path} && ${command})`;
        }), { printStdout: true, printStderr: true }, () => {
            if (taskOrCallback !== null && taskOrCallback !== undefined && typeof taskOrCallback.complete === 'function') {
                taskOrCallback.complete();
            } else if (typeof taskOrCallback === 'function') {
                taskOrCallback();
            }
            resolve();
        });
    });
};

const shNotBreakble = function(task, path, ...commands){
    const jake = require('jake');
    jake.exec(commands.map((command) => {
        return `(cd ${path} && ${command})`;
    }), { printStdout: true, printStderr: true, breakOnError: false }, () => {
        task.complete();
    });
};

const LOGO_FILE = 'logo.ascii';

function logo(){
    if (logo.__show !== void 0) { 
        return;
    }
    logo.__show = true;
    const file = path.resolve(__dirname, LOGO_FILE);
    if (!fs.existsSync(file)) {
        return;
    }
    const buffer = fs.readFileSync(file);
    return console.log(colors.yellow(buffer.toString('utf8')));
}

function echo(msg) {
    return `echo "${msg}"`;
}

function echoDec(msg, filler = '*', colorFunc = null) {
    msg = `${filler.repeat(2)} ${msg} ${filler.repeat(2)} `;
    if (colorFunc !== null) {
        return `echo "${colorFunc(`\n${filler.repeat(msg.length - 1)}\n${msg}\n${filler.repeat(msg.length - 1)}\n`)}"` ;
    } else {
        return `echo "\n${filler.repeat(msg.length - 1)}\n${msg}\n${filler.repeat(msg.length - 1)}\n"` ;
    }
}

namespace('solution', function() {
    task('compile', function() {
        logo();
        const paths = {
            injectionsDest: path.normalize(path.join(__dirname, '/dist/injections')),
            injectionsSrc: path.normalize(path.join(__dirname, '/src/injections/')),
            dist: path.normalize(path.join(__dirname, '/dist')),
        };
        const tasks = [
            `rm -rf ${paths.dist} & exit 0`,
            `npm run build`,
            `npm run test`,
            `cp -R ${paths.injectionsSrc} ${paths.injectionsDest}/`
        ];
        sh(this, '.', ...tasks);
    }, {async: true});
    task('cli.executable', function() {
        logo();
        const cliFile = path.normalize(path.join(__dirname, '/dist/protocol.cli.js'));
        const buffer = fs.readFileSync(cliFile);
        const content = buffer.toString('utf8');
        fs.unlinkSync(cliFile);
        fs.writeFileSync(cliFile, `#!/usr/bin/env node\n${content}`);
        this.complete();
    }, {async: true});
    task('build', ['compile', 'cli.executable']);
});


