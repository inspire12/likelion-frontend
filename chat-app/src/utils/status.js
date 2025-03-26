const os = require('os');

exports.getInternalIp = (prefix = '172.') => {
    const nets = os.networkInterfaces();
    for (const name of Object.keys(nets)) {
        for (const net of nets[name]) {
            // IPv4이면서 내부 IP인지 확인함
            if (net.family === 'IPv4' && !net.internal && net.address.startsWith(prefix)) {
                return net.address;
            }
        }
    }
    return '127.0.0.1'; // 조건을 만족하는 IP가 없으면 기본값 반환
}

