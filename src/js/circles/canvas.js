const canvas = document.getElementById('canvas');

export const context = canvas.getContext('2d');

export const clear = () => context.clearRect(0, 0, canvas.width, canvas.height);

export default canvas;
