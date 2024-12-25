module.exports = function(api) {
    api.cache(true)
    return {
        presets: ['babel-preset-expo'],
        plugins: ['react-native-reanimated/plugin',
            [
                'module:react-native-dotenv',
                {
                    moduleName: '@env', // Sets the module name for imports
                    path: '.env', // Path to the .env file
                    safe: false, // Set to true if you use a .env.example file
                    allowUndefined: false, // Disallow undefined variables
                },
            ],

        ],
    }
}