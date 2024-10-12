module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
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
  };
};
