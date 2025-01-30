/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        "montserrat-bold": ['Montserrat-Bold', 'Sarif'],
        "montserrat-italic": ['Montserrat-Italic', 'Sarif'],
        "montserrat-light": ['Montserrat-Light', 'Sarif'],
        "montserrat-medium": ['Montserrat-Medium', 'Sarif'],
        "montserrat-regular": ['Montserrat-Regular', 'Sarif'],
        "montserrat-semibold": ['Montserrat-SemiBold', 'Sarif']

      },
      colors: {
        primary: '#ffffff',
        black: '#1e1a1a',
        blue: '#39C0FB',
        gray200: '#d9d9d9'

      },
      backgroundImage: {
        'gradient-custom-black-top': 'linear-gradient(to bottom, #1e1d1d, #39c0fb, #a36ce6, #fda0ec, #fbc7a0, #ffffff)',
        'gradient-custom-white-top': 'linear-gradient(to bottom, #ffffff, #fbc7a0, #fda0ec, #a36ce6, #39c0fb, #201c1b)',
        'gradient-custom': 'linear-gradient(to bottom right, #ffffff, #fbc7a0, #fda0ec, #a36ce6, #39c0fb)',
      }
    },
  },
  plugins: [],
}
