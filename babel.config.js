module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
<<<<<<< HEAD
    plugins: [
      'react-native-reanimated/plugin', 
      [
        'module-resolver',
        {
          alias: {
            '@': './',  // Puedes ajustar este alias según la estructura de tu proyecto
          },
        },
      ],
    ],
=======
    plugins: ['react-native-reanimated/plugin'],
>>>>>>> fork/main
  };
};
