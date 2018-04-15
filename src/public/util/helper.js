const LOCATION_COOKIE = 'ipLoc-djd'

const Helper = {
    getImageDomain (a) {
        let b
        a = String(a)
        switch (a.match(/(\d)$/)[1] % 6) {
          case 0:
            b = 10
            break
          case 1:
            b = 11
            break
          case 2:
            b = 12
            break
          case 3:
            b = 13
            break
          case 4:
            b = 14
            break
          case 5:
            b = 30
            break
          default:
            b = 10
        }
        return '//img{0}.360buyimg.com/'.replace('{0}', b)
      },
    getImgUrl (url, size = {w: 200, h: 200}) {
        const split = url.split('360buyimg.com/')
        const id = parseInt(5*Math.random(),10);
        let mixUrl = url;
        if (!split[1]) {
            mixUrl =  url;
        } else {
          let afterUrl = `${Helper.getImageDomain(id)}${split[1].replace(/\/[^/]*?jfs\//, `/s${size.w}x${size.h}_jfs/`)}`
          mixUrl =  afterUrl
        }

        //质量处理75%
        mixUrl = Helper.quality(mixUrl, 75);
        if (Helper.isSupportWebp()) {
            //开始处理webp格式
            mixUrl = Helper.webp(mixUrl)
        }

        return mixUrl;
      },
    getImgFullUrl(domain, width, height, imgUrl) {
        let defaultDomains = '//m.360buyimg.com';
        let defaultPathes = '/n1';
        let domainCopy = domain || defaultDomains;
        imgUrl = imgUrl.replace(/(jfs\/)/, '');
        let url = domainCopy + defaultPathes + "/s" + width + "x" + height + "_jfs/" + imgUrl;

        //质量处理75%
        url = Helper.quality(url, 75);
        if (Helper.isSupportWebp()) {
            //开始处理webp格式
            url = Helper.webp(url)
        }
        return url;
    },

    isSupportWebp() {
        try {
            return (document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') == 0);
        } catch (err) {
            return false;
        }
    },

    isRealNumber(n) {
        return parseInt(n) % 1 === 0;
    },

    quality(url, percent) {
        return url && Helper.isRealNumber(percent) ? url + ('!q' + parseInt(percent)) : url;
    },

    webp(url) {
        return url + '.webp';
    },


    getAreaId() {
        const defaultArea = {
            areaIds: [1, 72, 4137, 0],
            commonAreaId: null
        }
        let storedArea = Helper.readCookie(LOCATION_COOKIE)
        if (storedArea) {
            const index = storedArea.indexOf('.')
            if (index > -1) {
                defaultArea.commonAreaId = Number(storedArea.substr(index + 1))
                storedArea = storedArea.substring(0, index)
            }
            defaultArea.areaIds = storedArea.split('-')
            if (defaultArea.areaIds.length < 4) {
                defaultArea.areaIds.push(0)
            }
            defaultArea.areaIds = defaultArea.areaIds.map(item => Number(item))
        }
        return defaultArea
    },

    createCookie(name, value, days, Tdom) {
        Tdom = Tdom || '/'
        let expires
        if (days) {
            const date = new Date()
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000))
            expires = '; expires=' + date.toGMTString()
        } else {
            expires = ''
        }
        document.cookie = name + '=' + value + expires + '; path=' + Tdom
    },

    readCookie(name) {
        let nameEQ = name + '='
        var ca = document.cookie.split(';')
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i]
            while (c.charAt(0) === ' ') {
                c = c.substring(1, c.length)
            }
            if (c.indexOf(nameEQ) === 0) {
                return c.substring(nameEQ.length, c.length)
            }
        }
        return null
    },


    parseDate(time) {
        if (time instanceof Date) {
            return time
        }
        if (time) {
            time = typeof time === 'string' ? time.replace(/-/g, '/') : time
            return new Date(time)
        }
        return new Date()
    },


    // 生成uuid
    guid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1)
        }

        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4()
    },

    getUUID() {
        return Helper.readCookie('__uuid')
    },

    createUUID() {
        let uuid = Helper.getUUID()
        if (!uuid) {
            uuid = Helper.guid()
            Helper.createCookie('__uuid', uuid, 365)
        }
    },


    // base64编码解码
    Base64: {
        // private property
        _keyStr: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',

        // public method for encoding
        encode: function (input) {
            var output = ''
            var chr1, chr2, chr3, enc1, enc2, enc3, enc4
            var i = 0

            input = Helper.Base64._utf8_encode(input)

            while (i < input.length) {
                chr1 = input.charCodeAt(i++)
                chr2 = input.charCodeAt(i++)
                chr3 = input.charCodeAt(i++)

                enc1 = chr1 >> 2
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4)
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6)
                enc4 = chr3 & 63

                if (isNaN(chr2)) {
                    enc3 = enc4 = 64
                } else if (isNaN(chr3)) {
                    enc4 = 64
                }

                output = output +
                    this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
                    this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4)
            }

            return output
        },

        // public method for decoding
        decode: function (input) {
            var output = ''
            var chr1, chr2, chr3
            var enc1, enc2, enc3, enc4
            var i = 0

            input = input.replace(/[^A-Za-z0-9+/=]/g, '')

            while (i < input.length) {
                enc1 = this._keyStr.indexOf(input.charAt(i++))
                enc2 = this._keyStr.indexOf(input.charAt(i++))
                enc3 = this._keyStr.indexOf(input.charAt(i++))
                enc4 = this._keyStr.indexOf(input.charAt(i++))

                chr1 = (enc1 << 2) | (enc2 >> 4)
                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2)
                chr3 = ((enc3 & 3) << 6) | enc4

                output = output + String.fromCharCode(chr1)

                if (enc3 !== 64) {
                    output = output + String.fromCharCode(chr2)
                }
                if (enc4 !== 64) {
                    output = output + String.fromCharCode(chr3)
                }
            }

            output = Helper.Base64._utf8_decode(output)

            return output
        },

        // private method for UTF-8 encoding
        _utf8_encode: function (string) {
            string = string.replace(/\r\n/g, '\n')
            var utftext = ''

            for (var n = 0; n < string.length; n++) {
                var c = string.charCodeAt(n)
                if (c < 128) {
                    utftext += String.fromCharCode(c)
                } else if ((c > 127) && (c < 2048)) {
                    utftext += String.fromCharCode((c >> 6) | 192)
                    utftext += String.fromCharCode((c & 63) | 128)
                } else {
                    utftext += String.fromCharCode((c >> 12) | 224)
                    utftext += String.fromCharCode(((c >> 6) & 63) | 128)
                    utftext += String.fromCharCode((c & 63) | 128)
                }
            }

            return utftext
        },

        // private method for UTF-8 decoding
        _utf8_decode: function (utftext) {
            var string = ''
            var i = 0
            var c = 0
            var c3 = 0
            var c2 = 0

            while (i < utftext.length) {
                c = utftext.charCodeAt(i)

                if (c < 128) {
                    string += String.fromCharCode(c)
                    i++
                } else if ((c > 191) && (c < 224)) {
                    c2 = utftext.charCodeAt(i + 1)
                    string += String.fromCharCode(((c & 31) << 6) | (c2 & 63))
                    i += 2
                } else {
                    c2 = utftext.charCodeAt(i + 1)
                    c3 = utftext.charCodeAt(i + 2)
                    string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63))
                    i += 3
                }
            }

            return string
        }
    }

}

module.exports = Helper
