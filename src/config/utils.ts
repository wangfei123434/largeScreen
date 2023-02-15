export const canUseWebp = document
  .createElement("canvas")
  .toDataURL("image/webp", 0.5)
  .includes("data:image/webp");

//解析颜色
export const hexColorToRGB = function (hexStr) {
    return hexStr.length === 4 ?
        hexStr.substr(1)
            .split('')
            .map(function (s) { return 0x11 * parseInt(s, 16); }) :
        [hexStr.substr(1, 2), hexStr.substr(3, 2),
            hexStr.substr(5, 2)].map(function (s) {
                return parseInt(s, 16); })
};

// zero-pad 1 digit to 2
const pad = function (s) {
    return (s.length === 1) ? '0' + s : s;
};



/*
       start 开始颜色
       end 结束颜色
       steps 颜色分解 次数
       gamma 暂时理解为透明一点（伽马）
   */
export const gradientColors = function (start, end, steps, gamma) {
    let i, j, ms, me, output = [], so = [];
    gamma = gamma || 1;
    const normalize = function (channel) {
        return Math.pow(channel / 255, gamma);
    };
    start = hexColorToRGB(start).map(normalize);
    end = hexColorToRGB(end).map(normalize);
    for (i = 0; i < steps; i++) {
        ms = i / (steps - 1);
        me = 1 - ms;
        for (j = 0; j < 3; j++) {
            so[j] = pad(Math.round(Math.pow(start[j] * me + end[j] * ms, 1 / gamma) * 255).toString(16));
        }
        output.push('#' + so.join(''));
    }
    return output;
};