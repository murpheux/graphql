export const apps = [
    {
        name: 'graphql',
        script: 'src/server.js',
        instances: 2,
        autorestart: true,
        watch: true,
        max_memory_restart: '512M',
        vizion: false,
        exec_mode: 'cluster',
        env_production: {
            NODE_ENV: 'production',
        },
        env_development: {
            NODE_ENV: 'development',
        },
    },
    {
        name: 'demo',
        script: 'src/demo.js',
        instances: 2,
        watch: true,
        env_production: {
            NODE_ENV: 'production',
        },
        env_development: {
            NODE_ENV: 'development',
        },
    },
]

export const deploy = {
    production: {
        user: 'murpheux',
        host: ['scarlet'],
        ref: 'origin/master',
        repo: 'http://gitbub.com/murpheux/graphql.git',
        path: '/home/murpheux/graphql',
        'pre-deploy-local': '',
        'post-setup': 'npm install',
        'post-deploy':
            'pm2 startOrRestart ecosystem.config.js --env production',
    },
}
