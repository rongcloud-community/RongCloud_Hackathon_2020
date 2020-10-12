/*
* RongIMLib.js v3.0.7-dev
* CodeVersion: 58e7711d1b73004fc4f494eec33854b5d6968c6d
* Release Date: Fri Sep 18 2020 10:05:24 GMT+0800 (China Standard Time)
* Copyright 2020 RongCloud
*/
(function(e, t) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : e.RongIMLib = t()
}
)(this, function() {
    'use strict';
    var n = String.fromCharCode
      , s = Math.floor
      , E = Math.pow
      , _ = Math.min;
    function e(e, t) {
        e.prototype = Object.create(t.prototype),
        e.prototype.constructor = e,
        e.__proto__ = t
    }
    function t(t) {
        var r = Math.LN2, u = Math.log, p = function() {
            function T(e, t, n) {
                this.low = 0 | e,
                this.high = 0 | t,
                this.unsigned = !!n
            }
            function S(e) {
                return !0 === (e && e.__isLong__)
            }
            function a(t, n) {
                var s, r, o;
                return n ? (t >>>= 0,
                (o = 0 <= t && 256 > t) && (r = O[t]) ? r : (s = C(t, 0 > (0 | t) ? -1 : 0, !0),
                o && (O[t] = s),
                s)) : (t |= 0,
                (o = -128 <= t && 128 > t) && (r = i[t]) ? r : (s = C(t, 0 > t ? -1 : 0, !1),
                o && (i[t] = s),
                s))
            }
            function I(e, t) {
                if (isNaN(e) || !isFinite(e))
                    return t ? P : L;
                if (t) {
                    if (0 > e)
                        return P;
                    if (e >= b)
                        return K
                } else {
                    if (-U >= e)
                        return Y;
                    if (e + 1 >= U)
                        return G
                }
                return 0 > e ? I(-e, t).neg() : C(0 | e % M, 0 | e / M, t)
            }
            function C(e, t, n) {
                return new T(e,t,n)
            }
            function f(t, n, s) {
                var i, r, o, a, u, p, E;
                if (0 === t.length)
                    throw Error("empty string");
                if ("NaN" === t || "Infinity" === t || "+Infinity" === t || "-Infinity" === t)
                    return L;
                if ("number" == typeof n ? (s = n,
                n = !1) : n = !!n,
                s = s || 10,
                2 > s || 36 < s)
                    throw RangeError("radix");
                if (0 < (i = t.indexOf("-")))
                    throw Error("interior hyphen");
                if (0 === i)
                    return f(t.substring(1), n, s).neg();
                for (r = I(N(s, 8)),
                o = L,
                a = 0; a < t.length; a += 8)
                    u = _(8, t.length - a),
                    p = parseInt(t.substring(a, a + u), s),
                    8 > u ? (E = I(N(s, u)),
                    o = o.mul(E).add(I(p))) : (o = o.mul(r),
                    o = o.add(I(p)));
                return o.unsigned = n,
                o
            }
            function R(e) {
                return e instanceof T ? e : "number" == typeof e ? I(e) : "string" == typeof e ? f(e) : C(e.low, e.high, e.unsigned)
            }
            var i, O, N, e, A, M, b, U, D, L, P, V, F, B, G, K, Y, H;
            return Object.defineProperty(T.prototype, "__isLong__", {
                value: !0,
                enumerable: !1,
                configurable: !1
            }),
            T.isLong = S,
            i = {},
            O = {},
            T.fromInt = a,
            T.fromNumber = I,
            T.fromBits = C,
            N = E,
            T.fromString = f,
            T.fromValue = R,
            e = 65536,
            A = 16777216,
            M = e * e,
            b = M * M,
            U = b / 2,
            D = a(A),
            L = a(0),
            T.ZERO = L,
            P = a(0, !0),
            T.UZERO = P,
            V = a(1),
            T.ONE = V,
            F = a(1, !0),
            T.UONE = F,
            B = a(-1),
            T.NEG_ONE = B,
            G = C(-1, 2147483647, !1),
            T.MAX_VALUE = G,
            K = C(-1, -1, !0),
            T.MAX_UNSIGNED_VALUE = K,
            Y = C(0, -2147483648, !1),
            T.MIN_VALUE = Y,
            H = T.prototype,
            H.toInt = function() {
                return this.unsigned ? this.low >>> 0 : this.low
            }
            ,
            H.toNumber = function() {
                return this.unsigned ? (this.high >>> 0) * M + (this.low >>> 0) : this.high * M + (this.low >>> 0)
            }
            ,
            H.toString = function(t) {
                var n, s, r, o, u, p, m, E, f;
                if (t = t || 10,
                2 > t || 36 < t)
                    throw RangeError("radix");
                if (this.isZero())
                    return "0";
                if (this.isNegative())
                    return this.eq(Y) ? (n = I(t),
                    s = this.div(n),
                    r = s.mul(n).sub(this),
                    s.toString(t) + r.toInt().toString(t)) : "-" + this.neg().toString(t);
                for (o = I(N(t, 6), this.unsigned),
                u = this,
                p = ""; ; ) {
                    if (m = u.div(o),
                    E = u.sub(m.mul(o)).toInt() >>> 0,
                    f = E.toString(t),
                    u = m,
                    u.isZero())
                        return f + p;
                    for (; 6 > f.length; )
                        f = "0" + f;
                    p = "" + f + p
                }
            }
            ,
            H.getHighBits = function() {
                return this.high
            }
            ,
            H.getHighBitsUnsigned = function() {
                return this.high >>> 0
            }
            ,
            H.getLowBits = function() {
                return this.low
            }
            ,
            H.getLowBitsUnsigned = function() {
                return this.low >>> 0
            }
            ,
            H.getNumBitsAbs = function() {
                var e, t;
                if (this.isNegative())
                    return this.eq(Y) ? 64 : this.neg().getNumBitsAbs();
                for (e = 0 == this.high ? this.low : this.high,
                t = 31; 0 < t && 0 == (e & 1 << t); t--)
                    ;
                return 0 == this.high ? t + 1 : t + 33
            }
            ,
            H.isZero = function() {
                return 0 === this.high && 0 === this.low
            }
            ,
            H.isNegative = function() {
                return !this.unsigned && 0 > this.high
            }
            ,
            H.isPositive = function() {
                return this.unsigned || 0 <= this.high
            }
            ,
            H.isOdd = function() {
                return 1 == (1 & this.low)
            }
            ,
            H.isEven = function() {
                return 0 == (1 & this.low)
            }
            ,
            H.equals = function(e) {
                return S(e) || (e = R(e)),
                (this.unsigned === e.unsigned || 1 != this.high >>> 31 || 1 != e.high >>> 31) && this.high === e.high && this.low === e.low
            }
            ,
            H.eq = H.equals,
            H.notEquals = function(e) {
                return !this.eq(e)
            }
            ,
            H.neq = H.notEquals,
            H.lessThan = function(e) {
                return 0 > this.comp(e)
            }
            ,
            H.lt = H.lessThan,
            H.lessThanOrEqual = function(e) {
                return 0 >= this.comp(e)
            }
            ,
            H.lte = H.lessThanOrEqual,
            H.greaterThan = function(e) {
                return 0 < this.comp(e)
            }
            ,
            H.gt = H.greaterThan,
            H.greaterThanOrEqual = function(e) {
                return 0 <= this.comp(e)
            }
            ,
            H.gte = H.greaterThanOrEqual,
            H.compare = function(e) {
                if (S(e) || (e = R(e)),
                this.eq(e))
                    return 0;
                var t = this.isNegative()
                  , n = e.isNegative();
                return t && !n ? -1 : !t && n ? 1 : this.unsigned ? e.high >>> 0 > this.high >>> 0 || e.high === this.high && e.low >>> 0 > this.low >>> 0 ? -1 : 1 : this.sub(e).isNegative() ? -1 : 1
            }
            ,
            H.comp = H.compare,
            H.negate = function() {
                return !this.unsigned && this.eq(Y) ? Y : this.not().add(V)
            }
            ,
            H.neg = H.negate,
            H.add = function(t) {
                var s, r, u, E, _, T, I, y, O, N, v, A;
                return S(t) || (t = R(t)),
                s = this.high >>> 16,
                r = 65535 & this.high,
                u = this.low >>> 16,
                E = 65535 & this.low,
                _ = t.high >>> 16,
                T = 65535 & t.high,
                I = t.low >>> 16,
                y = 65535 & t.low,
                O = 0,
                N = 0,
                v = 0,
                A = 0,
                A += E + y,
                v += A >>> 16,
                A &= 65535,
                v += u + I,
                N += v >>> 16,
                v &= 65535,
                N += r + T,
                O += N >>> 16,
                N &= 65535,
                O += s + _,
                O &= 65535,
                C(v << 16 | A, O << 16 | N, this.unsigned)
            }
            ,
            H.subtract = function(e) {
                return S(e) || (e = R(e)),
                this.add(e.neg())
            }
            ,
            H.sub = H.subtract,
            H.multiply = function(t) {
                var u, p, E, f, _, T, y, O, N, v, A, M;
                return this.isZero() ? L : (S(t) || (t = R(t)),
                t.isZero() ? L : this.eq(Y) ? t.isOdd() ? Y : L : t.eq(Y) ? this.isOdd() ? Y : L : this.isNegative() ? t.isNegative() ? this.neg().mul(t.neg()) : this.neg().mul(t).neg() : t.isNegative() ? this.mul(t.neg()).neg() : this.lt(D) && t.lt(D) ? I(this.toNumber() * t.toNumber(), this.unsigned) : (u = this.high >>> 16,
                p = 65535 & this.high,
                E = this.low >>> 16,
                f = 65535 & this.low,
                _ = t.high >>> 16,
                T = 65535 & t.high,
                y = t.low >>> 16,
                O = 65535 & t.low,
                N = 0,
                v = 0,
                A = 0,
                M = 0,
                M += f * O,
                A += M >>> 16,
                M &= 65535,
                A += E * O,
                v += A >>> 16,
                A &= 65535,
                A += f * y,
                v += A >>> 16,
                A &= 65535,
                v += p * O,
                N += v >>> 16,
                v &= 65535,
                v += E * y,
                N += v >>> 16,
                v &= 65535,
                v += f * T,
                N += v >>> 16,
                v &= 65535,
                N += u * O + p * y + E * T + f * _,
                N &= 65535,
                C(A << 16 | M, N << 16 | v, this.unsigned)))
            }
            ,
            H.mul = H.multiply,
            H.divide = function(t) {
                var n, o, p, E, f, _, T, y;
                if (S(t) || (t = R(t)),
                t.isZero())
                    throw Error("division by zero");
                if (this.isZero())
                    return this.unsigned ? P : L;
                if (this.unsigned) {
                    if (t.unsigned || (t = t.toUnsigned()),
                    t.gt(this))
                        return P;
                    if (t.gt(this.shru(1)))
                        return F;
                    p = P
                } else {
                    if (this.eq(Y))
                        return t.eq(V) || t.eq(B) ? Y : t.eq(Y) ? V : (E = this.shr(1),
                        n = E.div(t).shl(1),
                        n.eq(L) ? t.isNegative() ? V : B : (o = this.sub(t.mul(n)),
                        p = n.add(o.div(t))));
                    if (t.eq(Y))
                        return this.unsigned ? P : L;
                    if (this.isNegative())
                        return t.isNegative() ? this.neg().div(t.neg()) : this.neg().div(t).neg();
                    if (t.isNegative())
                        return this.div(t.neg()).neg();
                    p = L
                }
                for (o = this; o.gte(t); ) {
                    for (n = Math.max(1, s(o.toNumber() / t.toNumber())),
                    f = Math.ceil(u(n) / r),
                    _ = 48 >= f ? 1 : N(2, f - 48),
                    T = I(n),
                    y = T.mul(t); y.isNegative() || y.gt(o); )
                        n -= _,
                        T = I(n, this.unsigned),
                        y = T.mul(t);
                    T.isZero() && (T = V),
                    p = p.add(T),
                    o = o.sub(y)
                }
                return p
            }
            ,
            H.div = H.divide,
            H.modulo = function(e) {
                return S(e) || (e = R(e)),
                this.sub(this.div(e).mul(e))
            }
            ,
            H.mod = H.modulo,
            H.not = function() {
                return C(~this.low, ~this.high, this.unsigned)
            }
            ,
            H.and = function(e) {
                return S(e) || (e = R(e)),
                C(this.low & e.low, this.high & e.high, this.unsigned)
            }
            ,
            H.or = function(e) {
                return S(e) || (e = R(e)),
                C(this.low | e.low, this.high | e.high, this.unsigned)
            }
            ,
            H.xor = function(e) {
                return S(e) || (e = R(e)),
                C(this.low ^ e.low, this.high ^ e.high, this.unsigned)
            }
            ,
            H.shiftLeft = function(e) {
                return S(e) && (e = e.toInt()),
                0 == (e &= 63) ? this : 32 > e ? C(this.low << e, this.high << e | this.low >>> 32 - e, this.unsigned) : C(0, this.low << e - 32, this.unsigned)
            }
            ,
            H.shl = H.shiftLeft,
            H.shiftRight = function(e) {
                return S(e) && (e = e.toInt()),
                0 == (e &= 63) ? this : 32 > e ? C(this.low >>> e | this.high << 32 - e, this.high >> e, this.unsigned) : C(this.high >> e - 32, 0 <= this.high ? 0 : -1, this.unsigned)
            }
            ,
            H.shr = H.shiftRight,
            H.shiftRightUnsigned = function(e) {
                var t, n;
                return S(e) && (e = e.toInt()),
                e &= 63,
                0 === e ? this : (t = this.high,
                32 > e ? (n = this.low,
                C(n >>> e | t << 32 - e, t >>> e, this.unsigned)) : 32 === e ? C(t, 0, this.unsigned) : C(t >>> e - 32, 0, this.unsigned))
            }
            ,
            H.shru = H.shiftRightUnsigned,
            H.toSigned = function() {
                return this.unsigned ? C(this.low, this.high, !1) : this
            }
            ,
            H.toUnsigned = function() {
                return this.unsigned ? this : C(this.low, this.high, !0)
            }
            ,
            H.toBytes = function(e) {
                return e ? this.toBytesLE() : this.toBytesBE()
            }
            ,
            H.toBytesLE = function() {
                var e = this.high
                  , t = this.low;
                return [255 & t, 255 & t >>> 8, 255 & t >>> 16, 255 & t >>> 24, 255 & e, 255 & e >>> 8, 255 & e >>> 16, 255 & e >>> 24]
            }
            ,
            H.toBytesBE = function() {
                var e = this.high
                  , t = this.low;
                return [255 & e >>> 24, 255 & e >>> 16, 255 & e >>> 8, 255 & e, 255 & t >>> 24, 255 & t >>> 16, 255 & t >>> 8, 255 & t]
            }
            ,
            T
        }(), i = function(t) {
            function o(e) {
                var t = 0;
                return function() {
                    return t < e.length ? e.charCodeAt(t++) : null
                }
            }
            function l() {
                var e = []
                  , t = [];
                return function() {
                    return 0 === arguments.length ? t.join("") + f.apply(String, e) : (1024 < e.length + arguments.length && (t.push(f.apply(String, e)),
                    e.length = 0),
                    Array.prototype.push.apply(e, arguments),
                    void 0)
                }
            }
            function p(t, s, r, o, a) {
                var e = 8 * a - o - 1, d = (1 << e) - 1, i = d >> 1, u = -7, p = r ? a - 1 : 0, c = r ? -1 : 1, m = t[s + p], _, T;
                for (p += c,
                _ = m & (1 << -u) - 1,
                m >>= -u,
                u += e; 0 < u; _ = 256 * _ + t[s + p],
                p += c,
                u -= 8)
                    ;
                for (T = _ & (1 << -u) - 1,
                _ >>= -u,
                u += o; 0 < u; T = 256 * T + t[s + p],
                p += c,
                u -= 8)
                    ;
                if (0 === _)
                    _ = 1 - i;
                else {
                    if (_ === d)
                        return T ? 0 / 0 : 1 / 0 * (m ? -1 : 1);
                    T += E(2, o),
                    _ -= i
                }
                return (m ? -1 : 1) * T * E(2, _ - o)
            }
            function m(t, a, _, c, d, T) {
                var f = 8 * T - d - 1, S = (1 << f) - 1, I = S >> 1, l = 23 === d ? E(2, -24) - E(2, -77) : 0, m = c ? 0 : T - 1, y = c ? 1 : -1, o = 0 > a || 0 === a && 0 > 1 / a ? 1 : 0, p, C, R;
                for (a = Math.abs(a),
                isNaN(a) || 1 / 0 === a ? (C = isNaN(a) ? 1 : 0,
                p = S) : (p = s(u(a) / r),
                1 > a * (R = E(2, -p)) && (p--,
                R *= 2),
                a += 1 <= p + I ? l / R : l * E(2, 1 - I),
                2 <= a * R && (p++,
                R /= 2),
                p + I >= S ? (C = 0,
                p = S) : 1 <= p + I ? (C = (a * R - 1) * E(2, d),
                p += I) : (C = a * E(2, I - 1) * E(2, d),
                p = 0)); 8 <= d; t[_ + m] = 255 & C,
                m += y,
                C /= 256,
                d -= 8)
                    ;
                for (p = p << d | C,
                f += d; 0 < f; t[_ + m] = 255 & p,
                m += y,
                p /= 256,
                f -= 8)
                    ;
                t[_ + m - y] |= 128 * o
            }
            var _ = function(t, n, s) {
                if ("undefined" == typeof t && (t = _.DEFAULT_CAPACITY),
                "undefined" == typeof n && (n = _.DEFAULT_ENDIAN),
                "undefined" == typeof s && (s = _.DEFAULT_NOASSERT),
                !s) {
                    if (t = 0 | t,
                    0 > t)
                        throw RangeError("Illegal capacity");
                    n = !!n,
                    s = !!s
                }
                this.buffer = 0 === t ? T : new ArrayBuffer(t),
                this.view = 0 === t ? null : new Uint8Array(this.buffer),
                this.offset = 0,
                this.markedOffset = -1,
                this.limit = t,
                this.littleEndian = n,
                this.noAssert = s
            }, i, T, f, S, I;
            return _.VERSION = "5.0.1",
            _.LITTLE_ENDIAN = !0,
            _.BIG_ENDIAN = !1,
            _.DEFAULT_CAPACITY = 16,
            _.DEFAULT_ENDIAN = _.BIG_ENDIAN,
            _.DEFAULT_NOASSERT = !1,
            _.Long = t || null,
            i = _.prototype,
            i.__isByteBuffer__,
            Object.defineProperty(i, "__isByteBuffer__", {
                value: !0,
                enumerable: !1,
                configurable: !1
            }),
            T = new ArrayBuffer(0),
            f = n,
            _.accessor = function() {
                return Uint8Array
            }
            ,
            _.allocate = function(e, t, n) {
                return new _(e,t,n)
            }
            ,
            _.concat = function(t, n, s, r) {
                var o, a, l, u, p, m;
                for (("boolean" == typeof n || "string" != typeof n) && (r = s,
                s = n,
                n = void 0),
                o = 0,
                l = 0,
                u = t.length; u > l; ++l)
                    _.isByteBuffer(t[l]) || (t[l] = _.wrap(t[l], n)),
                    a = t[l].limit - t[l].offset,
                    0 < a && (o += a);
                if (0 === o)
                    return new _(0,s,r);
                for (m = new _(o,s,r),
                l = 0; u > l; )
                    p = t[l++],
                    a = p.limit - p.offset,
                    0 >= a || (m.view.set(p.view.subarray(p.offset, p.limit), m.offset),
                    m.offset += a);
                return m.limit = m.offset,
                m.offset = 0,
                m
            }
            ,
            _.isByteBuffer = function(e) {
                return !0 === (e && e.__isByteBuffer__)
            }
            ,
            _.type = function() {
                return ArrayBuffer
            }
            ,
            _.wrap = function(t, n, s, r) {
                var o, a;
                if ("string" != typeof n && (r = s,
                s = n,
                n = void 0),
                "string" == typeof t)
                    switch ("undefined" == typeof n && (n = "utf8"),
                    n) {
                    case "base64":
                        return _.fromBase64(t, s);
                    case "hex":
                        return _.fromHex(t, s);
                    case "binary":
                        return _.fromBinary(t, s);
                    case "utf8":
                        return _.fromUTF8(t, s);
                    case "debug":
                        return _.fromDebug(t, s);
                    default:
                        throw Error("Unsupported encoding: " + n);
                    }
                if (null === t || "object" != typeof t)
                    throw TypeError("Illegal buffer");
                if (_.isByteBuffer(t))
                    return o = i.clone.call(t),
                    o.markedOffset = -1,
                    o;
                if (t instanceof Uint8Array)
                    o = new _(0,s,r),
                    0 < t.length && (o.buffer = t.buffer,
                    o.offset = t.byteOffset,
                    o.limit = t.byteOffset + t.byteLength,
                    o.view = new Uint8Array(t.buffer));
                else if (t instanceof ArrayBuffer)
                    o = new _(0,s,r),
                    0 < t.byteLength && (o.buffer = t,
                    o.offset = 0,
                    o.limit = t.byteLength,
                    o.view = 0 < t.byteLength ? new Uint8Array(t) : null);
                else {
                    if ("[object Array]" !== Object.prototype.toString.call(t))
                        throw TypeError("Illegal buffer");
                    for (o = new _(t.length,s,r),
                    o.limit = t.length,
                    a = 0; a < t.length; ++a)
                        o.view[a] = t[a]
                }
                return o
            }
            ,
            i.writeBitSet = function(t, n) {
                var s = "undefined" == typeof n, r, o, a, l, u, p;
                if (s && (n = this.offset),
                !this.noAssert) {
                    if (!(t instanceof Array))
                        throw TypeError("Illegal BitSet: Not an array");
                    if ("number" != typeof n || 0 != n % 1)
                        throw TypeError("Illegal offset: " + n + " (not an integer)");
                    if (n >>>= 0,
                    0 > n || n + 0 > this.buffer.byteLength)
                        throw RangeError("Illegal offset: 0 <= " + n + " (+" + 0 + ") <= " + this.buffer.byteLength)
                }
                for (o = n,
                a = t.length,
                l = a >> 3,
                u = 0,
                n += this.writeVarint32(a, n); l--; )
                    r = 1 & !!t[u++] | (1 & !!t[u++]) << 1 | (1 & !!t[u++]) << 2 | (1 & !!t[u++]) << 3 | (1 & !!t[u++]) << 4 | (1 & !!t[u++]) << 5 | (1 & !!t[u++]) << 6 | (1 & !!t[u++]) << 7,
                    this.writeByte(r, n++);
                if (a > u) {
                    for (p = 0,
                    r = 0; a > u; )
                        r |= (1 & !!t[u++]) << p++;
                    this.writeByte(r, n++)
                }
                return s ? (this.offset = n,
                this) : n - o
            }
            ,
            i.readBitSet = function(t) {
                var n = "undefined" == typeof t, s, r, o, l, u, p, m;
                for (n && (t = this.offset),
                r = this.readVarint32(t),
                o = r.value,
                l = o >> 3,
                u = 0,
                p = [],
                t += r.length; l--; )
                    s = this.readByte(t++),
                    p[u++] = !!(1 & s),
                    p[u++] = !!(2 & s),
                    p[u++] = !!(4 & s),
                    p[u++] = !!(8 & s),
                    p[u++] = !!(16 & s),
                    p[u++] = !!(32 & s),
                    p[u++] = !!(64 & s),
                    p[u++] = !!(128 & s);
                if (o > u)
                    for (m = 0,
                    s = this.readByte(t++); o > u; )
                        p[u++] = !!(1 & s >> m++);
                return n && (this.offset = t),
                p
            }
            ,
            i.readBytes = function(e, t) {
                var n = "undefined" == typeof t, s;
                if (n && (t = this.offset),
                !this.noAssert) {
                    if ("number" != typeof t || 0 != t % 1)
                        throw TypeError("Illegal offset: " + t + " (not an integer)");
                    if (t >>>= 0,
                    0 > t || t + e > this.buffer.byteLength)
                        throw RangeError("Illegal offset: 0 <= " + t + " (+" + e + ") <= " + this.buffer.byteLength)
                }
                return s = this.slice(t, t + e),
                n && (this.offset += e),
                s
            }
            ,
            i.writeBytes = i.append,
            i.writeInt8 = function(e, t) {
                var n = "undefined" == typeof t, s;
                if (n && (t = this.offset),
                !this.noAssert) {
                    if ("number" != typeof e || 0 != e % 1)
                        throw TypeError("Illegal value: " + e + " (not an integer)");
                    if (e |= 0,
                    "number" != typeof t || 0 != t % 1)
                        throw TypeError("Illegal offset: " + t + " (not an integer)");
                    if (t >>>= 0,
                    0 > t || t + 0 > this.buffer.byteLength)
                        throw RangeError("Illegal offset: 0 <= " + t + " (+" + 0 + ") <= " + this.buffer.byteLength)
                }
                return t += 1,
                s = this.buffer.byteLength,
                t > s && this.resize((s *= 2) > t ? s : t),
                t -= 1,
                this.view[t] = e,
                n && (this.offset += 1),
                this
            }
            ,
            i.writeByte = i.writeInt8,
            i.readInt8 = function(e) {
                var t = "undefined" == typeof e, n;
                if (t && (e = this.offset),
                !this.noAssert) {
                    if ("number" != typeof e || 0 != e % 1)
                        throw TypeError("Illegal offset: " + e + " (not an integer)");
                    if (e >>>= 0,
                    0 > e || e + 1 > this.buffer.byteLength)
                        throw RangeError("Illegal offset: 0 <= " + e + " (+" + 1 + ") <= " + this.buffer.byteLength)
                }
                return n = this.view[e],
                128 == (128 & n) && (n = -(255 - n + 1)),
                t && (this.offset += 1),
                n
            }
            ,
            i.readByte = i.readInt8,
            i.writeUint8 = function(e, t) {
                var n = "undefined" == typeof t, s;
                if (n && (t = this.offset),
                !this.noAssert) {
                    if ("number" != typeof e || 0 != e % 1)
                        throw TypeError("Illegal value: " + e + " (not an integer)");
                    if (e >>>= 0,
                    "number" != typeof t || 0 != t % 1)
                        throw TypeError("Illegal offset: " + t + " (not an integer)");
                    if (t >>>= 0,
                    0 > t || t + 0 > this.buffer.byteLength)
                        throw RangeError("Illegal offset: 0 <= " + t + " (+" + 0 + ") <= " + this.buffer.byteLength)
                }
                return t += 1,
                s = this.buffer.byteLength,
                t > s && this.resize((s *= 2) > t ? s : t),
                t -= 1,
                this.view[t] = e,
                n && (this.offset += 1),
                this
            }
            ,
            i.writeUInt8 = i.writeUint8,
            i.readUint8 = function(e) {
                var t = "undefined" == typeof e, n;
                if (t && (e = this.offset),
                !this.noAssert) {
                    if ("number" != typeof e || 0 != e % 1)
                        throw TypeError("Illegal offset: " + e + " (not an integer)");
                    if (e >>>= 0,
                    0 > e || e + 1 > this.buffer.byteLength)
                        throw RangeError("Illegal offset: 0 <= " + e + " (+" + 1 + ") <= " + this.buffer.byteLength)
                }
                return n = this.view[e],
                t && (this.offset += 1),
                n
            }
            ,
            i.readUInt8 = i.readUint8,
            i.writeInt16 = function(e, t) {
                var n = "undefined" == typeof t, s;
                if (n && (t = this.offset),
                !this.noAssert) {
                    if ("number" != typeof e || 0 != e % 1)
                        throw TypeError("Illegal value: " + e + " (not an integer)");
                    if (e |= 0,
                    "number" != typeof t || 0 != t % 1)
                        throw TypeError("Illegal offset: " + t + " (not an integer)");
                    if (t >>>= 0,
                    0 > t || t + 0 > this.buffer.byteLength)
                        throw RangeError("Illegal offset: 0 <= " + t + " (+" + 0 + ") <= " + this.buffer.byteLength)
                }
                return t += 2,
                s = this.buffer.byteLength,
                t > s && this.resize((s *= 2) > t ? s : t),
                t -= 2,
                this.littleEndian ? (this.view[t + 1] = (65280 & e) >>> 8,
                this.view[t] = 255 & e) : (this.view[t] = (65280 & e) >>> 8,
                this.view[t + 1] = 255 & e),
                n && (this.offset += 2),
                this
            }
            ,
            i.writeShort = i.writeInt16,
            i.readInt16 = function(e) {
                var t = "undefined" == typeof e, n;
                if (t && (e = this.offset),
                !this.noAssert) {
                    if ("number" != typeof e || 0 != e % 1)
                        throw TypeError("Illegal offset: " + e + " (not an integer)");
                    if (e >>>= 0,
                    0 > e || e + 2 > this.buffer.byteLength)
                        throw RangeError("Illegal offset: 0 <= " + e + " (+" + 2 + ") <= " + this.buffer.byteLength)
                }
                return n = 0,
                this.littleEndian ? (n = this.view[e],
                n |= this.view[e + 1] << 8) : (n = this.view[e] << 8,
                n |= this.view[e + 1]),
                32768 == (32768 & n) && (n = -(65535 - n + 1)),
                t && (this.offset += 2),
                n
            }
            ,
            i.readShort = i.readInt16,
            i.writeUint16 = function(e, t) {
                var n = "undefined" == typeof t, s;
                if (n && (t = this.offset),
                !this.noAssert) {
                    if ("number" != typeof e || 0 != e % 1)
                        throw TypeError("Illegal value: " + e + " (not an integer)");
                    if (e >>>= 0,
                    "number" != typeof t || 0 != t % 1)
                        throw TypeError("Illegal offset: " + t + " (not an integer)");
                    if (t >>>= 0,
                    0 > t || t + 0 > this.buffer.byteLength)
                        throw RangeError("Illegal offset: 0 <= " + t + " (+" + 0 + ") <= " + this.buffer.byteLength)
                }
                return t += 2,
                s = this.buffer.byteLength,
                t > s && this.resize((s *= 2) > t ? s : t),
                t -= 2,
                this.littleEndian ? (this.view[t + 1] = (65280 & e) >>> 8,
                this.view[t] = 255 & e) : (this.view[t] = (65280 & e) >>> 8,
                this.view[t + 1] = 255 & e),
                n && (this.offset += 2),
                this
            }
            ,
            i.writeUInt16 = i.writeUint16,
            i.readUint16 = function(e) {
                var t = "undefined" == typeof e, n;
                if (t && (e = this.offset),
                !this.noAssert) {
                    if ("number" != typeof e || 0 != e % 1)
                        throw TypeError("Illegal offset: " + e + " (not an integer)");
                    if (e >>>= 0,
                    0 > e || e + 2 > this.buffer.byteLength)
                        throw RangeError("Illegal offset: 0 <= " + e + " (+" + 2 + ") <= " + this.buffer.byteLength)
                }
                return n = 0,
                this.littleEndian ? (n = this.view[e],
                n |= this.view[e + 1] << 8) : (n = this.view[e] << 8,
                n |= this.view[e + 1]),
                t && (this.offset += 2),
                n
            }
            ,
            i.readUInt16 = i.readUint16,
            i.writeInt32 = function(e, t) {
                var n = "undefined" == typeof t, s;
                if (n && (t = this.offset),
                !this.noAssert) {
                    if ("number" != typeof e || 0 != e % 1)
                        throw TypeError("Illegal value: " + e + " (not an integer)");
                    if (e |= 0,
                    "number" != typeof t || 0 != t % 1)
                        throw TypeError("Illegal offset: " + t + " (not an integer)");
                    if (t >>>= 0,
                    0 > t || t + 0 > this.buffer.byteLength)
                        throw RangeError("Illegal offset: 0 <= " + t + " (+" + 0 + ") <= " + this.buffer.byteLength)
                }
                return t += 4,
                s = this.buffer.byteLength,
                t > s && this.resize((s *= 2) > t ? s : t),
                t -= 4,
                this.littleEndian ? (this.view[t + 3] = 255 & e >>> 24,
                this.view[t + 2] = 255 & e >>> 16,
                this.view[t + 1] = 255 & e >>> 8,
                this.view[t] = 255 & e) : (this.view[t] = 255 & e >>> 24,
                this.view[t + 1] = 255 & e >>> 16,
                this.view[t + 2] = 255 & e >>> 8,
                this.view[t + 3] = 255 & e),
                n && (this.offset += 4),
                this
            }
            ,
            i.writeInt = i.writeInt32,
            i.readInt32 = function(e) {
                var t = "undefined" == typeof e, n;
                if (t && (e = this.offset),
                !this.noAssert) {
                    if ("number" != typeof e || 0 != e % 1)
                        throw TypeError("Illegal offset: " + e + " (not an integer)");
                    if (e >>>= 0,
                    0 > e || e + 4 > this.buffer.byteLength)
                        throw RangeError("Illegal offset: 0 <= " + e + " (+" + 4 + ") <= " + this.buffer.byteLength)
                }
                return n = 0,
                this.littleEndian ? (n = this.view[e + 2] << 16,
                n |= this.view[e + 1] << 8,
                n |= this.view[e],
                n += this.view[e + 3] << 24 >>> 0) : (n = this.view[e + 1] << 16,
                n |= this.view[e + 2] << 8,
                n |= this.view[e + 3],
                n += this.view[e] << 24 >>> 0),
                n |= 0,
                t && (this.offset += 4),
                n
            }
            ,
            i.readInt = i.readInt32,
            i.writeUint32 = function(e, t) {
                var n = "undefined" == typeof t, s;
                if (n && (t = this.offset),
                !this.noAssert) {
                    if ("number" != typeof e || 0 != e % 1)
                        throw TypeError("Illegal value: " + e + " (not an integer)");
                    if (e >>>= 0,
                    "number" != typeof t || 0 != t % 1)
                        throw TypeError("Illegal offset: " + t + " (not an integer)");
                    if (t >>>= 0,
                    0 > t || t + 0 > this.buffer.byteLength)
                        throw RangeError("Illegal offset: 0 <= " + t + " (+" + 0 + ") <= " + this.buffer.byteLength)
                }
                return t += 4,
                s = this.buffer.byteLength,
                t > s && this.resize((s *= 2) > t ? s : t),
                t -= 4,
                this.littleEndian ? (this.view[t + 3] = 255 & e >>> 24,
                this.view[t + 2] = 255 & e >>> 16,
                this.view[t + 1] = 255 & e >>> 8,
                this.view[t] = 255 & e) : (this.view[t] = 255 & e >>> 24,
                this.view[t + 1] = 255 & e >>> 16,
                this.view[t + 2] = 255 & e >>> 8,
                this.view[t + 3] = 255 & e),
                n && (this.offset += 4),
                this
            }
            ,
            i.writeUInt32 = i.writeUint32,
            i.readUint32 = function(e) {
                var t = "undefined" == typeof e, n;
                if (t && (e = this.offset),
                !this.noAssert) {
                    if ("number" != typeof e || 0 != e % 1)
                        throw TypeError("Illegal offset: " + e + " (not an integer)");
                    if (e >>>= 0,
                    0 > e || e + 4 > this.buffer.byteLength)
                        throw RangeError("Illegal offset: 0 <= " + e + " (+" + 4 + ") <= " + this.buffer.byteLength)
                }
                return n = 0,
                this.littleEndian ? (n = this.view[e + 2] << 16,
                n |= this.view[e + 1] << 8,
                n |= this.view[e],
                n += this.view[e + 3] << 24 >>> 0) : (n = this.view[e + 1] << 16,
                n |= this.view[e + 2] << 8,
                n |= this.view[e + 3],
                n += this.view[e] << 24 >>> 0),
                t && (this.offset += 4),
                n
            }
            ,
            i.readUInt32 = i.readUint32,
            t && (i.writeInt64 = function(n, s) {
                var i = "undefined" == typeof s, r, o, a;
                if (i && (s = this.offset),
                !this.noAssert) {
                    if ("number" == typeof n)
                        n = t.fromNumber(n);
                    else if ("string" == typeof n)
                        n = t.fromString(n);
                    else if (!(n && n instanceof t))
                        throw TypeError("Illegal value: " + n + " (not an integer or Long)");
                    if ("number" != typeof s || 0 != s % 1)
                        throw TypeError("Illegal offset: " + s + " (not an integer)");
                    if (s >>>= 0,
                    0 > s || s + 0 > this.buffer.byteLength)
                        throw RangeError("Illegal offset: 0 <= " + s + " (+" + 0 + ") <= " + this.buffer.byteLength)
                }
                return "number" == typeof n ? n = t.fromNumber(n) : "string" == typeof n && (n = t.fromString(n)),
                s += 8,
                r = this.buffer.byteLength,
                s > r && this.resize((r *= 2) > s ? r : s),
                s -= 8,
                o = n.low,
                a = n.high,
                this.littleEndian ? (this.view[s + 3] = 255 & o >>> 24,
                this.view[s + 2] = 255 & o >>> 16,
                this.view[s + 1] = 255 & o >>> 8,
                this.view[s] = 255 & o,
                s += 4,
                this.view[s + 3] = 255 & a >>> 24,
                this.view[s + 2] = 255 & a >>> 16,
                this.view[s + 1] = 255 & a >>> 8,
                this.view[s] = 255 & a) : (this.view[s] = 255 & a >>> 24,
                this.view[s + 1] = 255 & a >>> 16,
                this.view[s + 2] = 255 & a >>> 8,
                this.view[s + 3] = 255 & a,
                s += 4,
                this.view[s] = 255 & o >>> 24,
                this.view[s + 1] = 255 & o >>> 16,
                this.view[s + 2] = 255 & o >>> 8,
                this.view[s + 3] = 255 & o),
                i && (this.offset += 8),
                this
            }
            ,
            i.writeLong = i.writeInt64,
            i.readInt64 = function(n) {
                var s = "undefined" == typeof n, i, r, o;
                if (s && (n = this.offset),
                !this.noAssert) {
                    if ("number" != typeof n || 0 != n % 1)
                        throw TypeError("Illegal offset: " + n + " (not an integer)");
                    if (n >>>= 0,
                    0 > n || n + 8 > this.buffer.byteLength)
                        throw RangeError("Illegal offset: 0 <= " + n + " (+" + 8 + ") <= " + this.buffer.byteLength)
                }
                return i = 0,
                r = 0,
                this.littleEndian ? (i = this.view[n + 2] << 16,
                i |= this.view[n + 1] << 8,
                i |= this.view[n],
                i += this.view[n + 3] << 24 >>> 0,
                n += 4,
                r = this.view[n + 2] << 16,
                r |= this.view[n + 1] << 8,
                r |= this.view[n],
                r += this.view[n + 3] << 24 >>> 0) : (r = this.view[n + 1] << 16,
                r |= this.view[n + 2] << 8,
                r |= this.view[n + 3],
                r += this.view[n] << 24 >>> 0,
                n += 4,
                i = this.view[n + 1] << 16,
                i |= this.view[n + 2] << 8,
                i |= this.view[n + 3],
                i += this.view[n] << 24 >>> 0),
                o = new t(i,r,!1),
                s && (this.offset += 8),
                o
            }
            ,
            i.readLong = i.readInt64,
            i.writeUint64 = function(n, s) {
                var i = "undefined" == typeof s, r, o, a;
                if (i && (s = this.offset),
                !this.noAssert) {
                    if ("number" == typeof n)
                        n = t.fromNumber(n);
                    else if ("string" == typeof n)
                        n = t.fromString(n);
                    else if (!(n && n instanceof t))
                        throw TypeError("Illegal value: " + n + " (not an integer or Long)");
                    if ("number" != typeof s || 0 != s % 1)
                        throw TypeError("Illegal offset: " + s + " (not an integer)");
                    if (s >>>= 0,
                    0 > s || s + 0 > this.buffer.byteLength)
                        throw RangeError("Illegal offset: 0 <= " + s + " (+" + 0 + ") <= " + this.buffer.byteLength)
                }
                return "number" == typeof n ? n = t.fromNumber(n) : "string" == typeof n && (n = t.fromString(n)),
                s += 8,
                r = this.buffer.byteLength,
                s > r && this.resize((r *= 2) > s ? r : s),
                s -= 8,
                o = n.low,
                a = n.high,
                this.littleEndian ? (this.view[s + 3] = 255 & o >>> 24,
                this.view[s + 2] = 255 & o >>> 16,
                this.view[s + 1] = 255 & o >>> 8,
                this.view[s] = 255 & o,
                s += 4,
                this.view[s + 3] = 255 & a >>> 24,
                this.view[s + 2] = 255 & a >>> 16,
                this.view[s + 1] = 255 & a >>> 8,
                this.view[s] = 255 & a) : (this.view[s] = 255 & a >>> 24,
                this.view[s + 1] = 255 & a >>> 16,
                this.view[s + 2] = 255 & a >>> 8,
                this.view[s + 3] = 255 & a,
                s += 4,
                this.view[s] = 255 & o >>> 24,
                this.view[s + 1] = 255 & o >>> 16,
                this.view[s + 2] = 255 & o >>> 8,
                this.view[s + 3] = 255 & o),
                i && (this.offset += 8),
                this
            }
            ,
            i.writeUInt64 = i.writeUint64,
            i.readUint64 = function(n) {
                var s = "undefined" == typeof n, i, r, o;
                if (s && (n = this.offset),
                !this.noAssert) {
                    if ("number" != typeof n || 0 != n % 1)
                        throw TypeError("Illegal offset: " + n + " (not an integer)");
                    if (n >>>= 0,
                    0 > n || n + 8 > this.buffer.byteLength)
                        throw RangeError("Illegal offset: 0 <= " + n + " (+" + 8 + ") <= " + this.buffer.byteLength)
                }
                return i = 0,
                r = 0,
                this.littleEndian ? (i = this.view[n + 2] << 16,
                i |= this.view[n + 1] << 8,
                i |= this.view[n],
                i += this.view[n + 3] << 24 >>> 0,
                n += 4,
                r = this.view[n + 2] << 16,
                r |= this.view[n + 1] << 8,
                r |= this.view[n],
                r += this.view[n + 3] << 24 >>> 0) : (r = this.view[n + 1] << 16,
                r |= this.view[n + 2] << 8,
                r |= this.view[n + 3],
                r += this.view[n] << 24 >>> 0,
                n += 4,
                i = this.view[n + 1] << 16,
                i |= this.view[n + 2] << 8,
                i |= this.view[n + 3],
                i += this.view[n] << 24 >>> 0),
                o = new t(i,r,!0),
                s && (this.offset += 8),
                o
            }
            ,
            i.readUInt64 = i.readUint64),
            i.writeFloat32 = function(e, t) {
                var n = "undefined" == typeof t, s;
                if (n && (t = this.offset),
                !this.noAssert) {
                    if ("number" != typeof e)
                        throw TypeError("Illegal value: " + e + " (not a number)");
                    if ("number" != typeof t || 0 != t % 1)
                        throw TypeError("Illegal offset: " + t + " (not an integer)");
                    if (t >>>= 0,
                    0 > t || t + 0 > this.buffer.byteLength)
                        throw RangeError("Illegal offset: 0 <= " + t + " (+" + 0 + ") <= " + this.buffer.byteLength)
                }
                return t += 4,
                s = this.buffer.byteLength,
                t > s && this.resize((s *= 2) > t ? s : t),
                t -= 4,
                m(this.view, e, t, this.littleEndian, 23, 4),
                n && (this.offset += 4),
                this
            }
            ,
            i.writeFloat = i.writeFloat32,
            i.readFloat32 = function(e) {
                var t = "undefined" == typeof e, n;
                if (t && (e = this.offset),
                !this.noAssert) {
                    if ("number" != typeof e || 0 != e % 1)
                        throw TypeError("Illegal offset: " + e + " (not an integer)");
                    if (e >>>= 0,
                    0 > e || e + 4 > this.buffer.byteLength)
                        throw RangeError("Illegal offset: 0 <= " + e + " (+" + 4 + ") <= " + this.buffer.byteLength)
                }
                return n = p(this.view, e, this.littleEndian, 23, 4),
                t && (this.offset += 4),
                n
            }
            ,
            i.readFloat = i.readFloat32,
            i.writeFloat64 = function(e, t) {
                var n = "undefined" == typeof t, s;
                if (n && (t = this.offset),
                !this.noAssert) {
                    if ("number" != typeof e)
                        throw TypeError("Illegal value: " + e + " (not a number)");
                    if ("number" != typeof t || 0 != t % 1)
                        throw TypeError("Illegal offset: " + t + " (not an integer)");
                    if (t >>>= 0,
                    0 > t || t + 0 > this.buffer.byteLength)
                        throw RangeError("Illegal offset: 0 <= " + t + " (+" + 0 + ") <= " + this.buffer.byteLength)
                }
                return t += 8,
                s = this.buffer.byteLength,
                t > s && this.resize((s *= 2) > t ? s : t),
                t -= 8,
                m(this.view, e, t, this.littleEndian, 52, 8),
                n && (this.offset += 8),
                this
            }
            ,
            i.writeDouble = i.writeFloat64,
            i.readFloat64 = function(e) {
                var t = "undefined" == typeof e, n;
                if (t && (e = this.offset),
                !this.noAssert) {
                    if ("number" != typeof e || 0 != e % 1)
                        throw TypeError("Illegal offset: " + e + " (not an integer)");
                    if (e >>>= 0,
                    0 > e || e + 8 > this.buffer.byteLength)
                        throw RangeError("Illegal offset: 0 <= " + e + " (+" + 8 + ") <= " + this.buffer.byteLength)
                }
                return n = p(this.view, e, this.littleEndian, 52, 8),
                t && (this.offset += 8),
                n
            }
            ,
            i.readDouble = i.readFloat64,
            _.MAX_VARINT32_BYTES = 5,
            _.calculateVarint32 = function(e) {
                return e >>>= 0,
                128 > e ? 1 : 16384 > e ? 2 : 2097152 > e ? 3 : 268435456 > e ? 4 : 5
            }
            ,
            _.zigZagEncode32 = function(e) {
                return ((e |= 0) << 1 ^ e >> 31) >>> 0
            }
            ,
            _.zigZagDecode32 = function(e) {
                return 0 | e >>> 1 ^ -(1 & e)
            }
            ,
            i.writeVarint32 = function(t, n) {
                var s = "undefined" == typeof n, i, r, o;
                if (s && (n = this.offset),
                !this.noAssert) {
                    if ("number" != typeof t || 0 != t % 1)
                        throw TypeError("Illegal value: " + t + " (not an integer)");
                    if (t |= 0,
                    "number" != typeof n || 0 != n % 1)
                        throw TypeError("Illegal offset: " + n + " (not an integer)");
                    if (n >>>= 0,
                    0 > n || n + 0 > this.buffer.byteLength)
                        throw RangeError("Illegal offset: 0 <= " + n + " (+" + 0 + ") <= " + this.buffer.byteLength)
                }
                for (r = _.calculateVarint32(t),
                n += r,
                o = this.buffer.byteLength,
                n > o && this.resize((o *= 2) > n ? o : n),
                n -= r,
                t >>>= 0; 128 <= t; )
                    i = 128 | 127 & t,
                    this.view[n++] = i,
                    t >>>= 7;
                return this.view[n++] = t,
                s ? (this.offset = n,
                this) : r
            }
            ,
            i.writeVarint32ZigZag = function(e, t) {
                return this.writeVarint32(_.zigZagEncode32(e), t)
            }
            ,
            i.readVarint32 = function(t) {
                var n = "undefined" == typeof t, s, i, r, o;
                if (n && (t = this.offset),
                !this.noAssert) {
                    if ("number" != typeof t || 0 != t % 1)
                        throw TypeError("Illegal offset: " + t + " (not an integer)");
                    if (t >>>= 0,
                    0 > t || t + 1 > this.buffer.byteLength)
                        throw RangeError("Illegal offset: 0 <= " + t + " (+" + 1 + ") <= " + this.buffer.byteLength)
                }
                i = 0,
                r = 0;
                do {
                    if (!this.noAssert && t > this.limit)
                        throw o = Error("Truncated"),
                        o.truncated = !0,
                        o;
                    s = this.view[t++],
                    5 > i && (r |= (127 & s) << 7 * i),
                    ++i
                } while (0 != (128 & s));return r |= 0,
                n ? (this.offset = t,
                r) : {
                    value: r,
                    length: i
                }
            }
            ,
            i.readVarint32ZigZag = function(e) {
                var t = this.readVarint32(e);
                return "object" == typeof t ? t.value = _.zigZagDecode32(t.value) : t = _.zigZagDecode32(t),
                t
            }
            ,
            t && (_.MAX_VARINT64_BYTES = 10,
            _.calculateVarint64 = function(n) {
                "number" == typeof n ? n = t.fromNumber(n) : "string" == typeof n && (n = t.fromString(n));
                var s = n.toInt() >>> 0
                  , i = n.shiftRightUnsigned(28).toInt() >>> 0
                  , r = n.shiftRightUnsigned(56).toInt() >>> 0;
                return 0 == r ? 0 == i ? 16384 > s ? 128 > s ? 1 : 2 : 2097152 > s ? 3 : 4 : 16384 > i ? 128 > i ? 5 : 6 : 2097152 > i ? 7 : 8 : 128 > r ? 9 : 10
            }
            ,
            _.zigZagEncode64 = function(e) {
                return "number" == typeof e ? e = t.fromNumber(e, !1) : "string" == typeof e ? e = t.fromString(e, !1) : !1 !== e.unsigned && (e = e.toSigned()),
                e.shiftLeft(1).xor(e.shiftRight(63)).toUnsigned()
            }
            ,
            _.zigZagDecode64 = function(e) {
                return "number" == typeof e ? e = t.fromNumber(e, !1) : "string" == typeof e ? e = t.fromString(e, !1) : !1 !== e.unsigned && (e = e.toSigned()),
                e.shiftRightUnsigned(1).xor(e.and(t.ONE).toSigned().negate()).toSigned()
            }
            ,
            i.writeVarint64 = function(n, s) {
                var r = "undefined" == typeof s, e, o, a, l, u;
                if (r && (s = this.offset),
                !this.noAssert) {
                    if ("number" == typeof n)
                        n = t.fromNumber(n);
                    else if ("string" == typeof n)
                        n = t.fromString(n);
                    else if (!(n && n instanceof t))
                        throw TypeError("Illegal value: " + n + " (not an integer or Long)");
                    if ("number" != typeof s || 0 != s % 1)
                        throw TypeError("Illegal offset: " + s + " (not an integer)");
                    if (s >>>= 0,
                    0 > s || s + 0 > this.buffer.byteLength)
                        throw RangeError("Illegal offset: 0 <= " + s + " (+" + 0 + ") <= " + this.buffer.byteLength)
                }
                switch ("number" == typeof n ? n = t.fromNumber(n, !1) : "string" == typeof n ? n = t.fromString(n, !1) : !1 !== n.unsigned && (n = n.toSigned()),
                e = _.calculateVarint64(n),
                o = n.toInt() >>> 0,
                a = n.shiftRightUnsigned(28).toInt() >>> 0,
                l = n.shiftRightUnsigned(56).toInt() >>> 0,
                s += e,
                u = this.buffer.byteLength,
                s > u && this.resize((u *= 2) > s ? u : s),
                s -= e,
                e) {
                case 10:
                    this.view[s + 9] = 1 & l >>> 7;
                case 9:
                    this.view[s + 8] = 9 === e ? 127 & l : 128 | l;
                case 8:
                    this.view[s + 7] = 8 === e ? 127 & a >>> 21 : 128 | a >>> 21;
                case 7:
                    this.view[s + 6] = 7 === e ? 127 & a >>> 14 : 128 | a >>> 14;
                case 6:
                    this.view[s + 5] = 6 === e ? 127 & a >>> 7 : 128 | a >>> 7;
                case 5:
                    this.view[s + 4] = 5 === e ? 127 & a : 128 | a;
                case 4:
                    this.view[s + 3] = 4 === e ? 127 & o >>> 21 : 128 | o >>> 21;
                case 3:
                    this.view[s + 2] = 3 === e ? 127 & o >>> 14 : 128 | o >>> 14;
                case 2:
                    this.view[s + 1] = 2 === e ? 127 & o >>> 7 : 128 | o >>> 7;
                case 1:
                    this.view[s] = 1 === e ? 127 & o : 128 | o;
                }
                return r ? (this.offset += e,
                this) : e
            }
            ,
            i.writeVarint64ZigZag = function(e, t) {
                return this.writeVarint64(_.zigZagEncode64(e), t)
            }
            ,
            i.readVarint64 = function(n) {
                var s = "undefined" == typeof n, r, o, a, l, u, p;
                if (s && (n = this.offset),
                !this.noAssert) {
                    if ("number" != typeof n || 0 != n % 1)
                        throw TypeError("Illegal offset: " + n + " (not an integer)");
                    if (n >>>= 0,
                    0 > n || n + 1 > this.buffer.byteLength)
                        throw RangeError("Illegal offset: 0 <= " + n + " (+" + 1 + ") <= " + this.buffer.byteLength)
                }
                if (r = n,
                o = 0,
                a = 0,
                l = 0,
                u = 0,
                u = this.view[n++],
                o = 127 & u,
                128 & u && (u = this.view[n++],
                o |= (127 & u) << 7,
                (128 & u || this.noAssert && "undefined" == typeof u) && (u = this.view[n++],
                o |= (127 & u) << 14,
                (128 & u || this.noAssert && "undefined" == typeof u) && (u = this.view[n++],
                o |= (127 & u) << 21,
                (128 & u || this.noAssert && "undefined" == typeof u) && (u = this.view[n++],
                a = 127 & u,
                (128 & u || this.noAssert && "undefined" == typeof u) && (u = this.view[n++],
                a |= (127 & u) << 7,
                (128 & u || this.noAssert && "undefined" == typeof u) && (u = this.view[n++],
                a |= (127 & u) << 14,
                (128 & u || this.noAssert && "undefined" == typeof u) && (u = this.view[n++],
                a |= (127 & u) << 21,
                (128 & u || this.noAssert && "undefined" == typeof u) && (u = this.view[n++],
                l = 127 & u,
                (128 & u || this.noAssert && "undefined" == typeof u) && (u = this.view[n++],
                l |= (127 & u) << 7,
                128 & u || this.noAssert && "undefined" == typeof u))))))))))
                    throw Error("Buffer overrun");
                return p = t.fromBits(o | a << 28, a >>> 4 | l << 24, !1),
                s ? (this.offset = n,
                p) : {
                    value: p,
                    length: n - r
                }
            }
            ,
            i.readVarint64ZigZag = function(e) {
                var n = this.readVarint64(e);
                return n && n.value instanceof t ? n.value = _.zigZagDecode64(n.value) : n = _.zigZagDecode64(n),
                n
            }
            ),
            i.writeCString = function(t, n) {
                var s = "undefined" == typeof n, i, r, a;
                if (s && (n = this.offset),
                r = t.length,
                !this.noAssert) {
                    if ("string" != typeof t)
                        throw TypeError("Illegal str: Not a string");
                    for (i = 0; r > i; ++i)
                        if (0 === t.charCodeAt(i))
                            throw RangeError("Illegal str: Contains NULL-characters");
                    if ("number" != typeof n || 0 != n % 1)
                        throw TypeError("Illegal offset: " + n + " (not an integer)");
                    if (n >>>= 0,
                    0 > n || n + 0 > this.buffer.byteLength)
                        throw RangeError("Illegal offset: 0 <= " + n + " (+" + 0 + ") <= " + this.buffer.byteLength)
                }
                return r = I.calculateUTF16asUTF8(o(t))[1],
                n += r + 1,
                a = this.buffer.byteLength,
                n > a && this.resize((a *= 2) > n ? a : n),
                n -= r + 1,
                I.encodeUTF16toUTF8(o(t), function(e) {
                    this.view[n++] = e
                }
                .bind(this)),
                this.view[n++] = 0,
                s ? (this.offset = n,
                this) : r
            }
            ,
            i.readCString = function(t) {
                var n = "undefined" == typeof t, s, i, r;
                if (n && (t = this.offset),
                !this.noAssert) {
                    if ("number" != typeof t || 0 != t % 1)
                        throw TypeError("Illegal offset: " + t + " (not an integer)");
                    if (t >>>= 0,
                    0 > t || t + 1 > this.buffer.byteLength)
                        throw RangeError("Illegal offset: 0 <= " + t + " (+" + 1 + ") <= " + this.buffer.byteLength)
                }
                return s = t,
                r = -1,
                I.decodeUTF8toUTF16(function() {
                    if (0 === r)
                        return null;
                    if (t >= this.limit)
                        throw RangeError("Illegal range: Truncated data, " + t + " < " + this.limit);
                    return r = this.view[t++],
                    0 === r ? null : r
                }
                .bind(this), i = l(), !0),
                n ? (this.offset = t,
                i()) : {
                    string: i(),
                    length: t - s
                }
            }
            ,
            i.writeIString = function(t, n) {
                var s = "undefined" == typeof n, i, r, a;
                if (s && (n = this.offset),
                !this.noAssert) {
                    if ("string" != typeof t)
                        throw TypeError("Illegal str: Not a string");
                    if ("number" != typeof n || 0 != n % 1)
                        throw TypeError("Illegal offset: " + n + " (not an integer)");
                    if (n >>>= 0,
                    0 > n || n + 0 > this.buffer.byteLength)
                        throw RangeError("Illegal offset: 0 <= " + n + " (+" + 0 + ") <= " + this.buffer.byteLength)
                }
                if (r = n,
                i = I.calculateUTF16asUTF8(o(t), this.noAssert)[1],
                n += 4 + i,
                a = this.buffer.byteLength,
                n > a && this.resize((a *= 2) > n ? a : n),
                n -= 4 + i,
                this.littleEndian ? (this.view[n + 3] = 255 & i >>> 24,
                this.view[n + 2] = 255 & i >>> 16,
                this.view[n + 1] = 255 & i >>> 8,
                this.view[n] = 255 & i) : (this.view[n] = 255 & i >>> 24,
                this.view[n + 1] = 255 & i >>> 16,
                this.view[n + 2] = 255 & i >>> 8,
                this.view[n + 3] = 255 & i),
                n += 4,
                I.encodeUTF16toUTF8(o(t), function(e) {
                    this.view[n++] = e
                }
                .bind(this)),
                n !== r + 4 + i)
                    throw RangeError("Illegal range: Truncated data, " + n + " == " + (n + 4 + i));
                return s ? (this.offset = n,
                this) : n - r
            }
            ,
            i.readIString = function(t) {
                var n = "undefined" == typeof t, s, i, r;
                if (n && (t = this.offset),
                !this.noAssert) {
                    if ("number" != typeof t || 0 != t % 1)
                        throw TypeError("Illegal offset: " + t + " (not an integer)");
                    if (t >>>= 0,
                    0 > t || t + 4 > this.buffer.byteLength)
                        throw RangeError("Illegal offset: 0 <= " + t + " (+" + 4 + ") <= " + this.buffer.byteLength)
                }
                return s = t,
                i = this.readUint32(t),
                r = this.readUTF8String(i, _.METRICS_BYTES, t += 4),
                t += r.length,
                n ? (this.offset = t,
                r.string) : {
                    string: r.string,
                    length: t - s
                }
            }
            ,
            _.METRICS_CHARS = "c",
            _.METRICS_BYTES = "b",
            i.writeUTF8String = function(t, n) {
                var s = "undefined" == typeof n, i, r, a;
                if (s && (n = this.offset),
                !this.noAssert) {
                    if ("number" != typeof n || 0 != n % 1)
                        throw TypeError("Illegal offset: " + n + " (not an integer)");
                    if (n >>>= 0,
                    0 > n || n + 0 > this.buffer.byteLength)
                        throw RangeError("Illegal offset: 0 <= " + n + " (+" + 0 + ") <= " + this.buffer.byteLength)
                }
                return r = n,
                i = I.calculateUTF16asUTF8(o(t))[1],
                n += i,
                a = this.buffer.byteLength,
                n > a && this.resize((a *= 2) > n ? a : n),
                n -= i,
                I.encodeUTF16toUTF8(o(t), function(e) {
                    this.view[n++] = e
                }
                .bind(this)),
                s ? (this.offset = n,
                this) : n - r
            }
            ,
            i.writeString = i.writeUTF8String,
            _.calculateUTF8Chars = function(e) {
                return I.calculateUTF16asUTF8(o(e))[0]
            }
            ,
            _.calculateUTF8Bytes = function(e) {
                return I.calculateUTF16asUTF8(o(e))[1]
            }
            ,
            _.calculateString = _.calculateUTF8Bytes,
            i.readUTF8String = function(t, n, s) {
                var r, o, u, p, m;
                if ("number" == typeof n && (s = n,
                n = void 0),
                r = "undefined" == typeof s,
                r && (s = this.offset),
                "undefined" == typeof n && (n = _.METRICS_CHARS),
                !this.noAssert) {
                    if ("number" != typeof t || 0 != t % 1)
                        throw TypeError("Illegal length: " + t + " (not an integer)");
                    if (t |= 0,
                    "number" != typeof s || 0 != s % 1)
                        throw TypeError("Illegal offset: " + s + " (not an integer)");
                    if (s >>>= 0,
                    0 > s || s + 0 > this.buffer.byteLength)
                        throw RangeError("Illegal offset: 0 <= " + s + " (+" + 0 + ") <= " + this.buffer.byteLength)
                }
                if (u = 0,
                p = s,
                n === _.METRICS_CHARS) {
                    if (o = l(),
                    I.decodeUTF8(function() {
                        return t > u && s < this.limit ? this.view[s++] : null
                    }
                    .bind(this), function(e) {
                        ++u,
                        I.UTF8toUTF16(e, o)
                    }),
                    u !== t)
                        throw RangeError("Illegal range: Truncated data, " + u + " == " + t);
                    return r ? (this.offset = s,
                    o()) : {
                        string: o(),
                        length: s - p
                    }
                }
                if (n === _.METRICS_BYTES) {
                    if (!this.noAssert) {
                        if ("number" != typeof s || 0 != s % 1)
                            throw TypeError("Illegal offset: " + s + " (not an integer)");
                        if (s >>>= 0,
                        0 > s || s + t > this.buffer.byteLength)
                            throw RangeError("Illegal offset: 0 <= " + s + " (+" + t + ") <= " + this.buffer.byteLength)
                    }
                    if (m = s + t,
                    I.decodeUTF8toUTF16(function() {
                        return m > s ? this.view[s++] : null
                    }
                    .bind(this), o = l(), this.noAssert),
                    s !== m)
                        throw RangeError("Illegal range: Truncated data, " + s + " == " + m);
                    return r ? (this.offset = s,
                    o()) : {
                        string: o(),
                        length: s - p
                    }
                }
                throw TypeError("Unsupported metrics: " + n)
            }
            ,
            i.readString = i.readUTF8String,
            i.writeVString = function(t, n) {
                var s = "undefined" == typeof n, r, a, d, l;
                if (s && (n = this.offset),
                !this.noAssert) {
                    if ("string" != typeof t)
                        throw TypeError("Illegal str: Not a string");
                    if ("number" != typeof n || 0 != n % 1)
                        throw TypeError("Illegal offset: " + n + " (not an integer)");
                    if (n >>>= 0,
                    0 > n || n + 0 > this.buffer.byteLength)
                        throw RangeError("Illegal offset: 0 <= " + n + " (+" + 0 + ") <= " + this.buffer.byteLength)
                }
                if (d = n,
                r = I.calculateUTF16asUTF8(o(t), this.noAssert)[1],
                a = _.calculateVarint32(r),
                n += a + r,
                l = this.buffer.byteLength,
                n > l && this.resize((l *= 2) > n ? l : n),
                n -= a + r,
                n += this.writeVarint32(r, n),
                I.encodeUTF16toUTF8(o(t), function(e) {
                    this.view[n++] = e
                }
                .bind(this)),
                n !== d + r + a)
                    throw RangeError("Illegal range: Truncated data, " + n + " == " + (n + r + a));
                return s ? (this.offset = n,
                this) : n - d
            }
            ,
            i.readVString = function(t) {
                var n = "undefined" == typeof t, s, i, r;
                if (n && (t = this.offset),
                !this.noAssert) {
                    if ("number" != typeof t || 0 != t % 1)
                        throw TypeError("Illegal offset: " + t + " (not an integer)");
                    if (t >>>= 0,
                    0 > t || t + 1 > this.buffer.byteLength)
                        throw RangeError("Illegal offset: 0 <= " + t + " (+" + 1 + ") <= " + this.buffer.byteLength)
                }
                return s = t,
                i = this.readVarint32(t),
                r = this.readUTF8String(i.value, _.METRICS_BYTES, t += i.length),
                t += r.length,
                n ? (this.offset = t,
                r.string) : {
                    string: r.string,
                    length: t - s
                }
            }
            ,
            i.append = function(t, n, s) {
                var i, r, o;
                if (("number" == typeof n || "string" != typeof n) && (s = n,
                n = void 0),
                i = "undefined" == typeof s,
                i && (s = this.offset),
                !this.noAssert) {
                    if ("number" != typeof s || 0 != s % 1)
                        throw TypeError("Illegal offset: " + s + " (not an integer)");
                    if (s >>>= 0,
                    0 > s || s + 0 > this.buffer.byteLength)
                        throw RangeError("Illegal offset: 0 <= " + s + " (+" + 0 + ") <= " + this.buffer.byteLength)
                }
                return t instanceof _ || (t = _.wrap(t, n)),
                r = t.limit - t.offset,
                0 >= r ? this : (s += r,
                o = this.buffer.byteLength,
                s > o && this.resize((o *= 2) > s ? o : s),
                s -= r,
                this.view.set(t.view.subarray(t.offset, t.limit), s),
                t.offset += r,
                i && (this.offset += r),
                this)
            }
            ,
            i.appendTo = function(e, t) {
                return e.append(this, t),
                this
            }
            ,
            i.assert = function(e) {
                return this.noAssert = !e,
                this
            }
            ,
            i.capacity = function() {
                return this.buffer.byteLength
            }
            ,
            i.clear = function() {
                return this.offset = 0,
                this.limit = this.buffer.byteLength,
                this.markedOffset = -1,
                this
            }
            ,
            i.clone = function(e) {
                var t = new _(0,this.littleEndian,this.noAssert);
                return e ? (t.buffer = new ArrayBuffer(this.buffer.byteLength),
                t.view = new Uint8Array(t.buffer)) : (t.buffer = this.buffer,
                t.view = this.view),
                t.offset = this.offset,
                t.markedOffset = this.markedOffset,
                t.limit = this.limit,
                t
            }
            ,
            i.compact = function(t, n) {
                var s, i, r;
                if ("undefined" == typeof t && (t = this.offset),
                "undefined" == typeof n && (n = this.limit),
                !this.noAssert) {
                    if ("number" != typeof t || 0 != t % 1)
                        throw TypeError("Illegal begin: Not an integer");
                    if (t >>>= 0,
                    "number" != typeof n || 0 != n % 1)
                        throw TypeError("Illegal end: Not an integer");
                    if (n >>>= 0,
                    0 > t || t > n || n > this.buffer.byteLength)
                        throw RangeError("Illegal range: 0 <= " + t + " <= " + n + " <= " + this.buffer.byteLength)
                }
                return 0 === t && n === this.buffer.byteLength ? this : (s = n - t,
                0 === s ? (this.buffer = T,
                this.view = null,
                0 <= this.markedOffset && (this.markedOffset -= t),
                this.offset = 0,
                this.limit = 0,
                this) : (i = new ArrayBuffer(s),
                r = new Uint8Array(i),
                r.set(this.view.subarray(t, n)),
                this.buffer = i,
                this.view = r,
                0 <= this.markedOffset && (this.markedOffset -= t),
                this.offset = 0,
                this.limit = s,
                this))
            }
            ,
            i.copy = function(t, n) {
                if ("undefined" == typeof t && (t = this.offset),
                "undefined" == typeof n && (n = this.limit),
                !this.noAssert) {
                    if ("number" != typeof t || 0 != t % 1)
                        throw TypeError("Illegal begin: Not an integer");
                    if (t >>>= 0,
                    "number" != typeof n || 0 != n % 1)
                        throw TypeError("Illegal end: Not an integer");
                    if (n >>>= 0,
                    0 > t || t > n || n > this.buffer.byteLength)
                        throw RangeError("Illegal range: 0 <= " + t + " <= " + n + " <= " + this.buffer.byteLength)
                }
                if (t === n)
                    return new _(0,this.littleEndian,this.noAssert);
                var s = n - t
                  , i = new _(s,this.littleEndian,this.noAssert);
                return i.offset = 0,
                i.limit = s,
                0 <= i.markedOffset && (i.markedOffset -= t),
                this.copyTo(i, 0, t, n),
                i
            }
            ,
            i.copyTo = function(t, n, s, i) {
                var r, o, a;
                if (!this.noAssert && !_.isByteBuffer(t))
                    throw TypeError("Illegal target: Not a ByteBuffer");
                if (n = (o = "undefined" == typeof n) ? t.offset : 0 | n,
                s = (r = "undefined" == typeof s) ? this.offset : 0 | s,
                i = "undefined" == typeof i ? this.limit : 0 | i,
                0 > n || n > t.buffer.byteLength)
                    throw RangeError("Illegal target range: 0 <= " + n + " <= " + t.buffer.byteLength);
                if (0 > s || i > this.buffer.byteLength)
                    throw RangeError("Illegal source range: 0 <= " + s + " <= " + this.buffer.byteLength);
                return a = i - s,
                0 === a ? t : (t.ensureCapacity(n + a),
                t.view.set(this.view.subarray(s, i), n),
                r && (this.offset += a),
                o && (t.offset += a),
                this)
            }
            ,
            i.ensureCapacity = function(e) {
                var t = this.buffer.byteLength;
                return e > t ? this.resize((t *= 2) > e ? t : e) : this
            }
            ,
            i.fill = function(e, t, n) {
                var s = "undefined" == typeof t;
                if (s && (t = this.offset),
                "string" == typeof e && 0 < e.length && (e = e.charCodeAt(0)),
                "undefined" == typeof t && (t = this.offset),
                "undefined" == typeof n && (n = this.limit),
                !this.noAssert) {
                    if ("number" != typeof e || 0 != e % 1)
                        throw TypeError("Illegal value: " + e + " (not an integer)");
                    if (e |= 0,
                    "number" != typeof t || 0 != t % 1)
                        throw TypeError("Illegal begin: Not an integer");
                    if (t >>>= 0,
                    "number" != typeof n || 0 != n % 1)
                        throw TypeError("Illegal end: Not an integer");
                    if (n >>>= 0,
                    0 > t || t > n || n > this.buffer.byteLength)
                        throw RangeError("Illegal range: 0 <= " + t + " <= " + n + " <= " + this.buffer.byteLength)
                }
                if (t >= n)
                    return this;
                for (; n > t; )
                    this.view[t++] = e;
                return s && (this.offset = t),
                this
            }
            ,
            i.flip = function() {
                return this.limit = this.offset,
                this.offset = 0,
                this
            }
            ,
            i.mark = function(e) {
                if (e = "undefined" == typeof e ? this.offset : e,
                !this.noAssert) {
                    if ("number" != typeof e || 0 != e % 1)
                        throw TypeError("Illegal offset: " + e + " (not an integer)");
                    if (e >>>= 0,
                    0 > e || e + 0 > this.buffer.byteLength)
                        throw RangeError("Illegal offset: 0 <= " + e + " (+" + 0 + ") <= " + this.buffer.byteLength)
                }
                return this.markedOffset = e,
                this
            }
            ,
            i.order = function(e) {
                if (!this.noAssert && "boolean" != typeof e)
                    throw TypeError("Illegal littleEndian: Not a boolean");
                return this.littleEndian = !!e,
                this
            }
            ,
            i.LE = function(e) {
                return this.littleEndian = "undefined" == typeof e || !!e,
                this
            }
            ,
            i.BE = function(e) {
                return this.littleEndian = "undefined" != typeof e && !e,
                this
            }
            ,
            i.prepend = function(t, n, s) {
                var r, o, l, u, p;
                if (("number" == typeof n || "string" != typeof n) && (s = n,
                n = void 0),
                r = "undefined" == typeof s,
                r && (s = this.offset),
                !this.noAssert) {
                    if ("number" != typeof s || 0 != s % 1)
                        throw TypeError("Illegal offset: " + s + " (not an integer)");
                    if (s >>>= 0,
                    0 > s || s + 0 > this.buffer.byteLength)
                        throw RangeError("Illegal offset: 0 <= " + s + " (+" + 0 + ") <= " + this.buffer.byteLength)
                }
                return t instanceof _ || (t = _.wrap(t, n)),
                o = t.limit - t.offset,
                0 >= o ? this : (l = o - s,
                0 < l ? (u = new ArrayBuffer(this.buffer.byteLength + l),
                p = new Uint8Array(u),
                p.set(this.view.subarray(s, this.buffer.byteLength), o),
                this.buffer = u,
                this.view = p,
                this.offset += l,
                0 <= this.markedOffset && (this.markedOffset += l),
                this.limit += l,
                s += l) : new Uint8Array(this.buffer),
                this.view.set(t.view.subarray(t.offset, t.limit), s - o),
                t.offset = t.limit,
                r && (this.offset -= o),
                this)
            }
            ,
            i.prependTo = function(e, t) {
                return e.prepend(this, t),
                this
            }
            ,
            i.printDebug = function(e) {
                "function" != typeof e && (e = console.log.bind(console)),
                e(this.toString() + "\n-------------------------------------------------------------------\n" + this.toDebug(!0))
            }
            ,
            i.remaining = function() {
                return this.limit - this.offset
            }
            ,
            i.reset = function() {
                return 0 <= this.markedOffset ? (this.offset = this.markedOffset,
                this.markedOffset = -1) : this.offset = 0,
                this
            }
            ,
            i.resize = function(e) {
                var t, n;
                if (!this.noAssert) {
                    if ("number" != typeof e || 0 != e % 1)
                        throw TypeError("Illegal capacity: " + e + " (not an integer)");
                    if (e |= 0,
                    0 > e)
                        throw RangeError("Illegal capacity: 0 <= " + e)
                }
                return this.buffer.byteLength < e && (t = new ArrayBuffer(e),
                n = new Uint8Array(t),
                n.set(this.view),
                this.buffer = t,
                this.view = n),
                this
            }
            ,
            i.reverse = function(e, t) {
                if ("undefined" == typeof e && (e = this.offset),
                "undefined" == typeof t && (t = this.limit),
                !this.noAssert) {
                    if ("number" != typeof e || 0 != e % 1)
                        throw TypeError("Illegal begin: Not an integer");
                    if (e >>>= 0,
                    "number" != typeof t || 0 != t % 1)
                        throw TypeError("Illegal end: Not an integer");
                    if (t >>>= 0,
                    0 > e || e > t || t > this.buffer.byteLength)
                        throw RangeError("Illegal range: 0 <= " + e + " <= " + t + " <= " + this.buffer.byteLength)
                }
                return e === t ? this : (Array.prototype.reverse.call(this.view.subarray(e, t)),
                this)
            }
            ,
            i.skip = function(e) {
                if (!this.noAssert) {
                    if ("number" != typeof e || 0 != e % 1)
                        throw TypeError("Illegal length: " + e + " (not an integer)");
                    e |= 0
                }
                var t = this.offset + e;
                if (!this.noAssert && (0 > t || t > this.buffer.byteLength))
                    throw RangeError("Illegal length: 0 <= " + this.offset + " + " + e + " <= " + this.buffer.byteLength);
                return this.offset = t,
                this
            }
            ,
            i.slice = function(e, t) {
                if ("undefined" == typeof e && (e = this.offset),
                "undefined" == typeof t && (t = this.limit),
                !this.noAssert) {
                    if ("number" != typeof e || 0 != e % 1)
                        throw TypeError("Illegal begin: Not an integer");
                    if (e >>>= 0,
                    "number" != typeof t || 0 != t % 1)
                        throw TypeError("Illegal end: Not an integer");
                    if (t >>>= 0,
                    0 > e || e > t || t > this.buffer.byteLength)
                        throw RangeError("Illegal range: 0 <= " + e + " <= " + t + " <= " + this.buffer.byteLength)
                }
                var n = this.clone();
                return n.offset = e,
                n.limit = t,
                n
            }
            ,
            i.toBuffer = function(t) {
                var n = this.offset, s = this.limit, i;
                if (!this.noAssert) {
                    if ("number" != typeof n || 0 != n % 1)
                        throw TypeError("Illegal offset: Not an integer");
                    if (n >>>= 0,
                    "number" != typeof s || 0 != s % 1)
                        throw TypeError("Illegal limit: Not an integer");
                    if (s >>>= 0,
                    0 > n || n > s || s > this.buffer.byteLength)
                        throw RangeError("Illegal range: 0 <= " + n + " <= " + s + " <= " + this.buffer.byteLength)
                }
                return t || 0 !== n || s !== this.buffer.byteLength ? n === s ? T : (i = new ArrayBuffer(s - n),
                new Uint8Array(i).set(new Uint8Array(this.buffer).subarray(n, s), 0),
                i) : this.buffer
            }
            ,
            i.toArrayBuffer = i.toBuffer,
            i.toString = function(e, t, n) {
                if ("undefined" == typeof e)
                    return "ByteBufferAB(offset=" + this.offset + ",markedOffset=" + this.markedOffset + ",limit=" + this.limit + ",capacity=" + this.capacity() + ")";
                switch ("number" == typeof e && (e = "utf8",
                t = e,
                n = t),
                e) {
                case "utf8":
                    return this.toUTF8(t, n);
                case "base64":
                    return this.toBase64(t, n);
                case "hex":
                    return this.toHex(t, n);
                case "binary":
                    return this.toBinary(t, n);
                case "debug":
                    return this.toDebug();
                case "columns":
                    return this.toColumns();
                default:
                    throw Error("Unsupported encoding: " + e);
                }
            }
            ,
            S = function() {
                var t = {}, n = [65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 43, 47], s = [], i, r;
                for (i = 0,
                r = n.length; r > i; ++i)
                    s[n[i]] = i;
                return t.encode = function(t, s) {
                    for (var i, r; null !== (i = t()); )
                        s(n[63 & i >> 2]),
                        r = (3 & i) << 4,
                        null === (i = t()) ? (s(n[63 & r]),
                        s(61),
                        s(61)) : (r |= 15 & i >> 4,
                        s(n[63 & (r | 15 & i >> 4)]),
                        r = (15 & i) << 2,
                        null === (i = t()) ? (s(n[63 & r]),
                        s(61)) : (s(n[63 & (r | 3 & i >> 6)]),
                        s(n[63 & i])))
                }
                ,
                t.decode = function(t, n) {
                    function i(e) {
                        throw Error("Illegal character code: " + e)
                    }
                    for (var r, o, a; null !== (r = t()); )
                        if (o = s[r],
                        "undefined" == typeof o && i(r),
                        null !== (r = t()) && (a = s[r],
                        "undefined" == typeof a && i(r),
                        n(o << 2 >>> 0 | (48 & a) >> 4),
                        null !== (r = t()))) {
                            if (o = s[r],
                            "undefined" == typeof o) {
                                if (61 === r)
                                    break;
                                i(r)
                            }
                            if (n((15 & a) << 4 >>> 0 | (60 & o) >> 2),
                            null !== (r = t())) {
                                if (a = s[r],
                                "undefined" == typeof a) {
                                    if (61 === r)
                                        break;
                                    i(r)
                                }
                                n((3 & o) << 6 >>> 0 | a)
                            }
                        }
                }
                ,
                t.test = function(e) {
                    return /^(?:[A-Za-z0-9+\/]{4})*(?:[A-Za-z0-9+\/]{2}==|[A-Za-z0-9+\/]{3}=)?$/.test(e)
                }
                ,
                t
            }(),
            i.toBase64 = function(e, t) {
                if ("undefined" == typeof e && (e = this.offset),
                "undefined" == typeof t && (t = this.limit),
                e = 0 | e,
                t = 0 | t,
                0 > e || t > this.capacity || e > t)
                    throw RangeError("begin, end");
                var n;
                return S.encode(function() {
                    return t > e ? this.view[e++] : null
                }
                .bind(this), n = l()),
                n()
            }
            ,
            _.fromBase64 = function(t, n) {
                if ("string" != typeof t)
                    throw TypeError("str");
                var s = new _(3 * (t.length / 4),n)
                  , i = 0;
                return S.decode(o(t), function(e) {
                    s.view[i++] = e
                }),
                s.limit = i,
                s
            }
            ,
            _.btoa = function(e) {
                return _.fromBinary(e).toBase64()
            }
            ,
            _.atob = function(e) {
                return _.fromBase64(e).toBinary()
            }
            ,
            i.toBinary = function(e, t) {
                if ("undefined" == typeof e && (e = this.offset),
                "undefined" == typeof t && (t = this.limit),
                e |= 0,
                t |= 0,
                0 > e || t > this.capacity() || e > t)
                    throw RangeError("begin, end");
                if (e === t)
                    return "";
                for (var s = [], i = []; t > e; )
                    s.push(this.view[e++]),
                    1024 <= s.length && (i.push(n.apply(String, s)),
                    s = []);
                return i.join("") + n.apply(String, s)
            }
            ,
            _.fromBinary = function(t, n) {
                if ("string" != typeof t)
                    throw TypeError("str");
                for (var s = 0, i = t.length, e = new _(i,n), r; i > s; ) {
                    if (r = t.charCodeAt(s),
                    255 < r)
                        throw RangeError("illegal char code: " + r);
                    e.view[s++] = r
                }
                return e.limit = i,
                e
            }
            ,
            i.toDebug = function(t) {
                for (var s = -1, i = this.buffer.byteLength, r = "", o = "", a = "", l; i > s; ) {
                    if (-1 != s && (l = this.view[s],
                    r += 16 > l ? "0" + l.toString(16).toUpperCase() : l.toString(16).toUpperCase(),
                    t && (o += 32 < l && 127 > l ? n(l) : ".")),
                    ++s,
                    t && 0 < s && 0 == s % 16 && s !== i) {
                        for (; 51 > r.length; )
                            r += " ";
                        a += r + o + "\n",
                        r = o = ""
                    }
                    r += s === this.offset && s === this.limit ? s === this.markedOffset ? "!" : "|" : s === this.offset ? s === this.markedOffset ? "[" : "<" : s === this.limit ? s === this.markedOffset ? "]" : ">" : s === this.markedOffset ? "'" : t || 0 !== s && s !== i ? " " : ""
                }
                if (t && " " !== r) {
                    for (; 51 > r.length; )
                        r += " ";
                    a += r + o + "\n"
                }
                return t ? a : r
            }
            ,
            _.fromDebug = function(t, s, r) {
                for (var a = t.length, e = new _(0 | (a + 1) / 3,s,r), d = 0, u = 0, p = !1, c = !1, E = !1, f = !1, T = !1, S, I; a > d; ) {
                    switch (S = t.charAt(d++)) {
                    case "!":
                        if (!r) {
                            if (c || E || f) {
                                T = !0;
                                break
                            }
                            c = E = f = !0
                        }
                        e.offset = e.markedOffset = e.limit = u,
                        p = !1;
                        break;
                    case "|":
                        if (!r) {
                            if (c || f) {
                                T = !0;
                                break
                            }
                            c = f = !0
                        }
                        e.offset = e.limit = u,
                        p = !1;
                        break;
                    case "[":
                        if (!r) {
                            if (c || E) {
                                T = !0;
                                break
                            }
                            c = E = !0
                        }
                        e.offset = e.markedOffset = u,
                        p = !1;
                        break;
                    case "<":
                        if (!r) {
                            if (c) {
                                T = !0;
                                break
                            }
                            c = !0
                        }
                        e.offset = u,
                        p = !1;
                        break;
                    case "]":
                        if (!r) {
                            if (f || E) {
                                T = !0;
                                break
                            }
                            f = E = !0
                        }
                        e.limit = e.markedOffset = u,
                        p = !1;
                        break;
                    case ">":
                        if (!r) {
                            if (f) {
                                T = !0;
                                break
                            }
                            f = !0
                        }
                        e.limit = u,
                        p = !1;
                        break;
                    case "'":
                        if (!r) {
                            if (E) {
                                T = !0;
                                break
                            }
                            E = !0
                        }
                        e.markedOffset = u,
                        p = !1;
                        break;
                    case " ":
                        p = !1;
                        break;
                    default:
                        if (!r && p) {
                            T = !0;
                            break
                        }
                        if (I = parseInt(S + t.charAt(d++), 16),
                        !r && (isNaN(I) || 0 > I || 255 < I))
                            throw TypeError("Illegal str: Not a debug encoded string");
                        e.view[u++] = I,
                        p = !0;
                    }
                    if (T)
                        throw TypeError("Illegal str: Invalid symbol at " + d)
                }
                if (!r) {
                    if (!c || !f)
                        throw TypeError("Illegal str: Missing offset or limit");
                    if (u < e.buffer.byteLength)
                        throw TypeError("Illegal str: Not a debug encoded string (is it hex?) " + u + " < " + a)
                }
                return e
            }
            ,
            i.toHex = function(e, t) {
                if (e = "undefined" == typeof e ? this.offset : e,
                t = "undefined" == typeof t ? this.limit : t,
                !this.noAssert) {
                    if ("number" != typeof e || 0 != e % 1)
                        throw TypeError("Illegal begin: Not an integer");
                    if (e >>>= 0,
                    "number" != typeof t || 0 != t % 1)
                        throw TypeError("Illegal end: Not an integer");
                    if (t >>>= 0,
                    0 > e || e > t || t > this.buffer.byteLength)
                        throw RangeError("Illegal range: 0 <= " + e + " <= " + t + " <= " + this.buffer.byteLength)
                }
                for (var n = Array(t - e), s; t > e; )
                    s = this.view[e++],
                    16 > s ? n.push("0", s.toString(16)) : n.push(s.toString(16));
                return n.join("")
            }
            ,
            _.fromHex = function(t, n, s) {
                var r, o, a, d, l;
                if (!s) {
                    if ("string" != typeof t)
                        throw TypeError("Illegal str: Not a string");
                    if (0 != t.length % 2)
                        throw TypeError("Illegal str: Length not a multiple of 2")
                }
                for (o = t.length,
                a = new _(0 | o / 2,n),
                d = 0,
                l = 0; o > d; d += 2) {
                    if (r = parseInt(t.substring(d, d + 2), 16),
                    !s && (!isFinite(r) || 0 > r || 255 < r))
                        throw TypeError("Illegal str: Contains non-hex characters");
                    a.view[l++] = r
                }
                return a.limit = l,
                a
            }
            ,
            I = function() {
                var e = {};
                return e.MAX_CODEPOINT = 1114111,
                e.encodeUTF8 = function(e, t) {
                    var n = null;
                    for ("number" == typeof e && (n = e,
                    e = function() {
                        return null
                    }
                    ); null !== n || null !== (n = e()); )
                        128 > n ? t(127 & n) : 2048 > n ? (t(192 | 31 & n >> 6),
                        t(128 | 63 & n)) : 65536 > n ? (t(224 | 15 & n >> 12),
                        t(128 | 63 & n >> 6),
                        t(128 | 63 & n)) : (t(240 | 7 & n >> 18),
                        t(128 | 63 & n >> 12),
                        t(128 | 63 & n >> 6),
                        t(128 | 63 & n)),
                        n = null
                }
                ,
                e.decodeUTF8 = function(t, n) {
                    for (var s = function(e) {
                        e = e.slice(0, e.indexOf(null));
                        var t = Error(e.toString());
                        throw t.name = "TruncatedError",
                        t.bytes = e,
                        t
                    }, i, r, o, a; null !== (i = t()); )
                        if (0 == (128 & i))
                            n(i);
                        else if (192 == (224 & i))
                            null === (r = t()) && s([i, r]),
                            n((31 & i) << 6 | 63 & r);
                        else if (224 == (240 & i))
                            (null === (r = t()) || null === (o = t())) && s([i, r, o]),
                            n((15 & i) << 12 | (63 & r) << 6 | 63 & o);
                        else {
                            if (240 != (248 & i))
                                throw RangeError("Illegal starting byte: " + i);
                            (null === (r = t()) || null === (o = t()) || null === (a = t())) && s([i, r, o, a]),
                            n((7 & i) << 18 | (63 & r) << 12 | (63 & o) << 6 | 63 & a)
                        }
                }
                ,
                e.UTF16toUTF8 = function(e, t) {
                    for (var n = null, s; ; ) {
                        if (null === (s = null === n ? e() : n))
                            break;
                        55296 <= s && 57343 >= s && null !== (n = e()) && 56320 <= n && 57343 >= n ? (t(1024 * (s - 55296) + n - 56320 + 65536),
                        n = null) : t(s)
                    }
                    null !== n && t(n)
                }
                ,
                e.UTF8toUTF16 = function(e, t) {
                    var n = null;
                    for ("number" == typeof e && (n = e,
                    e = function() {
                        return null
                    }
                    ); null !== n || null !== (n = e()); )
                        65535 >= n ? t(n) : (n -= 65536,
                        t((n >> 10) + 55296),
                        t(n % 1024 + 56320)),
                        n = null
                }
                ,
                e.encodeUTF16toUTF8 = function(t, n) {
                    e.UTF16toUTF8(t, function(t) {
                        e.encodeUTF8(t, n)
                    })
                }
                ,
                e.decodeUTF8toUTF16 = function(t, n) {
                    e.decodeUTF8(t, function(t) {
                        e.UTF8toUTF16(t, n)
                    })
                }
                ,
                e.calculateCodePoint = function(e) {
                    return 128 > e ? 1 : 2048 > e ? 2 : 65536 > e ? 3 : 4
                }
                ,
                e.calculateUTF8 = function(e) {
                    for (var t = 0, n; null !== (n = e()); )
                        t += 128 > n ? 1 : 2048 > n ? 2 : 65536 > n ? 3 : 4;
                    return t
                }
                ,
                e.calculateUTF16asUTF8 = function(t) {
                    var n = 0
                      , s = 0;
                    return e.UTF16toUTF8(t, function(e) {
                        ++n,
                        s += 128 > e ? 1 : 2048 > e ? 2 : 65536 > e ? 3 : 4
                    }),
                    [n, s]
                }
                ,
                e
            }(),
            i.toUTF8 = function(e, t) {
                if ("undefined" == typeof e && (e = this.offset),
                "undefined" == typeof t && (t = this.limit),
                !this.noAssert) {
                    if ("number" != typeof e || 0 != e % 1)
                        throw TypeError("Illegal begin: Not an integer");
                    if (e >>>= 0,
                    "number" != typeof t || 0 != t % 1)
                        throw TypeError("Illegal end: Not an integer");
                    if (t >>>= 0,
                    0 > e || e > t || t > this.buffer.byteLength)
                        throw RangeError("Illegal range: 0 <= " + e + " <= " + t + " <= " + this.buffer.byteLength)
                }
                var n;
                try {
                    I.decodeUTF8toUTF16(function() {
                        return t > e ? this.view[e++] : null
                    }
                    .bind(this), n = l())
                } catch (n) {
                    if (e !== t)
                        throw RangeError("Illegal range: Truncated data, " + e + " != " + t)
                }
                return n()
            }
            ,
            _.fromUTF8 = function(t, n, s) {
                if (!s && "string" != typeof t)
                    throw TypeError("Illegal str: Not a string");
                var i = new _(I.calculateUTF16asUTF8(o(t), !0)[1],n,s)
                  , e = 0;
                return I.encodeUTF16toUTF8(o(t), function(t) {
                    i.view[e++] = t
                }),
                i.limit = e,
                i
            }
            ,
            _
        }(p), o = function(n, s) {
            var r = {}, o, e, a;
            return r.ByteBuffer = n,
            r.c = n,
            o = n,
            r.Long = s || null,
            r.VERSION = "5.0.1",
            r.WIRE_TYPES = {},
            r.WIRE_TYPES.VARINT = 0,
            r.WIRE_TYPES.BITS64 = 1,
            r.WIRE_TYPES.LDELIM = 2,
            r.WIRE_TYPES.STARTGROUP = 3,
            r.WIRE_TYPES.ENDGROUP = 4,
            r.WIRE_TYPES.BITS32 = 5,
            r.PACKABLE_WIRE_TYPES = [r.WIRE_TYPES.VARINT, r.WIRE_TYPES.BITS64, r.WIRE_TYPES.BITS32],
            r.TYPES = {
                int32: {
                    name: "int32",
                    wireType: r.WIRE_TYPES.VARINT,
                    defaultValue: 0
                },
                uint32: {
                    name: "uint32",
                    wireType: r.WIRE_TYPES.VARINT,
                    defaultValue: 0
                },
                sint32: {
                    name: "sint32",
                    wireType: r.WIRE_TYPES.VARINT,
                    defaultValue: 0
                },
                int64: {
                    name: "int64",
                    wireType: r.WIRE_TYPES.VARINT,
                    defaultValue: r.Long ? r.Long.ZERO : void 0
                },
                uint64: {
                    name: "uint64",
                    wireType: r.WIRE_TYPES.VARINT,
                    defaultValue: r.Long ? r.Long.UZERO : void 0
                },
                sint64: {
                    name: "sint64",
                    wireType: r.WIRE_TYPES.VARINT,
                    defaultValue: r.Long ? r.Long.ZERO : void 0
                },
                bool: {
                    name: "bool",
                    wireType: r.WIRE_TYPES.VARINT,
                    defaultValue: !1
                },
                double: {
                    name: "double",
                    wireType: r.WIRE_TYPES.BITS64,
                    defaultValue: 0
                },
                string: {
                    name: "string",
                    wireType: r.WIRE_TYPES.LDELIM,
                    defaultValue: ""
                },
                bytes: {
                    name: "bytes",
                    wireType: r.WIRE_TYPES.LDELIM,
                    defaultValue: null
                },
                fixed32: {
                    name: "fixed32",
                    wireType: r.WIRE_TYPES.BITS32,
                    defaultValue: 0
                },
                sfixed32: {
                    name: "sfixed32",
                    wireType: r.WIRE_TYPES.BITS32,
                    defaultValue: 0
                },
                fixed64: {
                    name: "fixed64",
                    wireType: r.WIRE_TYPES.BITS64,
                    defaultValue: r.Long ? r.Long.UZERO : void 0
                },
                sfixed64: {
                    name: "sfixed64",
                    wireType: r.WIRE_TYPES.BITS64,
                    defaultValue: r.Long ? r.Long.ZERO : void 0
                },
                float: {
                    name: "float",
                    wireType: r.WIRE_TYPES.BITS32,
                    defaultValue: 0
                },
                enum: {
                    name: "enum",
                    wireType: r.WIRE_TYPES.VARINT,
                    defaultValue: 0
                },
                message: {
                    name: "message",
                    wireType: r.WIRE_TYPES.LDELIM,
                    defaultValue: null
                },
                group: {
                    name: "group",
                    wireType: r.WIRE_TYPES.STARTGROUP,
                    defaultValue: null
                }
            },
            r.MAP_KEY_TYPES = [r.TYPES.int32, r.TYPES.sint32, r.TYPES.sfixed32, r.TYPES.uint32, r.TYPES.fixed32, r.TYPES.int64, r.TYPES.sint64, r.TYPES.sfixed64, r.TYPES.uint64, r.TYPES.fixed64, r.TYPES.bool, r.TYPES.string, r.TYPES.bytes],
            r.ID_MIN = 1,
            r.ID_MAX = 536870911,
            r.convertFieldsToCamelCase = !1,
            r.populateAccessors = !0,
            r.populateDefaults = !0,
            r.Util = function() {
                var t = {};
                return t.IS_NODE = !("object" != typeof process || "[object process]" != process + "" || process.browser),
                t.XHR = function() {
                    var e = [function() {
                        return new XMLHttpRequest
                    }
                    , function() {
                        return new ActiveXObject("Msxml2.XMLHTTP")
                    }
                    , function() {
                        return new ActiveXObject("Msxml3.XMLHTTP")
                    }
                    , function() {
                        return new ActiveXObject("Microsoft.XMLHTTP")
                    }
                    ], t = null, n;
                    for (n = 0; n < e.length; n++) {
                        try {
                            t = e[n]()
                        } catch (e) {
                            continue
                        }
                        break
                    }
                    if (!t)
                        throw Error("XMLHttpRequest is not supported");
                    return t
                }
                ,
                t.fetch = function(n, s) {
                    if (s && "function" != typeof s && (s = null),
                    !t.IS_NODE) {
                        var i = t.XHR();
                        if (i.open("GET", n, !!s),
                        i.setRequestHeader("Accept", "text/plain"),
                        "function" == typeof i.overrideMimeType && i.overrideMimeType("text/plain"),
                        !s)
                            return i.send(null),
                            200 == i.status || 0 == i.status && "string" == typeof i.responseText ? i.responseText : null;
                        if (i.onreadystatechange = function() {
                            4 == i.readyState && (200 == i.status || 0 == i.status && "string" == typeof i.responseText ? s(i.responseText) : s(null))
                        }
                        ,
                        4 == i.readyState)
                            return;
                        i.send(null)
                    } else if (s)
                        g.readFile(n, function(e, t) {
                            e ? s(null) : s("" + t)
                        });
                    else
                        try {
                            return g.readFileSync(n)
                        } catch (e) {
                            return null
                        }
                }
                ,
                t.toCamelCase = function(e) {
                    return e.replace(/_([a-zA-Z])/g, function(e, t) {
                        return t.toUpperCase()
                    })
                }
                ,
                t
            }(),
            r.Lang = {
                DELIM: /[\s\{\}=;:\[\],'"\(\)<>]/g,
                RULE: /^(?:required|optional|repeated|map)$/,
                TYPE: /^(?:double|float|int32|uint32|sint32|int64|uint64|sint64|fixed32|sfixed32|fixed64|sfixed64|bool|string|bytes)$/,
                NAME: /^[a-zA-Z_][a-zA-Z_0-9]*$/,
                TYPEDEF: /^[a-zA-Z][a-zA-Z_0-9]*$/,
                TYPEREF: /^(?:\.?[a-zA-Z_][a-zA-Z_0-9]*)+$/,
                FQTYPEREF: /^(?:\.[a-zA-Z][a-zA-Z_0-9]*)+$/,
                NUMBER: /^-?(?:[1-9][0-9]*|0|0[xX][0-9a-fA-F]+|0[0-7]+|([0-9]*(\.[0-9]*)?([Ee][+-]?[0-9]+)?)|inf|nan)$/,
                NUMBER_DEC: /^(?:[1-9][0-9]*|0)$/,
                NUMBER_HEX: /^0[xX][0-9a-fA-F]+$/,
                NUMBER_OCT: /^0[0-7]+$/,
                NUMBER_FLT: /^([0-9]*(\.[0-9]*)?([Ee][+-]?[0-9]+)?|inf|nan)$/,
                BOOL: /^(?:true|false)$/i,
                ID: /^(?:[1-9][0-9]*|0|0[xX][0-9a-fA-F]+|0[0-7]+)$/,
                NEGID: /^\-?(?:[1-9][0-9]*|0|0[xX][0-9a-fA-F]+|0[0-7]+)$/,
                WHITESPACE: /\s/,
                STRING: /(?:"([^"\\]*(?:\\.[^"\\]*)*)")|(?:'([^'\\]*(?:\\.[^'\\]*)*)')/g,
                STRING_DQ: /(?:"([^"\\]*(?:\\.[^"\\]*)*)")/g,
                STRING_SQ: /(?:'([^'\\]*(?:\\.[^'\\]*)*)')/g
            },
            r.DotProto = function(t, n) {
                function s(t, s) {
                    var i = -1
                      , r = 1;
                    if ("-" == t.charAt(0) && (r = -1,
                    t = t.substring(1)),
                    n.NUMBER_DEC.test(t))
                        i = parseInt(t);
                    else if (n.NUMBER_HEX.test(t))
                        i = parseInt(t.substring(2), 16);
                    else {
                        if (!n.NUMBER_OCT.test(t))
                            throw Error("illegal id value: " + (0 > r ? "-" : "") + t);
                        i = parseInt(t.substring(1), 8)
                    }
                    if (i = 0 | r * i,
                    !s && 0 > i)
                        throw Error("illegal id value: " + (0 > r ? "-" : "") + t);
                    return i
                }
                function r(e) {
                    var t = 1;
                    if ("-" == e.charAt(0) && (t = -1,
                    e = e.substring(1)),
                    n.NUMBER_DEC.test(e))
                        return t * parseInt(e, 10);
                    if (n.NUMBER_HEX.test(e))
                        return t * parseInt(e.substring(2), 16);
                    if (n.NUMBER_OCT.test(e))
                        return t * parseInt(e.substring(1), 8);
                    if ("inf" === e)
                        return 1 / 0 * t;
                    if ("nan" === e)
                        return 0 / 0;
                    if (n.NUMBER_FLT.test(e))
                        return t * parseFloat(e);
                    throw Error("illegal number value: " + (0 > t ? "-" : "") + e)
                }
                function i(e, t, n) {
                    "undefined" == typeof e[t] ? e[t] = n : (Array.isArray(e[t]) || (e[t] = [e[t]]),
                    e[t].push(n))
                }
                var o = {}, l = function(e) {
                    this.source = e + "",
                    this.index = 0,
                    this.line = 1,
                    this.stack = [],
                    this._stringOpen = null
                }, a = l.prototype, e, d;
                return a._readString = function() {
                    var e = "\"" === this._stringOpen ? n.STRING_DQ : n.STRING_SQ, t;
                    if (e.lastIndex = this.index - 1,
                    t = e.exec(this.source),
                    !t)
                        throw Error("unterminated string");
                    return this.index = e.lastIndex,
                    this.stack.push(this._stringOpen),
                    this._stringOpen = null,
                    t[1]
                }
                ,
                a.next = function() {
                    var t, s, i, r, o, l;
                    if (0 < this.stack.length)
                        return this.stack.shift();
                    if (this.index >= this.source.length)
                        return null;
                    if (null !== this._stringOpen)
                        return this._readString();
                    do {
                        for (t = !1; n.WHITESPACE.test(i = this.source.charAt(this.index)); )
                            if ("\n" === i && ++this.line,
                            ++this.index === this.source.length)
                                return null;
                        if ("/" === this.source.charAt(this.index))
                            if (++this.index,
                            "/" === this.source.charAt(this.index)) {
                                for (; "\n" !== this.source.charAt(++this.index); )
                                    if (this.index == this.source.length)
                                        return null;
                                ++this.index,
                                ++this.line,
                                t = !0
                            } else {
                                if ("*" !== (i = this.source.charAt(this.index)))
                                    return "/";
                                do {
                                    if ("\n" === i && ++this.line,
                                    ++this.index === this.source.length)
                                        return null;
                                    s = i,
                                    i = this.source.charAt(this.index)
                                } while ("*" !== s || "/" !== i);++this.index,
                                t = !0
                            }
                    } while (t);if (this.index === this.source.length)
                        return null;
                    if (r = this.index,
                    n.DELIM.lastIndex = 0,
                    o = n.DELIM.test(this.source.charAt(r++)),
                    !o)
                        for (; r < this.source.length && !n.DELIM.test(this.source.charAt(r)); )
                            ++r;
                    return l = this.source.substring(this.index, this.index = r),
                    ("\"" === l || "'" === l) && (this._stringOpen = l),
                    l
                }
                ,
                a.peek = function() {
                    if (0 === this.stack.length) {
                        var e = this.next();
                        if (null === e)
                            return null;
                        this.stack.push(e)
                    }
                    return this.stack[0]
                }
                ,
                a.skip = function(e) {
                    var t = this.next();
                    if (t !== e)
                        throw Error("illegal '" + t + "', '" + e + "' expected")
                }
                ,
                a.omit = function(e) {
                    return this.peek() === e && (this.next(),
                    !0)
                }
                ,
                a.toString = function() {
                    return "Tokenizer (" + this.index + "/" + this.source.length + " at line " + this.line + ")"
                }
                ,
                o.Tokenizer = l,
                e = function(e) {
                    this.tn = new l(e),
                    this.proto3 = !1
                }
                ,
                d = e.prototype,
                d.parse = function() {
                    var e = {
                        name: "[ROOT]",
                        package: null,
                        messages: [],
                        enums: [],
                        imports: [],
                        options: {},
                        services: []
                    }, t = !0, s;
                    try {
                        for (; s = this.tn.next(); )
                            switch (s) {
                            case "package":
                                if (!t || null !== e["package"])
                                    throw Error("unexpected 'package'");
                                if (s = this.tn.next(),
                                !n.TYPEREF.test(s))
                                    throw Error("illegal package name: " + s);
                                this.tn.skip(";"),
                                e["package"] = s;
                                break;
                            case "import":
                                if (!t)
                                    throw Error("unexpected 'import'");
                                s = this.tn.peek(),
                                "public" === s && this.tn.next(),
                                s = this._readString(),
                                this.tn.skip(";"),
                                e.imports.push(s);
                                break;
                            case "syntax":
                                if (!t)
                                    throw Error("unexpected 'syntax'");
                                this.tn.skip("="),
                                "proto3" === (e.syntax = this._readString()) && (this.proto3 = !0),
                                this.tn.skip(";");
                                break;
                            case "message":
                                this._parseMessage(e, null),
                                t = !1;
                                break;
                            case "enum":
                                this._parseEnum(e),
                                t = !1;
                                break;
                            case "option":
                                this._parseOption(e);
                                break;
                            case "service":
                                this._parseService(e);
                                break;
                            case "extend":
                                this._parseExtend(e);
                                break;
                            default:
                                throw Error("unexpected '" + s + "'");
                            }
                    } catch (t) {
                        throw t.message = "Parse error at line " + this.tn.line + ": " + t.message,
                        t
                    }
                    return delete e.name,
                    e
                }
                ,
                e.parse = function(t) {
                    return new e(t).parse()
                }
                ,
                d._readString = function() {
                    var e = "", t, n;
                    do {
                        if (n = this.tn.next(),
                        "'" !== n && "\"" !== n)
                            throw Error("illegal string delimiter: " + n);
                        e += this.tn.next(),
                        this.tn.skip(n),
                        t = this.tn.peek()
                    } while ("\"" === t || "\"" === t);return e
                }
                ,
                d._readValue = function(e) {
                    var t = this.tn.peek();
                    if ("\"" === t || "'" === t)
                        return this._readString();
                    if (this.tn.next(),
                    n.NUMBER.test(t))
                        return r(t);
                    if (n.BOOL.test(t))
                        return "true" === t.toLowerCase();
                    if (e && n.TYPEREF.test(t))
                        return t;
                    throw Error("illegal value: " + t)
                }
                ,
                d._parseOption = function(t, s) {
                    var i = this.tn.next(), r = !1, o;
                    if ("(" === i && (r = !0,
                    i = this.tn.next()),
                    !n.TYPEREF.test(i))
                        throw Error("illegal option name: " + i);
                    o = i,
                    r && (this.tn.skip(")"),
                    o = "(" + o + ")",
                    i = this.tn.peek(),
                    n.FQTYPEREF.test(i) && (o += i,
                    this.tn.next())),
                    this.tn.skip("="),
                    this._parseOptionValue(t, o),
                    s || this.tn.skip(";")
                }
                ,
                d._parseOptionValue = function(e, t) {
                    var s = this.tn.peek();
                    if ("{" !== s)
                        i(e.options, t, this._readValue(!0));
                    else
                        for (this.tn.skip("{"); "}" !== (s = this.tn.next()); ) {
                            if (!n.NAME.test(s))
                                throw Error("illegal option name: " + t + "." + s);
                            this.tn.omit(":") ? i(e.options, t + "." + s, this._readValue(!0)) : this._parseOptionValue(e, t + "." + s)
                        }
                }
                ,
                d._parseService = function(t) {
                    var s = this.tn.next(), i, r;
                    if (!n.NAME.test(s))
                        throw Error("illegal service name at line " + this.tn.line + ": " + s);
                    for (i = s,
                    r = {
                        name: i,
                        rpc: {},
                        options: {}
                    },
                    this.tn.skip("{"); "}" !== (s = this.tn.next()); )
                        if ("option" === s)
                            this._parseOption(r);
                        else {
                            if ("rpc" !== s)
                                throw Error("illegal service token: " + s);
                            this._parseServiceRPC(r)
                        }
                    this.tn.omit(";"),
                    t.services.push(r)
                }
                ,
                d._parseServiceRPC = function(t) {
                    var s = this.tn.next(), i, r;
                    if (!n.NAME.test(s))
                        throw Error("illegal rpc service method name: " + s);
                    if (i = s,
                    r = {
                        request: null,
                        response: null,
                        request_stream: !1,
                        response_stream: !1,
                        options: {}
                    },
                    this.tn.skip("("),
                    s = this.tn.next(),
                    "stream" === s.toLowerCase() && (r.request_stream = !0,
                    s = this.tn.next()),
                    !n.TYPEREF.test(s))
                        throw Error("illegal rpc service request type: " + s);
                    if (r.request = s,
                    this.tn.skip(")"),
                    s = this.tn.next(),
                    "returns" !== s.toLowerCase())
                        throw Error("illegal rpc service request type delimiter: " + s);
                    if (this.tn.skip("("),
                    s = this.tn.next(),
                    "stream" === s.toLowerCase() && (r.response_stream = !0,
                    s = this.tn.next()),
                    r.response = s,
                    this.tn.skip(")"),
                    s = this.tn.peek(),
                    "{" === s) {
                        for (this.tn.next(); "}" !== (s = this.tn.next()); ) {
                            if ("option" !== s)
                                throw Error("illegal rpc service token: " + s);
                            this._parseOption(r)
                        }
                        this.tn.omit(";")
                    } else
                        this.tn.skip(";");
                    "undefined" == typeof t.rpc && (t.rpc = {}),
                    t.rpc[i] = r
                }
                ,
                d._parseMessage = function(t, i) {
                    var r = !!i
                      , o = this.tn.next()
                      , a = {
                        name: "",
                        fields: [],
                        enums: [],
                        messages: [],
                        options: {},
                        services: [],
                        oneofs: {}
                    };
                    if (!n.NAME.test(o))
                        throw Error("illegal " + (r ? "group" : "message") + " name: " + o);
                    for (a.name = o,
                    r && (this.tn.skip("="),
                    i.id = s(this.tn.next()),
                    a.isGroup = !0),
                    o = this.tn.peek(),
                    "[" === o && i && this._parseFieldOptions(i),
                    this.tn.skip("{"); "}" !== (o = this.tn.next()); )
                        if (n.RULE.test(o))
                            this._parseMessageField(a, o);
                        else if ("oneof" === o)
                            this._parseMessageOneOf(a);
                        else if ("enum" === o)
                            this._parseEnum(a);
                        else if ("message" === o)
                            this._parseMessage(a);
                        else if ("option" === o)
                            this._parseOption(a);
                        else if ("service" === o)
                            this._parseService(a);
                        else if ("extensions" === o)
                            a.extensions = this._parseExtensionRanges();
                        else if ("reserved" === o)
                            this._parseIgnored();
                        else if ("extend" === o)
                            this._parseExtend(a);
                        else {
                            if (!n.TYPEREF.test(o))
                                throw Error("illegal message token: " + o);
                            if (!this.proto3)
                                throw Error("illegal field rule: " + o);
                            this._parseMessageField(a, "optional", o)
                        }
                    return this.tn.omit(";"),
                    t.messages.push(a),
                    a
                }
                ,
                d._parseIgnored = function() {
                    for (; ";" !== this.tn.peek(); )
                        this.tn.next();
                    this.tn.skip(";")
                }
                ,
                d._parseMessageField = function(t, i, r) {
                    var o, a, l;
                    if (!n.RULE.test(i))
                        throw Error("illegal message field rule: " + i);
                    if (o = {
                        rule: i,
                        type: "",
                        name: "",
                        options: {},
                        id: 0
                    },
                    "map" === i) {
                        if (r)
                            throw Error("illegal type: " + r);
                        if (this.tn.skip("<"),
                        a = this.tn.next(),
                        !n.TYPE.test(a) && !n.TYPEREF.test(a))
                            throw Error("illegal message field type: " + a);
                        if (o.keytype = a,
                        this.tn.skip(","),
                        a = this.tn.next(),
                        !n.TYPE.test(a) && !n.TYPEREF.test(a))
                            throw Error("illegal message field: " + a);
                        if (o.type = a,
                        this.tn.skip(">"),
                        a = this.tn.next(),
                        !n.NAME.test(a))
                            throw Error("illegal message field name: " + a);
                        o.name = a,
                        this.tn.skip("="),
                        o.id = s(this.tn.next()),
                        a = this.tn.peek(),
                        "[" === a && this._parseFieldOptions(o),
                        this.tn.skip(";")
                    } else if (r = "undefined" == typeof r ? this.tn.next() : r,
                    "group" === r) {
                        if (l = this._parseMessage(t, o),
                        !/^[A-Z]/.test(l.name))
                            throw Error("illegal group name: " + l.name);
                        o.type = l.name,
                        o.name = l.name.toLowerCase(),
                        this.tn.omit(";")
                    } else {
                        if (!n.TYPE.test(r) && !n.TYPEREF.test(r))
                            throw Error("illegal message field type: " + r);
                        if (o.type = r,
                        a = this.tn.next(),
                        !n.NAME.test(a))
                            throw Error("illegal message field name: " + a);
                        o.name = a,
                        this.tn.skip("="),
                        o.id = s(this.tn.next()),
                        a = this.tn.peek(),
                        "[" === a && this._parseFieldOptions(o),
                        this.tn.skip(";")
                    }
                    return t.fields.push(o),
                    o
                }
                ,
                d._parseMessageOneOf = function(t) {
                    var s = this.tn.next(), i, r, o;
                    if (!n.NAME.test(s))
                        throw Error("illegal oneof name: " + s);
                    for (r = s,
                    o = [],
                    this.tn.skip("{"); "}" !== (s = this.tn.next()); )
                        i = this._parseMessageField(t, "optional", s),
                        i.oneof = r,
                        o.push(i.id);
                    this.tn.omit(";"),
                    t.oneofs[r] = o
                }
                ,
                d._parseFieldOptions = function(e) {
                    this.tn.skip("[");
                    for (var t = !0, n; "]" !== (n = this.tn.peek()); )
                        t || this.tn.skip(","),
                        this._parseOption(e, !0),
                        t = !1;
                    this.tn.next()
                }
                ,
                d._parseEnum = function(t) {
                    var i = {
                        name: "",
                        values: [],
                        options: {}
                    }, r = this.tn.next(), o;
                    if (!n.NAME.test(r))
                        throw Error("illegal name: " + r);
                    for (i.name = r,
                    this.tn.skip("{"); "}" !== (r = this.tn.next()); )
                        if ("option" === r)
                            this._parseOption(i);
                        else {
                            if (!n.NAME.test(r))
                                throw Error("illegal name: " + r);
                            this.tn.skip("="),
                            o = {
                                name: r,
                                id: s(this.tn.next(), !0)
                            },
                            r = this.tn.peek(),
                            "[" === r && this._parseFieldOptions({
                                options: {}
                            }),
                            this.tn.skip(";"),
                            i.values.push(o)
                        }
                    this.tn.omit(";"),
                    t.enums.push(i)
                }
                ,
                d._parseExtensionRanges = function() {
                    var n = [], s, i, o;
                    do {
                        for (i = []; ; ) {
                            switch (s = this.tn.next()) {
                            case "min":
                                o = t.ID_MIN;
                                break;
                            case "max":
                                o = t.ID_MAX;
                                break;
                            default:
                                o = r(s);
                            }
                            if (i.push(o),
                            2 === i.length)
                                break;
                            if ("to" !== this.tn.peek()) {
                                i.push(o);
                                break
                            }
                            this.tn.next()
                        }
                        n.push(i)
                    } while (this.tn.omit(","));return this.tn.skip(";"),
                    n
                }
                ,
                d._parseExtend = function(e) {
                    var t = this.tn.next(), s;
                    if (!n.TYPEREF.test(t))
                        throw Error("illegal extend reference: " + t);
                    for (s = {
                        ref: t,
                        fields: []
                    },
                    this.tn.skip("{"); "}" !== (t = this.tn.next()); )
                        if (n.RULE.test(t))
                            this._parseMessageField(s, t);
                        else {
                            if (!n.TYPEREF.test(t))
                                throw Error("illegal extend token: " + t);
                            if (!this.proto3)
                                throw Error("illegal field rule: " + t);
                            this._parseMessageField(s, "optional", t)
                        }
                    return this.tn.omit(";"),
                    e.messages.push(s),
                    s
                }
                ,
                d.toString = function() {
                    return "Parser at line " + this.tn.line
                }
                ,
                o.Parser = e,
                o
            }(r, r.Lang),
            r.Reflect = function(E) {
                function a(e) {
                    if ("string" == typeof e && (e = E.TYPES[e]),
                    "undefined" == typeof e.defaultValue)
                        throw Error("default value for type " + e.name + " is not supported");
                    return e == E.TYPES.bytes ? new o(0) : e.defaultValue
                }
                function f(e, t) {
                    if (e && "number" == typeof e.low && "number" == typeof e.high && "boolean" == typeof e.unsigned && e.low === e.low && e.high === e.high)
                        return new E.Long(e.low,e.high,"undefined" == typeof t ? e.unsigned : t);
                    if ("string" == typeof e)
                        return E.Long.fromString(e, t || !1, 10);
                    if ("number" == typeof e)
                        return E.Long.fromNumber(e, t || !1);
                    throw Error("not convertible to Long")
                }
                function l(t, n) {
                    var s = n.readVarint32()
                      , i = 7 & s
                      , e = s >>> 3;
                    switch (i) {
                    case E.WIRE_TYPES.VARINT:
                        do
                            s = n.readUint8();
                        while (128 == (128 & s));break;
                    case E.WIRE_TYPES.BITS64:
                        n.offset += 8;
                        break;
                    case E.WIRE_TYPES.LDELIM:
                        s = n.readVarint32(),
                        n.offset += s;
                        break;
                    case E.WIRE_TYPES.STARTGROUP:
                        l(e, n);
                        break;
                    case E.WIRE_TYPES.ENDGROUP:
                        if (e === t)
                            return !1;
                        throw Error("Illegal GROUPEND after unknown group: " + e + " (" + t + " expected)");
                    case E.WIRE_TYPES.BITS32:
                        n.offset += 4;
                        break;
                    default:
                        throw Error("Illegal wire type in unknown group " + t + ": " + i);
                    }
                    return !0
                }
                var _ = {}, T = function(e, t, n) {
                    this.builder = e,
                    this.parent = t,
                    this.name = n,
                    this.className
                }, d = T.prototype, S, e, I, c, C, R, O, N, M, b, U, D, L, P, V, k, F, G, K;
                return d.fqn = function() {
                    for (var e = this.name, t = this; ; ) {
                        if (t = t.parent,
                        null == t)
                            break;
                        e = t.name + "." + e
                    }
                    return e
                }
                ,
                d.toString = function(e) {
                    return (e ? this.className + " " : "") + this.fqn()
                }
                ,
                d.build = function() {
                    throw Error(this.toString(!0) + " cannot be built directly")
                }
                ,
                _.T = T,
                S = function(t, n, s, i, e) {
                    T.call(this, t, n, s),
                    this.className = "Namespace",
                    this.children = [],
                    this.options = i || {},
                    this.syntax = e || "proto2"
                }
                ,
                e = S.prototype = Object.create(T.prototype),
                e.getChildren = function(e) {
                    var t, n, s;
                    if (e = e || null,
                    null == e)
                        return this.children.slice();
                    for (t = [],
                    n = 0,
                    s = this.children.length; s > n; ++n)
                        this.children[n]instanceof e && t.push(this.children[n]);
                    return t
                }
                ,
                e.addChild = function(e) {
                    var t;
                    if (t = this.getChild(e.name))
                        if (t instanceof C.Field && t.name !== t.originalName && null === this.getChild(t.originalName))
                            t.name = t.originalName;
                        else {
                            if (!(e instanceof C.Field && e.name !== e.originalName && null === this.getChild(e.originalName)))
                                throw Error("Duplicate name in namespace " + this.toString(!0) + ": " + e.name);
                            e.name = e.originalName
                        }
                    this.children.push(e)
                }
                ,
                e.getChild = function(e) {
                    var t = "number" == typeof e ? "id" : "name", n, s;
                    for (n = 0,
                    s = this.children.length; s > n; ++n)
                        if (this.children[n][t] === e)
                            return this.children[n];
                    return null
                }
                ,
                e.resolve = function(t, n) {
                    var s = "string" == typeof t ? t.split(".") : t, i = this, r = 0, o;
                    if ("" === s[r]) {
                        for (; null !== i.parent; )
                            i = i.parent;
                        r++
                    }
                    do {
                        do {
                            if (!(i instanceof _.Namespace)) {
                                i = null;
                                break
                            }
                            if (o = i.getChild(s[r]),
                            !(o && o instanceof _.T && (!n || o instanceof _.Namespace))) {
                                i = null;
                                break
                            }
                            i = o,
                            r++
                        } while (r < s.length);if (null != i)
                            break;
                        if (null !== this.parent)
                            return this.parent.resolve(t, n)
                    } while (null != i);return i
                }
                ,
                e.qn = function(t) {
                    var n = [], s = t, i, r;
                    do
                        n.unshift(s.name),
                        s = s.parent;
                    while (null !== s);for (i = 1; i <= n.length; i++)
                        if (r = n.slice(n.length - i),
                        t === this.resolve(r, t instanceof _.Namespace))
                            return r.join(".");
                    return t.fqn()
                }
                ,
                e.build = function() {
                    var t = {}, n = this.children, s, i, r;
                    for (i = 0,
                    r = n.length; r > i; ++i)
                        s = n[i],
                        s instanceof S && (t[s.name] = s.build());
                    return Object.defineProperty && Object.defineProperty(t, "$options", {
                        value: this.buildOpt()
                    }),
                    t
                }
                ,
                e.buildOpt = function() {
                    var t = {}, n = Object.keys(this.options), s, i, r, o;
                    for (s = 0,
                    i = n.length; i > s; ++s)
                        r = n[s],
                        o = this.options[n[s]],
                        t[r] = o;
                    return t
                }
                ,
                e.getOption = function(e) {
                    return "undefined" == typeof e ? this.options : "undefined" == typeof this.options[e] ? null : this.options[e]
                }
                ,
                _.Namespace = S,
                I = function(t, n, s, i) {
                    if (this.type = t,
                    this.resolvedType = n,
                    this.isMapKey = s,
                    this.syntax = i,
                    s && 0 > E.MAP_KEY_TYPES.indexOf(t))
                        throw Error("Invalid map key type: " + t.name)
                }
                ,
                c = I.prototype,
                I.defaultFieldValue = a,
                c.verifyValue = function(t) {
                    var s = function(e, t) {
                        throw Error("Illegal value for " + this.toString(!0) + " of type " + this.type.name + ": " + e + " (" + t + ")")
                    }
                    .bind(this), e, i, r;
                    switch (this.type) {
                    case E.TYPES.int32:
                    case E.TYPES.sint32:
                    case E.TYPES.sfixed32:
                        return ("number" != typeof t || t === t && 0 != t % 1) && s(typeof t, "not an integer"),
                        4294967295 < t ? 0 | t : t;
                    case E.TYPES.uint32:
                    case E.TYPES.fixed32:
                        return ("number" != typeof t || t === t && 0 != t % 1) && s(typeof t, "not an integer"),
                        0 > t ? t >>> 0 : t;
                    case E.TYPES.int64:
                    case E.TYPES.sint64:
                    case E.TYPES.sfixed64:
                        if (E.Long)
                            try {
                                return f(t, !1)
                            } catch (n) {
                                s(typeof t, n.message)
                            }
                        else
                            s(typeof t, "requires Long.js");
                    case E.TYPES.uint64:
                    case E.TYPES.fixed64:
                        if (E.Long)
                            try {
                                return f(t, !0)
                            } catch (n) {
                                s(typeof t, n.message)
                            }
                        else
                            s(typeof t, "requires Long.js");
                    case E.TYPES.bool:
                        return "boolean" != typeof t && s(typeof t, "not a boolean"),
                        t;
                    case E.TYPES.float:
                    case E.TYPES.double:
                        return "number" != typeof t && s(typeof t, "not a number"),
                        t;
                    case E.TYPES.string:
                        return "string" == typeof t || t && t instanceof String || s(typeof t, "not a string"),
                        "" + t;
                    case E.TYPES.bytes:
                        return n.isByteBuffer(t) ? t : n.wrap(t);
                    case E.TYPES["enum"]:
                        for (e = this.resolvedType.getChildren(E.Reflect.Enum.Value),
                        r = 0; r < e.length; r++) {
                            if (e[r].name == t)
                                return e[r].id;
                            if (e[r].id == t)
                                return e[r].id
                        }
                        if ("proto3" === this.syntax)
                            return ("number" != typeof t || t === t && 0 != t % 1) && s(typeof t, "not an integer"),
                            (4294967295 < t || 0 > t) && s(typeof t, "not in range for uint32"),
                            t;
                        s(t, "not a valid enum value");
                    case E.TYPES.group:
                    case E.TYPES.message:
                        if (t && "object" == typeof t || s(typeof t, "object expected"),
                        t instanceof this.resolvedType.clazz)
                            return t;
                        if (t instanceof E.Builder.Message) {
                            for (r in i = {},
                            t)
                                t.hasOwnProperty(r) && (i[r] = t[r]);
                            t = i
                        }
                        return new this.resolvedType.clazz(t);
                    }
                    throw Error("[INTERNAL] Illegal value for " + this.toString(!0) + ": " + t + " (undefined type " + this.type + ")")
                }
                ,
                c.calculateLength = function(e, t) {
                    if (null === t)
                        return 0;
                    var n;
                    switch (this.type) {
                    case E.TYPES.int32:
                        return 0 > t ? o.calculateVarint64(t) : o.calculateVarint32(t);
                    case E.TYPES.uint32:
                        return o.calculateVarint32(t);
                    case E.TYPES.sint32:
                        return o.calculateVarint32(o.zigZagEncode32(t));
                    case E.TYPES.fixed32:
                    case E.TYPES.sfixed32:
                    case E.TYPES.float:
                        return 4;
                    case E.TYPES.int64:
                    case E.TYPES.uint64:
                        return o.calculateVarint64(t);
                    case E.TYPES.sint64:
                        return o.calculateVarint64(o.zigZagEncode64(t));
                    case E.TYPES.fixed64:
                    case E.TYPES.sfixed64:
                        return 8;
                    case E.TYPES.bool:
                        return 1;
                    case E.TYPES["enum"]:
                        return o.calculateVarint32(t);
                    case E.TYPES.double:
                        return 8;
                    case E.TYPES.string:
                        return n = o.calculateUTF8Bytes(t),
                        o.calculateVarint32(n) + n;
                    case E.TYPES.bytes:
                        if (0 > t.remaining())
                            throw Error("Illegal value for " + this.toString(!0) + ": " + t.remaining() + " bytes remaining");
                        return o.calculateVarint32(t.remaining()) + t.remaining();
                    case E.TYPES.message:
                        return n = this.resolvedType.calculate(t),
                        o.calculateVarint32(n) + n;
                    case E.TYPES.group:
                        return n = this.resolvedType.calculate(t),
                        n + o.calculateVarint32(e << 3 | E.WIRE_TYPES.ENDGROUP);
                    }
                    throw Error("[INTERNAL] Illegal value to encode in " + this.toString(!0) + ": " + t + " (unknown type)")
                }
                ,
                c.encodeValue = function(t, n, s) {
                    var i, r;
                    if (null === n)
                        return s;
                    switch (this.type) {
                    case E.TYPES.int32:
                        0 > n ? s.writeVarint64(n) : s.writeVarint32(n);
                        break;
                    case E.TYPES.uint32:
                        s.writeVarint32(n);
                        break;
                    case E.TYPES.sint32:
                        s.writeVarint32ZigZag(n);
                        break;
                    case E.TYPES.fixed32:
                        s.writeUint32(n);
                        break;
                    case E.TYPES.sfixed32:
                        s.writeInt32(n);
                        break;
                    case E.TYPES.int64:
                    case E.TYPES.uint64:
                        s.writeVarint64(n);
                        break;
                    case E.TYPES.sint64:
                        s.writeVarint64ZigZag(n);
                        break;
                    case E.TYPES.fixed64:
                        s.writeUint64(n);
                        break;
                    case E.TYPES.sfixed64:
                        s.writeInt64(n);
                        break;
                    case E.TYPES.bool:
                        "string" == typeof n ? s.writeVarint32("false" === n.toLowerCase() ? 0 : !!n) : s.writeVarint32(n ? 1 : 0);
                        break;
                    case E.TYPES["enum"]:
                        s.writeVarint32(n);
                        break;
                    case E.TYPES.float:
                        s.writeFloat32(n);
                        break;
                    case E.TYPES.double:
                        s.writeFloat64(n);
                        break;
                    case E.TYPES.string:
                        s.writeVString(n);
                        break;
                    case E.TYPES.bytes:
                        if (0 > n.remaining())
                            throw Error("Illegal value for " + this.toString(!0) + ": " + n.remaining() + " bytes remaining");
                        i = n.offset,
                        s.writeVarint32(n.remaining()),
                        s.append(n),
                        n.offset = i;
                        break;
                    case E.TYPES.message:
                        r = new o().LE(),
                        this.resolvedType.encode(n, r),
                        s.writeVarint32(r.offset),
                        s.append(r.flip());
                        break;
                    case E.TYPES.group:
                        this.resolvedType.encode(n, s),
                        s.writeVarint32(t << 3 | E.WIRE_TYPES.ENDGROUP);
                        break;
                    default:
                        throw Error("[INTERNAL] Illegal value to encode in " + this.toString(!0) + ": " + n + " (unknown type)");
                    }
                    return s
                }
                ,
                c.decode = function(t, n, s) {
                    if (n != this.type.wireType)
                        throw Error("Unexpected wire type for element");
                    var i, r;
                    switch (this.type) {
                    case E.TYPES.int32:
                        return 0 | t.readVarint32();
                    case E.TYPES.uint32:
                        return t.readVarint32() >>> 0;
                    case E.TYPES.sint32:
                        return 0 | t.readVarint32ZigZag();
                    case E.TYPES.fixed32:
                        return t.readUint32() >>> 0;
                    case E.TYPES.sfixed32:
                        return 0 | t.readInt32();
                    case E.TYPES.int64:
                        return t.readVarint64();
                    case E.TYPES.uint64:
                        return t.readVarint64().toUnsigned();
                    case E.TYPES.sint64:
                        return t.readVarint64ZigZag();
                    case E.TYPES.fixed64:
                        return t.readUint64();
                    case E.TYPES.sfixed64:
                        return t.readInt64();
                    case E.TYPES.bool:
                        return !!t.readVarint32();
                    case E.TYPES["enum"]:
                        return t.readVarint32();
                    case E.TYPES.float:
                        return t.readFloat();
                    case E.TYPES.double:
                        return t.readDouble();
                    case E.TYPES.string:
                        return t.readVString();
                    case E.TYPES.bytes:
                        if (r = t.readVarint32(),
                        t.remaining() < r)
                            throw Error("Illegal number of bytes for " + this.toString(!0) + ": " + r + " required but got only " + t.remaining());
                        return i = t.clone(),
                        i.limit = i.offset + r,
                        t.offset += r,
                        i;
                    case E.TYPES.message:
                        return r = t.readVarint32(),
                        this.resolvedType.decode(t, r);
                    case E.TYPES.group:
                        return this.resolvedType.decode(t, -1, s);
                    }
                    throw Error("[INTERNAL] Illegal decode type")
                }
                ,
                c.valueFromString = function(e) {
                    if (!this.isMapKey)
                        throw Error("valueFromString() called on non-map-key element");
                    switch (this.type) {
                    case E.TYPES.int32:
                    case E.TYPES.sint32:
                    case E.TYPES.sfixed32:
                    case E.TYPES.uint32:
                    case E.TYPES.fixed32:
                        return this.verifyValue(parseInt(e));
                    case E.TYPES.int64:
                    case E.TYPES.sint64:
                    case E.TYPES.sfixed64:
                    case E.TYPES.uint64:
                    case E.TYPES.fixed64:
                        return this.verifyValue(e);
                    case E.TYPES.bool:
                        return "true" === e;
                    case E.TYPES.string:
                        return this.verifyValue(e);
                    case E.TYPES.bytes:
                        return o.fromBinary(e);
                    }
                }
                ,
                c.valueToString = function(e) {
                    if (!this.isMapKey)
                        throw Error("valueToString() called on non-map-key element");
                    return this.type === E.TYPES.bytes ? e.toString("binary") : e.toString()
                }
                ,
                _.Element = I,
                C = function(t, n, s, i, r, e) {
                    S.call(this, t, n, s, i, e),
                    this.className = "Message",
                    this.extensions = void 0,
                    this.clazz = null,
                    this.isGroup = !!r,
                    this._fields = null,
                    this._fieldsById = null,
                    this._fieldsByName = null
                }
                ,
                R = C.prototype = Object.create(S.prototype),
                R.build = function(t) {
                    var s, i, r, a;
                    if (this.clazz && !t)
                        return this.clazz;
                    for (s = function(t, s) {
                        function r(s, u, p, d) {
                            var e, c, a, E, f, _, T;
                            if (null === s || "object" != typeof s)
                                return d && d instanceof t.Reflect.Enum && (e = t.Reflect.Enum.getName(d.object, s),
                                null !== e) ? e : s;
                            if (o.isByteBuffer(s))
                                return u ? s.toBase64() : s.toBuffer();
                            if (t.Long.isLong(s))
                                return p ? s.toString() : t.Long.fromValue(s);
                            if (Array.isArray(s))
                                return c = [],
                                s.forEach(function(e, t) {
                                    c[t] = r(e, u, p, d)
                                }),
                                c;
                            if (c = {},
                            s instanceof t.Map) {
                                for (a = s.entries(),
                                E = a.next(); !E.done; E = a.next())
                                    c[s.keyElem.valueToString(E.value[0])] = r(E.value[1], u, p, s.valueElem.resolvedType);
                                return c
                            }
                            for (T in f = s.$type,
                            _ = void 0,
                            s)
                                s.hasOwnProperty(T) && (c[T] = f && (_ = f.getChild(T)) ? r(s[T], u, p, _.resolvedType) : r(s[T], u, p));
                            return c
                        }
                        var a = s.getChildren(t.Reflect.Message.Field), d = s.getChildren(t.Reflect.Message.OneOf), e = function(n) {
                            var r, u, p, c;
                            for (t.Builder.Message.call(this),
                            r = 0,
                            u = d.length; u > r; ++r)
                                this[d[r].name] = null;
                            for (r = 0,
                            u = a.length; u > r; ++r)
                                p = a[r],
                                this[p.name] = p.repeated ? [] : p.map ? new t.Map(p) : null,
                                (p.required || "proto3" === s.syntax) && null !== p.defaultValue && (this[p.name] = p.defaultValue);
                            if (0 < arguments.length)
                                if (1 !== arguments.length || null === n || "object" != typeof n || !("function" != typeof n.encode || n instanceof e) || Array.isArray(n) || n instanceof t.Map || o.isByteBuffer(n) || n instanceof ArrayBuffer || t.Long && n instanceof t.Long)
                                    for (r = 0,
                                    u = arguments.length; u > r; ++r)
                                        "undefined" != typeof (c = arguments[r]) && this.$set(a[r].name, c);
                                else
                                    this.$set(n)
                        }, l = e.prototype = Object.create(t.Builder.Message.prototype), u, p;
                        for (l.add = function(n, i, r) {
                            var e = s._fieldsByName[n];
                            if (!r) {
                                if (!e)
                                    throw Error(this + "#" + n + " is undefined");
                                if (!(e instanceof t.Reflect.Message.Field))
                                    throw Error(this + "#" + n + " is not a field: " + e.toString(!0));
                                if (!e.repeated)
                                    throw Error(this + "#" + n + " is not a repeated field");
                                i = e.verifyValue(i, !0)
                            }
                            return null === this[n] && (this[n] = []),
                            this[n].push(i),
                            this
                        }
                        ,
                        l.$add = l.add,
                        l.set = function(n, i, r) {
                            var o, a, l;
                            if (n && "object" == typeof n) {
                                for (o in r = i,
                                n)
                                    n.hasOwnProperty(o) && "undefined" != typeof (i = n[o]) && this.$set(o, i, r);
                                return this
                            }
                            if (a = s._fieldsByName[n],
                            r)
                                this[n] = i;
                            else {
                                if (!a)
                                    throw Error(this + "#" + n + " is not a field: undefined");
                                if (!(a instanceof t.Reflect.Message.Field))
                                    throw Error(this + "#" + n + " is not a field: " + a.toString(!0));
                                this[a.name] = i = a.verifyValue(i)
                            }
                            return a && a.oneof && (l = this[a.oneof.name],
                            null === i ? l === n && (this[a.oneof.name] = null) : (null !== l && l !== a.name && (this[l] = null),
                            this[a.oneof.name] = a.name)),
                            this
                        }
                        ,
                        l.$set = l.set,
                        l.get = function(n, i) {
                            if (i)
                                return this[n];
                            var r = s._fieldsByName[n];
                            if (!(r && r instanceof t.Reflect.Message.Field))
                                throw Error(this + "#" + n + " is not a field: undefined");
                            if (!(r instanceof t.Reflect.Message.Field))
                                throw Error(this + "#" + n + " is not a field: " + r.toString(!0));
                            return this[r.name]
                        }
                        ,
                        l.$get = l.get,
                        u = 0; u < a.length; u++)
                            p = a[u],
                            p instanceof t.Reflect.Message.ExtensionField || s.builder.options.populateAccessors && function(t) {
                                var n = t.originalName.replace(/(_[a-zA-Z])/g, function(e) {
                                    return e.toUpperCase().replace("_", "")
                                }), i, r, o;
                                n = n.substring(0, 1).toUpperCase() + n.substring(1),
                                i = t.originalName.replace(/([A-Z])/g, function(e) {
                                    return "_" + e
                                }),
                                r = function(e, n) {
                                    return this[t.name] = n ? e : t.verifyValue(e),
                                    this
                                }
                                ,
                                o = function() {
                                    return this[t.name]
                                }
                                ,
                                null === s.getChild("set" + n) && (l["set" + n] = r),
                                null === s.getChild("set_" + i) && (l["set_" + i] = r),
                                null === s.getChild("get" + n) && (l["get" + n] = o),
                                null === s.getChild("get_" + i) && (l["get_" + i] = o)
                            }(p);
                        return l.encode = function(t, i) {
                            var r, o;
                            "boolean" == typeof t && (i = t,
                            t = void 0),
                            r = !1,
                            t || (t = new n,
                            r = !0),
                            o = t.littleEndian;
                            try {
                                return s.encode(this, t.LE(), i),
                                (r ? t.flip() : t).LE(o)
                            } catch (e) {
                                throw t.LE(o),
                                e
                            }
                        }
                        ,
                        e.encode = function(t, n, s) {
                            return new e(t).encode(n, s)
                        }
                        ,
                        l.calculate = function() {
                            return s.calculate(this)
                        }
                        ,
                        l.encodeDelimited = function(e) {
                            var t = !1, n;
                            return e || (e = new o,
                            t = !0),
                            n = new o().LE(),
                            s.encode(this, n).flip(),
                            e.writeVarint32(n.remaining()),
                            e.append(n),
                            t ? e.flip() : e
                        }
                        ,
                        l.encodeAB = function() {
                            try {
                                return this.encode().toArrayBuffer()
                            } catch (e) {
                                throw e.encoded && (e.encoded = e.encoded.toArrayBuffer()),
                                e
                            }
                        }
                        ,
                        l.toArrayBuffer = l.encodeAB,
                        l.encodeNB = function() {
                            try {
                                return this.encode().toBuffer()
                            } catch (e) {
                                throw e.encoded && (e.encoded = e.encoded.toBuffer()),
                                e
                            }
                        }
                        ,
                        l.toBuffer = l.encodeNB,
                        l.encode64 = function() {
                            try {
                                return this.encode().toBase64()
                            } catch (e) {
                                throw e.encoded && (e.encoded = e.encoded.toBase64()),
                                e
                            }
                        }
                        ,
                        l.toBase64 = l.encode64,
                        l.encodeHex = function() {
                            try {
                                return this.encode().toHex()
                            } catch (e) {
                                throw e.encoded && (e.encoded = e.encoded.toHex()),
                                e
                            }
                        }
                        ,
                        l.toHex = l.encodeHex,
                        l.toRaw = function(e, t) {
                            return r(this, !!e, !!t, this.$type)
                        }
                        ,
                        l.encodeJSON = function() {
                            return JSON.stringify(r(this, !0, !0, this.$type))
                        }
                        ,
                        e.decode = function(t, n) {
                            var i, r;
                            "string" == typeof t && (t = o.wrap(t, n ? n : "base64")),
                            t = o.isByteBuffer(t) ? t : o.wrap(t),
                            i = t.littleEndian;
                            try {
                                return r = s.decode(t.LE()),
                                t.LE(i),
                                r
                            } catch (e) {
                                throw t.LE(i),
                                e
                            }
                        }
                        ,
                        e.decodeDelimited = function(t, n) {
                            var i, r, l;
                            if ("string" == typeof t && (t = o.wrap(t, n ? n : "base64")),
                            t = o.isByteBuffer(t) ? t : o.wrap(t),
                            1 > t.remaining())
                                return null;
                            if (i = t.offset,
                            r = t.readVarint32(),
                            t.remaining() < r)
                                return t.offset = i,
                                null;
                            try {
                                return l = s.decode(t.slice(t.offset, t.offset + r).LE()),
                                t.offset += r,
                                l
                            } catch (e) {
                                throw t.offset += r,
                                e
                            }
                        }
                        ,
                        e.decode64 = function(t) {
                            return e.decode(t, "base64")
                        }
                        ,
                        e.decodeHex = function(t) {
                            return e.decode(t, "hex")
                        }
                        ,
                        e.decodeJSON = function(t) {
                            return new e(JSON.parse(t))
                        }
                        ,
                        l.toString = function() {
                            return s.toString()
                        }
                        ,
                        Object.defineProperty && (Object.defineProperty(e, "$options", {
                            value: s.buildOpt()
                        }),
                        Object.defineProperty(l, "$options", {
                            value: e.$options
                        }),
                        Object.defineProperty(e, "$type", {
                            value: s
                        }),
                        Object.defineProperty(l, "$type", {
                            value: s
                        })),
                        e
                    }(E, this),
                    this._fields = [],
                    this._fieldsById = {},
                    this._fieldsByName = {},
                    r = 0,
                    a = this.children.length; a > r; r++)
                        if (i = this.children[r],
                        i instanceof U || i instanceof C || i instanceof V) {
                            if (s.hasOwnProperty(i.name))
                                throw Error("Illegal reflect child of " + this.toString(!0) + ": " + i.toString(!0) + " cannot override static property '" + i.name + "'");
                            s[i.name] = i.build()
                        } else if (i instanceof C.Field)
                            i.build(),
                            this._fields.push(i),
                            this._fieldsById[i.id] = i,
                            this._fieldsByName[i.name] = i;
                        else if (!(i instanceof C.OneOf || i instanceof P))
                            throw Error("Illegal reflect child of " + this.toString(!0) + ": " + this.children[r].toString(!0));
                    return this.clazz = s
                }
                ,
                R.encode = function(t, n, s) {
                    var r = null, o, a, l, u, p;
                    for (l = 0,
                    u = this._fields.length; u > l; ++l)
                        o = this._fields[l],
                        a = t[o.name],
                        o.required && null === a ? null === r && (r = o) : o.encode(s ? a : o.verifyValue(a), n, t);
                    if (null !== r)
                        throw p = Error("Missing at least one required field for " + this.toString(!0) + ": " + r),
                        p.encoded = n,
                        p;
                    return n
                }
                ,
                R.calculate = function(t) {
                    for (var n = 0, s = 0, i = this._fields.length, r, o; i > s; ++s) {
                        if (r = this._fields[s],
                        o = t[r.name],
                        r.required && null === o)
                            throw Error("Missing at least one required field for " + this.toString(!0) + ": " + r);
                        n += r.calculate(o, t)
                    }
                    return n
                }
                ,
                R.decode = function(t, s, r) {
                    var o, a, d, u, _, T, S, I, y, C, R, O;
                    for (s = "number" == typeof s ? s : -1,
                    _ = t.offset,
                    T = new this.clazz; t.offset < _ + s || -1 === s && 0 < t.remaining(); ) {
                        if (o = t.readVarint32(),
                        a = 7 & o,
                        d = o >>> 3,
                        a === E.WIRE_TYPES.ENDGROUP) {
                            if (d !== r)
                                throw Error("Illegal group end indicator for " + this.toString(!0) + ": " + d + " (" + (r ? r + " expected" : "not a group") + ")");
                            break
                        }
                        if (u = this._fieldsById[d])
                            u.repeated && !u.options.packed ? T[u.name].push(u.decode(a, t)) : u.map ? (I = u.decode(a, t),
                            T[u.name].set(I[0], I[1])) : (T[u.name] = u.decode(a, t),
                            u.oneof && (y = T[u.oneof.name],
                            null !== y && y !== u.name && (T[y] = null),
                            T[u.oneof.name] = u.name));
                        else
                            switch (a) {
                            case E.WIRE_TYPES.VARINT:
                                t.readVarint32();
                                break;
                            case E.WIRE_TYPES.BITS32:
                                t.offset += 4;
                                break;
                            case E.WIRE_TYPES.BITS64:
                                t.offset += 8;
                                break;
                            case E.WIRE_TYPES.LDELIM:
                                S = t.readVarint32(),
                                t.offset += S;
                                break;
                            case E.WIRE_TYPES.STARTGROUP:
                                for (; l(d, t); )
                                    ;
                                break;
                            default:
                                throw Error("Illegal wire type for unknown field " + d + " in " + this.toString(!0) + "#decode: " + a);
                            }
                    }
                    for (C = 0,
                    R = this._fields.length; R > C; ++C)
                        if (u = this._fields[C],
                        null === T[u.name])
                            if ("proto3" === this.syntax)
                                T[u.name] = u.defaultValue;
                            else {
                                if (u.required)
                                    throw O = Error("Missing at least one required field for " + this.toString(!0) + ": " + u.name),
                                    O.decoded = T,
                                    O;
                                E.populateDefaults && null !== u.defaultValue && (T[u.name] = u.defaultValue)
                            }
                    return T
                }
                ,
                _.Message = C,
                O = function(t, n, s, e, r, o, a, i, d, u) {
                    T.call(this, t, n, o),
                    this.className = "Message.Field",
                    this.required = "required" === s,
                    this.repeated = "repeated" === s,
                    this.map = "map" === s,
                    this.keyType = e || null,
                    this.type = r,
                    this.resolvedType = null,
                    this.id = a,
                    this.options = i || {},
                    this.defaultValue = null,
                    this.oneof = d || null,
                    this.syntax = u || "proto2",
                    this.originalName = this.name,
                    this.element = null,
                    this.keyElement = null,
                    !this.builder.options.convertFieldsToCamelCase || this instanceof C.ExtensionField || (this.name = E.Util.toCamelCase(this.name))
                }
                ,
                N = O.prototype = Object.create(T.prototype),
                N.build = function() {
                    this.element = new I(this.type,this.resolvedType,!1,this.syntax),
                    this.map && (this.keyElement = new I(this.keyType,void 0,!0,this.syntax)),
                    "proto3" !== this.syntax || this.repeated || this.map ? "undefined" != typeof this.options["default"] && (this.defaultValue = this.verifyValue(this.options["default"])) : this.defaultValue = I.defaultFieldValue(this.type)
                }
                ,
                N.verifyValue = function(t, n) {
                    var s, i, r;
                    if (n = n || !1,
                    s = function(e, t) {
                        throw Error("Illegal value for " + this.toString(!0) + " of type " + this.type.name + ": " + e + " (" + t + ")")
                    }
                    .bind(this),
                    null === t)
                        return this.required && s(typeof t, "required"),
                        "proto3" === this.syntax && this.type !== E.TYPES.message && s(typeof t, "proto3 field without field presence cannot be null"),
                        null;
                    if (this.repeated && !n) {
                        for (Array.isArray(t) || (t = [t]),
                        r = [],
                        i = 0; i < t.length; i++)
                            r.push(this.element.verifyValue(t[i]));
                        return r
                    }
                    return this.map && !n ? t instanceof E.Map ? t : (t instanceof Object || s(typeof t, "expected ProtoBuf.Map or raw object for map field"),
                    new E.Map(this,t)) : (!this.repeated && Array.isArray(t) && s(typeof t, "no array expected"),
                    this.element.verifyValue(t))
                }
                ,
                N.hasWirePresence = function(e, t) {
                    if ("proto3" !== this.syntax)
                        return null !== e;
                    if (this.oneof && t[this.oneof.name] === this.name)
                        return !0;
                    switch (this.type) {
                    case E.TYPES.int32:
                    case E.TYPES.sint32:
                    case E.TYPES.sfixed32:
                    case E.TYPES.uint32:
                    case E.TYPES.fixed32:
                        return 0 !== e;
                    case E.TYPES.int64:
                    case E.TYPES.sint64:
                    case E.TYPES.sfixed64:
                    case E.TYPES.uint64:
                    case E.TYPES.fixed64:
                        return 0 !== e.low || 0 !== e.high;
                    case E.TYPES.bool:
                        return e;
                    case E.TYPES.float:
                    case E.TYPES.double:
                        return 0 !== e;
                    case E.TYPES.string:
                        return 0 < e.length;
                    case E.TYPES.bytes:
                        return 0 < e.remaining();
                    case E.TYPES["enum"]:
                        return 0 !== e;
                    case E.TYPES.message:
                        return null !== e;
                    default:
                        return !0;
                    }
                }
                ,
                N.encode = function(t, n, s) {
                    var r, a, d, l, u;
                    if (null === this.type || "object" != typeof this.type)
                        throw Error("[INTERNAL] Unresolved type in " + this.toString(!0) + ": " + this.type);
                    if (null === t || this.repeated && 0 == t.length)
                        return n;
                    try {
                        if (!this.repeated)
                            this.map ? t.forEach(function(e, t) {
                                var s = o.calculateVarint32(8 | this.keyType.wireType) + this.keyElement.calculateLength(1, t) + o.calculateVarint32(16 | this.type.wireType) + this.element.calculateLength(2, e);
                                n.writeVarint32(this.id << 3 | E.WIRE_TYPES.LDELIM),
                                n.writeVarint32(s),
                                n.writeVarint32(8 | this.keyType.wireType),
                                this.keyElement.encodeValue(1, t, n),
                                n.writeVarint32(16 | this.type.wireType),
                                this.element.encodeValue(2, e, n)
                            }, this) : this.hasWirePresence(t, s) && (n.writeVarint32(this.id << 3 | this.type.wireType),
                            this.element.encodeValue(this.id, t, n));
                        else if (this.options.packed && 0 <= E.PACKABLE_WIRE_TYPES.indexOf(this.type.wireType)) {
                            for (n.writeVarint32(this.id << 3 | E.WIRE_TYPES.LDELIM),
                            n.ensureCapacity(n.offset += 1),
                            a = n.offset,
                            r = 0; r < t.length; r++)
                                this.element.encodeValue(this.id, t[r], n);
                            d = n.offset - a,
                            l = o.calculateVarint32(d),
                            1 < l && (u = n.slice(a, n.offset),
                            a += l - 1,
                            n.offset = a,
                            n.append(u)),
                            n.writeVarint32(d, a - l)
                        } else
                            for (r = 0; r < t.length; r++)
                                n.writeVarint32(this.id << 3 | this.type.wireType),
                                this.element.encodeValue(this.id, t[r], n)
                    } catch (e) {
                        throw Error("Illegal value for " + this.toString(!0) + ": " + t + " (" + e + ")")
                    }
                    return n
                }
                ,
                N.calculate = function(t, n) {
                    var s, i, r;
                    if (t = this.verifyValue(t),
                    null === this.type || "object" != typeof this.type)
                        throw Error("[INTERNAL] Unresolved type in " + this.toString(!0) + ": " + this.type);
                    if (null === t || this.repeated && 0 == t.length)
                        return 0;
                    s = 0;
                    try {
                        if (!this.repeated)
                            this.map ? t.forEach(function(e, t) {
                                var n = o.calculateVarint32(8 | this.keyType.wireType) + this.keyElement.calculateLength(1, t) + o.calculateVarint32(16 | this.type.wireType) + this.element.calculateLength(2, e);
                                s += o.calculateVarint32(this.id << 3 | E.WIRE_TYPES.LDELIM),
                                s += o.calculateVarint32(n),
                                s += n
                            }, this) : this.hasWirePresence(t, n) && (s += o.calculateVarint32(this.id << 3 | this.type.wireType),
                            s += this.element.calculateLength(this.id, t));
                        else if (this.options.packed && 0 <= E.PACKABLE_WIRE_TYPES.indexOf(this.type.wireType)) {
                            for (s += o.calculateVarint32(this.id << 3 | E.WIRE_TYPES.LDELIM),
                            r = 0,
                            i = 0; i < t.length; i++)
                                r += this.element.calculateLength(this.id, t[i]);
                            s += o.calculateVarint32(r),
                            s += r
                        } else
                            for (i = 0; i < t.length; i++)
                                s += o.calculateVarint32(this.id << 3 | this.type.wireType),
                                s += this.element.calculateLength(this.id, t[i])
                    } catch (e) {
                        throw Error("Illegal value for " + this.toString(!0) + ": " + t + " (" + e + ")")
                    }
                    return s
                }
                ,
                N.decode = function(t, n, s) {
                    var i = !this.map && t == this.type.wireType || !s && this.repeated && this.options.packed && t == E.WIRE_TYPES.LDELIM || this.map && t == E.WIRE_TYPES.LDELIM, r, o, a, d, u, p, c;
                    if (!i)
                        throw Error("Illegal wire type for field " + this.toString(!0) + ": " + t + " (" + this.type.wireType + " expected)");
                    if (t == E.WIRE_TYPES.LDELIM && this.repeated && this.options.packed && 0 <= E.PACKABLE_WIRE_TYPES.indexOf(this.type.wireType) && !s) {
                        for (o = n.readVarint32(),
                        o = n.offset + o,
                        a = []; n.offset < o; )
                            a.push(this.decode(this.type.wireType, n, !0));
                        return a
                    }
                    if (this.map) {
                        if (d = I.defaultFieldValue(this.keyType),
                        r = I.defaultFieldValue(this.type),
                        o = n.readVarint32(),
                        n.remaining() < o)
                            throw Error("Illegal number of bytes for " + this.toString(!0) + ": " + o + " required but got only " + n.remaining());
                        for (u = n.clone(),
                        u.limit = u.offset + o,
                        n.offset += o; 0 < u.remaining(); )
                            if (p = u.readVarint32(),
                            t = 7 & p,
                            c = p >>> 3,
                            1 === c)
                                d = this.keyElement.decode(u, t, c);
                            else {
                                if (2 !== c)
                                    throw Error("Unexpected tag in map field key/value submessage");
                                r = this.element.decode(u, t, c)
                            }
                        return [d, r]
                    }
                    return this.element.decode(n, t, this.id)
                }
                ,
                _.Message.Field = O,
                M = function(t, n, s, i, r, e, o) {
                    O.call(this, t, n, s, null, i, r, e, o),
                    this.extension
                }
                ,
                M.prototype = Object.create(O.prototype),
                _.Message.ExtensionField = M,
                b = function(e, t, n) {
                    T.call(this, e, t, n),
                    this.fields = []
                }
                ,
                _.Message.OneOf = b,
                U = function(t, n, s, i, r) {
                    S.call(this, t, n, s, i, r),
                    this.className = "Enum",
                    this.object = null
                }
                ,
                U.getName = function(t, n) {
                    var s = Object.keys(t), i, r;
                    for (r = 0; r < s.length; ++r)
                        if (t[i = s[r]] === n)
                            return i;
                    return null
                }
                ,
                D = U.prototype = Object.create(S.prototype),
                D.build = function(t) {
                    var n, s, i, r;
                    if (this.object && !t)
                        return this.object;
                    for (n = new E.Builder.Enum,
                    s = this.getChildren(U.Value),
                    i = 0,
                    r = s.length; r > i; ++i)
                        n[s[i].name] = s[i].id;
                    return Object.defineProperty && Object.defineProperty(n, "$options", {
                        value: this.buildOpt(),
                        enumerable: !1
                    }),
                    this.object = n
                }
                ,
                _.Enum = U,
                L = function(t, n, s, i) {
                    T.call(this, t, n, s),
                    this.className = "Enum.Value",
                    this.id = i
                }
                ,
                L.prototype = Object.create(T.prototype),
                _.Enum.Value = L,
                P = function(t, n, s, i) {
                    T.call(this, t, n, s),
                    this.field = i
                }
                ,
                P.prototype = Object.create(T.prototype),
                _.Extension = P,
                V = function(e, t, n, s) {
                    S.call(this, e, t, n, s),
                    this.className = "Service",
                    this.clazz = null
                }
                ,
                k = V.prototype = Object.create(S.prototype),
                k.build = function(e) {
                    return this.clazz && !e ? this.clazz : this.clazz = function(t, n) {
                        var s = function(e) {
                            t.Builder.Service.call(this),
                            this.rpcImpl = e || function(e, t, n) {
                                setTimeout(n.bind(this, Error("Not implemented, see: https://github.com/dcodeIO/ProtoBuf.js/wiki/Services")), 0)
                            }
                        }, i = s.prototype = Object.create(t.Builder.Service.prototype), r = n.getChildren(t.Reflect.Service.RPCMethod), e;
                        for (e = 0; e < r.length; e++)
                            !function(t) {
                                i[t.name] = function(e, s) {
                                    try {
                                        try {
                                            e = t.resolvedRequestType.clazz.decode(o.wrap(e))
                                        } catch (t) {
                                            if (!(t instanceof TypeError))
                                                throw t
                                        }
                                        if (null === e || "object" != typeof e)
                                            throw Error("Illegal arguments");
                                        e instanceof t.resolvedRequestType.clazz || (e = new t.resolvedRequestType.clazz(e)),
                                        this.rpcImpl(t.fqn(), e, function(i, r) {
                                            if (i)
                                                return s(i),
                                                void 0;
                                            try {
                                                r = t.resolvedResponseType.clazz.decode(r)
                                            } catch (e) {}
                                            return r && r instanceof t.resolvedResponseType.clazz ? (s(null, r),
                                            void 0) : (s(Error("Illegal response type received in service method " + n.name + "#" + t.name)),
                                            void 0)
                                        })
                                    } catch (t) {
                                        setTimeout(s.bind(this, t), 0)
                                    }
                                }
                                ,
                                s[t.name] = function(n, i, r) {
                                    new s(n)[t.name](i, r)
                                }
                                ,
                                Object.defineProperty && (Object.defineProperty(s[t.name], "$options", {
                                    value: t.buildOpt()
                                }),
                                Object.defineProperty(i[t.name], "$options", {
                                    value: s[t.name].$options
                                }))
                            }(r[e]);
                        return Object.defineProperty && (Object.defineProperty(s, "$options", {
                            value: n.buildOpt()
                        }),
                        Object.defineProperty(i, "$options", {
                            value: s.$options
                        }),
                        Object.defineProperty(s, "$type", {
                            value: n
                        }),
                        Object.defineProperty(i, "$type", {
                            value: n
                        })),
                        s
                    }(E, this)
                }
                ,
                _.Service = V,
                F = function(t, n, s, i) {
                    T.call(this, t, n, s),
                    this.className = "Service.Method",
                    this.options = i || {}
                }
                ,
                G = F.prototype = Object.create(T.prototype),
                G.buildOpt = e.buildOpt,
                _.Service.Method = F,
                K = function(t, n, s, i, r, e, o, a) {
                    F.call(this, t, n, s, a),
                    this.className = "Service.RPCMethod",
                    this.requestName = i,
                    this.responseName = r,
                    this.requestStream = e,
                    this.responseStream = o,
                    this.resolvedRequestType = null,
                    this.resolvedResponseType = null
                }
                ,
                K.prototype = Object.create(F.prototype),
                _.Service.RPCMethod = K,
                _
            }(r),
            r.Builder = function(t, n, s) {
                function r(e) {
                    e.messages && e.messages.forEach(function(t) {
                        t.syntax = e.syntax,
                        r(t)
                    }),
                    e.enums && e.enums.forEach(function(t) {
                        t.syntax = e.syntax
                    })
                }
                var o = function(e) {
                    this.ns = new s.Namespace(this,null,""),
                    this.ptr = this.ns,
                    this.resolved = !1,
                    this.result = null,
                    this.files = {},
                    this.importRoot = null,
                    this.options = e || {}
                }
                  , i = o.prototype;
                return o.isMessage = function(e) {
                    return "string" == typeof e.name && "undefined" == typeof e.values && "undefined" == typeof e.rpc
                }
                ,
                o.isMessageField = function(e) {
                    return "string" == typeof e.rule && "string" == typeof e.name && "string" == typeof e.type && "undefined" != typeof e.id
                }
                ,
                o.isEnum = function(e) {
                    return "string" == typeof e.name && !!("undefined" != typeof e.values && Array.isArray(e.values) && 0 !== e.values.length)
                }
                ,
                o.isService = function(e) {
                    return !!("string" == typeof e.name && "object" == typeof e.rpc && e.rpc)
                }
                ,
                o.isExtend = function(e) {
                    return "string" == typeof e.ref
                }
                ,
                i.reset = function() {
                    return this.ptr = this.ns,
                    this
                }
                ,
                i.define = function(e) {
                    if ("string" != typeof e || !n.TYPEREF.test(e))
                        throw Error("illegal namespace: " + e);
                    return e.split(".").forEach(function(e) {
                        var t = this.ptr.getChild(e);
                        null === t && this.ptr.addChild(t = new s.Namespace(this,this.ptr,e)),
                        this.ptr = t
                    }, this),
                    this
                }
                ,
                i.create = function(n) {
                    var r, d, l, u, p;
                    if (!n)
                        return this;
                    if (Array.isArray(n)) {
                        if (0 === n.length)
                            return this;
                        n = n.slice()
                    } else
                        n = [n];
                    for (r = [n]; 0 < r.length; ) {
                        if (n = r.pop(),
                        !Array.isArray(n))
                            throw Error("not a valid namespace: " + JSON.stringify(n));
                        for (; 0 < n.length; ) {
                            if (d = n.shift(),
                            o.isMessage(d)) {
                                if (l = new s.Message(this,this.ptr,d.name,d.options,d.isGroup,d.syntax),
                                u = {},
                                d.oneofs && Object.keys(d.oneofs).forEach(function(e) {
                                    l.addChild(u[e] = new s.Message.OneOf(this,l,e))
                                }, this),
                                d.fields && d.fields.forEach(function(e) {
                                    if (null !== l.getChild(0 | e.id))
                                        throw Error("duplicate or invalid field id in " + l.name + ": " + e.id);
                                    if (e.options && "object" != typeof e.options)
                                        throw Error("illegal field options in " + l.name + "#" + e.name);
                                    var t = null;
                                    if ("string" == typeof e.oneof && !(t = u[e.oneof]))
                                        throw Error("illegal oneof in " + l.name + "#" + e.name + ": " + e.oneof);
                                    e = new s.Message.Field(this,l,e.rule,e.keytype,e.type,e.name,e.id,e.options,t,d.syntax),
                                    t && t.fields.push(e),
                                    l.addChild(e)
                                }, this),
                                p = [],
                                d.enums && d.enums.forEach(function(e) {
                                    p.push(e)
                                }),
                                d.messages && d.messages.forEach(function(e) {
                                    p.push(e)
                                }),
                                d.services && d.services.forEach(function(e) {
                                    p.push(e)
                                }),
                                d.extensions && (l.extensions = "number" == typeof d.extensions[0] ? [d.extensions] : d.extensions),
                                this.ptr.addChild(l),
                                0 < p.length) {
                                    r.push(n),
                                    n = p,
                                    p = null,
                                    this.ptr = l,
                                    l = null;
                                    continue
                                }
                                p = null
                            } else if (o.isEnum(d))
                                l = new s.Enum(this,this.ptr,d.name,d.options,d.syntax),
                                d.values.forEach(function(e) {
                                    l.addChild(new s.Enum.Value(this,l,e.name,e.id))
                                }, this),
                                this.ptr.addChild(l);
                            else if (o.isService(d))
                                l = new s.Service(this,this.ptr,d.name,d.options),
                                Object.keys(d.rpc).forEach(function(e) {
                                    var t = d.rpc[e];
                                    l.addChild(new s.Service.RPCMethod(this,l,e,t.request,t.response,!!t.request_stream,!!t.response_stream,t.options))
                                }, this),
                                this.ptr.addChild(l);
                            else {
                                if (!o.isExtend(d))
                                    throw Error("not a valid definition: " + JSON.stringify(d));
                                if (l = this.ptr.resolve(d.ref, !0))
                                    d.fields.forEach(function(n) {
                                        var i, r, o, a;
                                        if (null !== l.getChild(0 | n.id))
                                            throw Error("duplicate extended field id in " + l.name + ": " + n.id);
                                        if (l.extensions && (i = !1,
                                        l.extensions.forEach(function(e) {
                                            n.id >= e[0] && n.id <= e[1] && (i = !0)
                                        }),
                                        !i))
                                            throw Error("illegal extended field id in " + l.name + ": " + n.id + " (not within valid ranges)");
                                        r = n.name,
                                        this.options.convertFieldsToCamelCase && (r = t.Util.toCamelCase(r)),
                                        o = new s.Message.ExtensionField(this,l,n.rule,n.type,this.ptr.fqn() + "." + r,n.id,n.options),
                                        a = new s.Extension(this,this.ptr,n.name,o),
                                        o.extension = a,
                                        this.ptr.addChild(a),
                                        l.addChild(o)
                                    }, this);
                                else if (!/\.?google\.protobuf\./.test(d.ref))
                                    throw Error("extended message " + d.ref + " is not defined")
                            }
                            d = null,
                            l = null
                        }
                        n = null,
                        this.ptr = this.ptr.parent
                    }
                    return this.resolved = !1,
                    this.result = null,
                    this
                }
                ,
                i["import"] = function(n, s) {
                    var o = "/", a, u, p, E, f, _, T, S;
                    if ("string" == typeof s) {
                        if (t.Util.IS_NODE,
                        !0 === this.files[s])
                            return this.reset();
                        this.files[s] = !0
                    } else if ("object" == typeof s) {
                        if (a = s.root,
                        t.Util.IS_NODE,
                        (0 <= a.indexOf("\\") || 0 <= s.file.indexOf("\\")) && (o = "\\"),
                        u = a + o + s.file,
                        !0 === this.files[u])
                            return this.reset();
                        this.files[u] = !0
                    }
                    if (n.imports && 0 < n.imports.length) {
                        for (E = !1,
                        "object" == typeof s ? (this.importRoot = s.root,
                        E = !0,
                        p = this.importRoot,
                        s = s.file,
                        (0 <= p.indexOf("\\") || 0 <= s.indexOf("\\")) && (o = "\\")) : "string" == typeof s ? this.importRoot ? p = this.importRoot : 0 <= s.indexOf("/") ? (p = s.replace(/\/[^\/]*$/, ""),
                        "" === p && (p = "/")) : 0 <= s.indexOf("\\") ? (p = s.replace(/\\[^\\]*$/, ""),
                        o = "\\") : p = "." : p = null,
                        f = 0; f < n.imports.length; f++)
                            if ("string" == typeof n.imports[f]) {
                                if (!p)
                                    throw Error("cannot determine import root");
                                if (_ = n.imports[f],
                                "google/protobuf/descriptor.proto" === _)
                                    continue;
                                if (_ = p + o + _,
                                !0 === this.files[_])
                                    continue;
                                if (/\.proto$/i.test(_) && !t.DotProto && (_ = _.replace(/\.proto$/, ".json")),
                                T = t.Util.fetch(_),
                                null === T)
                                    throw Error("failed to import '" + _ + "' in '" + s + "': file not found");
                                /\.json$/i.test(_) ? this["import"](JSON.parse(T + ""), _) : this["import"](t.DotProto.Parser.parse(T), _)
                            } else
                                s ? /\.(\w+)$/.test(s) ? this["import"](n.imports[f], s.replace(/^(.+)\.(\w+)$/, function(e, t, n) {
                                    return t + "_import" + f + "." + n
                                })) : this["import"](n.imports[f], s + "_import" + f) : this["import"](n.imports[f]);
                        E && (this.importRoot = null)
                    }
                    return n["package"] && this.define(n["package"]),
                    n.syntax && r(n),
                    S = this.ptr,
                    n.options && Object.keys(n.options).forEach(function(e) {
                        S.options[e] = n.options[e]
                    }),
                    n.messages && (this.create(n.messages),
                    this.ptr = S),
                    n.enums && (this.create(n.enums),
                    this.ptr = S),
                    n.services && (this.create(n.services),
                    this.ptr = S),
                    n["extends"] && this.create(n["extends"]),
                    this.reset()
                }
                ,
                i.resolveAll = function() {
                    var e;
                    if (null == this.ptr || "object" == typeof this.ptr.type)
                        return this;
                    if (this.ptr instanceof s.Namespace)
                        this.ptr.children.forEach(function(e) {
                            this.ptr = e,
                            this.resolveAll()
                        }, this);
                    else if (this.ptr instanceof s.Message.Field) {
                        if (n.TYPE.test(this.ptr.type))
                            this.ptr.type = t.TYPES[this.ptr.type];
                        else {
                            if (!n.TYPEREF.test(this.ptr.type))
                                throw Error("illegal type reference in " + this.ptr.toString(!0) + ": " + this.ptr.type);
                            if (e = (this.ptr instanceof s.Message.ExtensionField ? this.ptr.extension.parent : this.ptr.parent).resolve(this.ptr.type, !0),
                            !e)
                                throw Error("unresolvable type reference in " + this.ptr.toString(!0) + ": " + this.ptr.type);
                            if (this.ptr.resolvedType = e,
                            !(e instanceof s.Enum)) {
                                if (!(e instanceof s.Message))
                                    throw Error("illegal type reference in " + this.ptr.toString(!0) + ": " + this.ptr.type);
                                this.ptr.type = e.isGroup ? t.TYPES.group : t.TYPES.message
                            } else if (this.ptr.type = t.TYPES["enum"],
                            "proto3" === this.ptr.syntax && "proto3" !== e.syntax)
                                throw Error("proto3 message cannot reference proto2 enum")
                        }
                        if (this.ptr.map) {
                            if (!n.TYPE.test(this.ptr.keyType))
                                throw Error("illegal key type for map field in " + this.ptr.toString(!0) + ": " + this.ptr.keyType);
                            this.ptr.keyType = t.TYPES[this.ptr.keyType]
                        }
                    } else if (this.ptr instanceof t.Reflect.Service.Method) {
                        if (!(this.ptr instanceof t.Reflect.Service.RPCMethod))
                            throw Error("illegal service type in " + this.ptr.toString(!0));
                        if (e = this.ptr.parent.resolve(this.ptr.requestName, !0),
                        !(e && e instanceof t.Reflect.Message))
                            throw Error("Illegal type reference in " + this.ptr.toString(!0) + ": " + this.ptr.requestName);
                        if (this.ptr.resolvedRequestType = e,
                        e = this.ptr.parent.resolve(this.ptr.responseName, !0),
                        !(e && e instanceof t.Reflect.Message))
                            throw Error("Illegal type reference in " + this.ptr.toString(!0) + ": " + this.ptr.responseName);
                        this.ptr.resolvedResponseType = e
                    } else if (!(this.ptr instanceof t.Reflect.Message.OneOf || this.ptr instanceof t.Reflect.Extension || this.ptr instanceof t.Reflect.Enum.Value))
                        throw Error("illegal object in namespace: " + typeof this.ptr + ": " + this.ptr);
                    return this.reset()
                }
                ,
                i.build = function(e) {
                    var t, n, s;
                    if (this.reset(),
                    this.resolved || (this.resolveAll(),
                    this.resolved = !0,
                    this.result = null),
                    null === this.result && (this.result = this.ns.build()),
                    !e)
                        return this.result;
                    for (t = "string" == typeof e ? e.split(".") : e,
                    n = this.result,
                    s = 0; s < t.length; s++) {
                        if (!n[t[s]]) {
                            n = null;
                            break
                        }
                        n = n[t[s]]
                    }
                    return n
                }
                ,
                i.lookup = function(e, t) {
                    return e ? this.ns.resolve(e, t) : this.ns
                }
                ,
                i.toString = function() {
                    return "Builder"
                }
                ,
                o.Message = function() {}
                ,
                o.Enum = function() {}
                ,
                o.Service = function() {}
                ,
                o
            }(r, r.Lang, r.Reflect),
            r.Map = function(t, n) {
                function s(e) {
                    var t = 0;
                    return {
                        next: function() {
                            return t < e.length ? {
                                done: !1,
                                value: e[t++]
                            } : {
                                done: !0
                            }
                        }
                    }
                }
                var e = function(t, s) {
                    var i, r, o, a;
                    if (!t.map)
                        throw Error("field is not a map");
                    if (this.field = t,
                    this.keyElem = new n.Element(t.keyType,null,!0,t.syntax),
                    this.valueElem = new n.Element(t.type,t.resolvedType,!1,t.syntax),
                    this.map = {},
                    Object.defineProperty(this, "size", {
                        get: function() {
                            return Object.keys(this.map).length
                        }
                    }),
                    s)
                        for (i = Object.keys(s),
                        r = 0; r < i.length; r++)
                            o = this.keyElem.valueFromString(i[r]),
                            a = this.valueElem.verifyValue(s[i[r]]),
                            this.map[this.keyElem.valueToString(o)] = {
                                key: o,
                                value: a
                            }
                }
                  , i = e.prototype;
                return i.clear = function() {
                    this.map = {}
                }
                ,
                i["delete"] = function(e) {
                    var t = this.keyElem.valueToString(this.keyElem.verifyValue(e))
                      , n = t in this.map;
                    return delete this.map[t],
                    n
                }
                ,
                i.entries = function() {
                    var e = [], t = Object.keys(this.map), n, i;
                    for (i = 0; i < t.length; i++)
                        e.push([(n = this.map[t[i]]).key, n.value]);
                    return s(e)
                }
                ,
                i.keys = function() {
                    var e = [], t = Object.keys(this.map), n;
                    for (n = 0; n < t.length; n++)
                        e.push(this.map[t[n]].key);
                    return s(e)
                }
                ,
                i.values = function() {
                    var e = [], t = Object.keys(this.map), n;
                    for (n = 0; n < t.length; n++)
                        e.push(this.map[t[n]].value);
                    return s(e)
                }
                ,
                i.forEach = function(t, n) {
                    var s = Object.keys(this.map), i, r;
                    for (r = 0; r < s.length; r++)
                        t.call(n, (i = this.map[s[r]]).value, i.key, this)
                }
                ,
                i.set = function(e, t) {
                    var n = this.keyElem.verifyValue(e)
                      , s = this.valueElem.verifyValue(t);
                    return this.map[this.keyElem.valueToString(n)] = {
                        key: n,
                        value: s
                    },
                    this
                }
                ,
                i.get = function(e) {
                    var t = this.keyElem.valueToString(this.keyElem.verifyValue(e));
                    return t in this.map ? this.map[t].value : void 0
                }
                ,
                i.has = function(e) {
                    var t = this.keyElem.valueToString(this.keyElem.verifyValue(e));
                    return t in this.map
                }
                ,
                e
            }(r, r.Reflect),
            r.loadProto = function(e, t, n) {
                return ("string" == typeof t || t && "string" == typeof t.file && "string" == typeof t.root) && (n = t,
                t = void 0),
                r.loadJson(r.DotProto.Parser.parse(e), t, n)
            }
            ,
            r.protoFromString = r.loadProto,
            r.loadProtoFile = function(e, t, n) {
                if (t && "object" == typeof t ? (n = t,
                t = null) : t && "function" == typeof t || (t = null),
                t)
                    return r.Util.fetch("string" == typeof e ? e : e.root + "/" + e.file, function(s) {
                        if (null === s)
                            return t(Error("Failed to fetch file")),
                            void 0;
                        try {
                            t(null, r.loadProto(s, n, e))
                        } catch (e) {
                            t(e)
                        }
                    });
                var s = r.Util.fetch("object" == typeof e ? e.root + "/" + e.file : e);
                return null === s ? null : r.loadProto(s, n, e)
            }
            ,
            r.protoFromFile = r.loadProtoFile,
            r.newBuilder = function(e) {
                return e = e || {},
                "undefined" == typeof e.convertFieldsToCamelCase && (e.convertFieldsToCamelCase = r.convertFieldsToCamelCase),
                "undefined" == typeof e.populateAccessors && (e.populateAccessors = r.populateAccessors),
                new r.Builder(e)
            }
            ,
            r.loadJson = function(e, t, n) {
                return ("string" == typeof t || t && "string" == typeof t.file && "string" == typeof t.root) && (n = t,
                t = null),
                t && "object" == typeof t || (t = r.newBuilder()),
                "string" == typeof e && (e = JSON.parse(e)),
                t["import"](e, n),
                t.resolveAll(),
                t
            }
            ,
            r.loadJsonFile = function(e, t, n) {
                if (t && "object" == typeof t ? (n = t,
                t = null) : t && "function" == typeof t || (t = null),
                t)
                    return r.Util.fetch("string" == typeof e ? e : e.root + "/" + e.file, function(s) {
                        if (null === s)
                            return t(Error("Failed to fetch file")),
                            void 0;
                        try {
                            t(null, r.loadJson(JSON.parse(s), n, e))
                        } catch (e) {
                            t(e)
                        }
                    });
                var s = r.Util.fetch("object" == typeof e ? e.root + "/" + e.file : e);
                return null === s ? null : r.loadJson(JSON.parse(s), n, e)
            }
            ,
            e = t,
            a = r.loadProto(e, void 0, "").build("Modules").probuf
        }(i, p, e), e;
        return o
    }
    var T = "3.0.7"
      , S = {
        TIMEOUT: {
            code: -1,
            msg: "Network timeout"
        },
        SDK_INTERNAL_ERROR: {
            code: -2,
            msg: "SDK internal error"
        },
        PARAMETER_ERROR: {
            code: -3,
            msg: "Please check the parameters, the {param} expected a value of {expect} but received {current}"
        },
        REJECTED_BY_BLACKLIST: {
            code: 405,
            msg: "Blacklisted by the other party"
        },
        SEND_TOO_FAST: {
            code: 20604,
            msg: "Sending messages too quickly"
        },
        NOT_IN_GROUP: {
            code: 22406,
            msg: "Not in group"
        },
        FORBIDDEN_IN_GROUP: {
            code: 22408,
            msg: "Forbbiden from speaking in the group"
        },
        NOT_IN_CHATROOM: {
            code: 23406,
            msg: "Not in chatRoom"
        },
        FORBIDDEN_IN_CHATROOM: {
            code: 23408,
            msg: "Forbbiden from speaking in the chatRoom"
        },
        KICKED_FROM_CHATROOM: {
            code: 23409,
            msg: "Kicked out and forbbiden from joining the chatRoom"
        },
        CHATROOM_NOT_EXIST: {
            code: 23410,
            msg: "ChatRoom does not exist"
        },
        CHATROOM_IS_FULL: {
            code: 23411,
            msg: "ChatRoom members exceeded"
        },
        PARAMETER_INVALID_CHATROOM: {
            code: 23412,
            msg: "Invalid chatRoom parameters"
        },
        ROAMING_SERVICE_UNAVAILABLE_CHATROOM: {
            code: 23414,
            msg: "ChatRoom message roaming service is not open, Please go to the developer to open this service"
        },
        RECALLMESSAGE_PARAMETER_INVALID: {
            code: 25101,
            msg: "Invalid recall message parameter"
        },
        PUSHSETTING_PARAMETER_INVALID: {
            code: 26001,
            msg: "Invalid push parameter"
        },
        OPERATION_BLOCKED: {
            code: 20605,
            msg: "Operation is blocked"
        },
        OPERATION_NOT_SUPPORT: {
            code: 20606,
            msg: "Operation is not supported"
        },
        MSG_BLOCKED_SENSITIVE_WORD: {
            code: 21501,
            msg: "The sent message contains sensitive words"
        },
        REPLACED_SENSITIVE_WORD: {
            code: 21502,
            msg: "Sensitive words in the message have been replaced"
        },
        NOT_CONNECTED: {
            code: 30001,
            msg: "Please connect successfully first"
        },
        NAVI_REQUEST_ERROR: {
            code: 30007,
            msg: "Navigation http request failed"
        },
        CMP_REQUEST_ERROR: {
            code: 30010,
            msg: "CMP sniff http request failed"
        },
        MSG_CONTENT_EXCEED_LIMIT: {
            code: 30016,
            msg: "Message content size exceeds limit"
        },
        CONN_APPKEY_FAKE: {
            code: 31002,
            msg: "Your appkey is fake"
        },
        CONN_MINI_SERVICE_NOT_OPEN: {
            code: 31003,
            msg: "Mini program service is not open, Please go to the developer to open this service"
        },
        CONN_ACK_TIMEOUT: {
            code: 31e3,
            msg: "Connection ACK timeout"
        },
        CONN_TOKEN_INCORRECT: {
            code: 31004,
            msg: "Your token is not valid or expired"
        },
        CONN_NOT_AUTHRORIZED: {
            code: 31005,
            msg: "AppKey and Token do not match"
        },
        CONN_REDIRECTED: {
            code: 31006,
            msg: "Connection redirection"
        },
        CONN_APP_BLOCKED_OR_DELETED: {
            code: 31008,
            msg: "AppKey is banned or deleted"
        },
        CONN_USER_BLOCKED: {
            code: 31009,
            msg: "User blocked"
        },
        CONN_DOMAIN_INCORRECT: {
            code: 31012,
            msg: "Connect domain error, Please check the set security domain"
        },
        ROAMING_SERVICE_UNAVAILABLE: {
            code: 33007,
            msg: "Roaming service cloud is not open, Please go to the developer to open this service"
        },
        RC_CONNECTION_EXIST: {
            code: 34001,
            msg: "Connection already exists"
        },
        CHATROOM_KV_EXCEED: {
            code: 23423,
            msg: "ChatRoom KV setting exceeds maximum"
        },
        CHATROOM_KV_OVERWRITE_INVALID: {
            code: 23424,
            msg: "ChatRoom KV already exists"
        },
        CHATROOM_KV_STORE_NOT_OPEN: {
            code: 23426,
            msg: "ChatRoom KV storage service is not open, Please go to the developer to open this service"
        },
        CHATROOM_KEY_NOT_EXIST: {
            code: 23427,
            msg: "ChatRoom key does not exist"
        },
        MSG_KV_NOT_SUPPORT: {
            code: 34008,
            msg: "The message cannot be extended"
        },
        SEND_MESSAGE_KV_FAIL: {
            code: 34009,
            msg: "Sending RC expansion message fail"
        },
        EXPANSION_LIMIT_EXCEET: {
            code: 34010,
            msg: "The message expansion size is beyond the limit"
        },
        ILLGAL_PARAMS: {
            code: 33003,
            msg: "Incorrect parameters passed in while calling the interface"
        }
    }
      , I = {}
      , y = {};
    for (var C in S) {
        var h = S[C]
          , R = h.code;
        I[C] = R,
        I[R] = C,
        y[R] = h
    }
    var O = {
        1: S.ROAMING_SERVICE_UNAVAILABLE.code
    }, N = {
        401: S.CONN_TOKEN_INCORRECT,
        403: S.CONN_APPKEY_FAKE
    }, v = {
        CONNECTED: 0,
        CONNECTING: 1,
        DISCONNECTED: 2,
        NETWORK_UNAVAILABLE: 3,
        SOCKET_ERROR: 4,
        KICKED_OFFLINE_BY_OTHER_CLIENT: 6,
        BLOCKED: 12
    }, A = {
        KICKED_OFFLINE_BY_OTHER_CLIENT: 1,
        BLOCKED: 2
    }, M = {
        IDENTIFIER_REJECTED: 2,
        CONN_MINI_SERVICE_NOT_OPEN: 3,
        TOKEN_INCORRECT: 4,
        NOT_AUTHORIZED: 5,
        REDIRECT: 6,
        PACKAGE_ERROR: 7,
        APP_BLOCK_OR_DELETE: 8,
        BLOCK: 9,
        TOKEN_EXPIRE: 10,
        DEVICE_ERROR: 11,
        DOMAIN_INCORRECT: 12
    }, b = {
        CONNECTED: v.CONNECTED,
        KICKED_OFFLINE_BY_OTHER_CLIENT: v.KICKED_OFFLINE_BY_OTHER_CLIENT,
        BLOCKED: v.BLOCKED,
        CLOSE_NORMAL: 1e3,
        CLOSE_GOING_AWAY: 1001,
        CLOSE_PROTOCOL_ERROR: 1002,
        CLOSE_UNSUPPORTED: 1003,
        CLOSE_NO_STATUS: 1005,
        CLOSE_ABNORMAL: 1006,
        UNSUPPORTED_DATA: 1007,
        POLICY_VIOLATION: 1008,
        CLOSE_TOO_LARGE: 1009,
        MISSING_EXTENSION: 1010,
        INTERNAL_ERROR: 1011,
        SERVICE_RESTART: 1012,
        TRY_AGAIN_LATER: 1013,
        TSL_HANDSHAKE: 1015,
        PING_FIRST_TIMEOUT: 2001,
        PING_TIMEOUT: 2002,
        DISCONNECT_TOO_FAST: 2003,
        EXCEED_MESSAGE_ID_LIMIT: 2004,
        COMET_REQUEST_ERROR: 2005,
        MINI_URL_NOT_IN_DOMAIN_LIST: 2006,
        CMP_CONNECTION_TIMEOUT: 2007
    }, U = (Ve = {},
    Ve[M.IDENTIFIER_REJECTED] = S.CONN_APPKEY_FAKE,
    Ve[M.CONN_MINI_SERVICE_NOT_OPEN] = S.CONN_MINI_SERVICE_NOT_OPEN,
    Ve[M.TOKEN_INCORRECT] = S.CONN_TOKEN_INCORRECT,
    Ve[M.NOT_AUTHORIZED] = S.CONN_NOT_AUTHRORIZED,
    Ve[M.REDIRECT] = S.CONN_REDIRECTED,
    Ve[M.APP_BLOCK_OR_DELETE] = S.CONN_APP_BLOCKED_OR_DELETED,
    Ve[M.BLOCK] = S.CONN_USER_BLOCKED,
    Ve[M.TOKEN_EXPIRE] = S.CONN_TOKEN_INCORRECT,
    Ve[M.DOMAIN_INCORRECT] = S.CONN_DOMAIN_INCORRECT,
    Ve[b.CMP_CONNECTION_TIMEOUT] = S.CONN_ACK_TIMEOUT,
    Ve), D = {
        "url not in domain list": b.MINI_URL_NOT_IN_DOMAIN_LIST
    }, L = (ke = {},
    ke[A.KICKED_OFFLINE_BY_OTHER_CLIENT] = b.KICKED_OFFLINE_BY_OTHER_CLIENT,
    ke[A.BLOCKED] = b.BLOCKED,
    ke), P = [b.CLOSE_NORMAL, b.CLOSE_GOING_AWAY, b.CLOSE_PROTOCOL_ERROR, b.CLOSE_UNSUPPORTED, b.UNSUPPORTED_DATA, b.POLICY_VIOLATION, b.MISSING_EXTENSION, b.INTERNAL_ERROR, b.SERVICE_RESTART, b.TRY_AGAIN_LATER, b.TSL_HANDSHAKE, b.PING_FIRST_TIMEOUT, b.DISCONNECT_TOO_FAST, b.COMET_REQUEST_ERROR], w = P.concat([b.PING_TIMEOUT, b.CLOSE_ABNORMAL, b.EXCEED_MESSAGE_ID_LIMIT, b.COMET_REQUEST_ERROR]), x = (Fe = {},
    Fe[b.CLOSE_GOING_AWAY] = v.SOCKET_ERROR,
    Fe[b.CLOSE_PROTOCOL_ERROR] = v.SOCKET_ERROR,
    Fe[b.CLOSE_UNSUPPORTED] = v.SOCKET_ERROR,
    Fe[b.CLOSE_NO_STATUS] = v.DISCONNECTED,
    Fe[b.CLOSE_ABNORMAL] = v.NETWORK_UNAVAILABLE,
    Fe[b.DISCONNECT_TOO_FAST] = v.NETWORK_UNAVAILABLE,
    Fe[b.UNSUPPORTED_DATA] = v.SOCKET_ERROR,
    Fe[b.POLICY_VIOLATION] = v.SOCKET_ERROR,
    Fe[b.CLOSE_TOO_LARGE] = v.SOCKET_ERROR,
    Fe[b.MISSING_EXTENSION] = v.SOCKET_ERROR,
    Fe[b.INTERNAL_ERROR] = v.SOCKET_ERROR,
    Fe[b.SERVICE_RESTART] = v.SOCKET_ERROR,
    Fe[b.TRY_AGAIN_LATER] = v.SOCKET_ERROR,
    Fe[b.TSL_HANDSHAKE] = v.SOCKET_ERROR,
    Fe[b.PING_FIRST_TIMEOUT] = v.NETWORK_UNAVAILABLE,
    Fe[b.PING_TIMEOUT] = v.NETWORK_UNAVAILABLE,
    Fe[b.COMET_REQUEST_ERROR] = v.NETWORK_UNAVAILABLE,
    Fe), V = {
        COMET: "comet",
        WEBSOCKET: "websocket"
    }, k = {
        PRIVATE: 1,
        GROUP: 3,
        CHATROOM: 4,
        CUSTOMER_SERVICE: 5,
        SYSTEM: 6,
        RTC_ROOM: 12
    }, F = {
        SEND: 1,
        RECEIVE: 2
    }, B = {
        DESC: 0,
        ASC: 1
    }, G = {
        ASC: 1,
        DESC: 2
    }, K = "RC:RcCmd", Y = {
        ALL: 1,
        SINGAL: 2
    }, q = {
        TEXT: "RC:TxtMsg",
        VOICE: "RC:VcMsg",
        HQ_VOICE: "RC:HQVCMsg",
        IMAGE: "RC:ImgMsg",
        GIF: "RC:GIFMsg",
        RICH_CONTENT: "RC:ImgTextMsg",
        LOCATION: "RC:LBSMsg",
        FILE: "RC:FileMsg",
        SIGHT: "RC:SightMsg",
        COMBINE: "RC:CombineMsg",
        CHRM_KV_NOTIFY: "RC:chrmKVNotiMsg",
        LOG_COMMAND: "RC:LogCmdMsg",
        EXPANSION_NOTIFY: "RC:MsgExMsg",
        REFERENCE: "RC:ReferenceMsg"
    }, H = {
        ROOM: 1,
        PERSON: 2
    }, j = {
        IMAGE: 1,
        AUDIO: 2,
        VIDEO: 3,
        FILE: 4
    }, Q = {
        UPDATE: 1,
        DELETE: 2
    }, W = {
        DO_NOT_DISTURB: 1,
        NOTIFY: 2
    }, J = {
        READ: 1,
        LISTENED: 2,
        DOWNLOADED: 4,
        RETRIEVED: 8,
        UNREAD: 0
    }, X = 45e3, z = 6e3, Z = 2e3, $ = "@", ee = ",", te = {
        MAX: 128,
        MIN: 1
    }, ne = {
        MAX: 4096,
        MIN: 1
    }, se = [k.PRIVATE, k.GROUP, k.SYSTEM], ie = {
        WEB: "web",
        WX: "wx",
        ZFB: "zfb",
        TT: "tt",
        BAIDU: "baidu",
        QUICK_APP: "quick_app",
        UNI: "uni"
    }, re = {
        POST: "post",
        GET: "get"
    }, oe = "rc-", ae = oe + "deviceId", de = oe + "sessionId", le = {
        ROOT_KEY_TPL: "nav-{appkey}-{UID}",
        SUB_KEY: {
            CONNECT_TYPE: "connettype",
            TIME_WHEN_SAVED: "time",
            RESPONSE: "resp"
        }
    }, ge = {
        ROOT_KEY_TPL: "sync-{appkey}-{userId}",
        SUB_KEY: {
            SENDBOX: "send",
            INBOX: "in"
        }
    }, ue = {
        ROOT_KEY_TPL: "sync-{appkey}-{userId}",
        SUB_KEY: {
            TIME: "t"
        }
    }, pe = {
        ROOT_KEY_TPL: "con-{appkey}-{userId}",
        SUB_KEY: {
            ROOT_TPL: "{type}-{id}",
            UNREAD_COUNT: "c",
            UNREAD_LAST_TIME: "t",
            HAS_MENTIOND: "hm",
            MENTIOND_INFO: "m",
            NOTIFICATION: "no",
            TOP: "to"
        }
    }, ce = {
        ROOT_KEY_TPL: "con-s-{appkey}-{userId}",
        SUB_KEY: {
            TIME: "t"
        }
    }, me = {
        ROOT_KEY_TPL: "sett-{appkey}-{userId}",
        SUB_KEY: {
            VERSION: "v",
            SETTINGS: "s"
        }
    }, Ee = {
        HTTP: "http:",
        HTTPS: "https:",
        FILE: "file:"
    }, fe = {
        WSS: "wss:",
        WS: "ws:"
    }, _e = "getServerEndpoint", Te = {
        COMET: "cometnavi",
        WEBSOCKET: "navi"
    }, Se = {
        INTERVAL: "interval",
        TIMEOUT: "timeout"
    }, Ie = {
        PENNDING: "pendding",
        BUSY: "busy",
        ENDING: "ending"
    }, ye = {
        MINI: "MiniProgram",
        WEB: "Web"
    }, Ce = {
        ROOT_KEY_TPL: "sync-chrm-{appkey}-{userId}"
    }, he = ["RC:VCAccept", "RC:VCRinging", "RC:VCSummary", "RC:VCHangup", "RC:VCInvite", "RC:VCModifyMedia", "RC:VCModifyMem"], Re = {
        TOTAL: 300,
        MSG: 20,
        KEY: 32,
        VALUE: 64
    }, Oe = "UnKown", Ne = function(e) {
        for (var t = ["canIUse", "getSystemInfo"], n = 0, s = t.length, r; n < s; n++)
            if (r = t[n],
            !e[r])
                return !1;
        return !0
    }, ve = function() {
        return !!("undefined" != typeof uni && Ne(uni))
    }(), Ae = !1, Me = function(e) {
        return !Ae && e !== window
    }, be = function(e, t) {
        t || Ae || e.Object.create || (e.Object.create = function(e, t) {
            function n() {}
            if ("object" != typeof e && "function" != typeof e)
                throw new TypeError("Object prototype may only be an Object: " + e);
            else if (null === e)
                throw new Error("This browser's implementation of Object.create is a shim and doesn't support 'null' as the first argument.");
            if ("undefined" != typeof t)
                throw new Error("This browser's implementation of Object.create is a shim and doesn't support a second argument.");
            return n.prototype = e,
            new n
        }
        )
    }, Ue = ve ? function() {
        var e = process.env.VUE_APP_PLATFORM;
        return "app-plus" === e ? (Ae = !0,
        {
            platform: ie.UNI,
            global: uni
        }) : "mp-baidu" === e ? {
            platform: ie.BAIDU,
            global: swan
        } : "mp-toutiao" === e ? {
            platform: ie.TT,
            global: tt
        } : "mp-alipay" === e ? {
            platform: ie.ZFB,
            global: my
        } : "mp-weixin" === e ? {
            platform: ie.WX,
            global: wx
        } : "h5" === e ? {
            platform: ie.WEB,
            global: window
        } : {
            platform: "not included platform",
            global: window
        }
    }() : function() {
        return "undefined" != typeof swan && Ne(swan) ? {
            platform: ie.BAIDU,
            global: swan
        } : "undefined" != typeof tt && Ne(tt) ? {
            platform: ie.TT,
            global: tt
        } : "undefined" != typeof my && Ne(my) ? {
            platform: ie.ZFB,
            global: my
        } : "undefined" != typeof wx && Ne(wx) ? {
            platform: ie.WX,
            global: wx
        } : {
            platform: ie.WEB,
            global: window
        }
    }(), De = Ue.platform, Le = Ue.global, Pe = Me(Le), we = function(e) {
        var t = e.location || {}
          , n = t.protocol === Ee.HTTP || t.protocol === Ee.FILE
          , s = {
            http: n ? Ee.HTTP : Ee.HTTPS,
            ws: fe.WSS
        };
        return n && (s.ws = fe.WS),
        s
    }(Le), xe = Pe || Ae ? function(e) {
        var t = e.getSystemInfoSync() || {}
          , n = t.model
          , s = t.brand;
        return n && s && (n = n + " " + s),
        t.model = n,
        t
    }(Le) : function() {
        var e = navigator.userAgent, t = {
            IE: /rv:([\d.]+)\) like Gecko|MSIE ([\d.]+)/,
            Edge: /Edge\/([\d.]+)/,
            Firefox: /Firefox\/([\d.]+)/,
            Opera: /(?:OPERA|OPR).([\d.]+)/,
            WeiXin: /MicroMessenger\/([\d.]+)/,
            QQBrowser: /QQBrowser\/([\d.]+)/,
            Chrome: /Chrome\/([\d.]+)/,
            Safari: /Version\/([\d.]+).*Safari/
        }, n, s;
        for (var i in t)
            if (t.hasOwnProperty(i)) {
                var r = e.match(t[i]);
                if (r) {
                    s = i,
                    n = r[1] || r[2];
                    break
                }
            }
        return {
            model: s || Oe,
            version: n || Oe
        }
    }(), Ve, ke, Fe;
    xe.name = De,
    be(Le, Pe),
    Le = Pe || Ae ? function(e) {
        return Object.assign(e, {
            JSON: JSON,
            Promise: Promise,
            setTimeout: setTimeout,
            setInterval: setInterval,
            encodeURIComponent: encodeURIComponent,
            clearTimeout: function(e) {
                function t() {
                    return e.apply(this, arguments)
                }
                return t.toString = function() {
                    return e.toString()
                }
                ,
                t
            }(function(e) {
                clearTimeout(e)
            }),
            clearInterval: function(e) {
                function t() {
                    return e.apply(this, arguments)
                }
                return t.toString = function() {
                    return e.toString()
                }
                ,
                t
            }(function(e) {
                clearInterval(e)
            })
        })
    }(Le) : Le;
    var Be = {
        global: Le,
        system: xe,
        isMini: Pe,
        protocol: we,
        isAppPlus: Ae,
        isFromUniapp: ve
    }, Ge = Be.global, Ke = Be.system, Ye = Ke.name === ie.ZFB, qe = function() {
        function e() {}
        var t = e.prototype;
        return t.set = function(e, t) {
            Ge.setStorageSync({
                key: e,
                data: t
            })
        }
        ,
        t.get = function(e) {
            return Ge.getStorageSync({
                key: e
            })
        }
        ,
        t.remove = function(e) {
            return Ge.removeStorageSync({
                key: e
            })
        }
        ,
        t.getKeys = function() {
            var e = my.getStorageInfoSync();
            return e.keys
        }
        ,
        e
    }(), He = function() {
        function e() {}
        var t = e.prototype;
        return t.set = function(e, t) {
            Ge.setStorageSync(e, t)
        }
        ,
        t.get = function(e) {
            try {
                return Ge.getStorageSync(e)
            } catch (t) {
                return null
            }
        }
        ,
        t.remove = function(e) {
            try {
                return Ge.removeStorageSync(e)
            } catch (t) {
                return null
            }
        }
        ,
        t.getKeys = function() {
            try {
                var e = Ge.getStorageInfoSync();
                return e.keys
            } catch (t) {
                return []
            }
        }
        ,
        e
    }(), je = Ye ? qe : He, Qe = {
        parse: function(e) {
            return new Function("","return (" + e + ")")()
        },
        stringify: function(e) {
            return Qe.str("", {
                "": e
            })
        },
        str: function(e, t) {
            var n = t[e], s = Qe, r, o, a, d, l;
            switch (n && "object" == typeof n && "function" == typeof n.toJSON && (n = n.toJSON(e)),
            typeof n) {
            case "string":
                return s.quote(n);
            case "number":
                return isFinite(n) ? n + "" : "null";
            case "boolean":
                return n + "";
            case "object":
                if (!n)
                    return "null";
                if (l = [],
                "[object Array]" === Object.prototype.toString.apply(n)) {
                    for (d = n.length,
                    r = 0; r < d; r += 1)
                        l[r] = s.str(r, n) || "null";
                    return a = 0 === l.length ? "[]" : "[" + l.join(",") + "]",
                    a
                }
                for (o in n)
                    Object.prototype.hasOwnProperty.call(n, o) && (a = s.str(o, n),
                    a && l.push(s.quote(o) + ":" + a));
                return a = 0 === l.length ? "{}" : "{" + l.join(",") + "}",
                a;
            }
        },
        quote: function(e) {
            var t = Qe;
            return t.rx_escapable.lastIndex = 0,
            t.rx_escapable.test(e) ? "\"" + e.replace(t.rx_escapable, function(e) {
                var n = t.meta[e];
                return "string" == typeof n ? n : "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4)
            }) + "\"" : "\"" + e + "\""
        },
        rx_escapable: /[\"\\"\0--­؀-؄܏឴឵‌-‏\u2028- ⁠-⁯﻿￰-￿]/g,
        meta: {
            "": "\\b",
            "	": "\\t",
            "\n": "\\n",
            "": "\\f",
            "\r": "\\r",
            '"': "\\\"",
            "''": "\\''",
            "\\": "\\\\"
        }
    }, We = function() {
        function e(e) {
            this.caches = {},
            e && (this.caches = e)
        }
        var t = e.prototype;
        return t.set = function(e, t) {
            this.caches[e] = t
        }
        ,
        t.remove = function(e) {
            var t = this.get(e);
            return delete this.caches[e],
            t
        }
        ,
        t.get = function(e) {
            return this.caches[e]
        }
        ,
        t.getKeys = function() {
            var e = [];
            for (var t in this.caches)
                e.push(t);
            return e
        }
        ,
        e
    }(), Je = Be.global, Xe = "RC_TEST_KEY", ze = "RC_TEST_VALUE", Ze = function() {
        function e() {}
        var t = e.prototype;
        return t.set = function(e, t) {
            Je.localStorage.setItem(e, Qe.stringify({
                d: t
            }))
        }
        ,
        t.get = function(e) {
            var t = Je.localStorage.getItem(e), n;
            try {
                t = Qe.parse(t)
            } catch (n) {
                t = {}
            }
            return t && t.d && (n = t.d),
            n
        }
        ,
        t.remove = function(e) {
            return Je.localStorage.removeItem(e)
        }
        ,
        t.getKeys = function() {
            var e = [];
            for (var t in Je.localStorage)
                e.push(t);
            return e
        }
        ,
        e
    }(), $e = function() {
        var e = !1
          , t = Je.localStorage;
        if (t)
            try {
                t.setItem(Xe, ze);
                var n = t.getItem(Xe);
                n === ze && (e = !0),
                t.removeItem(Xe)
            } catch (t) {}
        return e
    }() ? Ze : We, et = Be.isMini, nt = Be.isAppPlus, st = et || nt ? je : $e, it = new st, rt = Be.global, ot = "RC_TEST_KEY", at = "RC_TEST_VALUE", dt = function() {
        function e() {}
        var t = e.prototype;
        return t.set = function(e, t) {
            rt.sessionStorage.setItem(e, Qe.stringify({
                d: t
            }))
        }
        ,
        t.get = function(e) {
            var t = rt.sessionStorage.getItem(e), n;
            try {
                t = Qe.parse(t)
            } catch (n) {
                t = {}
            }
            return t && t.d && (n = t.d),
            n
        }
        ,
        t.remove = function(e) {
            return rt.sessionStorage.removeItem(e)
        }
        ,
        t.getKeys = function() {
            var e = [];
            for (var t in rt.sessionStorage)
                e.push(t);
            return e
        }
        ,
        e
    }(), lt = function() {
        var e = !1
          , t = rt.sessionStorage;
        if (t)
            try {
                t.setItem(ot, at);
                var n = t.getItem(ot);
                n === at && (e = !0),
                t.removeItem(ot)
            } catch (t) {}
        return e
    }() ? dt : We, gt = Be.isMini, ut = Be.isAppPlus, pt = gt || ut ? We : lt, ct = new pt, mt = Be.global, Et = Be.isAppPlus, ft = function() {
        function e(e) {
            this.socket = void 0,
            Et && (e.complete = function() {}
            ),
            this.socket = mt.connectSocket(e)
        }
        var t = e.prototype;
        return t.send = function(e) {
            this.socket.send({
                data: e
            })
        }
        ,
        t.close = function() {
            this.socket.close()
        }
        ,
        t.onOpen = function(e) {
            this.socket.onOpen(e)
        }
        ,
        t.onMessage = function(e) {
            this.socket.onMessage(e)
        }
        ,
        t.onError = function(e) {
            this.socket.onError(e)
        }
        ,
        t.onClose = function(e) {
            this.socket.onClose(e)
        }
        ,
        e
    }(), _t = function() {
        function e(e) {
            this.socket = void 0;
            var t = e.url;
            return this.socket = new WebSocket(t),
            this.socket.binaryType = "arraybuffer",
            this
        }
        var t = e.prototype;
        return t.send = function(e) {
            return this.socket.send(e)
        }
        ,
        t.close = function() {
            this.socket.close()
        }
        ,
        t.onOpen = function(e) {
            this.socket.addEventListener("open", e)
        }
        ,
        t.onMessage = function(e) {
            this.socket.addEventListener("message", e)
        }
        ,
        t.onError = function(e) {
            this.socket.addEventListener("error", e)
        }
        ,
        t.onClose = function(e) {
            this.socket.addEventListener("close", e)
        }
        ,
        e
    }(), Tt = Be.isMini, St = Be.isAppPlus, It = Tt || St ? ft : _t, yt = function() {
        function e(e) {
            var t = typeof e;
            return null !== e && ("object" === t || "function" === t)
        }
        function k(e) {
            return "function" == typeof e
        }
        function d() {
            return "undefined" == typeof j ? c() : function() {
                j(i)
            }
        }
        function a() {
            var e = 0
              , t = new ne(i)
              , n = document.createTextNode("");
            return t.observe(n, {
                characterData: !0
            }),
            function() {
                n.data = e = ++e % 2
            }
        }
        function c() {
            var e = setTimeout;
            return function() {
                return e(i, 1)
            }
        }
        function i() {
            var e, t, n;
            for (e = 0; H > e; e += 2)
                t = re[e],
                n = re[e + 1],
                t(n),
                re[e] = void 0,
                re[e + 1] = void 0;
            H = 0
        }
        function h(t, n) {
            var s = this, i = new this.constructor(m), r, o;
            return void 0 === i[ae] && C(i),
            r = s._state,
            r ? (o = arguments[r - 1],
            z(function() {
                return q(r, i, o, s._result)
            })) : x(s, i, t, n),
            i
        }
        function l(e) {
            var n = this, s;
            return e && "object" == typeof e && e.constructor === n ? e : (s = new n(m),
            t(s, e),
            s)
        }
        function m() {}
        function n() {
            return new TypeError("You cannot resolve a promise with itself")
        }
        function o() {
            return new TypeError("A promises callback cannot return that same promise.")
        }
        function p(e, t, n, s) {
            try {
                e.call(t, n, s)
            } catch (t) {
                return t
            }
        }
        function f(e, n, s) {
            z(function(i) {
                var r = !1
                  , o = p(s, n, function(e) {
                    r || (r = !0,
                    n === e ? v(i, e) : t(i, e))
                }, function(e) {
                    r || (r = !0,
                    w(i, e))
                }, "Settle: " + (i._label || " unknown promise"));
                !r && o && (r = !0,
                w(i, o))
            }, e)
        }
        function r(e, n) {
            n._state === le ? v(e, n._result) : n._state === ge ? w(e, n._result) : x(n, void 0, function(n) {
                return t(e, n)
            }, function(t) {
                return w(e, t)
            })
        }
        function s(e, t, n) {
            t.constructor === e.constructor && n === h && t.constructor.resolve === l ? r(e, t) : void 0 === n ? v(e, t) : k(n) ? f(e, t, n) : v(e, t)
        }
        function t(t, i) {
            if (t === i)
                w(t, n());
            else if (e(i)) {
                var r;
                try {
                    r = i.then
                } catch (n) {
                    return void w(t, n)
                }
                s(t, i, r)
            } else
                v(t, i)
        }
        function u(e) {
            e._onerror && e._onerror(e._result),
            y(e)
        }
        function v(e, t) {
            e._state === de && (e._result = t,
            e._state = le,
            0 !== e._subscribers.length && z(y, e))
        }
        function w(e, t) {
            e._state === de && (e._state = ge,
            e._result = t,
            z(u, e))
        }
        function x(t, n, s, i) {
            var r = t._subscribers
              , e = r.length;
            t._onerror = null,
            r[e] = n,
            r[e + le] = s,
            r[e + ge] = i,
            0 === e && t._state && z(y, t)
        }
        function y(t) {
            var n = t._subscribers, s = t._state, i, r, o, a;
            if (0 !== n.length) {
                for (i = void 0,
                r = void 0,
                o = t._result,
                a = 0; a < n.length; a += 3)
                    i = n[a],
                    r = n[a + s],
                    i ? q(s, i, r, o) : r(o);
                t._subscribers.length = 0
            }
        }
        function q(n, s, r, a) {
            var e = k(r), d = !0, l, u;
            if (e) {
                try {
                    l = r(a)
                } catch (e) {
                    d = !1,
                    u = e
                }
                if (s === l)
                    return void w(s, o())
            } else
                l = a;
            s._state !== de || (e && d ? t(s, l) : !1 === d ? w(s, u) : n === le ? v(s, l) : n === ge && w(s, l))
        }
        function A(e, n) {
            try {
                n(function(n) {
                    t(e, n)
                }, function(t) {
                    w(e, t)
                })
            } catch (t) {
                w(e, t)
            }
        }
        function B() {
            return ue++
        }
        function C(e) {
            e[ae] = ue++,
            e._state = void 0,
            e._result = void 0,
            e._subscribers = []
        }
        function D() {
            return new Error("Array Methods must be provided an Array")
        }
        function E(e) {
            return new pe(this,e).promise
        }
        function b(t) {
            var n = this;
            return new n(K(t) ? function(s, i) {
                for (var r = t.length, e = 0; r > e; e++)
                    n.resolve(t[e]).then(s, i)
            }
            : function(e, t) {
                return t(new TypeError("You must pass an array to race."))
            }
            )
        }
        function F() {
            throw new TypeError("You must pass a resolver function as the first argument to the promise constructor")
        }
        function I() {
            throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.")
        }
        function G() {
            var e, t, n;
            if ("undefined" != typeof global)
                n = global;
            else if ("undefined" != typeof self)
                n = self;
            else
                try {
                    n = Function("return this")()
                } catch (e) {
                    throw new Error("polyfill failed because global object is unavailable in this environment")
                }
            if (e = n.Promise) {
                t = null;
                try {
                    t = Object.prototype.toString.call(e.resolve())
                } catch (e) {}
                if ("[object Promise]" === t && !e.cast)
                    return
            }
            n.Promise = ce
        }
        var K, H, j, J, z, ee, te, ne, se, ie, re, oe, ae, de, le, ge, ue, pe, ce, me;
        return me = Array.isArray ? Array.isArray : function(e) {
            return "[object Array]" === Object.prototype.toString.call(e)
        }
        ,
        K = me,
        H = 0,
        j = void 0,
        J = void 0,
        z = function(e, t) {
            re[H] = e,
            re[H + 1] = t,
            H += 2,
            2 === H && (J ? J(i) : oe())
        }
        ,
        ee = "undefined" == typeof window ? void 0 : window,
        te = ee || {},
        ne = te.MutationObserver || te.WebKitMutationObserver,
        se = "undefined" == typeof self && "undefined" != typeof process && "[object process]" === {}.toString.call(process),
        ie = "undefined" != typeof Uint8ClampedArray && "undefined" != typeof importScripts && "undefined" != typeof MessageChannel,
        re = Array(1e3),
        oe = void 0,
        oe = se ? function() {
            return function() {
                return process.nextTick(i)
            }
        }() : ne ? a() : ie ? function() {
            var e = new MessageChannel;
            return e.port1.onmessage = i,
            function() {
                return e.port2.postMessage(0)
            }
        }() : void 0 === ee && "function" == typeof require ? function() {
            try {
                var e = Function("return this")().require("vertx");
                return j = e.runOnLoop || e.runOnContext,
                d()
            } catch (e) {
                return c()
            }
        }() : c(),
        ae = Math.random().toString(36).substring(2),
        de = void 0,
        le = 1,
        ge = 2,
        ue = 0,
        pe = function() {
            function e(e, t) {
                this._instanceConstructor = e,
                this.promise = new e(m),
                this.promise[ae] || C(this.promise),
                K(t) ? (this.length = t.length,
                this._remaining = t.length,
                this._result = Array(this.length),
                0 === this.length ? v(this.promise, this._result) : (this.length = this.length || 0,
                this._enumerate(t),
                0 === this._remaining && v(this.promise, this._result))) : w(this.promise, D())
            }
            return e.prototype._enumerate = function(e) {
                for (var t = 0; this._state === de && t < e.length; t++)
                    this._eachEntry(e[t], t)
            }
            ,
            e.prototype._eachEntry = function(t, n) {
                var r = this._instanceConstructor, o = r.resolve, a, d, u, p;
                if (o === l) {
                    a = void 0,
                    d = void 0,
                    u = !1;
                    try {
                        a = t.then
                    } catch (e) {
                        u = !0,
                        d = e
                    }
                    a === h && t._state !== de ? this._settledAt(t._state, n, t._result) : "function" == typeof a ? r === ce ? (p = new r(m),
                    u ? w(p, d) : s(p, t, a),
                    this._willSettleAt(p, n)) : this._willSettleAt(new r(function(e) {
                        return e(t)
                    }
                    ), n) : (this._remaining--,
                    this._result[n] = t)
                } else
                    this._willSettleAt(o(t), n)
            }
            ,
            e.prototype._settledAt = function(e, t, n) {
                var s = this.promise;
                s._state === de && (this._remaining--,
                e === ge ? w(s, n) : this._result[t] = n),
                0 === this._remaining && v(s, this._result)
            }
            ,
            e.prototype._willSettleAt = function(e, t) {
                var n = this;
                x(e, void 0, function(e) {
                    return n._settledAt(le, t, e)
                }, function(e) {
                    return n._settledAt(ge, t, e)
                })
            }
            ,
            e
        }(),
        ce = function() {
            function e(t) {
                this[ae] = B(),
                this._result = this._state = void 0,
                this._subscribers = [],
                m !== t && ("function" != typeof t && F(),
                this instanceof e ? A(this, t) : I())
            }
            return e.prototype["catch"] = function(e) {
                return this.then(null, e)
            }
            ,
            e.prototype["finally"] = function(e) {
                var t = this
                  , n = t.constructor;
                return k(e) ? t.then(function(t) {
                    return n.resolve(e()).then(function() {
                        return t
                    })
                }, function(t) {
                    return n.resolve(e()).then(function() {
                        throw t
                    })
                }) : t.then(e, e)
            }
            ,
            e
        }(),
        ce.prototype.then = h,
        ce.all = E,
        ce.race = b,
        ce.resolve = l,
        ce.reject = function(e) {
            var t = this
              , n = new t(m);
            return w(n, e),
            n
        }
        ,
        ce._setScheduler = function(e) {
            J = e
        }
        ,
        ce._setAsap = function(e) {
            z = e
        }
        ,
        ce._asap = z,
        ce.polyfill = G,
        ce.Promise = ce,
        ce
    }(), Ct = Be.global, ht = Be.global, Rt = function(e) {
        return "[object XDomainRequest]" === Object.prototype.toString.call(e) || "object" == typeof XDomainRequest
    }, Ot = function(e) {
        return "function" == typeof e || "object" == typeof e
    }, Nt = function() {
        var e = {
            XMLHttpRequest: function(e) {
                function t() {
                    return e.apply(this, arguments)
                }
                return t.toString = function() {
                    return e.toString()
                }
                ,
                t
            }(function() {
                return new XMLHttpRequest
            }),
            XDomainRequest: function(e) {
                function t() {
                    return e.apply(this, arguments)
                }
                return t.toString = function() {
                    return e.toString()
                }
                ,
                t
            }(function() {
                return new XDomainRequest
            }),
            ActiveXObject: function(e) {
                function t() {
                    return e.apply(this, arguments)
                }
                return t.toString = function() {
                    return e.toString()
                }
                ,
                t
            }(function() {
                return new ActiveXObject("Microsoft.XMLHTTP")
            })
        }
          , t = Ot(ht.XMLHttpRequest) && "withCredentials"in new XMLHttpRequest
          , n = Ot(ht.XDomainRequest)
          , s = t ? "XMLHttpRequest" : n ? "XDomainRequest" : "ActiveXObject";
        return e[s]()
    }, vt = function(e) {
        var t = e.url
          , n = e.method
          , s = e.body
          , i = e.headers
          , r = e.success
          , o = e.fail
          , a = e.timeout;
        n = n || re.GET;
        var d = Nt();
        if (d.open(n, t),
        i && d.setRequestHeader)
            for (var l in i)
                d.setRequestHeader(l, i[l]);
        return "onload"in d ? (d.onload = function() {
            r(d.responseText, d)
        }
        ,
        d.onerror = function() {
            o(d.responseText, d)
        }
        ) : d.onreadystatechange = function() {
            if (4 === d.readyState) {
                var e = d.responseText
                  , t = d.status;
                0 === t ? o(e, d, t) : r(e, d, t)
            }
        }
        ,
        "ontimeout"in d && (d.ontimeout = function() {
            o(d.responseText, d)
        }
        ),
        a && (d.timeout = a),
        Rt(d) && "object" == typeof s && (s = Qe.stringify(s)),
        d.send(s),
        d
    }, At = Be.isMini || Be.isAppPlus ? function(e) {
        var t = e.success
          , n = e.fail
          , s = e.body;
        e.data = e.data || s;
        var i;
        return e.success = function(e) {
            t(e.data, "", e.statusCode || e.status)
        }
        ,
        e.fail = function(e) {
            n(e.data, "", e.statusCode || e.status)
        }
        ,
        i = Ct.request(e),
        i
    }
    : vt, Mt = function() {
        function t(e, t) {
            var n = (65535 & e) + (65535 & t);
            return (e >> 16) + (t >> 16) + (n >> 16) << 16 | 65535 & n
        }
        function s(e, t) {
            return e << t | e >>> 32 - t
        }
        function u(n, i, r, e, o, a) {
            return t(s(t(t(i, n), t(e, a)), o), r)
        }
        function a(t, n, s, i, e, r, o) {
            return u(n & s | ~n & i, t, n, e, r, o)
        }
        function d(t, n, s, i, e, r, o) {
            return u(n & i | s & ~i, t, n, e, r, o)
        }
        function e(t, n, s, i, e, r, o) {
            return u(n ^ s ^ i, t, n, e, r, o)
        }
        function E(t, n, s, i, e, r, o) {
            return u(s ^ (n | ~i), t, n, e, r, o)
        }
        function _(s, r) {
            var u, c, f, _, T, S, I, y, C;
            for (s[r >> 5] |= 128 << r % 32,
            s[(r + 64 >>> 9 << 4) + 14] = r,
            S = 1732584193,
            I = -271733879,
            y = -1732584194,
            C = 271733878,
            u = 0; u < s.length; u += 16)
                c = S,
                f = I,
                _ = y,
                T = C,
                S = a(S, I, y, C, s[u], 7, -680876936),
                C = a(C, S, I, y, s[u + 1], 12, -389564586),
                y = a(y, C, S, I, s[u + 2], 17, 606105819),
                I = a(I, y, C, S, s[u + 3], 22, -1044525330),
                S = a(S, I, y, C, s[u + 4], 7, -176418897),
                C = a(C, S, I, y, s[u + 5], 12, 1200080426),
                y = a(y, C, S, I, s[u + 6], 17, -1473231341),
                I = a(I, y, C, S, s[u + 7], 22, -45705983),
                S = a(S, I, y, C, s[u + 8], 7, 1770035416),
                C = a(C, S, I, y, s[u + 9], 12, -1958414417),
                y = a(y, C, S, I, s[u + 10], 17, -42063),
                I = a(I, y, C, S, s[u + 11], 22, -1990404162),
                S = a(S, I, y, C, s[u + 12], 7, 1804603682),
                C = a(C, S, I, y, s[u + 13], 12, -40341101),
                y = a(y, C, S, I, s[u + 14], 17, -1502002290),
                I = a(I, y, C, S, s[u + 15], 22, 1236535329),
                S = d(S, I, y, C, s[u + 1], 5, -165796510),
                C = d(C, S, I, y, s[u + 6], 9, -1069501632),
                y = d(y, C, S, I, s[u + 11], 14, 643717713),
                I = d(I, y, C, S, s[u], 20, -373897302),
                S = d(S, I, y, C, s[u + 5], 5, -701558691),
                C = d(C, S, I, y, s[u + 10], 9, 38016083),
                y = d(y, C, S, I, s[u + 15], 14, -660478335),
                I = d(I, y, C, S, s[u + 4], 20, -405537848),
                S = d(S, I, y, C, s[u + 9], 5, 568446438),
                C = d(C, S, I, y, s[u + 14], 9, -1019803690),
                y = d(y, C, S, I, s[u + 3], 14, -187363961),
                I = d(I, y, C, S, s[u + 8], 20, 1163531501),
                S = d(S, I, y, C, s[u + 13], 5, -1444681467),
                C = d(C, S, I, y, s[u + 2], 9, -51403784),
                y = d(y, C, S, I, s[u + 7], 14, 1735328473),
                I = d(I, y, C, S, s[u + 12], 20, -1926607734),
                S = e(S, I, y, C, s[u + 5], 4, -378558),
                C = e(C, S, I, y, s[u + 8], 11, -2022574463),
                y = e(y, C, S, I, s[u + 11], 16, 1839030562),
                I = e(I, y, C, S, s[u + 14], 23, -35309556),
                S = e(S, I, y, C, s[u + 1], 4, -1530992060),
                C = e(C, S, I, y, s[u + 4], 11, 1272893353),
                y = e(y, C, S, I, s[u + 7], 16, -155497632),
                I = e(I, y, C, S, s[u + 10], 23, -1094730640),
                S = e(S, I, y, C, s[u + 13], 4, 681279174),
                C = e(C, S, I, y, s[u], 11, -358537222),
                y = e(y, C, S, I, s[u + 3], 16, -722521979),
                I = e(I, y, C, S, s[u + 6], 23, 76029189),
                S = e(S, I, y, C, s[u + 9], 4, -640364487),
                C = e(C, S, I, y, s[u + 12], 11, -421815835),
                y = e(y, C, S, I, s[u + 15], 16, 530742520),
                I = e(I, y, C, S, s[u + 2], 23, -995338651),
                S = E(S, I, y, C, s[u], 6, -198630844),
                C = E(C, S, I, y, s[u + 7], 10, 1126891415),
                y = E(y, C, S, I, s[u + 14], 15, -1416354905),
                I = E(I, y, C, S, s[u + 5], 21, -57434055),
                S = E(S, I, y, C, s[u + 12], 6, 1700485571),
                C = E(C, S, I, y, s[u + 3], 10, -1894986606),
                y = E(y, C, S, I, s[u + 10], 15, -1051523),
                I = E(I, y, C, S, s[u + 1], 21, -2054922799),
                S = E(S, I, y, C, s[u + 8], 6, 1873313359),
                C = E(C, S, I, y, s[u + 15], 10, -30611744),
                y = E(y, C, S, I, s[u + 6], 15, -1560198380),
                I = E(I, y, C, S, s[u + 13], 21, 1309151649),
                S = E(S, I, y, C, s[u + 4], 6, -145523070),
                C = E(C, S, I, y, s[u + 11], 10, -1120210379),
                y = E(y, C, S, I, s[u + 2], 15, 718787259),
                I = E(I, y, C, S, s[u + 9], 21, -343485551),
                S = t(S, c),
                I = t(I, f),
                y = t(y, _),
                C = t(C, T);
            return [S, I, y, C]
        }
        function T(e) {
            var t = "", s = 32 * e.length, i;
            for (i = 0; s > i; i += 8)
                t += n(255 & e[i >> 5] >>> i % 32);
            return t
        }
        function i(e) {
            var t = [], n, s;
            for (t[(e.length >> 2) - 1] = void 0,
            n = 0; n < t.length; n += 1)
                t[n] = 0;
            for (s = 8 * e.length,
            n = 0; s > n; n += 8)
                t[n >> 5] |= (255 & e.charCodeAt(n / 8)) << n % 32;
            return t
        }
        function c(e) {
            return T(_(i(e), 8 * e.length))
        }
        function f(t, n) {
            var s = i(t), r = [], e = [], o, a;
            for (r[15] = e[15] = void 0,
            16 < s.length && (s = _(s, 8 * t.length)),
            o = 0; 16 > o; o += 1)
                r[o] = 909522486 ^ s[o],
                e[o] = 1549556828 ^ s[o];
            return a = _(r.concat(i(n)), 512 + 8 * n.length),
            T(_(e.concat(a), 640))
        }
        function l(t) {
            var n = "", s, i;
            for (i = 0; i < t.length; i += 1)
                s = t.charCodeAt(i),
                n += "0123456789abcdef".charAt(15 & s >>> 4) + "0123456789abcdef".charAt(15 & s);
            return n
        }
        function m(e) {
            return unescape(encodeURIComponent(e))
        }
        function S(e) {
            return c(m(e))
        }
        function o(e) {
            return l(S(e))
        }
        function p(e, t) {
            return f(m(e), m(t))
        }
        function I(e, t) {
            return l(p(e, t))
        }
        return function(e, t, n) {
            return t ? n ? p(t, e) : I(t, e) : n ? S(e) : o(e)
        }
    }(), bt = Be.global, Ut = Be.system, Dt = bt.Promise, Lt = function(e, t) {
        return bt.setTimeout(e, t)
    }, Pt = function(e) {
        return bt.clearTimeout(e)
    }, wt = function(e, t) {
        return bt.setInterval(e, t)
    }, xt = function(e) {
        return bt.clearInterval(e)
    }, Vt = function() {
        if (!bt.Promise)
            return !1;
        var e = function() {
            return bt.Promise.resolve()
        }();
        return e.then && e["catch"] && e["finally"]
    }() ? bt.Promise : yt, kt = function(e) {
        return e
    }, Ft = bt.JSON || Qe, Bt = function(e) {
        var t;
        try {
            for (var n = arguments.length, s = Array(1 < n ? n - 1 : 0), i = 1; i < n; i++)
                s[i - 1] = arguments[i];
            t = e.apply(void 0, s)
        } catch (n) {
            t = null
        }
        return t
    }, Gt = function(e) {
        return Bt(Ft.stringify, e)
    }, Kt = function(e) {
        return Bt(Ft.parse, e)
    }, Yt = function(e) {
        return Kt(Gt(e))
    }, qt = function(e) {
        return "[object Object]" === Object.prototype.toString.call(e)
    }, Ht = function(e) {
        return -1 !== Object.prototype.toString.call(e).indexOf("Array")
    }, jt = function(e) {
        return "[object Function]" === Object.prototype.toString.call(e)
    }, Qt = function(e) {
        return "[object String]" === Object.prototype.toString.call(e)
    }, Wt = function(e) {
        return e === void 0 || "[object Undefined]" === Object.prototype.toString.call(e)
    }, Jt = function(e) {
        return "[object Number]" === Object.prototype.toString.call(e)
    }, Xt = function(e) {
        return "[object ArrayBuffer]" === Object.prototype.toString.call(e)
    }, zt = function(e, t) {
        return e === t
    }, Zt = function(e, t, n) {
        n = n || {},
        t = t || kt;
        var s = n
          , r = s.isReverse
          , o = function() {
            for (var n in e)
                t(e[n], n, e)
        }
          , a = function() {
            if (r)
                for (var n = e.length - 1; 0 <= n; n--)
                    t(e[n], n);
            else
                for (var s = 0, o = e.length; s < o; s++)
                    t(e[s], s)
        };
        qt(e) && o(),
        (Ht(e) || Qt(e)) && a()
    }, $t = function(e) {
        var t = !0;
        return qt(e) && Zt(e, function() {
            t = !1
        }),
        (Qt(e) || Ht(e)) && (t = 0 === e.length),
        Jt(e) && (t = 0 === e),
        t
    }, en = function() {
        return new Date().getTime()
    }, tn = function() {
        var e = Be.isMini
          , t = Be.isAppPlus;
        if (e || t)
            return !0;
        var n = bt.WebSocket;
        if (Wt(n))
            return !1;
        var s = !1
          , i = !1;
        try {
            s = "object" == typeof n || "function" == typeof n,
            i = "number" == typeof n.OPEN
        } catch (t) {}
        return s && i
    }, nn = function(e, t) {
        if (e.indexOf)
            return e.indexOf(t);
        var n = -1;
        return Zt(e, function(e, s) {
            if (t === e)
                return void (n = s)
        }),
        n
    }, sn = function(e, t) {
        if (qt(e)) {
            var n = [];
            Zt(e, function(e) {
                n.push(e)
            }),
            e = n
        }
        var s = nn(e, t);
        return -1 !== s
    }, rn = function(e, t, n) {
        return e.substring(t, n)
    }, on = function(e, t) {
        Zt(e, function(n, s) {
            zt(n, t) && e.splice(s, 1)
        }, {
            isReverse: !0
        })
    }, an = function(e, t, n) {
        n = n || {};
        var s = n
          , i = s.isAllowNull;
        for (var r in e = e || {},
        t = t || {},
        t) {
            var o = t[r];
            (!Wt(o) || i) && (e[r] = o)
        }
        return e
    }, dn = function(e) {
        return new Vt(e)
    }, ln = function(e, t) {
        return void 0 === t && (t = kt),
        dn(function(n) {
            var s = Lt(function() {
                n(s)
            }, e);
            t(s)
        })
    }, gn = function(e, t, n) {
        var s = function(t) {
            return e.replace(n || /{([^}]+)}/g, function(e, n) {
                return "\\" === e.charAt(0) ? e.slice(1) : void 0 === t[n] ? "{" + n + "}" : t[n]
            })
        };
        Ht(t) || (t = [t]);
        var i = [];
        return Zt(t, function(e) {
            i.push(s(e))
        }),
        i.join("")
    }, un = function() {
        function e(e) {
            this._timerId = void 0,
            this._timerEvent = void 0,
            this._timerClearEvent = void 0,
            this.timeout = 0,
            this.type = Se.TIMEOUT,
            this.status = Ie.PENNDING;
            var t = this;
            an(t, e);
            var n = t.type
              , s = n === Se.TIMEOUT;
            return s ? (t._timerEvent = Lt,
            t._timerClearEvent = Pt) : (t._timerEvent = wt,
            t._timerClearEvent = xt),
            t
        }
        var t = e.prototype;
        return t.start = function(e, t) {
            t = t || {};
            var n = this
              , s = n.type === Se.TIMEOUT
              , i = t
              , r = i.args
              , o = i.thisArg;
            n.stop(),
            n._timerId = n._timerEvent.call(bt, function() {
                s && n.stop(),
                o ? e.apply(o, r) : e(r)
            }, n.timeout),
            n.status = Ie.BUSY
        }
        ,
        t.stop = function() {
            var e = this;
            e._timerId && (e._timerClearEvent.call(bt, e._timerId),
            e.status = Ie.ENDING)
        }
        ,
        e
    }(), pn = function() {
        function e(e) {
            this._list = {},
            this.timeout = 3e4,
            an(this, e)
        }
        var t = e.prototype;
        return t._isInvalid = function(e) {
            var t = this._list[e];
            return !Ht(t) || $t(t)
        }
        ,
        t._exec = function(e, t, n) {
            var s = this;
            if (!s._isInvalid(e)) {
                var i = s._list[e]
                  , r = i[0];
                t ? r.reject(n) : r.resolve(n),
                i.splice(0, 1)
            }
        }
        ,
        t.add = function(e, t, n) {
            n = n || {};
            var s = this
              , i = t.resolve
              , r = t.reject
              , o = n.timeout || s.timeout;
            s._isInvalid(e) && (s._list[e] = []);
            var a = new un({
                timeout: o
            });
            a.start(function() {
                s.reject(e, S.TIMEOUT.code)
            }),
            s._list[e].push({
                resolve: i,
                reject: r,
                timer: a
            })
        }
        ,
        t.resolve = function(e, t) {
            this._exec(e, !1, t)
        }
        ,
        t.reject = function(e, t) {
            this._exec(e, !0, t)
        }
        ,
        e
    }(), cn = function() {
        function e() {
            this._events = void 0,
            this._events = {}
        }
        var t = e.prototype;
        return t.on = function(e, t) {
            var n = this._events[e] || [];
            n.push(t),
            this._events[e] = n
        }
        ,
        t.off = function(e, t) {
            if (t) {
                var n = this._events[e] || [];
                on(n, t)
            } else
                delete this._events[e]
        }
        ,
        t.emit = function(e, t, n) {
            var s = this._events[e];
            Zt(s, function(e) {
                jt(e) && e(t, n)
            })
        }
        ,
        t.clear = function() {
            this._events = {}
        }
        ,
        e
    }(), mn = function(e) {
        if (!qt(e) || e.low === void 0 || e.high === void 0)
            return e;
        var t = e.low;
        0 > t && (t += 4294967296),
        t = t.toString(16);
        var n = parseInt(e.high.toString(16) + "00000000".replace(new RegExp("0{" + t.length + "}$"), t), 16);
        return n
    }, En = function() {
        function e(e) {
            this._isRunning = !1,
            this._list = [],
            this._defaultConfig = void 0,
            this._defaultConfig = e
        }
        var t = e.prototype;
        return t.add = function(e) {
            e = e || this._defaultConfig,
            this._list.push(e),
            this.run()
        }
        ,
        t.run = function() {
            var e = this
              , t = e._isRunning
              , n = e._list
              , s = $t(n);
            if (!(t || s)) {
                var i = n.splice(0, 1)[0]
                  , r = i.event
                  , o = i.args
                  , a = i.thisArg
                  , d = function() {
                    e._isRunning = !1,
                    e.run()
                };
                return r ? void (e._isRunning = !0,
                r.apply(a, o).then(d)["catch"](d)) : d()
            }
        }
        ,
        e
    }(), fn = function(e, t) {
        return t = t || {},
        dn(function(n, s) {
            t = an(t, {
                url: e,
                success: function(e, t, i) {
                    return Ut.name !== ie.ZFB || i ? void n({
                        responseText: e,
                        xhr: t,
                        status: i
                    }) : void s({
                        responseText: e,
                        xhr: t,
                        status: i
                    })
                },
                fail: function(e, t, n) {
                    s({
                        result: e,
                        xhr: t,
                        status: n
                    })
                }
            }),
            At(t)
        })
    }, _n = function() {
        function e(e) {
            this._option = void 0,
            this._detectCount = 0,
            this._timeoutId = void 0,
            this._option = e
        }
        var t = e.prototype;
        return t._detect = function() {
            var e = this
              , t = e._detectCount
              , n = e._option
              , s = n.url
              , i = n.intervalTime
              , r = n.max;
            return t++,
            fn(s).then(function() {}, function(n) {
                var s = n.status;
                if (!zt(s, 404)) {
                    var o = r && zt(r, t);
                    return o ? Vt.reject() : ln(i, function(t) {
                        e._timeoutId = t
                    }).then(function() {
                        return e._detectCount = t,
                        e._detect()
                    })
                }
            })
        }
        ,
        t.start = function() {
            return this._detect()
        }
        ,
        t.stop = function() {
            var e = this._timeoutId;
            e && Pt(e)
        }
        ,
        e
    }(), Tn = function(e) {
        var t = nn(e, "://")
          , n = -1 < t;
        n && (t += 3,
        e = rn(e, t, e.length));
        var s = nn(e, "/");
        return -1 < s && (e = rn(e, 0, s)),
        e
    }, Sn = function(e) {
        var t = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f", "g", "h", "i", "g", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "G", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "0"]
          , n = t.length + 1
          , s = +e
          , i = [];
        do {
            var r = s % n;
            s = (s - r) / n,
            i.unshift(t[r])
        } while (s);return i.join("")
    }, In = function() {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(e) {
            var t = 0 | 16 * Math.random()
              , n = "x" === e ? t : 8 | 3 & t;
            return n.toString(16)
        })
    }, yn = {
        Storage: it,
        Session: ct,
        Socket: It,
        Cache: We,
        JSON: Ft,
        Defer: Vt,
        httpRequest: At,
        request: fn,
        requestByUrlList: function e(t, n) {
            if ($t(t))
                return Vt.reject();
            var s = t[0];
            return fn(s, n).then(function(e) {
                return e = e || {},
                e.urlList = t,
                e
            })["catch"](function(s) {
                return t.splice(0, 1),
                $t(t) ? Vt.reject(s) : e(t, n)
            })
        },
        requestForFaster: function(e, t) {
            t = t || {};
            var n = t.timeInterval || 0
              , s = 0
              , i = e.length
              , r = []
              , o = new un({
                timeout: 15000
            })
              , a = []
              , d = function() {
                Zt(a, function(e) {
                    e.stop()
                }),
                Zt(r, function(e) {
                    e.abort()
                }),
                a.length = 0,
                r.length = 0
            }
              , l = function() {
                return s === i
            };
            return dn(function(i, u) {
                var p = function(e, t) {
                    d(),
                    i({
                        url: e,
                        index: t
                    })
                }
                  , c = function() {
                    d(),
                    u()
                };
                Zt(e, function(e, i) {
                    var o = new un({
                        timeout: n * i
                    });
                    o.start(function() {
                        var n = an({
                            url: e,
                            success: function() {
                                p(e, i)
                            },
                            fail: function() {
                                s++,
                                l() && c()
                            }
                        }, t), o;
                        o = At(n),
                        r.push(o)
                    }),
                    a.push(o)
                }),
                o.start(c)
            })
        },
        md5: Mt,
        DeferHandler: pn,
        EventEmitter: cn,
        Timer: un,
        Queue: En,
        consoleError: function() {
            var e;
            return (e = console).error.apply(e, arguments)
        },
        consoleLog: function() {
            var e;
            return (e = console).log.apply(e, arguments)
        },
        noop: kt,
        deferNoop: function(e) {
            return Dt.resolve(e)
        },
        setTimeout: Lt,
        toJSON: Gt,
        parseJSON: Kt,
        copy: Yt,
        isObject: qt,
        isArray: Ht,
        isFunction: jt,
        isArrayBuffer: Xt,
        isString: Qt,
        isBoolean: function(e) {
            return "[object Boolean]" === Object.prototype.toString.call(e)
        },
        isUndefined: Wt,
        isNull: function(e) {
            return "[object Null]" === Object.prototype.toString.call(e)
        },
        isNumber: Jt,
        isNumberData: function(e) {
            var t = $t(e);
            return e = +e,
            Jt(e) && !t
        },
        isPromise: function(e) {
            var t = !1;
            try {
                t = "[object Promise]" === Object.prototype.toString.call(e) || e && e.then && e["catch"] && e["finally"]
            } catch (n) {
                t = !1
            }
            return t
        },
        getTypeName: function(e) {
            var t = Object.prototype.toString.call(e);
            return t.substring(8, t.length - 1)
        },
        isPlus: function(e) {
            return +e === e
        },
        isEmpty: $t,
        isFalse: function(e) {
            return !1 === e
        },
        isEqual: zt,
        isValidJSON: function(e) {
            if (qt(e))
                return !0;
            var t = !1;
            try {
                var n = Ft.parse(e)
                  , s = Ft.stringify(n);
                t = s === e
            } catch (n) {
                t = !1
            }
            return t
        },
        isSupportSocket: tn,
        ArrayBufferToArray: function(e) {
            return Xt(e) ? [].slice.call(new Int8Array(e)) : e
        },
        ArrayBufferToUint8Array: function(e) {
            return Xt(e) ? new Uint8Array(e) : e
        },
        indexOf: nn,
        lastIndexOf: function(e, t) {
            if (e.lastIndexOf)
                return e.lastIndexOf(t);
            var n = -1;
            return Zt(e, function(e, s) {
                if (t === e)
                    return void (n = s)
            }, {
                isReverse: !0
            }),
            n
        },
        isInclude: sn,
        substring: rn,
        getKeys: function(e) {
            var t = [];
            return Zt(e, function(e, n) {
                t.push(n)
            }),
            t
        },
        getValues: function(e) {
            var t = [];
            return Zt(e, function(e) {
                t.push(e)
            }),
            t
        },
        getTimestamp: function(e) {
            return new Date(e).getTime()
        },
        getCurrentTimestamp: en,
        formatTime: function(e, t) {
            e = e || en(),
            t = t || {};
            var n = t.temp
              , s = new Date(e)
              , i = {};
            if (i.YY = s.getFullYear(),
            i.MM = s.getMonth() + 1,
            i.DD = s.getDate(),
            i.hh = s.getHours(),
            i.mm = s.getMinutes(),
            i.ss = s.getSeconds(),
            Zt(i, function(e, t) {
                i[t] = 10 <= e ? e : "0" + e
            }),
            n) {
                var r = n;
                return Zt(i, function(e, t) {
                    r = r.replace(t, e)
                }),
                r
            }
            return i.YY + "-" + i.MM + "-" + i.DD + " " + i.hh + ":" + i.mm + ":" + i.ss
        },
        parse16To10: function(e) {
            return parseInt(e, 16)
        },
        forEach: Zt,
        map: function(e, t) {
            return Zt(e, function(n, s) {
                e[s] = t(n, s)
            }),
            e
        },
        filter: function(e, t) {
            for (var n = [], s = 0, r = e.length, o; s < r; s++)
                o = e[s],
                t(o, s) && n.push(o);
            return n
        },
        extend: an,
        extendAllowNull: function(e, t) {
            return an(e, t, {
                isAllowNull: !0
            })
        },
        extendInShallow: function(e, t) {
            return e = e || {},
            t = t || {},
            e = Yt(e),
            t = Yt(t),
            an(e, t)
        },
        deferred: dn,
        tplEngine: gn,
        getRandomNum: function(e, t) {
            t = t || 0;
            var n = e - t
              , s = Math.random();
            return t + Math.round(s * n)
        },
        int64ToTimestamp: mn,
        batchInt64ToTimestamp: function(e) {
            return Zt(e, function(t, n) {
                qt(t) && (e[n] = mn(t))
            }),
            e
        },
        encodeURI: function(e) {
            return bt.encodeURIComponent(e)
        },
        decodeURI: function(e) {
            return bt.decodeURIComponent(e)
        },
        secondsToMilliseconds: function(e) {
            return 1e3 * e
        },
        NetworkDetecter: _n,
        toUpperCase: function(e, t, n) {
            if (Wt(t) || Wt(n))
                return e.toUpperCase();
            var s = e.slice(t, n);
            return e = e.replace(s, function(e) {
                return e.toUpperCase()
            }),
            e
        },
        getDomainByUrl: Tn,
        getValidUrl: function(e, t) {
            t = t || {};
            var n = sn(e, "://")
              , s = Be.protocol.http
              , i = t
              , r = i.protocol;
            if (r) {
                var o = Tn(e);
                e = r + "//" + o
            }
            if (n) {
                var a = nn(e, "://") + 1
                  , d = rn(e, 0, a)
                  , l = d === Ee.HTTP
                  , u = s === Ee.HTTPS;
                if (l && u) {
                    var p = Tn(e);
                    return Ee.HTTPS + "//" + p
                }
                return e
            }
            return s + "//" + e
        },
        quickSort: function(e, t) {
            return function e(t, n, s, r) {
                if (r = r || function(e, t) {
                    return e <= t
                }
                ,
                n < s) {
                    for (var o = t[s], a = n - 1, d = n, l; d <= s; d++)
                        r(t[d], o) && (a++,
                        l = t[a],
                        t[a] = t[d],
                        t[d] = l);
                    e(t, n, a - 1, r),
                    e(t, a + 1, s, r)
                }
                return t
            }(e, 0, e.length - 1, t)
        },
        unique: function(e, t) {
            var n = t || function(e) {
                return e
            }
              , s = {}
              , i = [];
            return Zt(e, function(e) {
                var t = n(e);
                s[t] || (s[t] = !0,
                i.push(e))
            }),
            i
        },
        isStackError: function(e) {
            return e = e || {},
            e.stack && e.stack.toString
        },
        getUUID: In,
        getUUID22: function() {
            var e = In();
            if (e = e.replace(/-/g, "") + "a",
            e = parseInt(e, 16),
            e = Sn(e),
            22 < e.length)
                e = e.slice(0, 22);
            else
                for (var t = 22 - e.length, n = 0; n < t; n++)
                    e += "0";
            return e
        },
        isValidTimestamp: function(e) {
            return Jt(e) && 0 !== e
        },
        formateDate: function(e) {
            var t = new Date
              , n = t.getFullYear()
              , s = t.getMonth() + 1
              , i = t.getDate();
            return gn("{year}{seperator}{month}{seperator}{day}", {
                year: n,
                month: s,
                day: i,
                seperator: e
            })
        },
        getByteLength: function(e, t) {
            t = t || "utf-8";
            var n = 0, s;
            if ("utf-16" === t)
                for (var r = 0, o = e.length; r < o; r++)
                    s = e.charCodeAt(r),
                    n += 65535 >= s ? 2 : 4;
            else
                for (var a = 0, d = e.length; a < d; a++)
                    s = e.charCodeAt(a),
                    n += 127 > s ? 1 : 2047 >= s ? 2 : 65535 >= s ? 3 : 4;
            return n
        },
        getObjectKeys: function(e) {
            var t = Yt(e)
              , n = [];
            for (var s in t)
                n.push(s);
            return n
        }
    }, Cn = 0, hn = {
        NORMAL: 1,
        CHATROOM: 2
    }, Rn = {
        CONN_ACK: "ConnAckMessage",
        DISCONNECT: "DisconnectMessage",
        PING_REQ: "PingReqMessage",
        PING_RESP: "PingRespMessage",
        PUBLISH: "PublishMessage",
        PUB_ACK: "PubAckMessage",
        QUERY: "QueryMessage",
        QUERY_CON: "QueryConMessage",
        QUERY_ACK: "QueryAckMessage"
    }, On = {
        AT_MOST_ONCE: 0,
        AT_LEAST_ONCE: 1,
        EXACTLY_ONCE: 2,
        DEFAULT: 3,
        0: "AT_MOST_ONCE",
        1: "AT_LEAST_ONCE",
        2: "EXACTLY_ONCE",
        3: "DEFAULT"
    }, Nn = {
        CONNECT: 1,
        1: "CONNECT",
        CONNACK: 2,
        2: "CONNACK",
        PUBLISH: 3,
        3: "PUBLISH",
        PUBACK: 4,
        4: "PUBACK",
        QUERY: 5,
        5: "QUERY",
        QUERYACK: 6,
        6: "QUERYACK",
        QUERYCON: 7,
        7: "QUERYCON",
        SUBSCRIBE: 8,
        8: "SUBSCRIBE",
        SUBACK: 9,
        9: "SUBACK",
        UNSUBSCRIBE: 10,
        10: "UNSUBSCRIBE",
        UNSUBACK: 11,
        11: "UNSUBACK",
        PINGREQ: 12,
        12: "PINGREQ",
        PINGRESP: 13,
        13: "PINGRESP",
        DISCONNECT: 14,
        14: "DISCONNECT"
    }, vn = {
        PRIVATE: "ppMsgP",
        GROUP: "pgMsgP",
        CHATROOM: "chatMsg",
        CUSTOMER_SERVICE: "pcMsgP",
        RECALL: "recallMsg",
        RTC_MSG: "prMsgS",
        NOTIFY_PULL_MSG: "s_ntf",
        RECEIVE_MSG: "s_msg",
        SYNC_STATUS: "s_stat",
        SERVER_NOTIFY: "s_cmd",
        SETTING_NOTIFY: "s_us"
    }, An = {
        PRIVATE: "ppMsgS",
        GROUP: "pgMsgS",
        CHATROOM: "chatMsgS"
    }, Mn = {
        GET_SYNC_TIME: "qrySessionsAtt",
        PULL_MSG: "pullMsg",
        GET_CONVERSATION_LIST: "qrySessions",
        REMOVE_CONVERSATION_LIST: "delSessions",
        DELETE_MESSAGES: "delMsg",
        CLEAR_UNREAD_COUNT: "updRRTime",
        PULL_USER_SETTING: "pullUS",
        PULL_CHRM_MSG: "chrmPull",
        JOIN_CHATROOM: "joinChrm",
        JOIN_EXIST_CHATROOM: "joinChrmR",
        QUIT_CHATROOM: "exitChrm",
        GET_CHATROOM_INFO: "queryChrmI",
        UPDATE_CHATROOM_KV: "setKV",
        DELETE_CHATROOM_KV: "delKV",
        PULL_CHATROOM_KV: "pullKV",
        GET_OLD_CONVERSATION_LIST: "qryRelation",
        REMOVE_OLD_CONVERSATION: "delRelation",
        GET_CONVERSATION_STATUS: "pullSeAtts",
        SET_CONVERSATION_STATUS: "setSeAtt",
        GET_UPLOAD_FILE_TOKEN: "qnTkn",
        GET_UPLOAD_FILE_URL: "qnUrl",
        CLEAR_MESSAGES: {
            PRIVATE: "cleanPMsg",
            GROUP: "cleanGMsg",
            CUSTOMER_SERVICE: "cleanCMsg",
            SYSTEM: "cleanSMsg"
        },
        JOIN_RTC_ROOM: "rtcRJoin_data",
        QUIT_RTC_ROOM: "rtcRExit",
        PING_RTC: "rtcPing",
        SET_RTC_DATA: "rtcSetData",
        USER_SET_RTC_DATA: "userSetData",
        GET_RTC_DATA: "rtcQryData",
        DEL_RTC_DATA: "rtcDelData",
        SET_RTC_OUT_DATA: "rtcSetOutData",
        GET_RTC_OUT_DATA: "rtcQryUserOutData",
        GET_RTC_TOKEN: "rtcToken",
        SET_RTC_STATE: "rtcUserState",
        GET_RTC_ROOM_INFO: "rtcRInfo",
        GET_RTC_USER_INFO_LIST: "rtcUData",
        SET_RTC_USER_INFO: "rtcUPut",
        DEL_RTC_USER_INFO: "rtcUDel",
        GET_RTC_USER_LIST: "rtcUList"
    }, bn = {
        PRIVATE: "qryPMsg",
        GROUP: "qryGMsg",
        CHATROOM: "qryCHMsg",
        CUSTOMER_SERVICE: "qryCMsg",
        SYSTEM: "qrySMsg"
    }, Un = {
        KV_CHANGED: 2,
        CONVERSATION_STATUS_CHANGED: 3
    }, Dn = {
        AUTO_DELETE: 1,
        OVERWRITE: 2,
        OPERATE: 4
    }, Ln = (Xn = {},
    Xn[vn.PRIVATE] = k.PRIVATE,
    Xn[vn.GROUP] = k.GROUP,
    Xn[vn.CHATROOM] = k.CHATROOM,
    Xn[vn.CUSTOMER_SERVICE] = k.CUSTOMER_SERVICE,
    Xn[An.PRIVATE] = k.PRIVATE,
    Xn[An.GROUP] = k.GROUP,
    Xn[An.CHATROOM] = k.CHATROOM,
    Xn), Pn = (zn = {},
    zn[k.PRIVATE] = vn.PRIVATE,
    zn[k.GROUP] = vn.GROUP,
    zn[k.CHATROOM] = vn.CHATROOM,
    zn[k.CUSTOMER_SERVICE] = vn.CUSTOMER_SERVICE,
    zn[k.RTC_ROOM] = vn.RTC_MSG,
    zn), wn = (Zn = {},
    Zn[k.PRIVATE] = An.PRIVATE,
    Zn[k.GROUP] = An.GROUP,
    Zn), xn = ($n = {},
    $n[k.PRIVATE] = bn.PRIVATE,
    $n[k.GROUP] = bn.GROUP,
    $n[k.CHATROOM] = bn.CHATROOM,
    $n[k.CUSTOMER_SERVICE] = bn.CUSTOMER_SERVICE,
    $n[k.SYSTEM] = bn.SYSTEM,
    $n), Vn = (es = {},
    es[k.PRIVATE] = Mn.CLEAR_MESSAGES.PRIVATE,
    es[k.GROUP] = Mn.CLEAR_MESSAGES.GROUP,
    es[k.CUSTOMER_SERVICE] = Mn.CLEAR_MESSAGES.CUSTOMER_SERVICE,
    es[k.SYSTEM] = Mn.CLEAR_MESSAGES.SYSTEM,
    es), kn = {
        ADD: 1,
        UPDATE: 2,
        DELETE: 3
    }, Fn = {
        ENABLED: "1",
        DISABLED: "0"
    }, Bn = {
        DO_NOT_DISTURB: 1,
        TOP: 2
    }, Gn = function() {
        function e(e, t, n, s) {
            this.type = void 0,
            this.retain = !1,
            this.qos = On.AT_LEAST_ONCE,
            this.dup = !1,
            this.syncMsg = !1;
            var i = yn.isPlus(e);
            e && i && 1 === arguments.length ? (this.retain = 0 < (1 & e),
            this.qos = (6 & e) >> 1,
            this.dup = 0 < (8 & e),
            this.type = 15 & e >> 4,
            this.syncMsg = 8 == (8 & e)) : (this.type = e,
            this.retain = void 0 !== t && t,
            this.qos = void 0 === n ? On.AT_LEAST_ONCE : n,
            this.dup = void 0 !== s && s)
        }
        var t = e.prototype;
        return t.encode = function() {
            var e = this
              , t = [On.AT_MOST_ONCE, On.AT_LEAST_ONCE, On.EXACTLY_ONCE, On.DEFAULT];
            yn.forEach(t, function(t) {
                e.qos === On[t] && (e.qos = t)
            });
            var n = e.type << 4;
            return n |= e.retain ? 1 : 0,
            n |= e.qos << 1,
            n |= e.dup ? 8 : 0,
            n
        }
        ,
        e
    }(), Kn = {
        writeUTF: function(e, t) {
            var n = []
              , s = 0;
            return yn.forEach(e, function(t, r) {
                var i = e.charCodeAt(r);
                0 <= i && 127 >= i ? (s += 1,
                n.push(i)) : 128 <= i && 2047 >= i ? (s += 2,
                n.push(192 | 31 & i >> 6),
                n.push(128 | 63 & i)) : 2048 <= i && 65535 >= i && (s += 3,
                n.push(224 | 15 & i >> 12),
                n.push(128 | 63 & i >> 6),
                n.push(128 | 63 & i))
            }),
            yn.forEach(n, function(e, t) {
                255 < e && (n[t] &= 255)
            }),
            t ? n : 255 >= s ? [0, s].concat(n) : [s >> 8, 255 & s].concat(n)
        },
        readUTF: function(e) {
            for (var t = [], i = -1, r = e, o = "", a, d; ++i < r.length; ) {
                var l = +r[i];
                if (l == (127 & l))
                    ;
                else
                    240 == (240 & l) ? (l ^= 240,
                    l = l << 6 | 128 ^ r[++i],
                    l = l << 6 | 128 ^ r[++i],
                    l = l << 6 | 128 ^ r[++i]) : 224 == (224 & l) ? (l ^= 224,
                    l = l << 6 | 128 ^ r[++i],
                    l = l << 6 | 128 ^ r[++i]) : 192 == (192 & l) && (l ^= 192,
                    l = l << 6 | 128 ^ r[++i]);
                if (!isFinite(l) || 0 > l || 1114111 < l || s(l) !== l)
                    throw RangeError("Invalid code point: " + l);
                65535 >= l ? t.push(l) : (l -= 65536,
                a = 55296 | l >> 10,
                d = 56320 | l % 1024,
                t.push(a, d)),
                (i + 1 === r.length || t.length > 16384) && (o += n.apply(null, t),
                t.length = 0)
            }
            return o
        }
    }, Yn = function() {
        function e(e) {
            this.pool = void 0,
            this.position = 0,
            this.poolLen = 0,
            this.pool = e,
            this.poolLen = e.length
        }
        var t = e.prototype;
        return t.check = function() {
            return this.position >= this.pool.length
        }
        ,
        t.readInt = function() {
            var e = this;
            if (e.check())
                return -1;
            for (var n = "", s = 0, r; 4 > s; s++)
                r = e.pool[e.position++].toString(16),
                1 === r.length && (r = "0" + r),
                n += r.toString();
            return yn.parse16To10(n)
        }
        ,
        t.readLong = function() {
            var e = this;
            if (e.check())
                return -1;
            for (var n = "", s = 0, r; 8 > s; s++)
                r = e.pool[e.position++].toString(16),
                1 === r.length && (r = "0" + r),
                n += r;
            return yn.parse16To10(n)
        }
        ,
        t.readByte = function() {
            if (this.check())
                return -1;
            var e = this.pool[this.position++];
            return 255 < e && (e &= 255),
            e
        }
        ,
        t.readUTF = function() {
            if (this.check())
                return "";
            var e = this.readByte() << 8 | this.readByte()
              , t = this.pool.subarray(this.position, this.position += e);
            return Kn.readUTF(t)
        }
        ,
        t.readAll = function() {
            return this.pool.subarray(this.position, this.poolLen)
        }
        ,
        e
    }(), qn = function() {
        function e() {
            this.pool = [],
            this.position = 0,
            this.writen = 0
        }
        var t = e.prototype;
        return t.write = function(e) {
            return yn.isArray(e) ? this.pool = this.pool.concat(e) : yn.isPlus(e) && (255 < e && (e &= 255),
            this.pool.push(e),
            this.writen++),
            e
        }
        ,
        t.writeArr = function(e) {
            return this.pool = this.pool.concat(e),
            e
        }
        ,
        t.writeUTF = function(e) {
            var t = Kn.writeUTF(e);
            this.pool = this.pool.concat(t),
            this.writen += t.length
        }
        ,
        t.getBytesArray = function() {
            return this.pool
        }
        ,
        e
    }(), Hn = {
        PUB: "pub",
        QUERY: "qry"
    }, jn = function(e, t) {
        return e && t ? t + "_" + e : e ? e : yn.getCurrentTimestamp()
    }, Qn = function() {
        function e(e) {
            this._name = void 0,
            this._header = void 0,
            this.lengthSize = 0,
            this.messageId = void 0,
            this.timestamp = void 0,
            this.identifier = void 0,
            this._header = e
        }
        var t = e.prototype;
        return t.getIdentifier = function() {
            var e = this.messageId
              , t = this.identifier;
            return jn(e, t)
        }
        ,
        t.read = function(e, t) {
            this.readMessage(e, t)
        }
        ,
        t.readMessage = function(e, t) {
            return {
                stream: e,
                length: t
            }
        }
        ,
        e
    }(), Wn = function() {
        function e(e) {
            this._header = void 0,
            this.lengthSize = 0,
            this.data = void 0,
            this.messageId = void 0,
            this.topic = void 0,
            this.targetId = void 0,
            this.identifier = void 0,
            this._header = new Gn(e,!1,On.AT_MOST_ONCE,!1)
        }
        var t = e.prototype;
        return t.getIdentifier = function() {
            var e = this.messageId
              , t = this.identifier;
            return jn(e, t)
        }
        ,
        t.write = function(e) {
            var t = this.getHeaderFlag();
            e.write(t),
            this.writeMessage(e)
        }
        ,
        t.writeMessage = function(e) {
            return e
        }
        ,
        t.setHeaderQos = function(e) {
            this._header.qos = e
        }
        ,
        t.getHeaderFlag = function() {
            return this._header.encode()
        }
        ,
        t.getLengthSize = function() {
            return this.lengthSize
        }
        ,
        t.getBufferData = function() {
            var e = new qn;
            this.write(e);
            var t = e.getBytesArray()
              , n = new Int8Array(t);
            return n
        }
        ,
        t.getCometData = function() {
            var e = this.data || {};
            return yn.toJSON(e)
        }
        ,
        e
    }(), Jn = function(t) {
        function n() {
            for (var e = arguments.length, n = Array(e), s = 0, i; s < e; s++)
                n[s] = arguments[s];
            return i = t.call.apply(t, [this].concat(n)) || this,
            i._name = Rn.CONN_ACK,
            i.status = void 0,
            i.userId = void 0,
            i.timestamp = void 0,
            i
        }
        e(n, t);
        var s = n.prototype;
        return s.readMessage = function(e, t) {
            e.readByte(),
            this.status = +e.readByte(),
            t > n.MESSAGE_LENGTH && (this.userId = e.readUTF(),
            e.readUTF(),
            this.timestamp = e.readLong())
        }
        ,
        n
    }(Qn), Xn, zn, Zn, $n, es;
    Jn.MESSAGE_LENGTH = 2;
    var ts = function(t) {
        function n() {
            for (var e = arguments.length, n = Array(e), s = 0, i; s < e; s++)
                n[s] = arguments[s];
            return i = t.call.apply(t, [this].concat(n)) || this,
            i._name = Rn.DISCONNECT,
            i.status = void 0,
            i
        }
        e(n, t);
        var s = n.prototype;
        return s.readMessage = function(e) {
            e.readByte(),
            this.status = +e.readByte()
        }
        ,
        n
    }(Qn);
    ts.MESSAGE_LENGTH = 2;
    var ns = function(t) {
        function n() {
            var e;
            return e = t.call(this, Nn.PINGREQ) || this,
            e._name = Rn.PING_REQ,
            e
        }
        return e(n, t),
        n
    }(Wn), ss = function(t) {
        function n() {
            for (var e = arguments.length, n = Array(e), s = 0, i; s < e; s++)
                n[s] = arguments[s];
            return i = t.call.apply(t, [this].concat(n)) || this,
            i._name = Rn.PING_RESP,
            i
        }
        return e(n, t),
        n
    }(Qn), is = function(t) {
        function n() {
            for (var e = arguments.length, n = Array(e), s = 0, i; s < e; s++)
                n[s] = arguments[s];
            return i = t.call.apply(t, [this].concat(n)) || this,
            i.messageId = void 0,
            i
        }
        e(n, t);
        var s = n.prototype;
        return s.readMessage = function(e) {
            var t = 256 * e.readByte() + e.readByte();
            this.messageId = parseInt(t, 10)
        }
        ,
        n
    }(Qn), rs = function(t) {
        function n() {
            for (var e = arguments.length, n = Array(e), s = 0, i; s < e; s++)
                n[s] = arguments[s];
            return i = t.call.apply(t, [this].concat(n)) || this,
            i.messageId = void 0,
            i
        }
        e(n, t);
        var s = n.prototype;
        return s.writeMessage = function(e) {
            var t = this.messageId;
            e.write((65280 & t) >> 8),
            e.write(255 & t)
        }
        ,
        n
    }(Wn), os = function(t) {
        function n() {
            for (var e = arguments.length, n = Array(e), s = 0, i; s < e; s++)
                n[s] = arguments[s];
            return i = t.call.apply(t, [this].concat(n)) || this,
            i._name = Rn.PUBLISH,
            i.topic = void 0,
            i.data = void 0,
            i.targetId = void 0,
            i.date = void 0,
            i.syncMsg = !1,
            i.identifier = Hn.PUB,
            i
        }
        e(n, t);
        var s = n.prototype;
        return s.readMessage = function(e) {
            this.date = e.readInt(),
            this.topic = e.readUTF(),
            this.targetId = e.readUTF(),
            is.prototype.readMessage.apply(this, arguments),
            this.data = e.readAll()
        }
        ,
        n
    }(is), as = function(t) {
        function n(e, n, s) {
            var i;
            return i = t.call(this, Nn.PUBLISH) || this,
            i._name = Rn.PUBLISH,
            i.topic = void 0,
            i.data = void 0,
            i.targetId = void 0,
            i.date = void 0,
            i.syncMsg = !1,
            i.identifier = Hn.PUB,
            i.topic = e,
            i.data = yn.isString(n) ? Kn.writeUTF(n) : n,
            i.targetId = s,
            i
        }
        e(n, t);
        var s = n.prototype;
        return s.writeMessage = function(e) {
            e.writeUTF(this.topic),
            e.writeUTF(this.targetId),
            rs.prototype.writeMessage.apply(this, arguments),
            e.write(this.data)
        }
        ,
        n
    }(rs), ds = function(t) {
        function n() {
            for (var e = arguments.length, n = Array(e), s = 0, i; s < e; s++)
                n[s] = arguments[s];
            return i = t.call.apply(t, [this].concat(n)) || this,
            i._name = Rn.PUB_ACK,
            i.status = void 0,
            i.date = 0,
            i.data = void 0,
            i.millisecond = 0,
            i.messageUId = void 0,
            i.timestamp = 0,
            i.identifier = Hn.PUB,
            i
        }
        e(n, t);
        var s = n.prototype;
        return s.readMessage = function(e) {
            is.prototype.readMessage.call(this, e),
            this.date = e.readInt(),
            this.status = 256 * e.readByte() + e.readByte(),
            this.millisecond = 256 * e.readByte() + e.readByte(),
            this.timestamp = 1e3 * this.date + this.millisecond,
            this.messageUId = e.readUTF()
        }
        ,
        n
    }(is), ls = function(t) {
        function n(e) {
            var n;
            return n = t.call(this, Nn.PUBACK) || this,
            n._name = Rn.PUB_ACK,
            n.status = void 0,
            n.date = 0,
            n.millisecond = 0,
            n.messageUId = void 0,
            n.timestamp = 0,
            n.messageId = e,
            n
        }
        e(n, t);
        var s = n.prototype;
        return s.writeMessage = function(e) {
            rs.prototype.writeMessage.call(this, e)
        }
        ,
        n
    }(rs), gs = function(t) {
        function n(e, n, s) {
            var i;
            return i = t.call(this, Nn.QUERY) || this,
            i._name = Rn.QUERY,
            i.topic = void 0,
            i.data = void 0,
            i.targetId = void 0,
            i.identifier = Hn.QUERY,
            i.topic = e,
            i.data = yn.isString(n) ? Kn.writeUTF(n) : n,
            i.targetId = s,
            i
        }
        e(n, t);
        var s = n.prototype;
        return s.writeMessage = function(e) {
            e.writeUTF(this.topic),
            e.writeUTF(this.targetId),
            rs.prototype.writeMessage.call(this, e),
            e.write(this.data)
        }
        ,
        n
    }(rs), us = function(t) {
        function n(e) {
            var n;
            return n = t.call(this, Nn.QUERYCON) || this,
            n._name = Rn.QUERY_CON,
            n.messageId = e,
            n
        }
        return e(n, t),
        n
    }(rs), ps = function(t) {
        function n() {
            for (var e = arguments.length, n = Array(e), s = 0, i; s < e; s++)
                n[s] = arguments[s];
            return i = t.call.apply(t, [this].concat(n)) || this,
            i._name = Rn.QUERY_ACK,
            i.data = void 0,
            i.status = void 0,
            i.date = void 0,
            i.identifier = Hn.QUERY,
            i
        }
        e(n, t);
        var s = n.prototype;
        return s.readMessage = function(e) {
            is.prototype.readMessage.call(this, e),
            this.date = e.readInt(),
            this.status = 256 * e.readByte() + e.readByte(),
            this.data = e.readAll()
        }
        ,
        n
    }(is), cs = function(e) {
        var t = e.type
          , n = new Qn(e);
        switch (t) {
        case Nn.CONNACK:
            n = new Jn(e);
            break;
        case Nn.PUBLISH:
            n = new os(e),
            n.syncMsg = e.syncMsg;
            break;
        case Nn.PUBACK:
            n = new ds(e);
            break;
        case Nn.QUERYACK:
            n = new ps(e);
            break;
        case Nn.SUBACK:
        case Nn.UNSUBACK:
        case Nn.PINGRESP:
            n = new ss(e);
            break;
        case Nn.DISCONNECT:
            n = new ts(e);
            break;
        default:
            throw new Error("No support for deserializing " + t + " messages");
        }
        return n
    }, ms = function(e) {
        var t = new Uint8Array(e)
          , n = new Yn(t)
          , s = n.readByte()
          , i = new Gn(s)
          , r = cs(i);
        return r.read(n, t.length - 1),
        r
    }, Es = function(e) {
        var t = e.headerCode
          , n = new Gn(t)
          , s = cs(n);
        return yn.forEach(e, function(e, t) {
            t in s && (s[t] = e)
        }),
        s
    }, fs = {
        WATCH: "watch",
        UN_WATCH: "unwatch",
        CONNECT: "connect",
        RECONNECT: "reconnect",
        DISCONNECT: "disconnect",
        CHANGE_USER: "changeUser",
        GET_CONNECTION_STATUS: "getConnectionStatus",
        GET_CONNECTION_USER_ID: "getConnectionUserId",
        GET_CONNECTED_TIME: "getConnectedTime",
        GET_APP_INFO: "getAppInfo",
        GET_CONVERSATION_LIST: "getConversationList",
        REMOVE_CONVERSATION_LIST: "removeConversationList",
        REMOVE_CONVERSATION: "removeConversation",
        GET_TOTAL_UNREAD_COUNT: "getTotalUnreadCount",
        CLEAR_UNREAD_COUNT: "clearUnreadCount",
        GET_UNREAD_COUNT: "getUnreadCount",
        GET_LOCAL_CONVERSATION: "getLocalConversation",
        SET_CONVERSATION_STATUS_LIST: "setConversationStatusList",
        SEND_MESSAGE: "sendMessage",
        GET_HISTORY_MSGS: "getHistoryMessages",
        DELETE_MESSAGES: "deleteHistoryMessages",
        CLEAR_MESSAGES: "clearHistoryMessages",
        RECALL_MESSAGE: "recallMessage",
        UPDATE_EXPANSION_MESSAGE: "updateExpansionMessage",
        JOIN_CHATROOM: "joinChatRoom",
        QUIT_CHATROOM: "quitChatRoom",
        GET_CHATROOM_INFO: "getChatRoomInfo",
        GET_CHATROOM_MSGS: "getChatRoomHistoryMessages",
        SET_KV: "setChatRoomKV",
        FORCE_SET_KV: "forceSetChatRoomKV",
        DEL_KV: "removeChatRoomKV",
        FORCE_DEL_KV: "forceRemoveChatRoomKV",
        GET_KV: "getChatRoomKV",
        GET_ALL_KV: "getAllChatRoomKV",
        RTC_INNER_WATCH: "rtcInnerWatch",
        RTC_INNER_UNWATCH: "rtcInnerUnwatch",
        JOIN_RTC: "joinRTCRoom",
        QUIT_RTC: "quitRTCRoom",
        PING_RTC: "RTCPing",
        GET_RTC_ROOM_INFO: "getRTCRoomInfo",
        SET_RTC_DATA: "setRTCData",
        SET_RTC_USER_DATA: "setRTCUserData",
        GET_RTC_DATA: "getRTCData",
        DEL_RTC_DATA: "removeRTCData",
        SET_RTC_OUT_DATA: "setRTCOutData",
        GET_RTC_OUT_DATA: "getRTCOutData",
        GET_RTC_TOKEN: "getRTCToken",
        SET_RTC_STATE: "setRTCState",
        GET_RTC_USER_INFO_LIST: "getRTCUserInfoList",
        SET_RTC_USER_INFO: "setRTCUserInfo",
        DEL_RTC_USER_INFO: "removeRTCUserInfo",
        GET_RTC_USER_LIST: "getRTCUserList",
        GET_UPLOAD_TOKEN: "getFileToken",
        GET_UPLOAD_URL: "getFileUrl"
    }, _s = [fs.GET_CONVERSATION_LIST, fs.REMOVE_CONVERSATION_LIST, fs.REMOVE_CONVERSATION, fs.GET_TOTAL_UNREAD_COUNT, fs.CLEAR_UNREAD_COUNT, fs.SEND_MESSAGE, fs.GET_HISTORY_MSGS, fs.DELETE_MESSAGES, fs.CLEAR_MESSAGES, fs.RECALL_MESSAGE, fs.JOIN_CHATROOM, fs.QUIT_CHATROOM, fs.GET_CHATROOM_INFO, fs.GET_CHATROOM_MSGS, fs.UPDATE_EXPANSION_MESSAGE], Ts = [fs.CONNECT, fs.RECONNECT], Ss = {
        STATUS: "status",
        MESSAGE: "message",
        CONVERSATION: "conversation",
        SETTING: "setting",
        CHATROOM: "chatroom",
        EXPANSION: "expansion"
    }, Is = {
        STATUS: "status",
        MESSAGE: "message"
    }, ys = {
        SIGNAL: "signal",
        STATUS: "status"
    }, Cs = {
        STATUS: "status",
        NOTIFY_PULL: "notifyPull",
        DIRECT_MSG: "directMessage",
        CHRM_KV_CHANGED: "chatRoomKV",
        CHRM_KV_SET: "chatRoomKVSet",
        MESSAGE_SEND: "sendMessage",
        JOIN_CHATROOM: "joinChatRoom",
        BEFORE_JOIN_CHATROOM: "beforeJoinChatRoom",
        USER_SETTING_CHANGED: "userSetting",
        CONVERSATION_STATUS_CHANGED: "converStatusChanged",
        CONVERSATION_STATUS_SETED: "converStatusSeted"
    }, hs = {
        FATAL: 0,
        ERROR: 1,
        WARN: 2,
        INFO: 3,
        DEBUG: 4
    }, Rs = {
        ADVANCED: 500,
        LOW: 500
    }, Os = {
        IM: "IM",
        RTC: "RTC"
    }, Ns = {
        L_GET_NAVI_T: "L-get_navi-T",
        L_GET_NAVI_R: "L-get_navi-R",
        L_PING_WS_T: "L-ping_ws-T",
        L_PING_WS_R: "L-ping_ws-R",
        L_NETWORK_CHANGED_S: "L-network_changed-S",
        L_DECODE_MSG_E: "L-decode_msg-E",
        L_RECONNECT_T: "L-reconnect-T",
        L_RECONNECT_R: "L-reconnect-R",
        L_PULL_CHRM_KV_T: "L-pull-chrm-kv-T",
        L_PULL_CHRM_KV_R: "L-pull-chrm-kv-R",
        L_PING_S: "L-ping-S",
        L_CRASH_E: "L-crash-E",
        L_COMET_SEND_SIGNAL_E: "L-comet_send_signal-E",
        A_INIT_O: "A-init-O",
        A_CONNECT_T: "A-connect-T",
        A_CONNECT_R: "A-connect-R",
        A_DISCONNECT_T: "A-disconnect-T",
        A_DISCONNECT_R: "A-disconnect-R",
        A_RECONNECT_T: "A-reconnect-T",
        A_RECONNECT_R: "A-reconnect-R",
        A_JOIN_CHATROOM_T: "A-join_chatroom-T",
        A_JOIN_CHATROOM_R: "A-join_chatroom-R",
        A_QUIT_CHATROOM_T: "A-quit_chatroom-T",
        A_QUIT_CHATROOM_R: "A-quit_chatroom-R",
        P_NOTIFY_CHRM_KV_S: "P-notify-chrm-kv-R",
        G_CRASH_E: "G-crash-E",
        G_UPLOAD_LOG_S: "G-upload_log-S",
        G_UPLOAD_LOG_E: "G-upload_log-E"
    }, vs = (ki = {},
    ki[fs.CONNECT] = {
        req: Ns.A_CONNECT_T,
        resp: Ns.A_CONNECT_R
    },
    ki[fs.DISCONNECT] = {
        req: Ns.A_DISCONNECT_T,
        resp: Ns.A_DISCONNECT_R
    },
    ki[fs.RECONNECT] = {
        req: Ns.A_RECONNECT_T,
        resp: Ns.A_RECONNECT_R
    },
    ki[fs.JOIN_CHATROOM] = {
        req: Ns.A_JOIN_CHATROOM_T,
        resp: Ns.A_JOIN_CHATROOM_R
    },
    ki[fs.QUIT_CHATROOM] = {
        req: Ns.A_QUIT_CHATROOM_T,
        resp: Ns.A_QUIT_CHATROOM_R
    },
    ki), As = {
        REALTIME: 0,
        FULL: 1
    }, Ms = {
        isOpen: !0,
        url: "logcollection.ronghub.com",
        realtimeLevel: hs.ERROR,
        realtimeInterval: 2e4,
        realtimeMaxTimes: 5,
        fullInterval: 5e3,
        fullMaxTimes: 3,
        fullLevel: hs.DEBUG
    }, bs = [I.RC_CONNECTION_EXIST], Us = yn.isEmpty, Ds = yn.tplEngine, Ls = function() {
        return yn.getValues(k)
    }, Ps = {
        ids: {},
        temp: "{appkey}_{userId}",
        get: function(e) {
            var t = yn.tplEngine(Ps.temp, e)
              , n = Ps.ids[t] || 0;
            return n++,
            Ps.ids[t] = n,
            n
        },
        clear: function(e) {
            var t = yn.tplEngine(Ps.temp, e);
            Ps.ids[t] = 0
        },
        isExceedLimit: function(e) {
            return e > 65535
        }
    }, ws = function() {
        function e(e) {
            this._socket = void 0,
            this.eventEmitter = new yn.EventEmitter,
            this.KEY = {
                OPEN: "open",
                MSG: "msg",
                ERROR: "error",
                CLOSE: "close"
            };
            var t = this
              , n = t.KEY;
            t._socket = new yn.Socket(e),
            t._socket.onOpen(function(e) {
                t.eventEmitter.emit(n.OPEN, e)
            }),
            t._socket.onMessage(function(e) {
                t.eventEmitter.emit(n.MSG, e)
            }),
            t._socket.onError(function(e) {
                e = t._formatCloseData(e),
                t.eventEmitter.emit(n.ERROR, e)
            }),
            t._socket.onClose(function(e) {
                e = t._formatCloseData(e),
                t.eventEmitter.emit(n.CLOSE, e)
            })
        }
        var t = e.prototype;
        return t._formatCloseData = function(e) {
            if (Be.isMini || Be.isAppPlus) {
                e = e || {};
                var t = e
                  , n = t.errMsg;
                e.code = D[n]
            }
            return e
        }
        ,
        t.send = function(e) {
            return this._socket.send(e)
        }
        ,
        t.close = function() {
            this.eventEmitter.clear(),
            this._socket.close()
        }
        ,
        t.onOpen = function(e) {
            this.eventEmitter.on(this.KEY.OPEN, e)
        }
        ,
        t.onMessage = function(e) {
            this.eventEmitter.on(this.KEY.MSG, e)
        }
        ,
        t.onError = function(e) {
            this.eventEmitter.on(this.KEY.ERROR, e)
        }
        ,
        t.onClose = function(e) {
            this.eventEmitter.on(this.KEY.CLOSE, e)
        }
        ,
        e
    }(), xs = function() {
        function e(e) {
            var t;
            this._cache = void 0,
            this.STORAGE_KEY = void 0;
            var n = e ? oe + e : oe
              , s = yn.Storage.get(n) || {};
            this._cache = new yn.Cache((t = {},
            t[n] = s,
            t)),
            this.STORAGE_KEY = n
        }
        var t = e.prototype;
        return t._get = function() {
            var e = this.STORAGE_KEY;
            return this._cache.get(e) || {}
        }
        ,
        t._set = function(e) {
            var t = this.STORAGE_KEY;
            e = e || {},
            this._cache.set(t, e),
            yn.Storage.set(t, e)
        }
        ,
        t.set = function(e, t) {
            var n = this._get();
            n[e] = t,
            this._set(n)
        }
        ,
        t.remove = function(e) {
            var t = this._get();
            delete t[e],
            this._set(t)
        }
        ,
        t.clear = function() {
            var e = this.STORAGE_KEY;
            yn.Storage.remove(e),
            this._cache.remove(e)
        }
        ,
        t.get = function(e) {
            var t = this._get();
            return t[e]
        }
        ,
        t.getKeys = function() {
            var e = this._get();
            return yn.getKeys(e)
        }
        ,
        t.getValues = function() {
            return this._get() || {}
        }
        ,
        e
    }(), Vs = function(e) {
        return e = e || {},
        e.inboxTime = e.inboxTime || 0,
        e.sendboxTime = e.sendboxTime || 0,
        e
    }, ks = function() {
        function e(e) {
            this._syncTime = void 0,
            this._storage = void 0,
            e = e || {};
            var t = e
              , n = t.startSyncTime;
            this._initStorage(e),
            n && (this._syncTime = Vs(n))
        }
        var t = e.prototype;
        return t._initStorage = function(e) {
            var t = e.appkey
              , n = e.userId
              , s = yn.tplEngine(ge.ROOT_KEY_TPL, {
                appkey: t,
                userId: n
            })
              , i = new xs(s)
              , r = {
                sendboxTime: i.get(ge.SUB_KEY.SENDBOX),
                inboxTime: i.get(ge.SUB_KEY.INBOX)
            };
            this._storage = i,
            this._syncTime = Vs(r)
        }
        ,
        t.setInbox = function(e) {
            var t = this._syncTime.inboxTime || 0;
            t < e && (this._syncTime.inboxTime = e,
            this._storage.set(ge.SUB_KEY.INBOX, e))
        }
        ,
        t.setSendbox = function(e) {
            var t = this._syncTime.sendboxTime || 0;
            t < e && (this._syncTime.sendboxTime = e,
            this._storage.set(ge.SUB_KEY.SENDBOX, e))
        }
        ,
        t.setByMessage = function(e) {
            var t = e.messageDirection
              , n = e.sentTime
              , s = t === F.SEND;
            s ? this.setSendbox(n) : this.setInbox(n)
        }
        ,
        t.get = function() {
            return Vs(this._syncTime)
        }
        ,
        e
    }(), Fs = function() {
        function e(e) {
            this._rootKey = void 0,
            this._pullTimes = {},
            e = e || {};
            var t = e
              , n = t.appkey
              , s = t.userId;
            this._rootKey = yn.tplEngine(ue.ROOT_KEY_TPL, {
                appkey: n,
                userId: s
            })
        }
        var t = e.prototype;
        return t.set = function(e, t) {
            this._pullTimes[e] = t,
            yn.Session.set(this._rootKey, this._pullTimes)
        }
        ,
        t.get = function(e) {
            var t;
            return t = yn.isEmpty(this._pullTimes) ? yn.Session.get(this._rootKey) || {} : this._pullTimes,
            t[e] || 0
        }
        ,
        t.setByMessage = function(e) {
            var t = e.sentTime
              , n = e.targetId
              , s = this.get(n);
            s < t && this.set(n, t)
        }
        ,
        e
    }(), Bs = function() {
        function e(e) {
            this._rootKey = void 0,
            this._joinedChatRoomInfos = [],
            e = e || {};
            var t = e
              , n = t.appkey
              , s = t.userId;
            this._rootKey = yn.tplEngine(Ce.ROOT_KEY_TPL, {
                appkey: n,
                userId: s
            })
        }
        var t = e.prototype;
        return t.set = function(e) {
            var t = this
              , n = e.chrmId
              , s = e.count
              , i = e.isOpenJoinMulitpleChrmService
              , r = yn.copy(this._joinedChatRoomInfos);
            i ? (yn.forEach(r, function(n, s) {
                n.chrmId === e.chrmId && t._joinedChatRoomInfos.splice(s, 1)
            }),
            this._joinedChatRoomInfos.push({
                chrmId: n,
                count: s
            })) : this._joinedChatRoomInfos = [{
                chrmId: n,
                count: s
            }],
            yn.Session.set(this._rootKey, this._joinedChatRoomInfos)
        }
        ,
        t.get = function() {
            return yn.isEmpty(this._joinedChatRoomInfos) ? yn.Session.get(this._rootKey) || [] : this._joinedChatRoomInfos
        }
        ,
        t.remove = function(e) {
            var t = this
              , n = yn.isEmpty(this._joinedChatRoomInfos) ? yn.Session.get(this._rootKey) : this._joinedChatRoomInfos;
            yn.isEmpty(n) || (yn.forEach(n, function(s, i) {
                if (s.chrmId === e)
                    return t._joinedChatRoomInfos.splice(i, 1),
                    n.splice(i, 1)
            }),
            yn.Session.set(this._rootKey, n))
        }
        ,
        t.clear = function() {
            this._joinedChatRoomInfos = [],
            yn.Session.remove(this._rootKey)
        }
        ,
        e
    }(), Gs = function(e) {
        return yn.isInclude(e, $)
    }, Ks = function(e) {
        return yn.isEqual(e, v.CONNECTED)
    }, Ys = function(e) {
        return yn.isEqual(e, v.CONNECTING)
    }, qs = {
        _delayTime: 0,
        setTime: function(e) {
            var t = yn.getCurrentTimestamp();
            qs._delayTime = t - e
        },
        getTime: function() {
            var e = qs._delayTime
              , t = yn.getCurrentTimestamp();
            return t - e
        }
    }, Hs = function(e) {
        return !e.type || !e.targetId || !yn.isObject(e.latestMessage) || yn.isUndefined(e.unreadMessageCount)
    }, js = function(e) {
        e = e || {};
        var t = e
          , n = t.targetId
          , s = t.type
          , i = k.PRIVATE
          , r = {
            messageType: q.TEXT,
            sentTime: qs.getTime(),
            content: {
                content: ""
            },
            senderUserId: n,
            targetId: n,
            type: s
        };
        return e.type = s || i,
        e.targetId = n || "",
        e.latestMessage = e.latestMessage || r,
        e
    }, Qs = function(e) {
        var t = []
          , n = [];
        return yn.forEach(e, function(e) {
            var s = e.hasMentiond
              , i = e.mentiondInfo;
            e.hasMentioned = s,
            e.mentionedInfo = i;
            var r = e.isTop || !1;
            r ? t.push(e) : n.push(e)
        }),
        {
            topConversationList: t,
            unToppedConversationList: n
        }
    }, Ws = function(e) {
        if (yn.isEmpty(e))
            return [];
        var t = Qs(e)
          , n = function(e) {
            return yn.quickSort(e, function(e, t) {
                e = e || {},
                t = t || {};
                var n = e.latestMessage || {}
                  , s = t.latestMessage || {}
                  , i = n.sentTime || 0
                  , r = s.sentTime || 0;
                return r <= i
            })
        }
          , s = n(t.topConversationList)
          , i = n(t.unToppedConversationList);
        return s.push.apply(s, i),
        s
    }, Js = function(e) {
        var t = e.type
          , n = e.targetId;
        return t + "_" + n
    }, Xs = {
        _dataType: {
            Tail: 48,
            Compressed: 64,
            NormalExt: 80,
            Normal: 96,
            Mark: 112
        },
        _chars: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
        _scale: 62,
        _max: 238327,
        _indexOf: function(e, t, n) {
            var s = {
                length: 0,
                offset: -1
            };
            if (n >= t.length - 1)
                return s;
            var r = t.charAt(n)
              , o = t.charAt(n + 1)
              , a = e[r + o];
            if (a[0] === n)
                return s;
            for (var d = t.length - n, l = 0, u = a.length; l < u; l++) {
                var p = a[l]
                  , c = n - p;
                if (!(c > Xs._max)) {
                    var E = _(d, c);
                    if (E <= s.length)
                        break;
                    if (!(2 < s.length && t.charAt(p + s.length - 1) !== t.charAt(n + s.length - 1))) {
                        for (var f = 2, T = f; T < E && t.charAt(p + T) === t.charAt(n + T); T++)
                            f++;
                        f >= s.length && (s.length = f,
                        s.offset = p)
                    }
                }
            }
            return s
        },
        _numberEncode: function(e) {
            var t = []
              , n = 0;
            do
                n = e % Xs._scale,
                t.push(Xs._chars.charAt(n)),
                e = (e - n) / Xs._scale;
            while (0 < e);return t.join("")
        },
        _numberDecode: function(e) {
            for (var t = 0, n = 0, s = e.length - 1; 0 <= s; s--) {
                if (n = Xs._chars.indexOf(e.charAt(s)),
                -1 === n)
                    throw new Error("decode number error, data is '" + e + "'");
                t = t * Xs._scale + n
            }
            return t
        },
        compress: function(e) {
            for (var t = {}, s = 0; s < e.length - 1; s++) {
                var o = e.charAt(s)
                  , a = e.charAt(s + 1)
                  , d = o + a;
                if (!t.hasOwnProperty(d)) {
                    t[d] = [s];
                    continue
                }
                t[d].push(s)
            }
            for (var l = [], u = [], c = function() {
                if (0 < u.length) {
                    var e = u.join("");
                    if (u = [],
                    26 < e.length) {
                        var t = Xs._numberEncode(e.length)
                          , s = n(Xs._dataType.NormalExt | t.length);
                        l.push(s + t)
                    } else {
                        var i = n(Xs._dataType.Normal | e.length);
                        l.push(i)
                    }
                    l.push(e)
                }
            }, m = 0, E; m < e.length; ) {
                if (E = Xs._indexOf(t, e, m),
                2 > E.length) {
                    u.push(e.charAt(m++));
                    continue
                }
                if (4 > E.length) {
                    u.push(e.substr(m, E.length)),
                    m += E.length;
                    continue
                }
                var f = Xs._numberEncode(m - E.offset)
                  , _ = Xs._numberEncode(E.length);
                if (f.length + _.length >= E.length) {
                    u.push(e.substr(m, E.length)),
                    m += E.length;
                    continue
                }
                c();
                var T = n(Xs._dataType.Compressed | f.length << 2 | _.length);
                l.push(T + f + _),
                m += E.length
            }
            c();
            var S = Xs._numberEncode(e.length)
              , I = n(Xs._dataType.Tail | S.length);
            return l.push(I + S),
            l.join("")
        },
        uncompress: function(e) {
            var t = 0
              , n = "";
            label1: do {
                var s = e.charCodeAt(t++)
                  , r = s & Xs._dataType.Mark
                  , o = 15 & s;
                switch (r) {
                case Xs._dataType.Compressed:
                    var a = o >> 2
                      , d = 3 & o;
                    if (0 == a || 0 === d)
                        throw new Error("Data parsing error,at " + t);
                    var l = Xs._numberDecode(e.substr(t, a))
                      , u = Xs._numberDecode(e.substr(t += a, d));
                    if (l = n.length - l,
                    l + u > n.length)
                        throw new Error("Data parsing error,at " + t);
                    t += d,
                    n += n.substr(l, u);
                    break;
                case Xs._dataType.Tail:
                    var p = Xs._numberDecode(e.substr(t, o));
                    if (p !== n.length)
                        throw new Error("Data parsing error,at " + t);
                    t += o;
                    break label1;
                case Xs._dataType.NormalExt:
                    var c = Xs._numberDecode(e.substr(t, o));
                    n += e.substr(t += o, c),
                    t += c;
                    break;
                case Xs._dataType.Normal:
                    n += e.substr(t, o),
                    t += o;
                    break;
                case Xs._dataType.Mark:
                    if (10 < o)
                        throw new Error("Data parsing error,at " + t);
                    n += e.substr(t, 16 + o),
                    t += 16 + o;
                    break;
                default:
                    throw new Error("Data parsing error,at " + t + " header:" + r);
                }
            } while (t < e.length);return n
        }
    }, zs = function() {
        var e = yn.Session.get(de);
        return yn.isEmpty(e) && (e = yn.getUUID22().slice(0, 10),
        yn.Session.set(de, e)),
        e
    }, Zs = function() {
        var e = yn.Storage.get(ae);
        return yn.isEmpty(e) && (e = yn.getUUID22(),
        yn.Storage.set(ae, e)),
        e
    }, $s = function() {
        return Ds("{brower}|{version}|{sessionId}", {
            brower: Be.system.model,
            version: Be.system.version,
            sessionId: zs()
        })
    }, ei = {
        isConnected: Ks,
        isConnecting: Ys,
        isDisconnected: function(e) {
            return !Ks(e) && !Ys(e)
        },
        getConnectType: function(e) {
            var t = e.connectType
              , n = t === V.WEBSOCKET
              , s = n && yn.isSupportSocket();
            return s ? V.WEBSOCKET : V.COMET
        },
        getTransporterUrl: function(e) {
            var t = e.domain
              , n = e.appkey
              , s = e.token
              , i = e.connectType
              , r = e.protocol
              , o = e.pid
              , a = i === V.COMET
              , d = a ? "{protocol}//{domain}/websocket?appId={appkey}&token={token}&apiVer={apiVer}&sdkVer=" + T + "&pid={pid}" : "{protocol}//{domain}/websocket?appId={appkey}&token={token}&apiVer={apiVer}&sdkVer=" + T;
            Us(r) && (r = a ? Be.protocol.http : Be.protocol.ws);
            var l = {
                domain: t,
                appkey: n,
                protocol: r,
                apiVer: Be.isFromUniapp ? "uniapp" : "normal",
                token: yn.encodeURI(s)
            };
            return a && yn.extend(l, {
                pid: o
            }),
            Be.isMini && (d = "{protocol}//{domain}/websocket?appId={appkey}&token={token}&apiVer={apiVer}&sdkVer=" + T + "&platform={platform}",
            yn.extend(l, {
                platform: ye.MINI
            })),
            Ds(d, l)
        },
        isGroup: function(e) {
            return e === k.GROUP
        },
        isChatRoom: function(e) {
            return e === k.CHATROOM
        },
        getConversationTypeList: Ls,
        isValidConversationType: function(e) {
            var t = Ls();
            return yn.isNumber(e) && yn.isInclude(t, e)
        },
        getUIDByToken: function(e) {
            return yn.md5(e).slice(8, 16)
        },
        getSessionId: function(e) {
            var t = e.isStatusMessage
              , n = e.isPersited
              , s = e.isCounted
              , i = e.isMentiond
              , r = e.disableNotification
              , o = e.canIncludeExpansion;
            t && (n = s = !1);
            var a = 0;
            return n && (a |= 1),
            s && (a |= 2),
            i && (a |= 4),
            r && (a |= 32),
            o && (a |= 64),
            a
        },
        getMessageOptionByStatus: function(e) {
            var t = !0
              , n = !0
              , s = !1
              , i = !1
              , r = J.READ
              , o = !1
              , a = !1;
            return t = !!(16 & e),
            n = !!(32 & e),
            s = !!(64 & e),
            i = !!(256 & e),
            a = !!(2 & e),
            r = a ? J.RETRIEVED : r,
            o = !!(1024 & e),
            {
                isPersited: t,
                isCounted: n,
                isMentiond: s,
                disableNotification: i,
                receivedStatus: r,
                canIncludeExpansion: o
            }
        },
        SignalId: Ps,
        MessageTimeSyner: ks,
        ChatRoomMessageTimeSyner: Fs,
        JoinedChatRoomSyner: Bs,
        getCMPDomainList: function(e, t) {
            var n = e.server
              , s = e.backupServer;
            n = n || "",
            s = s || "";
            var i = s.split(ee)
              , r = [];
            return yn.isEmpty(n) || r.push(n),
            yn.forEach(i, function(e) {
                yn.isEmpty(e) || r.push(e)
            }),
            yn.isUndefined(t.customCMP) || yn.isEmpty(t.customCMP) || (r = t.customCMP),
            r
        },
        getNaviListByToken: function(e) {
            var t = [];
            if (Gs(e)) {
                var n = yn.indexOf(e, $)
                  , s = e.substring(n + 1, e.length)
                  , i = s.split(";");
                yn.forEach(i, function(e) {
                    Us(e) || t.push(e)
                })
            }
            return t
        },
        getValidToken: function(e) {
            if (Gs(e)) {
                var t = yn.indexOf(e, $);
                e = e.substring(0, t + 1)
            }
            return e
        },
        RCSocket: ws,
        RCStorage: xs,
        getNavReqOption: function(e, t) {
            return e = yn.copy(e),
            e.token = t.token,
            e
        },
        getPingTimeout: function(e) {
            var t = 3 * e;
            return t < Z ? Z : t > z ? z : t
        },
        fixConversationData: js,
        sortConversationList: function(e) {
            return yn.isEmpty(e) ? [] : yn.quickSort(e, function(e, t) {
                e = e || {},
                t = t || {};
                var n = e.latestMessage || {}
                  , s = t.latestMessage || {}
                  , i = n.sentTime || 0
                  , r = s.sentTime || 0
                  , o = !1;
                return o = (!e.isTop || t.isTop) && (!e.isTop && t.isTop || r <= i),
                o
            })
        },
        DelayTimer: qs,
        isSupportStatusMessage: function(e) {
            return !!wn[e]
        },
        getConversationKey: Js,
        getConversationByKey: function(e) {
            e = e || "";
            var t = e.split("_");
            return 2 === t.length ? {
                type: t[0],
                targetId: t[1]
            } : {
                type: k.PRIVATE,
                targetId: ""
            }
        },
        getChatRoomKVOptStatus: function(e, t) {
            var n = 0;
            return e.isAutoDelete && (n |= Dn.AUTO_DELETE),
            e.isOverwrite && (n |= Dn.OVERWRITE),
            yn.isEqual(t, Q.DELETE) && (n |= Dn.OPERATE),
            n
        },
        getChatRoomKVByStatus: function(e) {
            var t = !!(e & Dn.OPERATE);
            return {
                isAutoDelete: !!(e & Dn.AUTO_DELETE),
                isOverwrite: !!(e & Dn.OVERWRITE),
                type: t ? Q.DELETE : Q.UPDATE
            }
        },
        TextCompressor: Xs,
        isBelowIE: function(e) {
            var t = Be.system
              , n = !!("IE" === t.model && +t.version < e);
            return n
        },
        getReportLogUrl: function(e) {
            var t = ""
              , n = Be.protocol.http + "//"
              , s = {
                protocol: n,
                url: e.url,
                version: T,
                appkey: e.appkey,
                deviceId: Zs(),
                deviceInfo: $s(),
                platform: "Web",
                userId: e.userId
            };
            switch (e.type) {
            case As.REALTIME:
                t = Ds("{protocol}{url}?version={version}&appkey={appkey}&userId={userId}&deviceId={deviceId}&deviceInfo={deviceInfo}&platform={platform}", s);
                break;
            case As.FULL:
                t = Ds("{protocol}{url}?version={version}&appkey={appkey}&userId={userId}&logId={logId}&deviceId={deviceId}&deviceInfo={deviceInfo}&platform={platform}", yn.extend(s, {
                    logId: e.logId
                }));
                break;
            default:
            }
            return t
        },
        isLogCommandMsg: function(e) {
            var t = e.content;
            return e.messageType === q.LOG_COMMAND && e.senderUserId === "rongcloudsystem" && "Web" === t.platform
        },
        getWebSessionId: zs,
        getDeviceId: Zs,
        stringToCsv: function(e) {
            var t = e.replace(/"/g, "\"\"");
            return Ds("\"{csvStr}\"", {
                csvStr: t
            })
        },
        isValidChatRoomKey: function(e) {
            if (yn.isString(e)) {
                var t = /^[A-Za-z0-9_=+-]+$/.test(e)
                  , n = e.length
                  , s = n <= te.MAX && n >= te.MIN;
                return t && s
            }
        },
        isValidChatRoomValue: function(e) {
            if (yn.isString(e)) {
                var t = e.length;
                return t <= ne.MAX && t >= ne.MIN
            }
        },
        genUploadFileName: function(e, t) {
            var n = s(1e3 * Math.random() % 1e4), i = yn.getUUID(), r, o;
            return t && (r = t.split("."),
            o = "." + r[r.length - 1]),
            Ds("{type}__RC-{date}_{random}_{timestamp}{uuid}{extension}", {
                type: e,
                date: yn.formateDate("-"),
                random: n,
                uuid: i,
                timestamp: qs.getTime(),
                extension: o || ""
            })
        },
        getUploadFileDomains: function(e) {
            var t = e.uploadServer
              , n = e.bosAddr;
            return {
                qiniu: t,
                bos: n
            }
        },
        mergeConversationList: function(e) {
            e = e || {};
            var t = e
              , n = t.conversationList
              , s = t.updatedConversationList
              , i = s.concat(n)
              , r = {}
              , o = []
              , a = [];
            return yn.forEach(i, function(e) {
                if (yn.isObject(e)) {
                    var t = Js(e)
                      , n = r[t] || {}
                      , s = yn.isUndefined(n.index) ? o.length : n.index
                      , i = n.val || {}
                      , d = i.updatedItems || {}
                      , l = e.updatedItems || {};
                    e = yn.extend(e, i),
                    yn.forEach(d, function(t, n) {
                        e[n] = t.val
                    }),
                    yn.forEach(l, function(t, n) {
                        var s = d[n] || {}
                          , i = s.time || 0;
                        t.time > i && (e[n] = t.val)
                    }),
                    r[t] = {
                        index: s,
                        val: e
                    },
                    o[s] = e,
                    Hs(e) && a.push(s)
                }
            }),
            yn.forEach(a, function(e) {
                var t = o[e];
                o[e] = js(t)
            }),
            o = Ws(o),
            yn.map(o, function(e) {
                return delete e.updatedItems,
                e
            })
        },
        sortConList: Ws,
        getUpMessageOptionBySessionId: function(e) {
            var t = !1
              , n = !1
              , s = !1
              , i = !1;
            return t = !!(1 & e),
            n = !!(2 & e),
            s = !!(16 & e),
            i = !!(64 & e),
            {
                isPersited: t,
                isCounted: n,
                disableNotification: s,
                canIncludeExpansion: i
            }
        },
        isVoipMessage: function(e) {
            var t = !1
              , n = e.type
              , s = e.messageType;
            return (12 === n || -1 < he.indexOf(s)) && (t = !0),
            t
        },
        isExpansionNotifyMsg: function(e) {
            return e.messageType === q.EXPANSION_NOTIFY
        },
        validateExpansion: function(e) {
            var t = /^[A-Za-z0-9_=+-]+$/
              , n = yn.getObjectKeys(e).length;
            if (yn.isEmpty(e) || !yn.isObject(e))
                return S.ILLGAL_PARAMS;
            if (n > Re.MSG)
                return S.EXPANSION_LIMIT_EXCEET;
            var s;
            return yn.forEach(e, function(e, n) {
                return yn.isString(e) ? n.length > Re.KEY || e.length > Re.VALUE ? s = S.EXPANSION_LIMIT_EXCEET : t.test(n) ? void 0 : s = S.ILLGAL_PARAMS : void 0
            }),
            s
        },
        formatExtraContent: function(e) {
            var t = {}
              , n = yn.parseJSON(e);
            return yn.forEach(n, function(e, n) {
                t[n] = e.v
            }),
            t
        }
    }, ti = yn.EventEmitter, ni = yn.DeferHandler, si = yn.Timer, ii = ei.RCSocket, ri = {
        CONNECT: "connect",
        PING: "ping"
    }, oi = function() {
        function e(e, t) {
            this._transporter = void 0,
            this._timer = void 0,
            t = t || {};
            var n = t.timeout;
            this._transporter = e,
            this._timer = new si({
                type: Se.INTERVAL,
                timeout: n
            })
        }
        var t = e.prototype;
        return t.check = function(e) {
            var t = this._transporter
              , n = t._deferHandler
              , s = new ns;
            return t.sendSignal(s),
            yn.deferred(function(t, s) {
                n.add(ri.PING, {
                    resolve: t,
                    reject: s
                }, {
                    timeout: e
                })
            })
        }
        ,
        t.start = function(e, t) {
            var n = this;
            n._timer.start(function() {
                n.check(e).then(yn.noop)["catch"](t)
            })
        }
        ,
        t.stop = function() {
            this._timer && this._timer.stop()
        }
        ,
        e
    }(), ai = function() {
        function e(e) {
            this._socket = void 0,
            this._option = void 0,
            this._transporterEventEmiiter = new ti,
            this._deferHandler = new ni,
            this._heartbeat = new oi(this,{
                timeout: 3e4
            }),
            this._connectedTime = void 0,
            this._timer = void 0,
            this._option = e,
            this._timer = new si({
                type: Se.TIMEOUT,
                timeout: 1e4
            })
        }
        var t = e.prototype;
        return t._createSocket = function(e) {
            var t = this
              , n = t._transporterEventEmiiter
              , s = new ii({
                url: e
            })
              , i = function(e) {
                e = e || {};
                var s = e.code || b.CLOSE_ABNORMAL;
                n.emit(ys.STATUS, s),
                t.disconnect()
            };
            return s.onMessage(function(e) {
                var n = e.data;
                if (!yn.isArrayBuffer(n))
                    throw new Error("Error socket signal");
                var s = ms(n);
                t.handleSignal(s)
            }),
            s.onError(i),
            s.onClose(i),
            s
        }
        ,
        t._startHeartbeat = function(e) {
            var t = this
              , n = t._heartbeat
              , s = t._transporterEventEmiiter;
            n.check(1e3).then(yn.noop)["catch"](function() {
                s.emit(ys.STATUS, b.PING_FIRST_TIMEOUT),
                t.disconnect()
            });
            var i = ei.getPingTimeout(e);
            n.start(i, function() {
                s.emit(ys.STATUS, b.PING_TIMEOUT),
                t.disconnect()
            })
        }
        ,
        t._stopHeartbeat = function() {
            this._heartbeat.stop()
        }
        ,
        t.watchSignal = function(e) {
            this._transporterEventEmiiter.on(ys.SIGNAL, e)
        }
        ,
        t.watchStatus = function(e) {
            this._transporterEventEmiiter.on(ys.STATUS, e)
        }
        ,
        t.connect = function(e, t) {
            var n = this
              , s = n._option
              , i = s.appkey
              , r = s.connectType
              , o = n._deferHandler
              , a = e.token
              , d = t.domain
              , l = ei.getTransporterUrl({
                domain: d,
                appkey: i,
                connectType: r,
                token: a
            })
              , u = yn.getCurrentTimestamp();
            return n._socket = this._createSocket(l),
            n._timer.start(function() {
                n.disconnect(),
                o.reject(ri.CONNECT, {
                    status: b.CMP_CONNECTION_TIMEOUT
                })
            }),
            yn.deferred(function(e, t) {
                o.add(ri.CONNECT, {
                    resolve: e,
                    reject: t
                })
            }).then(function(e) {
                var t = yn.getCurrentTimestamp();
                return n._startHeartbeat(t - u),
                n._timer.stop(),
                e
            })
        }
        ,
        t.sendSignal = function(e) {
            var t = e.getBufferData();
            this._socket.send(t.buffer)
        }
        ,
        t.handleSignal = function(e) {
            var t = this._transporterEventEmiiter
              , n = this._deferHandler;
            e instanceof Jn ? this.handleConnAck(e) : e instanceof ss ? n.resolve(ri.PING) : t.emit(ys.SIGNAL, e),
            e && yn.isValidTimestamp(e.timestamp) && ei.DelayTimer.setTime(e.timestamp)
        }
        ,
        t.handleConnAck = function(e) {
            var t = this
              , n = t._deferHandler
              , s = e.status
              , i = s === Cn
              , r = i ? n.resolve : n.reject;
            r.call(n, ri.CONNECT, e),
            i && (t._connectedTime = yn.getCurrentTimestamp())
        }
        ,
        t.disconnect = function() {
            this._stopHeartbeat(),
            this._socket && this._socket.close()
        }
        ,
        e
    }(), di = new yn.EventEmitter, li = "log", gi = Ms, ui = {
        isDebug: !1,
        isUploadToServer: !0,
        appkey: "",
        userId: "",
        isNetworkUnavailable: !0
    }, pi = !1, ci = 1, mi = !1, Ei = "", fi = function(e) {
        return 2e4 === e
    }, _i = function(e) {
        var t = gi.realtimeInterval;
        return t * E(2, e - 1)
    }, Ti = function(e) {
        var t = gi.fullInterval;
        return t * E(2, e - 1)
    }, Si = function(e) {
        e = e || {};
        var t = e.content || {};
        return yn.forEach(t, function(e, n) {
            (yn.isObject(e) || yn.isArray(e)) && (t[n] = yn.toJSON(e))
        }),
        t = yn.toJSON(t) || "\"\"",
        t = ei.stringToCsv(t),
        yn.tplEngine("{sessionId},{time},{type},{level},{tag},{content}\n", {
            sessionId: ei.getWebSessionId(),
            time: e.time,
            type: e.type,
            level: e.level,
            tag: e.tag,
            content: t
        })
    }, Ii = function(e) {
        var t = yn.parseJSON(e || "")
          , n = t.nextTime
          , s = t.level
          , i = t.logSwitch;
        if (!yn.isEmpty(t)) {
            var r = !!i;
            gi.isOpen = r,
            r && yn.extend(gi, {
                realtimeLevel: +s,
                realtimeInterval: 1e3 * +n
            })
        }
    }, yi = function(e) {
        e = e || {};
        var t = ui
          , n = t.isNetworkUnavailable
          , s = e
          , i = s.level
          , r = yn.isEqual(i, hs.ERROR) || yn.isEqual(i, hs.WARN);
        return n && r && (e.level = hs.INFO),
        e
    }, Ci = {
        _list: [],
        MaxSize: ei.isBelowIE(9) ? Rs.LOW : Rs.ADVANCED,
        add: function(e) {
            e = yi(e),
            Ci._list.push(e);
            var t = Ci._list.length
              , n = Ci.MaxSize;
            t > n && Ci._list.splice(0, t - n)
        },
        get: function(e) {
            var t = e.type
              , n = e.level
              , s = Ci._list
              , i = [];
            return yn.forEach(s, function(s, r) {
                var o = s.time || 0
                  , a = s.level || hs.DEBUG
                  , d = e.fullUploadOption || {}
                  , l = d.startTime || 0
                  , u = d.endTime || ei.DelayTimer.getTime()
                  , p = a <= n;
                switch (t) {
                case As.REALTIME:
                    p = p && !s.isUploaded,
                    p && (Ci._list[r].isUploaded = !0);
                    break;
                case As.FULL:
                    p = p && o >= l && o <= u;
                    break;
                default:
                }
                p && i.push(s)
            }),
            i
        },
        clear: function() {
            Ci._list = []
        }
    }, hi = function(e) {
        var t = e.url
          , n = e.logList
          , s = e.type
          , i = ei.getReportLogUrl({
            type: s,
            appkey: ui.appkey || "",
            userId: ui.userId || "",
            url: t || gi.url || Ms.url,
            logId: e.logId
        })
          , r = "";
        return (yn.forEach(n, function(e) {
            r += Si(e)
        }),
        yn.isEmpty(r) && s === As.REALTIME) ? yn.Defer.reject() : (yn.isEmpty(r) && s === As.FULL && (r = "nodata"),
        r = ei.TextCompressor.compress(r),
        yn.request(i, {
            method: re.POST,
            body: r,
            timeout: 15e3
        }))
    }, Ri = function e() {
        if (!mi) {
            var t = _i(ci)
              , n = gi.realtimeMaxTimes
              , s = gi.realtimeLevel;
            ci < n && ci++,
            fi(t) && (ci = 1),
            yn.setTimeout(function() {
                var t = Ci.get({
                    type: As.REALTIME,
                    level: s
                });
                mi = !0,
                hi({
                    logList: t,
                    type: As.REALTIME
                }).then(function(t) {
                    mi = !1;
                    var n = t.responseText || "{}"
                      , s = t.responseText || {};
                    Ii(n),
                    gi.isOpen && (ci = yn.isEmpty(s) ? ci : 1,
                    e())
                })["catch"](function() {
                    mi = !1,
                    e()
                })
            }, t)
        }
    }, Oi = function e(t, n, s) {
        if (ui.isUploadToServer && !Be.isMini) {
            t = t || 0,
            n = n || {};
            var i = n
              , r = i.uri
              , o = i.logId
              , a = 0 === t
              , d = a ? 0 : Ti(t)
              , l = gi.fullMaxTimes
              , u = gi.fullLevel;
            if (Ei !== o) {
                if (t <= l)
                    t++;
                else
                    return;
                Ei = o,
                function(n) {
                    yn.setTimeout(function() {
                        var i = Ci.get({
                            type: As.FULL,
                            level: u,
                            fullUploadOption: n
                        });
                        0 === i.length && +n.endTime < s || hi({
                            logId: o,
                            url: r,
                            logList: i,
                            type: As.FULL
                        }).then(function() {})["catch"](function() {
                            e(t, n, s)
                        })
                    }, d)
                }(n)
            }
        }
    }, Ni = function(e) {
        var t = e.time
          , n = yn.formatTime(t)
          , s = "[Rong]" + ":" + n + ": " + yn.toJSON(e);
        di.emit(li, s),
        ui.isDebug && yn.consoleLog(s)
    }, vi = {
        _events: [],
        LogStore: Ci,
        setOption: function(e) {
            ui = yn.extend(ui, e)
        },
        setServerOption: function(e) {
            var t = e.logSwitch
              , n = e.logPolicy
              , s = !!t;
            if (!yn.isEmpty(e) && (gi.isOpen = s,
            !!s)) {
                var i = yn.parseJSON(n || "") || {}
                  , r = i.url
                  , o = i.level
                  , a = i.itv
                  , d = i.times;
                yn.extend(gi, {
                    url: r,
                    realtimeLevel: +o,
                    realtimeInterval: 1e3 * +a,
                    realtimeMaxTimes: +d
                })
            }
        },
        watchLog: function(e) {
            di.on(li, e),
            vi._events.push(e)
        },
        write: function(e) {
            e = e || {},
            e.tag = e.tag || Ns.L_CRASH_E,
            e.time = e.time || ei.DelayTimer.getTime(),
            e.type = e.type || Os.IM,
            Ci.add(e),
            Ni(e)
        },
        fatal: function(e, t) {
            vi.write({
                tag: e,
                content: t,
                level: hs.FATAL
            })
        },
        error: function(e, t) {
            vi.write({
                tag: e,
                content: t,
                level: hs.ERROR
            })
        },
        warn: function(e, t) {
            vi.write({
                tag: e,
                content: t,
                level: hs.WARN
            })
        },
        info: function(e, t) {
            vi.write({
                tag: e,
                content: t,
                level: hs.INFO
            })
        },
        debug: function(e, t) {
            vi.write({
                tag: e,
                content: t,
                level: hs.DEBUG
            })
        },
        startRealtimeUpload: function() {
            pi || (ui.isUploadToServer && !Be.isMini && Ri(),
            pi = !0)
        },
        resetRealtimeUpload: function() {
            ci = 1
        },
        uploadFull: Oi,
        isIgnoreErrorCode: function(e) {
            return -1 < yn.indexOf(bs, e)
        }
    }, Ai = yn.EventEmitter, Mi = yn.DeferHandler, bi = yn.httpRequest, Ui = yn.request, Di = yn.Defer, Li = function() {
        function e(e) {
            this._option = void 0,
            this._transporterEventEmiiter = new Ai,
            this._deferHandler = new Mi,
            this._pid = yn.encodeURI(yn.getCurrentTimestamp() + Math.random() + ""),
            this._domain = void 0,
            this._sessionid = void 0,
            this._xhrCache = new yn.Cache,
            this._pullSignalTimer = new yn.Timer({
                timeout: X
            }),
            this._isDisconnected = !0,
            this._option = e
        }
        var t = e.prototype;
        return t._startPullSignal = function() {
            var e = this
              , t = e._domain
              , n = e._sessionid
              , s = e._pid
              , i = e._transporterEventEmiiter
              , r = e._pullSignalTimer
              , o = yn.getCurrentTimestamp()
              , a = Be.protocol.http
              , d = yn.tplEngine("{protocol}//{domain}/pullmsg.js?sessionid={sessionId}&timestrap={timestamp}&pid={pid}", {
                protocol: a,
                timestamp: o,
                domain: t,
                sessionId: n,
                pid: s
            })
              , l = bi({
                url: d,
                body: {
                    pid: s
                },
                timeout: X,
                success: function(t) {
                    r.stop();
                    var n = e.handleCometResponse(t);
                    n ? !e._isDisconnected && e._startPullSignal() : !e._isDisconnected && i.emit(ys.STATUS, b.COMET_REQUEST_ERROR),
                    e._xhrCache.remove(d)
                },
                fail: function() {
                    r.stop(),
                    e._isDisconnected || i.emit(ys.STATUS, b.COMET_REQUEST_ERROR),
                    e._xhrCache.remove(d)
                }
            });
            r.start(function() {
                e._isDisconnected || (i.emit(ys.STATUS, b.PING_TIMEOUT),
                e.disconnect())
            }),
            e._xhrCache.set(d, l)
        }
        ,
        t.watchSignal = function(e) {
            this._transporterEventEmiiter.on(ys.SIGNAL, e)
        }
        ,
        t.watchStatus = function(e) {
            this._transporterEventEmiiter.on(ys.STATUS, function(t) {
                e && e(t)
            })
        }
        ,
        t.connect = function(e, t) {
            var n = this
              , s = n._pid
              , i = n._option
              , r = i.appkey
              , o = i.connectType
              , a = e.token
              , d = t.domain
              , l = ei.getTransporterUrl({
                domain: d,
                appkey: r,
                token: a,
                connectType: o,
                pid: s
            });
            n._domain = d,
            n._isDisconnected = !1;
            return Ui(l, {
                body: {
                    pid: s
                }
            }).then(function(e) {
                var t = e.responseText;
                if (!yn.isValidJSON(t))
                    return Di.reject();
                var n = yn.isObject(t) ? t : yn.parseJSON(t)
                  , s = yn.isEqual(n.status, Cn);
                return s && yn.isObject(n) && yn.isValidTimestamp(n.timestamp) && ei.DelayTimer.setTime(n.timestamp),
                s ? Di.resolve(n) : Di.reject(n)
            }).then(function(e) {
                return n._sessionid = e.sessionid,
                n._startPullSignal(),
                e
            })
        }
        ,
        t.sendSignal = function(e) {
            var t = this
              , n = t._domain
              , s = t._sessionid
              , i = t._pid
              , r = e.messageId
              , o = e.topic
              , a = e.targetId
              , d = e.getHeaderFlag()
              , l = Be.protocol.http
              , u = o ? "{protocol}//{domain}/websocket?messageid={messageId}&header={headerCode}&sessionid={sessionId}&topic={topic}&targetid={targetId}&pid={pid}" : "{protocol}//{domain}/websocket?messageid={messageId}&header={headerCode}&sessionid={sessionId}&pid={pid}"
              , p = yn.tplEngine(u, {
                protocol: l,
                messageId: r,
                headerCode: d,
                topic: o,
                targetId: a,
                pid: i,
                sessionId: s,
                domain: n
            })
              , c = yn.getCurrentTimestamp() + ""
              , m = bi({
                url: p,
                method: re.POST,
                body: e.getCometData(),
                success: function(e) {
                    var n = t.handleCometResponse(e);
                    n || t.handleError(r),
                    t._xhrCache.remove(c)
                },
                fail: function(e) {
                    t.handleError(r),
                    t._xhrCache.remove(c),
                    vi.error(Ns.L_COMET_SEND_SIGNAL_E, {
                        content: {
                            info: "comet error",
                            error: e
                        }
                    })
                }
            });
            t._xhrCache.set(c, m)
        }
        ,
        t.handleCometResponse = function(e) {
            var t = this
              , n = t._transporterEventEmiiter
              , s = yn.isString(e) ? yn.parseJSON(e) : e;
            return !!s && (!(s && yn.isArray(s)) || (yn.forEach(s, function(e) {
                var s = e.sessionid;
                s && (t._sessionid = s);
                var i = Es(e);
                n.emit(ys.SIGNAL, i),
                i && yn.isValidTimestamp(i.timestamp) && ei.DelayTimer.setTime(i.timestamp)
            }),
            !0))
        }
        ,
        t.handleError = function(e, t) {
            var n = {
                messageId: e,
                status: t || I.TIMEOUT
            };
            this._transporterEventEmiiter.emit(ys.SIGNAL, n)
        }
        ,
        t.disconnect = function() {
            var e = this;
            e._isDisconnected = !0;
            var t = e._xhrCache
              , n = e._pullSignalTimer
              , s = t.getKeys();
            n.stop(),
            yn.forEach(s, function(e) {
                var n = t.get(e);
                n.abort(),
                t.remove(e)
            })
        }
        ,
        e
    }(), Pi = function(e) {
        var t = e.connectType
          , n = t === V.WEBSOCKET
          , s = n ? ai : Li;
        return new s(e)
    }, wi = {
        UpStreamMessage: "UpStreamMessage",
        DownStreamMessage: "DownStreamMessage",
        DownStreamMessages: "DownStreamMessages",
        SessionsAttQryInput: "SessionsAttQryInput",
        SessionsAttOutput: "SessionsAttOutput",
        SyncRequestMsg: "SyncRequestMsg",
        ChrmPullMsg: "ChrmPullMsg",
        NotifyMsg: "NotifyMsg",
        HistoryMsgInput: "HistoryMsgInput",
        HistoryMsgOuput: "HistoryMsgOuput",
        RelationQryInput: "RelationQryInput",
        RelationsOutput: "RelationsOutput",
        DeleteSessionsInput: "DeleteSessionsInput",
        SessionInfo: "SessionInfo",
        DeleteSessionsOutput: "DeleteSessionsOutput",
        RelationsInput: "RelationsInput",
        DeleteMsgInput: "DeleteMsgInput",
        CleanHisMsgInput: "CleanHisMsgInput",
        SessionMsgReadInput: "SessionMsgReadInput",
        ChrmInput: "ChrmInput",
        QueryChatRoomInfoInput: "QueryChatRoomInfoInput",
        QueryChatRoomInfoOutput: "QueryChatRoomInfoOutput",
        RtcInput: "RtcInput",
        RtcUserListOutput: "RtcUserListOutput",
        SetUserStatusInput: "SetUserStatusInput",
        RtcSetDataInput: "RtcSetDataInput",
        RtcUserSetDataInput: "RtcUserSetDataInput",
        RtcDataInput: "RtcDataInput",
        RtcSetOutDataInput: "RtcSetOutDataInput",
        MCFollowInput: "MCFollowInput",
        RtcTokenOutput: "RtcTokenOutput",
        RtcQryOutput: "RtcQryOutput",
        RtcQryUserOutDataInput: "RtcQryUserOutDataInput",
        RtcUserOutDataOutput: "RtcUserOutDataOutput",
        RtcQueryListInput: "RtcQueryListInput",
        RtcRoomInfoOutput: "RtcRoomInfoOutput",
        RtcValueInfo: "RtcValueInfo",
        RtcKeyDeleteInput: "RtcKeyDeleteInput",
        GetQNupTokenInput: "GetQNupTokenInput",
        GetQNupTokenOutput: "GetQNupTokenOutput",
        GetQNdownloadUrlInput: "GetQNdownloadUrlInput",
        GetQNdownloadUrlOutput: "GetQNdownloadUrlOutput",
        SetChrmKV: "SetChrmKV",
        ChrmKVOutput: "ChrmKVOutput",
        QueryChrmKV: "QueryChrmKV",
        ChrmNotifyMsg: "ChrmNotifyMsg",
        SetUserSettingInput: "SetUserSettingInput",
        SetUserSettingOutput: "SetUserSettingOutput",
        PullUserSettingInput: "PullUserSettingInput",
        PullUserSettingOutput: "PullUserSettingOutput",
        UserSettingNotification: "UserSettingNotification",
        SessionReq: "SessionReq",
        SessionStates: "SessionStates",
        SessionState: "SessionState",
        SessionStateItem: "SessionStateItem",
        SessionStateModifyReq: "SessionStateModifyReq",
        SessionStateModifyResp: "SessionStateModifyResp"
    }, xi = (Fi = {},
    Fi[wi.UpStreamMessage] = ["sessionId", "classname", "content", "pushText", "userId", "configFlag", "appData", "extraContent"],
    Fi[wi.DownStreamMessages] = ["list", "syncTime", "finished"],
    Fi[wi.DownStreamMessage] = ["fromUserId", "type", "groupId", "classname", "content", "dataTime", "status", "msgId", "extraContent"],
    Fi[wi.SessionsAttQryInput] = ["nothing"],
    Fi[wi.SessionsAttOutput] = ["inboxTime", "sendboxTime", "totalUnreadCount"],
    Fi[wi.SyncRequestMsg] = ["syncTime", "ispolling", "isweb", "isPullSend", "isKeeping", "sendBoxSyncTime"],
    Fi[wi.ChrmPullMsg] = ["syncTime", "count"],
    Fi[wi.NotifyMsg] = ["type", "time", "chrmId"],
    Fi[wi.HistoryMsgInput] = ["targetId", "time", "count", "order"],
    Fi[wi.HistoryMsgOuput] = ["list", "syncTime", "hasMsg"],
    Fi[wi.RelationQryInput] = ["type", "count", "startTime", "order"],
    Fi[wi.RelationsOutput] = ["info"],
    Fi[wi.DeleteSessionsInput] = ["sessions"],
    Fi[wi.SessionInfo] = ["type", "channelId"],
    Fi[wi.DeleteSessionsOutput] = ["nothing"],
    Fi[wi.RelationsInput] = ["type", "msg", "count", "offset", "startTime", "endTime"],
    Fi[wi.DeleteMsgInput] = ["type", "conversationId", "msgs"],
    Fi[wi.CleanHisMsgInput] = ["targetId", "dataTime", "conversationType"],
    Fi[wi.SessionMsgReadInput] = ["type", "msgTime", "channelId"],
    Fi[wi.ChrmInput] = ["nothing"],
    Fi[wi.QueryChatRoomInfoInput] = ["count", "order"],
    Fi[wi.QueryChatRoomInfoOutput] = ["userTotalNums", "userInfos"],
    Fi[wi.GetQNupTokenInput] = ["type", "key"],
    Fi[wi.GetQNdownloadUrlInput] = ["type", "key", "fileName"],
    Fi[wi.GetQNupTokenOutput] = ["deadline", "token", "bosToken", "bosDate", "path"],
    Fi[wi.GetQNdownloadUrlOutput] = ["downloadUrl"],
    Fi[wi.SetChrmKV] = ["entry", "bNotify", "notification", "type"],
    Fi[wi.ChrmKVOutput] = ["entries", "bFullUpdate", "syncTime"],
    Fi[wi.QueryChrmKV] = ["timestamp"],
    Fi[wi.ChrmNotifyMsg] = ["type", "time", "chrmId"],
    Fi[wi.SetUserSettingInput] = ["version", "value"],
    Fi[wi.SetUserSettingOutput] = ["version", "reserve"],
    Fi[wi.PullUserSettingInput] = ["version", "reserve"],
    Fi[wi.PullUserSettingOutput] = ["items", "version"],
    Fi[wi.SessionReq] = ["time"],
    Fi[wi.SessionStates] = ["version", "state"],
    Fi[wi.SessionState] = ["type", "channelId", "time", "stateItem"],
    Fi[wi.SessionStateItem] = ["sessionStateType", "value"],
    Fi[wi.SessionStateModifyReq] = ["version", "state"],
    Fi[wi.SessionStateModifyResp] = ["version"],
    Fi), Vi = {}, ki, Fi;
    yn.forEach(xi, function(e, t) {
        Vi[t] = function() {
            this.data = {}
        }
        ,
        Vi[t].prototype.getData = function() {
            return this.data
        }
        ,
        yn.forEach(e, function(e) {
            var n = "set" + yn.toUpperCase(e, 0, 1);
            Vi[t].prototype[n] = function(t) {
                this.data[e] = t
            }
        }),
        Vi[t].decode = function(e) {
            var t = {};
            yn.isString(e) && (e = yn.parseJSON(e));
            var n = function(n) {
                var s = "get" + yn.toUpperCase(n, 0, 1);
                t[n] = e[n],
                t[s] = function() {
                    return e[n]
                }
            };
            for (var s in e)
                n(s);
            return t
        }
    }),
    Vi.getModule = function(e) {
        var t = new Vi[e];
        return t.getArrayData = function() {
            return t.getData()
        }
        ,
        t
    }
    ;
    var Bi = "\npackage Modules;\nmessage probuf {\n  message " + wi.SetUserStatusInput + "\n  {\n    optional int32 status=1;\n  }\n\n  message SetUserStatusOutput\n  {\n    optional int32 nothing=1;\n  }\n\n  message GetUserStatusInput\n  {\n    optional int32 nothing=1;\n  }\n\n  message GetUserStatusOutput\n  {\n    optional string status=1;\n    optional string subUserId=2;\n  }\n\n  message SubUserStatusInput\n  {\n    repeated string userid =1;\n  }\n\n  message SubUserStatusOutput\n  {\n    optional int32 nothing=1; \n  }\n  message VoipDynamicInput\n  {\n    required int32  engineType = 1;\n    required string channelName = 2;\n    optional string channelExtra = 3;\n  }\n\n  message VoipDynamicOutput\n  {\n      required string dynamicKey=1;\n  }\n  message " + wi.NotifyMsg + " {\n    required int32 type = 1;\n    optional int64 time = 2;\n    optional string chrmId=3;\n  }\n  message " + wi.SyncRequestMsg + " {\n    required int64 syncTime = 1;\n    required bool ispolling = 2;\n    optional bool isweb=3;\n    optional bool isPullSend=4;\n    optional bool isKeeping=5;\n    optional int64 sendBoxSyncTime=6;\n  }\n  message " + wi.UpStreamMessage + " {\n    required int32 sessionId = 1;\n    required string classname = 2;\n    required bytes content = 3;\n    optional string pushText = 4;\n    optional string appData = 5;\n    repeated string userId = 6;\n    optional int64 delMsgTime = 7;\n    optional string delMsgId = 8;\n    optional int32 configFlag = 9;\n    optional int64 clientUniqueId = 10;\n    optional string extraContent = 11;\n  }\n  message " + wi.DownStreamMessages + " {\n    repeated DownStreamMessage list = 1;\n    required int64 syncTime = 2;\n    optional bool finished = 3;\n  }\n  message " + wi.DownStreamMessage + " {\n    required string fromUserId = 1;\n    required ChannelType type = 2;\n    optional string groupId = 3;\n    required string classname = 4;\n    required bytes content = 5;\n    required int64 dataTime = 6;\n    required int64 status = 7;\n    optional int64 extra = 8;\n    optional string msgId = 9;\n    optional int32 direction = 10;\n    optional int32 plantform =11;\n    optional int32 isRemoved = 12; \n    optional string source = 13; \n    optional int64 clientUniqueId = 14; \n    optional string extraContent = 15; \n\n  }\n  enum ChannelType {\n    PERSON = 1;\n    PERSONS = 2;\n    GROUP = 3;\n    TEMPGROUP = 4;\n    CUSTOMERSERVICE = 5;\n    NOTIFY = 6;\n    MC=7;\n    MP=8;\n  }\n  message CreateDiscussionInput {\n    optional string name = 1;\n  }\n  message CreateDiscussionOutput {\n    required string id = 1;\n  }\n  message ChannelInvitationInput {\n    repeated string users = 1;\n  }\n  message LeaveChannelInput {\n    required int32 nothing = 1;\n  }\n  message ChannelEvictionInput {\n    required string user = 1;\n  }\n  message RenameChannelInput {\n    required string name = 1;\n  }\n  message ChannelInfoInput {\n    required int32 nothing = 1;\n  }\n  message ChannelInfoOutput {\n    required ChannelType type = 1;\n    required string channelId = 2;\n    required string channelName = 3;\n    required string adminUserId = 4;\n    repeated string firstTenUserIds = 5;\n    required int32 openStatus = 6;\n  }\n  message ChannelInfosInput {\n    required int32 page = 1;\n    optional int32 number = 2;\n  }\n  message ChannelInfosOutput {\n    repeated ChannelInfoOutput channels = 1;\n    required int32 total = 2;\n  }\n  message MemberInfo {\n    required string userId = 1;\n    required string userName = 2;\n    required string userPortrait = 3;\n    required string extension = 4;\n  }\n  message GroupMembersInput {\n    required int32 page = 1;\n    optional int32 number = 2;\n  }\n  message GroupMembersOutput {\n    repeated MemberInfo members = 1;\n    required int32 total = 2;\n  }\n  message GetUserInfoInput {\n    required int32 nothing = 1;\n  }\n  message GetUserInfoOutput {\n    required string userId = 1;\n    required string userName = 2;\n    required string userPortrait = 3;\n  }\n  message GetSessionIdInput {\n    required int32 nothing = 1;\n  }\n  message GetSessionIdOutput {\n    required int32 sessionId = 1;\n  }\n  enum FileType {\n    image = " + j.IMAGE + ";\n    audio = " + j.AUDIO + ";\n    video = " + j.VIDEO + ";\n    file = " + j.FILE + ";\n  }\n  message " + wi.GetQNupTokenInput + " {\n    required FileType type = 1;\n    optional string key = 2;\n  }\n  message " + wi.GetQNdownloadUrlInput + " {\n    required FileType type = 1;\n    required string key = 2;\n    optional string  fileName = 3;\n  }\n  message " + wi.GetQNupTokenOutput + " {\n    required int64 deadline = 1;\n    required string token = 2;\n    optional string bosToken = 3;\n    optional string bosDate = 4;\n    optional string path = 5;\n  }\n  message " + wi.GetQNdownloadUrlOutput + " {\n    required string downloadUrl = 1;\n  }\n  message Add2BlackListInput {\n    required string userId = 1;\n  }\n  message RemoveFromBlackListInput {\n    required string userId = 1;\n  }\n  message QueryBlackListInput {\n    required int32 nothing = 1;\n  }\n  message QueryBlackListOutput {\n    repeated string userIds = 1;\n  }\n  message BlackListStatusInput {\n    required string userId = 1;\n  }\n  message BlockPushInput {\n    required string blockeeId = 1;\n  }\n  message ModifyPermissionInput {\n    required int32 openStatus = 1;\n  }\n  message GroupInput {\n    repeated GroupInfo groupInfo = 1;\n  }\n  message GroupOutput {\n    required int32 nothing = 1;\n  }\n  message GroupInfo {\n    required string id = 1;\n    required string name = 2;\n  }\n  message GroupHashInput {\n    required string userId = 1;\n    required string groupHashCode = 2;\n  }\n  message GroupHashOutput {\n    required GroupHashType result = 1;\n  }\n  enum GroupHashType {\n    group_success = 0x00;\n    group_failure = 0x01;\n  }\n  message " + wi.ChrmInput + " {\n    required int32 nothing = 1;\n  }\n  message ChrmOutput {\n    required int32 nothing = 1;\n  }\n  message " + wi.ChrmPullMsg + " {\n    required int64 syncTime = 1;\n    required int32 count = 2;\n  }\n  \n  message ChrmPullMsgNew \n  {\n    required int32 count = 1;\n    required int64 syncTime = 2;\n    optional string chrmId=3;\n  }\n  message " + wi.RelationQryInput + "\n  {\n    optional ChannelType type = 1;\n    optional int32 count = 2;\n    optional int64 startTime = 3;\n    optional int32 order = 4;\n  }\n  message " + wi.RelationsInput + "\n  {\n    required ChannelType type = 1;\n    optional DownStreamMessage msg =2;\n    optional int32 count = 3;\n    optional int32 offset = 4;\n    optional int64 startTime = 5;\n    optional int64 endTime = 6;\n  }\n  message " + wi.RelationsOutput + "\n  {\n    repeated RelationInfo info = 1;\n  }\n  message RelationInfo\n  {\n    required ChannelType type = 1;\n    required string userId = 2;\n    optional DownStreamMessage msg =3;\n    optional int64 readMsgTime= 4;\n    optional int64 unreadCount= 5;\n  }\n  message RelationInfoReadTime\n  {\n    required ChannelType type = 1;\n    required int64 readMsgTime= 2;\n    required string targetId = 3;\n  }\n  message " + wi.CleanHisMsgInput + "\n  {\n      required string targetId = 1;\n      required int64 dataTime = 2;\n      optional int32 conversationType= 3;\n  }\n  message HistoryMessageInput\n  {\n    required string targetId = 1;\n    required int64 dataTime =2;\n    required int32 size  = 3;\n  }\n\n  message HistoryMessagesOuput\n  {\n    repeated DownStreamMessage list = 1;\n    required int64 syncTime = 2;\n    required int32 hasMsg = 3;\n  }\n  message " + wi.QueryChatRoomInfoInput + "\n  {\n    required int32 count= 1;\n    optional int32 order= 2;\n  }\n\n  message " + wi.QueryChatRoomInfoOutput + "\n  {\n    optional int32 userTotalNums = 1;\n    repeated ChrmMember userInfos = 2;\n  }\n  message ChrmMember\n  {\n    required int64 time = 1;\n    required string id = 2;\n  }\n  message MPFollowInput\n  {\n    required string id = 1;\n  }\n\n  message MPFollowOutput\n  {\n    required int32 nothing = 1;\n    optional MpInfo info =2;\n  }\n\n  message " + wi.MCFollowInput + "\n  {\n    required string id = 1;\n  }\n\n  message MCFollowOutput\n  {\n    required int32 nothing = 1;\n    optional MpInfo info =2;\n  }\n\n  message MpInfo  \n  {\n    required string mpid=1;\n    required string name = 2;\n    required string type = 3;\n    required int64 time=4;\n    optional string portraitUrl=5;\n    optional string extra =6;\n  }\n\n  message SearchMpInput\n  {\n    required int32 type=1;\n    required string id=2;\n  }\n\n  message SearchMpOutput\n  {\n    required int32 nothing=1;\n    repeated MpInfo info = 2;\n  }\n\n  message PullMpInput\n  {\n    required int64 time=1;\n    required string mpid=2;\n  }\n\n  message PullMpOutput\n  {\n    required int32 status=1;\n    repeated MpInfo info = 2;\n  }\n  message " + wi.HistoryMsgInput + "\n  {\n    optional string targetId = 1;\n    optional int64 time = 2;\n    optional int32 count  = 3;\n    optional int32 order = 4;\n  }\n\n  message " + wi.HistoryMsgOuput + "\n  {\n    repeated DownStreamMessage list=1;\n    required int64 syncTime=2;\n    required int32 hasMsg=3;\n  }\n  message " + wi.RtcQueryListInput + "{\n    optional int32 order=1;\n  }\n\n  message " + wi.RtcKeyDeleteInput + "{\n    repeated string key=1;\n  }\n\n  message " + wi.RtcValueInfo + "{\n    required string key=1;\n    required string value=2;\n  }\n\n  message RtcUserInfo{\n    required string userId=1;\n    repeated " + wi.RtcValueInfo + " userData=2;\n  }\n\n  message " + wi.RtcUserListOutput + "{\n    repeated RtcUserInfo list=1;\n    optional string token=2;\n    optional string sessionId=3;\n  }\n  message RtcRoomInfoOutput{\n    optional string roomId = 1;\n    repeated " + wi.RtcValueInfo + " roomData = 2;\n    optional int32 userCount = 3;\n    repeated RtcUserInfo list=4;\n  }\n  message " + wi.RtcInput + "{\n    required int32 roomType=1;\n    optional int32 broadcastType=2;\n  }\n  message RtcQryInput{ \n    required bool isInterior=1;\n    required targetType target=2;\n    repeated string key=3;\n  }\n  message " + wi.RtcQryOutput + "{\n    repeated " + wi.RtcValueInfo + " outInfo=1;\n  }\n  message RtcDelDataInput{\n    repeated string key=1;\n    required bool isInterior=2;\n    required targetType target=3;\n  }\n  message " + wi.RtcDataInput + "{ \n    required bool interior=1;\n    required targetType target=2;\n    repeated string key=3;\n    optional string objectName=4;\n    optional string content=5;\n  }\n  message " + wi.RtcSetDataInput + "{\n    required bool interior=1;\n    required targetType target=2;\n    required string key=3;\n    required string value=4;\n    optional string objectName=5;\n    optional string content=6;\n  }\n  message " + wi.RtcUserSetDataInput + " {\n    repeated " + wi.RtcValueInfo + " valueInfo = 1;\n    required string objectName = 2;\n    repeated " + wi.RtcValueInfo + " content = 3;\n  }\n  message RtcOutput\n  {\n    optional int32 nothing=1; \n  }\n  message " + wi.RtcTokenOutput + "{\n    required string rtcToken=1;\n  }\n  enum targetType {\n    ROOM =1 ;\n    PERSON = 2;\n  }\n  message " + wi.RtcSetOutDataInput + "{\n    required targetType target=1;\n    repeated " + wi.RtcValueInfo + " valueInfo=2;\n    optional string objectName=3;\n    optional string content=4;\n  }\n  message " + wi.RtcQryUserOutDataInput + "{\n    repeated string userId = 1;\n  }\n  message " + wi.RtcUserOutDataOutput + "{\n    repeated RtcUserInfo user = 1;\n  }\n  message " + wi.SessionsAttQryInput + "{\n    required int32 nothing = 1;\n  }\n  message " + wi.SessionsAttOutput + "{\n    required int64 inboxTime = 1;\n    required int64 sendboxTime = 2;\n    required int64 totalUnreadCount = 3;\n  }\n  message " + wi.SessionMsgReadInput + "\n  {\n    required ChannelType type = 1;\n    required int64 msgTime = 2;\n    required string channelId = 3;\n  }\n  message SessionMsgReadOutput\n  {\n    optional int32 nothing=1; \n  }\n  message " + wi.DeleteSessionsInput + "\n  {\n    repeated SessionInfo sessions = 1;\n  }\n  message " + wi.SessionInfo + "\n  {\n    required ChannelType type = 1;\n    required string channelId = 2;\n  }\n  message " + wi.DeleteSessionsOutput + "\n  {\n    optional int32 nothing=1; \n  }\n  message " + wi.DeleteMsgInput + "\n  {\n    optional ChannelType type = 1;\n    optional string conversationId = 2;\n    repeated DeleteMsg msgs = 3;\n  }\n  message DeleteMsg\n  {\n    optional string msgId = 1;\n    optional int64 msgDataTime = 2;\n    optional int32 direct = 3;\n  }\n  message ChrmKVEntity {\n    required string key = 1;\n    required string value = 2;\n    optional int32 status = 3;\n    optional int64 timestamp = 4;\n    optional string uid = 5;\n  }\n  message " + wi.SetChrmKV + " {\n    required ChrmKVEntity entry = 1;\n    optional bool bNotify = 2;\n    optional UpStreamMessage notification = 3;\n    optional ChannelType type = 4;\n  }\n  message " + wi.ChrmKVOutput + " {\n    repeated ChrmKVEntity entries = 1;\n    optional bool bFullUpdate = 2;\n    optional int64 syncTime = 3;\n  }\n  message " + wi.QueryChrmKV + " {\n    required int64 timestamp = 1;\n  }\n  message " + wi.ChrmNotifyMsg + " {\t\n    required int32 type= 1;\n    optional int64 time= 2;\n    optional string chrmId=3;\n  }\n  message " + wi.SetUserSettingInput + " {\n    required int64 version=1;\n    required string value=2;\n  }\n  message " + wi.SetUserSettingOutput + " {\n    required int64 version=1;\n    required bool reserve=2;\n  }\n  message " + wi.PullUserSettingInput + " {\n    required int64 version=1;//\u5F53\u524D\u5BA2\u6237\u7AEF\u7684\u6700\u5927\u7248\u672C\u53F7\n    optional bool reserve=2;\n  }\n  message " + wi.PullUserSettingOutput + " {\n    repeated UserSettingItem items = 1;\n    required int64 version=2;\n  }\n  message UserSettingItem {\n    required string targetId= 1;\n    required ChannelType type = 2;\n    required string key = 4;\n    required bytes value = 5;\n    required int64 version=6;\n    required int32 status=7;\n  }\n  message " + wi.SessionReq + " {\n    required int64 time = 1;\n  }\n  message " + wi.SessionStates + " {\n    required int64 version=1;\n    repeated SessionState state= 2;\n  }\n  message " + wi.SessionState + " {\n    required ChannelType type = 1;\n    required string channelId = 2;  \n    optional int64 time = 3;\n    repeated SessionStateItem stateItem = 4;\n  }\n  message " + wi.SessionStateItem + " {\n    required SessionStateType sessionStateType = 1;\n    required string value = 2;\n  }\n  enum SessionStateType {\n    IsSilent = 1;\n    IsTop = 2;\n  }\n  message " + wi.SessionStateModifyReq + " {\n    required int64 version=1;\n    repeated SessionState state= 2;\n  }\n  message " + wi.SessionStateModifyResp + " {\n    required int64 version=1;\n  }\n}\n"
      , Gi = {};
    try {
        Gi = t(Bi)
    } catch (t) {
        Gi = {}
    }
    Gi.getModule = function(e) {
        var t = new Gi[e];
        return t.getArrayData = function() {
            var e = t.toArrayBuffer();
            return e = yn.ArrayBufferToArray(e),
            e
        }
        ,
        t
    }
    ;
    var Ki = Gi, Yi = ei.isGroup, qi = ei.isChatRoom, Hi = function() {
        function e(e) {
            this.codec = Ki,
            this.connectType = void 0,
            e = e || {},
            this.connectType = e.connectType,
            this.connectType && this.setCodecType(this.connectType)
        }
        var t = e.prototype;
        return t.setCodecType = function(e) {
            this.codec = e === V.COMET ? Vi : Ki
        }
        ,
        t.decodeByPBName = function(e, t, n) {
            var s = this, i = (a = {},
            a[wi.DownStreamMessages] = s.formatSyncMessages,
            a[wi.DownStreamMessage] = s.formatReceivedMessage,
            a[wi.UpStreamMessage] = s.formatSentMessage,
            a[wi.HistoryMsgOuput] = s.formatHistoryMessages,
            a[wi.RelationsOutput] = s.formatConversationList,
            a[wi.QueryChatRoomInfoOutput] = s.formatChatRoomInfos,
            a[wi.RtcUserListOutput] = s.formatRTCUserList,
            a[wi.RtcQryOutput] = s.formatRTCData,
            a[wi.ChrmKVOutput] = s.formatChatRoomKVList,
            a[wi.PullUserSettingOutput] = s.formatUserSetting,
            a[wi.SessionStates] = s.formatConversationStatus,
            a), r = e, o = i[t], a;
            try {
                r = s.codec[t].decode(e),
                yn.isObject(r) && (r = yn.batchInt64ToTimestamp(r)),
                yn.isFunction(o) && (r = o.call(s, r, n))
            } catch (t) {}
            return r
        }
        ,
        t.formatBytes = function(e) {
            try {
                var t = e
                  , n = t.offset
                  , s = t.buffer
                  , i = t.limit;
                n && (e = yn.ArrayBufferToUint8Array(s).subarray(n, i),
                e = Kn.readUTF(e)),
                e = yn.parseJSON(e)
            } catch (t) {}
            return e
        }
        ,
        t.formatSyncMessages = function(e, t) {
            t = t || {};
            var n = this
              , s = t.onMessage || yn.noop
              , i = e.list
              , r = e.syncTime
              , o = i.length - 1
              , a = e.finished;
            return yn.isUndefined(a) && (e.finished = a = !0),
            e.syncTime = yn.int64ToTimestamp(r),
            e.list = yn.map(i, function(e, i) {
                var r = n.formatReceivedMessage(e, t)
                  , d = yn.isEqual(i, o)
                  , l = d && a;
                try {
                    s({
                        isLastInAPull: d,
                        message: r,
                        finished: l
                    })
                } catch (t) {
                    yn.consoleError(t)
                }
                return r
            }),
            e
        }
        ,
        t.formatReceivedMessage = function(e, t) {
            t = t || {};
            var n = this
              , s = t
              , i = s.currentUserId
              , r = s.connectedTime
              , o = e.content
              , a = e.fromUserId
              , d = e.type
              , l = e.groupId
              , u = e.status
              , p = e.dataTime
              , c = e.classname
              , m = e.msgId
              , E = e.extraContent
              , f = e.direction || F.RECEIVE
              , _ = yn.isEqual(f, F.SEND)
              , T = ei.getMessageOptionByStatus(u)
              , S = T.isPersited
              , I = T.isCounted
              , y = T.isMentiond
              , C = T.disableNotification
              , h = T.receivedStatus
              , R = T.canIncludeExpansion
              , O = Yi(d) || qi(d) ? l : a
              , N = _ ? i : a
              , v = yn.int64ToTimestamp(p)
              , A = ei.isChatRoom(d)
              , M = _ ? F.SEND : F.RECEIVE;
            A && yn.isEqual(a, i) && (M = F.SEND);
            var b = null;
            return E && (b = {},
            b = ei.formatExtraContent(E)),
            {
                type: d,
                targetId: O,
                senderUserId: N,
                messageType: c,
                messageUId: m,
                isPersited: S,
                isCounted: I,
                isMentiond: y,
                isMentioned: y,
                sentTime: v,
                isOffLineMessage: v < r,
                messageDirection: M,
                receivedTime: ei.DelayTimer.getTime(),
                disableNotification: C,
                receivedStatus: h,
                canIncludeExpansion: R,
                content: n.formatBytes(o),
                expansion: b
            }
        }
        ,
        t.formatSentMessage = function(e, t) {
            var n = this
              , s = e.content
              , i = e.classname
              , r = e.sessionId
              , o = e.msgId
              , a = e.extraContent
              , d = t.signal
              , l = t.currentUserId
              , u = d.date
              , p = d.topic
              , c = d.targetId
              , m = ei.getUpMessageOptionBySessionId(r)
              , E = m.isPersited
              , f = m.isCounted
              , _ = m.disableNotification
              , T = m.canIncludeExpansion
              , S = Ln[p] || k.PRIVATE
              , I = yn.isInclude(An, p)
              , y = null;
            return a && (y = {},
            y = ei.formatExtraContent(a)),
            {
                type: S,
                targetId: c,
                messageType: i,
                messageUId: o,
                isPersited: E,
                isCounted: f,
                isStatusMessage: I,
                senderUserId: l,
                content: n.formatBytes(s),
                sentTime: yn.secondsToMilliseconds(u),
                receivedTime: ei.DelayTimer.getTime(),
                messageDirection: F.SEND,
                isOffLineMessage: !1,
                disableNotification: _,
                canIncludeExpansion: T,
                expansion: y
            }
        }
        ,
        t.formatHistoryMessages = function(e, t) {
            var n = this
              , s = t.conversation || {}
              , i = e.list
              , r = e.hasMsg
              , o = s.targetId
              , a = yn.int64ToTimestamp(e.syncTime)
              , d = [];
            return yn.forEach(i, function(e) {
                var s = n.formatReceivedMessage(e, t);
                s.targetId = o,
                d.push(s)
            }, {
                isReverse: !0
            }),
            {
                syncTime: a,
                list: d,
                hasMore: !!r
            }
        }
        ,
        t.formatConversationList = function(e, t) {
            var n = this
              , s = e.info
              , i = t.afterDecode || yn.noop;
            return s = yn.map(s, function(e) {
                var s = e.msg
                  , r = e.userId
                  , o = e.type
                  , a = e.unreadCount;
                s = n.formatReceivedMessage(s, t),
                s.targetId = r;
                var d = {
                    targetId: r,
                    type: o,
                    unreadMessageCount: a,
                    latestMessage: s
                };
                return i(d) || d
            }),
            s || []
        }
        ,
        t.formatChatRoomInfos = function(e) {
            var t = e.userTotalNums
              , n = e.userInfos;
            return n = yn.map(n, function(e) {
                var t = e.id
                  , n = e.time;
                return n = yn.int64ToTimestamp(n),
                {
                    id: t,
                    time: n
                }
            }),
            {
                userCount: t,
                userInfos: n
            }
        }
        ,
        t.formatRTCUserList = function(e) {
            var t = e.list
              , n = e.token
              , s = e.sessionId
              , i = {};
            return yn.forEach(t, function(e) {
                var t = e.userId
                  , n = e.userData
                  , s = {};
                yn.forEach(n, function(e) {
                    var t = e.key
                      , n = e.value;
                    s[t] = n
                }),
                i[t] = s
            }),
            {
                users: i,
                token: n,
                sessionId: s
            }
        }
        ,
        t.formatRTCData = function(e) {
            var t = e.outInfo
              , n = {};
            return yn.forEach(t, function(e) {
                n[e.key] = e.value
            }),
            n
        }
        ,
        t.formatRTCRoomInfo = function(e) {
            var t = e.roomId
              , n = e.userCount
              , s = e.roomData
              , i = {
                id: t,
                total: n
            };
            return yn.forEach(s, function(e) {
                i[e.key] = e.value
            }),
            i
        }
        ,
        t.formatChatRoomKVList = function(e) {
            var t = e.entries
              , n = e.bFullUpdate
              , s = e.syncTime;
            return t = t || [],
            t = yn.map(t, function(e) {
                var t = e.key
                  , n = e.value
                  , s = e.status
                  , i = e.timestamp
                  , r = e.uid
                  , o = ei.getChatRoomKVByStatus(s)
                  , a = o.isAutoDelete
                  , d = o.isOverwrite
                  , l = o.type;
                return {
                    key: t,
                    value: n,
                    isAutoDelete: a,
                    isOverwrite: d,
                    type: l,
                    userId: r,
                    timestamp: yn.int64ToTimestamp(i)
                }
            }),
            {
                kvEntries: t,
                isFullUpdate: n,
                syncTime: s
            }
        }
        ,
        t.formatUserSetting = function(e) {
            var t = this
              , n = e.items
              , s = e.version
              , i = {};
            return yn.forEach(n || [], function(e) {
                var n = e.key
                  , s = e.version
                  , r = e.value;
                e.version = yn.int64ToTimestamp(s),
                e.value = t.formatBytes(r),
                i[n] = e
            }),
            {
                settings: i,
                version: s
            }
        }
        ,
        t.formatConversationStatus = function(e) {
            var t = e.state
              , n = [];
            return yn.forEach(t, function(e) {
                var t = e.type
                  , s = e.channelId
                  , i = e.time
                  , r = e.stateItem
                  , o = W.NOTIFY
                  , a = !1;
                yn.forEach(r, function(e) {
                    var t = e.sessionStateType
                      , n = e.value;
                    switch (t) {
                    case Bn.DO_NOT_DISTURB:
                        o = yn.isEqual(n, Fn.ENABLED) ? W.DO_NOT_DISTURB : W.NOTIFY;
                        break;
                    case Bn.TOP:
                        a = yn.isEqual(n, Fn.ENABLED);
                        break;
                    default:
                    }
                }),
                n.push({
                    type: t,
                    targetId: s,
                    notificationStatus: o,
                    isTop: a,
                    updatedTime: yn.int64ToTimestamp(i)
                })
            }),
            n
        }
        ,
        t.encodeServerConfParams = function() {
            var e = this.codec.getModule(wi.SessionsAttQryInput);
            return e.setNothing(1),
            e.getArrayData()
        }
        ,
        t.getUpMsgModule = function(e, t) {
            var n = e.type
              , s = t.messageType
              , i = t.isMentiond
              , r = t.mentiondType
              , o = t.mentiondUserIdList
              , a = t.content
              , d = t.pushContent
              , l = t.pushData
              , u = t.directionalUserIdList
              , p = t.isFilerWhiteBlacklist
              , c = t.isVoipPush
              , m = t.canIncludeExpansion
              , E = t.expansion
              , f = ei.isGroup(n)
              , _ = this.codec.getModule(wi.UpStreamMessage)
              , T = ei.getSessionId(t)
              , S = 0;
            if (_.setSessionId(T),
            f && i && a && (a.mentionedInfo = {
                userIdList: o,
                type: r || Y.ALL
            }),
            d && _.setPushText(d),
            l && _.setAppData(l),
            u && _.setUserId(u),
            S |= c ? 1 : 0,
            S |= p ? 2 : 0,
            _.setConfigFlag(S),
            _.setClassname(s),
            _.setContent(yn.toJSON(a)),
            m && E) {
                var I = {};
                yn.forEach(E, function(e, t) {
                    I[t] = {
                        v: e
                    }
                }),
                _.setExtraContent(yn.toJSON(I))
            }
            return _
        }
        ,
        t.encodeUpMsg = function(e, t) {
            var n = this.getUpMsgModule(e, t);
            return n.getArrayData()
        }
        ,
        t.encodeSyncMsg = function(e) {
            var t = e.sendboxTime
              , n = e.inboxTime
              , s = this.codec.getModule(wi.SyncRequestMsg);
            return s.setIspolling(!1),
            s.setIsPullSend(!0),
            s.setSendBoxSyncTime(t),
            s.setSyncTime(n),
            s.getArrayData()
        }
        ,
        t.encodeChrmSyncMsg = function(e, t) {
            e = e || 0,
            t = t || 0;
            var n = this.codec.getModule(wi.ChrmPullMsg);
            return n.setCount(t),
            n.setSyncTime(e),
            n.getArrayData()
        }
        ,
        t.encodeGetHistoryMsg = function(e, t) {
            var n = e.targetId
              , s = t.count
              , i = t.order
              , r = t.timestrap
              , o = this.codec.getModule(wi.HistoryMsgInput);
            return o.setTargetId(n),
            o.setTime(r),
            o.setCount(s),
            o.setOrder(i),
            o.getArrayData()
        }
        ,
        t.encodeGetConversationList = function(e) {
            e = e || {};
            var t = e
              , n = t.count
              , s = t.startTime
              , i = this.codec.getModule(wi.RelationQryInput);
            return i.setType(1),
            i.setCount(n),
            i.setStartTime(s),
            i.getArrayData()
        }
        ,
        t.encodeOldConversationList = function(e) {
            e = e || {};
            var t = e
              , n = t.count
              , s = t.type
              , i = this.codec.getModule(wi.RelationsInput);
            return s = s || k.PRIVATE,
            n = n || 0,
            i.setType(s),
            i.setCount(n),
            i.getArrayData()
        }
        ,
        t.encodeRemoveConversationList = function(e) {
            var t = this
              , n = this.codec.getModule(wi.DeleteSessionsInput)
              , s = [];
            return yn.forEach(e, function(e) {
                var n = e.type
                  , i = e.targetId
                  , r = t.codec.getModule(wi.SessionInfo);
                r.setType(n),
                r.setChannelId(i),
                s.push(r)
            }),
            n.setSessions(s),
            n.getArrayData()
        }
        ,
        t.encodeDeleteMessages = function(e, t) {
            var n = e.type
              , s = e.targetId
              , i = this.codec.getModule(wi.DeleteMsgInput)
              , r = [];
            return yn.forEach(t, function(e) {
                r.push({
                    msgId: e.messageUId,
                    msgDataTime: e.sentTime,
                    direct: e.messageDirection
                })
            }),
            i.setType(n),
            i.setConversationId(s),
            i.setMsgs(r),
            i.getArrayData()
        }
        ,
        t.encodeClearMessages = function(e, t) {
            var n = e.targetId
              , s = t.timestrap
              , i = this.codec.getModule(wi.CleanHisMsgInput);
            return s = s || yn.getCurrentTimestamp(),
            i.setDataTime(s),
            i.setTargetId(n),
            i.getArrayData()
        }
        ,
        t.encodeClearUnreadCount = function(e, t) {
            var n = e.type
              , s = e.targetId
              , i = t.timestrap
              , r = this.codec.getModule(wi.SessionMsgReadInput);
            return i = i || +new Date,
            r.setType(n),
            r.setChannelId(s),
            r.setMsgTime(i),
            r.getArrayData()
        }
        ,
        t.encodeJoinOrQuitChatRoom = function() {
            var e = this.codec.getModule(wi.ChrmInput);
            return e.setNothing(1),
            e.getArrayData()
        }
        ,
        t.encodeGetChatRoomInfo = function(e) {
            e = e || {};
            var t = e
              , n = t.count
              , s = t.order
              , i = this.codec.getModule(wi.QueryChatRoomInfoInput);
            return i.setCount(n),
            i.setOrder(s),
            i.getArrayData()
        }
        ,
        t.encodeJoinRTCRoom = function(e) {
            var t = e.mode
              , n = e.broadcastType
              , s = this.codec.getModule(wi.RtcInput);
            return t = t || 0,
            s.setRoomType(t),
            yn.isUndefined(n) || s.setBroadcastType(n),
            s.getArrayData()
        }
        ,
        t.encodeQuitRTCRoom = function() {
            return this.codec.getModule(wi.SetUserStatusInput).getArrayData()
        }
        ,
        t.encodeSetRTCData = function(e, t, n, s, i) {
            var r = this.codec.getModule(wi.RtcSetDataInput);
            r.setInterior(n),
            r.setTarget(s),
            r.setKey(e),
            r.setValue(t),
            i = i || {};
            var o = i
              , a = o.name
              , d = o.content;
            return yn.isUndefined(a) || r.setObjectName(a),
            yn.isUndefined(d) || (yn.isObject(d) && (d = yn.toJSON(d)),
            r.setContent(d)),
            r.getArrayData()
        }
        ,
        t.encodeUserSetRTCData = function(e, t, n) {
            var s = this.codec.getModule(wi.RtcUserSetDataInput);
            s.setObjectName(n);
            var i = this.codec.getModule(wi.RtcValueInfo);
            return i.setKey(e.name),
            i.setValue(e.content),
            s.setContent(i),
            i = this.codec.getModule(wi.RtcValueInfo),
            i.setKey("uris"),
            i.setValue(t),
            s.setValueInfo(i),
            s.getArrayData()
        }
        ,
        t.encodeGetRTCData = function(e, t, n) {
            var s = this.codec.getModule(wi.RtcDataInput);
            return s.setInterior(t),
            s.setTarget(n),
            s.setKey(e),
            s.getArrayData()
        }
        ,
        t.encodeRemoveRTCData = function(e, t, n, s) {
            var i = this.codec.getModule(wi.RtcDataInput);
            i.setInterior(t),
            i.setTarget(n),
            i.setKey(e),
            s = s || {};
            var r = s
              , o = r.name
              , a = r.content;
            return yn.isUndefined(o) || i.setObjectName(o),
            yn.isUndefined(a) || (yn.isObject(a) && (a = yn.toJSON(a)),
            i.setContent(a)),
            i.getArrayData()
        }
        ,
        t.encodeSetRTCOutData = function(e, t, n) {
            var s = this.codec.getModule(wi.RtcSetOutDataInput);
            s.setTarget(t),
            yn.isArray(e) || (e = [e]),
            yn.forEach(e, function(t, n) {
                t.key = t.key ? t.key.toString() : t.key,
                t.value = t.value ? t.value.toString() : t.value,
                e[n] = t
            }),
            s.setValueInfo(e),
            n = n || {};
            var i = n
              , r = i.name
              , o = i.content;
            return yn.isUndefined(r) || s.setObjectName(r),
            yn.isUndefined(o) || (yn.isObject(o) && (o = yn.toJSON(o)),
            s.setContent(o)),
            s.getArrayData()
        }
        ,
        t.ecnodeGetRTCOutData = function(e) {
            var t = this.codec.getModule(wi.RtcQryUserOutDataInput);
            return t.setUserId(e),
            t.getArrayData()
        }
        ,
        t.encodeSetRTCState = function(e) {
            var t = this.codec.getModule(wi.MCFollowInput)
              , n = e.report;
            return t.setId(n),
            t.getArrayData()
        }
        ,
        t.encodeGetRTCRoomInfo = function() {
            var e = this.codec.getModule(wi.RtcQueryListInput);
            return e.setOrder(2),
            e.getArrayData()
        }
        ,
        t.encodeSetRTCUserInfo = function(e) {
            var t = this.codec.getModule(wi.RtcValueInfo)
              , n = e.key
              , s = e.value;
            return t.setKey(n),
            t.setValue(s),
            t.getArrayData()
        }
        ,
        t.encodeRemoveRTCUserInfo = function(e) {
            var t = this.codec.getModule(wi.RtcKeyDeleteInput)
              , n = e.keys || [];
            return yn.isArray(n) || (n = [n]),
            t.setKey(n),
            t.getArrayData()
        }
        ,
        t.encodeGetFileToken = function(e, t) {
            var n = this.codec.getModule(wi.GetQNupTokenInput);
            return n.setType(e),
            n.setKey(t),
            n.getArrayData()
        }
        ,
        t.encodeGetFileUrl = function(e, t, n) {
            var s = this.codec.getModule(wi.GetQNdownloadUrlInput);
            return s.setType(e),
            s.setKey(t),
            n && s.setFileName(n),
            s.getArrayData()
        }
        ,
        t.encodeModifyChatRoomKV = function(e, t, n, s) {
            var i = this.codec.getModule(wi.SetChrmKV)
              , r = t.key
              , o = t.value
              , a = t.notificationExtra
              , d = t.isSendNotification
              , l = ei.getChatRoomKVOptStatus(t, n)
              , u = {
                key: r,
                status: l,
                value: o || "",
                uid: s
            };
            if (yn.isEmpty(u.status) && delete u.status,
            i.setEntry(u),
            d) {
                var p = {
                    type: k.CHATROOM,
                    targetId: e.id
                }
                  , c = this.getUpMsgModule(p, {
                    messageType: q.CHRM_KV_NOTIFY,
                    content: {
                        key: r,
                        value: o,
                        extra: a,
                        type: n
                    },
                    isPersited: !1,
                    isCounted: !1
                });
                i.setNotification(c),
                i.setBNotify(!0),
                i.setType(k.CHATROOM)
            }
            return i.getArrayData()
        }
        ,
        t.encodePullChatRoomKV = function(e) {
            var t = this.codec.getModule(wi.QueryChrmKV);
            return t.setTimestamp(e),
            t.getArrayData()
        }
        ,
        t.encodePullUserSetting = function(e) {
            var t = this.codec.getModule(wi.PullUserSettingInput);
            return t.setVersion(e),
            t.getArrayData()
        }
        ,
        t.encodeGetConversationStatus = function(e) {
            var t = this.codec.getModule(wi.SessionReq);
            return t.setTime(e),
            t.getArrayData()
        }
        ,
        t.encodeSetConversationStatus = function(e) {
            var t = this
              , n = this.codec.getModule(wi.SessionStateModifyReq)
              , s = ei.DelayTimer.getTime()
              , i = [];
            return yn.forEach(e, function(e) {
                var n = t.codec.getModule(wi.SessionState)
                  , r = e.type
                  , o = e.targetId
                  , a = e.notificationStatus
                  , d = e.isTop
                  , l = [];
                n.setType(r),
                n.setChannelId(o),
                n.setTime(s);
                var u = yn.isEqual(a, W.DO_NOT_DISTURB)
                  , p = {};
                yn.isUndefined(a) || (p[Bn.DO_NOT_DISTURB] = u),
                yn.isUndefined(d) || (p[Bn.TOP] = d),
                yn.forEach(p, function(e, n) {
                    if (!yn.isUndefined(e)) {
                        var s = t.codec.getModule(wi.SessionStateItem);
                        e = e ? Fn.ENABLED : Fn.DISABLED,
                        s.setSessionStateType(+n),
                        s.setValue(e);
                        var i = t.connectType === V.COMET ? s.data : s;
                        l.push(i)
                    }
                }),
                n.setStateItem(l);
                var c = t.connectType === V.COMET ? n.data : n;
                i.push(c)
            }),
            n.setVersion(s),
            n.setState(i),
            n.getArrayData()
        }
        ,
        e
    }(), ji = yn.DeferHandler, Qi = yn.Defer, Wi = ei.SignalId, Ji = function() {
        function e(e) {
            this._transporter = void 0,
            this._serverEventEmitter = new yn.EventEmitter,
            this._deferHandler = new ji,
            this._serverDataCodec = void 0,
            this._selfUserId = void 0,
            this._connectedTime = void 0,
            this.option = void 0;
            var t = this
              , n = new Pi(e);
            n.watchSignal(function(e) {
                t._handleSignal(e)
            }),
            n.watchStatus(function(e) {
                vi.info(Ns.L_NETWORK_CHANGED_S, e),
                t._handleStatus(e)
            }),
            t._serverDataCodec = new Hi(e),
            yn.extend(t, {
                _transporter: n,
                option: e
            })
        }
        var t = e.prototype;
        return t._handleStatus = function(e) {
            if (ei.isDisconnected(e)) {
                this.disconnect();
                var t = yn.getCurrentTimestamp()
                  , n = t - this._connectedTime < 5e3
                  , s = [b.KICKED_OFFLINE_BY_OTHER_CLIENT];
                if (n && !yn.isInclude(s, e))
                    return this._serverEventEmitter.emit(Cs.STATUS, b.DISCONNECT_TOO_FAST)
            }
            this._serverEventEmitter.emit(Cs.STATUS, e)
        }
        ,
        t._handleSignal = function(e) {
            var t = this
              , n = t._deferHandler
              , s = e.messageId;
            if (s && e.getIdentifier) {
                var i = e.getIdentifier();
                n.resolve(i, e)
            }
            t._handleSignalAck(e),
            t._dispatchTask(e)
        }
        ,
        t._handleSignalAck = function(e) {
            var t = this._transporter
              , n = e.messageId
              , s = e._header && e._header.qos !== On.AT_MOST_ONCE;
            if (e instanceof os && !e.syncMsg && s) {
                var i = new ls(n);
                t.sendSignal(i)
            }
            if (e instanceof ps && s) {
                var r = new us(n);
                t.sendSignal(r)
            }
        }
        ,
        t._dispatchTask = function(e) {
            var t = this;
            if (e instanceof ts) {
                var n = e.status;
                return n = L[n] || n,
                t._handleStatus(n)
            }
            if (e instanceof os) {
                var s = e.syncMsg, i = e.topic, r;
                if (s)
                    return t._receiveMsgFromOtherDevice(e);
                var o = (r = {},
                r[vn.NOTIFY_PULL_MSG] = t._notifyPullMessage,
                r[vn.RECEIVE_MSG] = t._notifyDirectMessage,
                r[vn.SERVER_NOTIFY] = t._notifyForServer,
                r[vn.SETTING_NOTIFY] = t._notifySettingChanged,
                r)[i] || yn.noop;
                o.call(t, e)
            }
        }
        ,
        t._notifyPullMessage = function(e) {
            var t = this._serverDataCodec.decodeByPBName(e.data, wi.NotifyMsg);
            this._serverEventEmitter.emit(Cs.NOTIFY_PULL, t)
        }
        ,
        t._notifyDirectMessage = function(e) {
            var t = this._selfUserId
              , n = this._connectedTime
              , s = this._serverDataCodec.decodeByPBName(e.data, wi.DownStreamMessage, {
                currentUserId: t,
                connectedTime: n
            });
            this._serverEventEmitter.emit(Cs.DIRECT_MSG, s)
        }
        ,
        t._notifyForServer = function(e) {
            var t = this
              , n = t._serverDataCodec.decodeByPBName(e.data, wi.ChrmNotifyMsg)
              , s = n.type;
            switch (vi.info(Ns.P_NOTIFY_CHRM_KV_S, n),
            s) {
            case Un.KV_CHANGED:
                t._serverEventEmitter.emit(Cs.CHRM_KV_CHANGED, n);
                break;
            case Un.CONVERSATION_STATUS_CHANGED:
                t._serverEventEmitter.emit(Cs.CONVERSATION_STATUS_CHANGED, n.time);
                break;
            default:
            }
        }
        ,
        t._notifySettingChanged = function(e) {
            var t = this
              , n = t._serverDataCodec.decodeByPBName(e.data, wi.UserSettingNotification);
            t._serverEventEmitter.emit(Cs.USER_SETTING_CHANGED, n)
        }
        ,
        t._sendSignal = function(e, t, n) {
            var s = this.option.appkey
              , i = this._serverDataCodec
              , r = this._transporter
              , o = this._deferHandler
              , a = this._selfUserId
              , d = this._connectedTime
              , l = Wi.get({
                appkey: s,
                userId: a
            });
            if (Wi.isExceedLimit(l))
                return this._handleStatus(b.EXCEED_MESSAGE_ID_LIMIT),
                yn.Defer.reject(S.TIMEOUT);
            e.messageId = l;
            var u = e.getIdentifier();
            return yn.deferred(function(t, n) {
                o.add(u, {
                    resolve: t,
                    reject: n
                }),
                r.sendSignal(e)
            }).then(function(e) {
                var s = e.status
                  , r = e.data
                  , o = yn.isEqual(s, Cn)
                  , l = o ? e : {
                    status: O[s] || s
                };
                o && t && (e.data = i.decodeByPBName(r, t, yn.extend({
                    signal: e,
                    currentUserId: a,
                    connectedTime: d
                }, n)));
                var u = o ? Qi.resolve : Qi.reject;
                return u.call(Qi, l)
            })
        }
        ,
        t._sendSignalForData = function(e, t, n) {
            return this._sendSignal(e, t, n).then(function(e) {
                var n = t ? e.data : void 0;
                return n
            })
        }
        ,
        t._receiveMsgFromOtherDevice = function(e) {
            var t = this
              , n = t._deferHandler
              , s = t._selfUserId
              , i = t.option.connectType
              , r = t._serverDataCodec
              , o = i === V.COMET
              , a = e.data
              , d = e.topic
              , l = r.decodeByPBName(a, wi.UpStreamMessage, {
                currentUserId: s,
                signal: e
            });
            return o || l.isStatusMessage ? (l.sentTime = ei.DelayTimer.getTime(),
            t._serverEventEmitter.emit(Cs.DIRECT_MSG, l)) : yn.deferred(function(t, s) {
                var i = e.getIdentifier();
                n.add(i, {
                    resolve: t,
                    reject: s
                })
            }).then(function(e) {
                return l.messageUId = e.messageUId,
                l.sentTime = e.timestamp,
                t._serverEventEmitter.emit(Cs.DIRECT_MSG, l)
            })["catch"](function(e) {
                vi.error(Ns.L_DECODE_MSG_E, {
                    content: {
                        info: "received msg from other device error",
                        error: e,
                        topic: d
                    }
                })
            })
        }
        ,
        t.watch = function(e) {
            var t = this;
            e = e || {},
            yn.forEach(e, function(e, n) {
                yn.isFunction(e) && t._serverEventEmitter.on(n, e)
            })
        }
        ,
        t.unwatch = function(e) {
            var t = this;
            e = e || {},
            yn.forEach(e, function(e, n) {
                yn.isFunction(e) && t._serverEventEmitter.off(n, e)
            })
        }
        ,
        t.connect = function(e, t) {
            var n = this
              , s = n._transporter;
            return s.connect(e, t).then(function(e) {
                var t = yn.isEqual(e.status, Cn);
                return t ? Qi.resolve(e) : Qi.reject(e)
            }).then(function(e) {
                var t = e.userId
                  , s = e.timestamp;
                return n._selfUserId = t,
                n._connectedTime = s,
                {
                    id: t
                }
            }, function(e) {
                var t = e.status
                  , n = U[t] || {
                    code: t
                };
                return yn.Defer.reject(n)
            })
        }
        ,
        t.disconnect = function() {
            var e = this.option.appkey
              , t = this._transporter
              , n = this._selfUserId;
            return t && t.disconnect(),
            Wi.clear({
                appkey: e,
                userId: n
            }),
            Qi.resolve(n)
        }
        ,
        t.getConnectedTime = function() {
            var e = this._connectedTime;
            return e
        }
        ,
        t.getServerConfig = function() {
            var e = this._selfUserId
              , t = this._serverDataCodec
              , n = t.encodeServerConfParams()
              , s = new gs(Mn.GET_SYNC_TIME,n,e);
            return this._sendSignalForData(s, wi.SessionsAttOutput)
        }
        ,
        t.pullMessageList = function(e, t) {
            var n = this._selfUserId
              , s = this._serverDataCodec
              , i = s.encodeSyncMsg(e)
              , r = new gs(Mn.PULL_MSG,i,n);
            return r.setHeaderQos(On.AT_LEAST_ONCE),
            this._sendSignalForData(r, wi.DownStreamMessages, t)
        }
        ,
        t.pullChrmMessageList = function(e, t, n, s) {
            t = t || 0,
            n = n || 0;
            var i = this._serverDataCodec.encodeChrmSyncMsg(t, n)
              , r = new gs(Mn.PULL_CHRM_MSG,i,e);
            return r.setHeaderQos(On.AT_LEAST_ONCE),
            this._sendSignalForData(r, wi.DownStreamMessages, s)
        }
        ,
        t.sendMessage = function(e, t, n) {
            var s = this
              , i = s._selfUserId
              , r = s._serverDataCodec
              , o = e.type
              , a = e.targetId
              , d = t.isStatusMessage;
            d = d && ei.isSupportStatusMessage(o);
            var l = n || Pn[o] || vn.PRIVATE;
            d && yn.isUndefined(n) && (l = wn[o]);
            var u = r.encodeUpMsg(e, t)
              , p = new as(l,u,a);
            p.setHeaderQos(On.AT_LEAST_ONCE);
            var c = r.decodeByPBName(u, wi.UpStreamMessage, {
                signal: p,
                currentUserId: i
            });
            return d ? (s._sendSignal(p)["catch"](function() {}),
            c.sentTime = ei.DelayTimer.getTime(),
            yn.Defer.resolve(c)) : s._sendSignal(p).then(function(e) {
                var t = e.messageUId
                  , n = e.timestamp;
                return c.messageUId = t,
                c.sentTime = n,
                s._serverEventEmitter.emit(Cs.MESSAGE_SEND, c),
                c
            })
        }
        ,
        t.recallMessage = function(e, t, n) {
            var s = yn.extend(n || {}, t)
              , i = e.type
              , r = e.targetId
              , o = t.messageUId
              , a = t.sentTime
              , d = t.user;
            return s.messageType = K,
            s.content = {
                conversationType: i,
                targetId: r,
                messageUId: o,
                sentTime: a,
                user: d
            },
            this.sendMessage({
                type: i,
                targetId: this._selfUserId
            }, s, vn.RECALL)
        }
        ,
        t.updateExpansionMessage = function(e) {
            e = e || {};
            var t = e
              , n = t.type
              , s = t.targetId
              , i = t.messageUId
              , r = t.expansionDic
              , o = t.keys
              , a = t.removeAll
              , d = {};
            r && (d.put = r),
            o && (d.del = o),
            a && (d.removeAll = 1),
            d.mid = i;
            var l = {
                content: d,
                messageType: q.EXPANSION_NOTIFY
            };
            return this.sendMessage({
                type: n,
                targetId: s
            }, l).then(function() {
                return Qi.resolve()
            })["catch"](function() {
                return Qi.reject(I.SEND_MESSAGE_KV_FAIL)
            })
        }
        ,
        t.getFileToken = function(e, t) {
            var n = this._serverDataCodec.encodeGetFileToken(e, t)
              , s = new gs(Mn.GET_UPLOAD_FILE_TOKEN,n,this._selfUserId);
            return this._sendSignalForData(s, wi.GetQNupTokenOutput)
        }
        ,
        t.getFileUrl = function(e, t, n) {
            var s = this._serverDataCodec.encodeGetFileUrl(e, t, n)
              , i = new gs(Mn.GET_UPLOAD_FILE_URL,s,this._selfUserId);
            return this._sendSignalForData(i, wi.GetQNdownloadUrlOutput)
        }
        ,
        t.getConversationList = function(e) {
            var t = this._selfUserId
              , n = this._serverDataCodec
              , s = n.encodeGetConversationList(e)
              , i = new gs(Mn.GET_CONVERSATION_LIST,s,t);
            return this._sendSignalForData(i, wi.RelationsOutput)
        }
        ,
        t.removeConversationList = function(e) {
            var t = this._selfUserId
              , n = this._serverDataCodec
              , s = n.encodeRemoveConversationList(e)
              , i = new gs(Mn.REMOVE_CONVERSATION_LIST,s,t);
            return this._sendSignalForData(i, wi.DeleteSessionsOutput)
        }
        ,
        t.removeConversation = function(e) {
            return this.removeConversationList([e])
        }
        ,
        t.getHistoryMessages = function(e, t) {
            var n = this._selfUserId
              , s = this._serverDataCodec
              , i = e.type
              , r = xn[i] || bn.PRIVATE
              , o = s.encodeGetHistoryMsg(e, t)
              , a = new gs(r,o,n);
            return this._sendSignalForData(a, wi.HistoryMsgOuput, {
                conversation: e
            })
        }
        ,
        t.deleteHistoryMessages = function(e, t) {
            var n = this._selfUserId
              , s = this._serverDataCodec.encodeDeleteMessages(e, t)
              , i = new gs(Mn.DELETE_MESSAGES,s,n);
            return this._sendSignalForData(i)
        }
        ,
        t.clearHistoryMessages = function(e, t) {
            var n = this._selfUserId
              , s = e.type
              , i = this._serverDataCodec.encodeClearMessages(e, t)
              , r = Vn[s]
              , o = new gs(r,i,n);
            return this._sendSignalForData(o)
        }
        ,
        t.getTotalUnreadCount = function() {
            return this.getServerConfig().then(function(e) {
                var t = e.totalUnreadCount;
                return t
            })
        }
        ,
        t.clearUnreadCount = function(e, t) {
            var n = this._selfUserId
              , s = this._serverDataCodec.encodeClearUnreadCount(e, t)
              , i = new gs(Mn.CLEAR_UNREAD_COUNT,s,n);
            return this._sendSignalForData(i)
        }
        ,
        t.joinChatRoom = function(e, t) {
            var n = this
              , s = e.id
              , i = t.count
              , r = t.isJoinExist
              , o = t.isAutoRejoin
              , a = n._serverDataCodec.encodeJoinOrQuitChatRoom()
              , d = r ? Mn.JOIN_EXIST_CHATROOM : Mn.JOIN_CHATROOM
              , l = new gs(d,a,s);
            return n._serverEventEmitter.emit(Cs.BEFORE_JOIN_CHATROOM, {
                id: s
            }),
            n._sendSignalForData(l).then(function(e) {
                return n._serverEventEmitter.emit(Cs.JOIN_CHATROOM, {
                    id: s,
                    count: i,
                    isAutoRejoin: o
                }),
                e
            })
        }
        ,
        t.quitChatRoom = function(e) {
            var t = e.id
              , n = this._serverDataCodec.encodeJoinOrQuitChatRoom()
              , s = new gs(Mn.QUIT_CHATROOM,n,t);
            return this._sendSignalForData(s)
        }
        ,
        t.getChatRoomInfo = function(e, t) {
            var n = e.id
              , s = this._serverDataCodec.encodeGetChatRoomInfo(t)
              , i = new gs(Mn.GET_CHATROOM_INFO,s,n);
            return this._sendSignalForData(i, wi.QueryChatRoomInfoOutput)
        }
        ,
        t.getChatRoomHistoryMessages = function(e, t) {
            var n = this._selfUserId
              , s = this._serverDataCodec
              , i = e.id
              , r = k.CHATROOM
              , o = {
                type: r,
                targetId: i
            }
              , a = bn.CHATROOM
              , d = s.encodeGetHistoryMsg(o, t)
              , l = new gs(a,d,n);
            return this._sendSignalForData(l, wi.HistoryMsgOuput, {
                conversation: o
            })
        }
        ,
        t.modifyChatRoomKV = function(e, t) {
            var n = this
              , s = n._selfUserId
              , i = n._serverDataCodec
              , r = e.id
              , o = t.type || Q.UPDATE
              , a = i.encodeModifyChatRoomKV(e, t, o, s)
              , d = yn.isEqual(o, Q.DELETE) ? Mn.DELETE_CHATROOM_KV : Mn.UPDATE_CHATROOM_KV
              , l = new gs(d,a,r);
            return this._sendSignalForData(l).then(function() {
                n._serverEventEmitter.emit(Cs.CHRM_KV_SET, {
                    id: r,
                    data: {
                        kvEntries: [t],
                        syncTime: ei.DelayTimer.getTime()
                    }
                })
            })
        }
        ,
        t.pullChatRoomKV = function(e, t) {
            var n = this._serverDataCodec
              , s = e.id
              , i = n.encodePullChatRoomKV(t)
              , r = new gs(Mn.PULL_CHATROOM_KV,i,s);
            return this._sendSignalForData(r, wi.ChrmKVOutput)
        }
        ,
        t.getUserSettings = function(e) {
            var t = this._serverDataCodec
              , n = this._selfUserId
              , s = t.encodePullUserSetting(e)
              , i = new gs(Mn.PULL_USER_SETTING,s,n);
            return this._sendSignalForData(i, wi.PullUserSettingOutput)
        }
        ,
        t.getConversationStatus = function(e) {
            var t = this._serverDataCodec
              , n = this._selfUserId
              , s = t.encodeGetConversationStatus(e)
              , i = new gs(Mn.GET_CONVERSATION_STATUS,s,n);
            return this._sendSignalForData(i, wi.SessionStates)
        }
        ,
        t.setConversationStatusList = function(e) {
            var t = this
              , n = this._serverDataCodec
              , s = this._selfUserId
              , i = n.encodeSetConversationStatus(e)
              , r = new gs(Mn.SET_CONVERSATION_STATUS,i,s);
            return this._sendSignalForData(r, wi.SessionStateModifyResp).then(function(n) {
                var s = n.version;
                return e = yn.map(e, function(e) {
                    return e.updatedTime = s,
                    e
                }),
                t._serverEventEmitter.emit(Cs.CONVERSATION_STATUS_SETED, e),
                !0
            })
        }
        ,
        t.joinRTCRoom = function(e) {
            var t = this._serverDataCodec.encodeJoinRTCRoom(e)
              , n = new gs(Mn.JOIN_RTC_ROOM,t,e.id);
            return this._sendSignalForData(n, wi.RtcUserListOutput)
        }
        ,
        t.quitRTCRoom = function(e) {
            var t = this._serverDataCodec.encodeQuitRTCRoom()
              , n = new gs(Mn.QUIT_RTC_ROOM,t,e.id);
            return this._sendSignalForData(n)
        }
        ,
        t.RTCPing = function(e) {
            var t = this._serverDataCodec.encodeJoinRTCRoom(e)
              , n = new gs(Mn.PING_RTC,t,e.id);
            return this._sendSignalForData(n)
        }
        ,
        t.getRTCRoomInfo = function(e) {
            var t = this._serverDataCodec.encodeGetRTCRoomInfo()
              , n = new gs(Mn.GET_RTC_ROOM_INFO,t,e.id);
            return this._sendSignalForData(n, wi.RtcRoomInfoOutput)
        }
        ,
        t.getRTCUserInfoList = function(e) {
            var t = this._serverDataCodec.encodeGetRTCRoomInfo()
              , n = new gs(Mn.GET_RTC_USER_INFO_LIST,t,e.id);
            return this._sendSignalForData(n, wi.RtcUserListOutput)
        }
        ,
        t.setRTCUserInfo = function(e, t) {
            var n = this._serverDataCodec.encodeSetRTCUserInfo(t)
              , s = new gs(Mn.SET_RTC_USER_INFO,n,e.id);
            return this._sendSignalForData(s)
        }
        ,
        t.removeRTCUserInfo = function(e, t) {
            var n = this._serverDataCodec.encodeRemoveRTCUserInfo(t)
              , s = new as(Mn.DEL_RTC_USER_INFO,n,e.id);
            return this._sendSignalForData(s)
        }
        ,
        t.setRTCData = function(e, t, n, s, i, r) {
            var o = this._serverDataCodec.encodeSetRTCData(t, n, s, i, r)
              , a = new as(Mn.SET_RTC_DATA,o,e);
            return this._sendSignalForData(a)
        }
        ,
        t.setRTCUserData = function(e, t, n, s) {
            var i = this._serverDataCodec.encodeUserSetRTCData(t, n, s)
              , r = new as(Mn.USER_SET_RTC_DATA,i,e);
            return this._sendSignalForData(r)
        }
        ,
        t.getRTCData = function(e, t, n, s) {
            var i = this._serverDataCodec.encodeGetRTCData(t, n, s)
              , r = new gs(Mn.GET_RTC_DATA,i,e);
            return this._sendSignalForData(r, wi.RtcQryOutput)
        }
        ,
        t.removeRTCData = function(e, t, n, s, i) {
            var r = this._serverDataCodec.encodeRemoveRTCData(t, n, s, i)
              , o = new as(Mn.DEL_RTC_DATA,r,e);
            return this._sendSignalForData(o)
        }
        ,
        t.setRTCOutData = function(e, t, n, s) {
            var i = this._serverDataCodec.encodeSetRTCOutData(t, n, s)
              , r = new as(Mn.SET_RTC_OUT_DATA,i,e);
            return this._sendSignalForData(r)
        }
        ,
        t.getRTCOutData = function(e, t) {
            var n = this._serverDataCodec.ecnodeGetRTCOutData(t)
              , s = new gs(Mn.GET_RTC_OUT_DATA,n,e);
            return this._sendSignalForData(s, wi.RtcUserOutDataOutput)
        }
        ,
        t.getRTCToken = function(e) {
            var t = this._serverDataCodec.encodeJoinRTCRoom(e)
              , n = new gs(Mn.GET_RTC_TOKEN,t,e.id);
            return this._sendSignalForData(n, wi.RtcTokenOutput)
        }
        ,
        t.setRTCState = function(e, t) {
            var n = this._serverDataCodec.encodeSetRTCState(t)
              , s = new gs(Mn.SET_RTC_STATE,n,e.id);
            return this._sendSignalForData(s)
        }
        ,
        t.getRTCUserList = function(e) {
            var t = this._serverDataCodec.encodeGetRTCRoomInfo()
              , n = new gs(Mn.GET_RTC_USER_LIST,t,e.id);
            return this._sendSignalForData(n, wi.RtcUserListOutput)
        }
        ,
        t.getOldServerConfig = function(e) {
            var t = this.option.appkey
              , n = new ei.MessageTimeSyner({
                appkey: t,
                userId: e
            }).get();
            return Qi.resolve(n)
        }
        ,
        t.getOldConversationList = function(e, t) {
            var n = this
              , s = n._selfUserId
              , i = n._serverDataCodec.encodeOldConversationList(e)
              , r = new gs(Mn.GET_OLD_CONVERSATION_LIST,i,s);
            return n._sendSignalForData(r, wi.RelationsOutput, t)
        }
        ,
        t.removeOldConversation = function(e) {
            var t = e.type
              , n = e.targetId
              , s = this._serverDataCodec.encodeOldConversationList({
                type: t
            })
              , i = new gs(Mn.REMOVE_OLD_CONVERSATION,s,n);
            return this._sendSignalForData(i)
        }
        ,
        e
    }(), Xi = ["wsproxy.cn.ronghub.com", "wsap-cn.ronghub.com"], zi = ["cometproxy-cn.ronghub.com", "mini-cn.ronghub.com"], Zi = {
        connectType: V.WEBSOCKET,
        navigators: ["nav.cn.ronghub.com", "nav2-cn.ronghub.com"],
        detect: {
            url: "https://cdn.ronghub.com/im_detecting",
            intervalTime: 1500
        },
        isOldServer: !0,
        isDebug: !1
    }, $i = {
        count: 20,
        order: B.DESC,
        timestrap: 0
    }, er = {
        isMentiond: !1,
        isCounted: !0,
        isPersited: !0
    }, tr = {
        count: 20,
        order: G.DESC
    }, nr = -1, sr = {
        count: nr
    }, ir = {
        count: 20,
        order: B.DESC
    }, rr = {
        "RC:TxtMsg": {
            isCounted: !0,
            isPersited: !0
        },
        "RC:ImgMsg": {
            isCounted: !0,
            isPersited: !0
        },
        "RC:VcMsg": {
            isCounted: !0,
            isPersited: !0
        },
        "RC:ImgTextMsg": {
            isCounted: !0,
            isPersited: !0
        },
        "RC:FileMsg": {
            isCounted: !0,
            isPersited: !0
        },
        "RC:HQVCMsg": {
            isCounted: !0,
            isPersited: !0
        },
        "RC:LBSMsg": {
            isCounted: !0,
            isPersited: !0
        },
        "RC:PSImgTxtMsg": {
            isCounted: !0,
            isPersited: !0
        },
        "RC:PSMultiImgTxtMsg": {
            isCounted: !0,
            isPersited: !0
        },
        "RCJrmf:RpMsg": {
            isCounted: !0,
            isPersited: !0
        },
        "RCJrmf:RpOpendMsg": {
            isCounted: !0,
            isPersited: !0
        },
        "RC:CombineMsg": {
            isCounted: !0,
            isPersited: !0
        },
        "RC:ReferenceMsg": {
            isCounted: !0,
            isPersited: !0
        },
        "RC:InfoNtf": {
            isCounted: !1,
            isPersited: !0
        },
        "RC:ContactNtf": {
            isCounted: !1,
            isPersited: !0
        },
        "RC:ProfileNtf": {
            isCounted: !1,
            isPersited: !0
        },
        "RC:CmdNtf": {
            isCounted: !1,
            isPersited: !0
        },
        "RC:GrpNtf": {
            isCounted: !1,
            isPersited: !0
        },
        "RC:RcCmd": {
            isCounted: !1,
            isPersited: !0
        },
        "RC:CmdMsg": {
            isCounted: !1,
            isPersited: !1
        },
        "RC:TypSts": {
            isCounted: !1,
            isPersited: !1
        },
        "RC:PSCmd": {
            isCounted: !1,
            isPersited: !1
        },
        "RC:SRSMsg": {
            isCounted: !1,
            isPersited: !1
        },
        "RC:RRReqMsg": {
            isCounted: !1,
            isPersited: !1
        },
        "RC:RRRspMsg": {
            isCounted: !1,
            isPersited: !1
        },
        "RC:CsChaR": {
            isCounted: !1,
            isPersited: !1
        },
        "RC:CSCha": {
            isCounted: !1,
            isPersited: !1
        },
        "RC:CsEva": {
            isCounted: !1,
            isPersited: !1
        },
        "RC:CsContact": {
            isCounted: !1,
            isPersited: !1
        },
        "RC:CsHs": {
            isCounted: !1,
            isPersited: !1
        },
        "RC:CsHsR": {
            isCounted: !1,
            isPersited: !1
        },
        "RC:CsSp": {
            isCounted: !1,
            isPersited: !1
        },
        "RC:CsEnd": {
            isCounted: !1,
            isPersited: !1
        },
        "RC:CsUpdate": {
            isCounted: !1,
            isPersited: !1
        },
        "RC:ReadNtf": {
            isCounted: !1,
            isPersited: !1
        },
        "RC:chrmKVNotiMsg": {
            isCounted: !1,
            isPersited: !1
        },
        "RC:VCAccept": {
            isCounted: !1,
            isPersited: !1
        },
        "RC:VCRinging": {
            isCounted: !1,
            isPersited: !1
        },
        "RC:VCSummary": {
            isCounted: !1,
            isPersited: !1
        },
        "RC:VCHangup": {
            isCounted: !1,
            isPersited: !1
        },
        "RC:VCInvite": {
            isCounted: !1,
            isPersited: !1
        },
        "RC:VCModifyMedia": {
            isCounted: !1,
            isPersited: !1
        },
        "RC:VCModifyMem": {
            isCounted: !1,
            isPersited: !1
        },
        "RC:MsgExMsg": {
            isCounted: !1,
            isPersited: !1
        }
    }, or = {
        isFixedNaviResp: !0,
        code: 300,
        userId: "",
        server: "",
        backupServer: "",
        voipCallInfo: "{\"strategy\":1,\"callEngine\":[{\"engineType\":4,\"mediaServer\":\"https://rtc-info.ronghub.com\",\"maxStreamCount\":20},{\"engineType\":3,\"vendorKey\":\"\",\"signKey\":\"\",\"blinkCMPServer\":\"rtccmp.ronghub.com:80\",\"blinkSnifferServer\":\"rtccmp.ronghub.com:80\"}]}",
        kvStorage: 1,
        uploadServer: "upload.qiniup.com",
        openMp: 1,
        openUS: 1,
        logSwitch: 1,
        logPolicy: "{\"url\": \"logcollection.ronghub.com\",\"level\": 1,\"itv\": 6,\"times\": 5}",
        bosAddr: "gz.bcebos.com",
        joinMChrm: !0,
        activeServer: "",
        alone: !0,
        chatroomMsg: !0,
        compDays: 0,
        errorMessage: "",
        extkitSwitch: 1,
        gifSize: 2048,
        grpMsgLimit: 1,
        historyMsg: !0,
        isFormatted: 1,
        location: "",
        monitor: 0,
        msgAck: "",
        offlinelogserver: "",
        onlinelogserver: "",
        openHttpDNS: !0,
        qnAddr: "",
        videoTimes: 120,
        voipServer: ""
    }, ar = {
        backupServer: "wsap-cn.ronghub.com:443"
    }, dr = {
        backupServer: "wsap-cn.ronghub.com:80"
    }, lr = ei.RCStorage, gr = function() {
        function e(e) {
            this.storage = void 0,
            this.option = void 0;
            var t = e.appkey
              , n = e.token
              , s = ei.getUIDByToken(n)
              , i = yn.tplEngine(le.ROOT_KEY_TPL, {
                appkey: t,
                UID: s
            });
            this.storage = new lr(i),
            this.option = e
        }
        var t = e.prototype;
        return t.set = function(e) {
            var t = this.option.connectType;
            this.storage.set(le.SUB_KEY.CONNECT_TYPE, t),
            this.storage.set(le.SUB_KEY.TIME_WHEN_SAVED, yn.getCurrentTimestamp()),
            this.storage.set(le.SUB_KEY.RESPONSE, e)
        }
        ,
        t.clear = function() {
            this.storage.clear()
        }
        ,
        t.getResp = function() {
            return this.storage.get(le.SUB_KEY.RESPONSE)
        }
        ,
        t.isValid = function() {
            var e = this.storage
              , t = this.option.connectType
              , n = this.getResp();
            if (yn.isEmpty(n))
                return !1;
            var s = e.get(le.SUB_KEY.CONNECT_TYPE)
              , i = e.get(le.SUB_KEY.TIME_WHEN_SAVED)
              , r = yn.isEqual(s, t)
              , o = yn.getCurrentTimestamp() - i < 72e5;
            return r && o
        }
        ,
        e
    }(), ur = function(e, t) {
        var n = t.appkey
          , s = t.connectType
          , i = t.token
          , r = yn.encodeURI(i)
          , o = Be.protocol.http
          , a = s === V.COMET ? Te.COMET : Te.WEBSOCKET
          , d = yn.getCurrentTimestamp();
        e = yn.getValidUrl(e);
        var l = {
            protocol: o,
            url: e,
            type: a,
            appkey: n,
            random: d,
            token: r
        };
        return yn.tplEngine("{url}/{type}.js?appId={appkey}&token={token}&callBack=" + _e + "&r={random}&v=" + T, l)
    }, pr = function(e) {
        var t = _e + "("
          , n = yn.indexOf(e, t) + t.length
          , s = yn.lastIndexOf(e, ")");
        if (-1 === n || -1 === s)
            return yn.parseJSON(e);
        var i = yn.substring(e, n, s);
        return yn.isValidJSON(i) ? yn.parseJSON(i) : {}
    }, cr = function(e) {
        var t = e.connectType
          , n = yn.isEqual(t, V.COMET)
          , s = n ? zi : Xi
          , i = {
            backupServer: s.join(ee),
            uploadServer: "https://upload.qiniup.com",
            bosAddr: "https://gz.bcebos.com"
        };
        return yn.Defer.resolve(i)
    }, mr = function(e) {
        var t = Be.protocol.http
          , n = t === Ee.HTTP ? dr : ar;
        return yn.extend(e, n)
    }, Er = function(e) {
        var t = e.appkey
          , n = or
          , s = n.voipCallInfo;
        try {
            var i = yn.parseJSON(s);
            yn.forEach(i.callEngine, function(e) {
                3 === e.engineType && (e.vendorKey = t)
            });
            var r = yn.toJSON(i);
            n.voipCallInfo = r
        } catch (e) {}
        return mr(n)
    }, fr = function() {
        function e(e) {
            this.option = void 0,
            this.localNaviHandler = void 0,
            this.option = e,
            this.localNaviHandler = new gr(e)
        }
        var t = e.prototype;
        return t.get = function() {
            var e = this
              , t = e.option
              , n = e.localNaviHandler
              , s = t.navigators
              , i = t.token
              , r = t.connectType;
            if (Be.isMini)
                return cr(t).then(function(e) {
                    return n.set(e),
                    yn.Defer.resolve(e)
                });
            vi.info(Ns.L_GET_NAVI_T, {
                navigators: s,
                token: i
            });
            var o = e.getLocalConfig();
            if (n.isValid())
                return vi.info(Ns.L_GET_NAVI_R, {
                    content: {
                        info: "local navi",
                        localConfigForNavi: o
                    }
                }),
                yn.Defer.resolve(o);
            var a = ei.getNaviListByToken(i);
            s = a.concat(s),
            t.token = ei.getValidToken(i);
            var d = yn.map(s, function(e) {
                return ur(e, t)
            })
              , l = function(e) {
                var s = e.responseText;
                vi.info(Ns.L_GET_NAVI_R, {
                    content: {
                        info: "remote navi",
                        responseText: s
                    }
                });
                var i = pr(s)
                  , o = i.code
                  , a = i.isFixedNaviResp;
                if (o === 200)
                    return n.set(i),
                    i;
                if (i && o) {
                    var d = yn.extendInShallow(N[o], {
                        msg: i.errorMessage
                    });
                    return yn.Defer.reject(d)
                }
                if (a) {
                    if (r === V.COMET)
                        return yn.Defer.reject(S.NAVI_REQUEST_ERROR);
                    var l = Er(t);
                    return n.set(l),
                    l
                }
                return yn.Defer.reject(yn.extendInShallow(S.NAVI_REQUEST_ERROR, {
                    error: s
                }))
            };
            return yn.requestByUrlList(d, {
                timeout: 1e4
            }).then(l, function() {
                return l({
                    responseText: "{\"isFixedNaviResp\":true}"
                })
            })
        }
        ,
        t.setLocalConfig = function(e) {
            if (yn.isObject(e)) {
                var t = this.getLocalConfig() || {}
                  , n = yn.extend(t, e);
                this.localNaviHandler.set(n)
            }
        }
        ,
        t.getLocalConfig = function() {
            return this.localNaviHandler.getResp()
        }
        ,
        t.clear = function() {
            var e = this.option
              , t = new gr(e);
            t.clear()
        }
        ,
        e
    }(), _r = function() {
        function e() {
            this.cmpDomainList = [],
            this.invalidDomainList = [],
            this.option = void 0
        }
        var t = e.prototype;
        return t.setDomainList = function(e, t) {
            this.cmpDomainList = e,
            this.option = t || {}
        }
        ,
        t.getFaster = function() {
            var e = this.cmpDomainList
              , t = this.invalidDomainList
              , n = this.option
              , s = yn.filter(e, function(e) {
                return !yn.isInclude(t, e)
            });
            return s = yn.map(s, function(e) {
                var t = yn.getCurrentTimestamp();
                return yn.getValidUrl(e + "/ping?r=" + t, n)
            }),
            yn.isEmpty(s) ? yn.Defer.reject(S.CMP_REQUEST_ERROR) : yn.requestForFaster(s, {
                timeInterval: 1e3
            }).then(function(e) {
                var t = e.url
                  , n = e.index;
                return {
                    url: t,
                    index: n,
                    domain: yn.getDomainByUrl(t)
                }
            })["catch"](function() {
                return yn.Defer.reject(S.CMP_REQUEST_ERROR)
            })
        }
        ,
        t.addInvalid = function(e) {
            this.invalidDomainList.push(e)
        }
        ,
        t.clearInvalid = function() {
            this.invalidDomainList.length = 0
        }
        ,
        t.isAllInvalid = function() {
            var e = this.cmpDomainList
              , t = this.invalidDomainList;
            return yn.isEqual(e.length, t.length)
        }
        ,
        e
    }(), Tr = pe.SUB_KEY, Sr = (yr = {},
    yr[Tr.UNREAD_COUNT] = {
        keyName: "unreadMessageCount",
        defaultVal: 0
    },
    yr[Tr.HAS_MENTIOND] = {
        keyName: "hasMentiond",
        defaultVal: !1
    },
    yr[Tr.MENTIOND_INFO] = {
        keyName: "mentiondInfo",
        defaultVal: null
    },
    yr[Tr.UNREAD_LAST_TIME] = {
        keyName: "lastUnreadTime",
        defaultVal: 0
    },
    yr[Tr.NOTIFICATION] = {
        keyName: "notificationStatus",
        defaultVal: W.NOTIFY
    },
    yr[Tr.TOP] = {
        keyName: "isTop",
        defaultVal: !1
    },
    yr), Ir = {}, yr;
    yn.forEach(Sr, function(e, t) {
        var n = e.keyName;
        Ir[n] = t
    });
    var Cr = Ir
      , hr = function() {
        function e(e) {
            this._storage = void 0,
            this._selfUserId = void 0;
            var t = yn.tplEngine(pe.ROOT_KEY_TPL, e);
            this._storage = new ei.RCStorage(t),
            this._selfUserId = e.userId
        }
        var t = e.prototype;
        return t.updateMentiondData = function(e) {
            var t = this
              , n = ei.getConversationKey(e)
              , s = this._storage.get(n) || {}
              , i = Cr.mentiondInfo
              , r = Cr.hasMentiond
              , o = e.messageType
              , a = e.isMentiond
              , d = e.type
              , l = e.content
              , u = e.senderUserId
              , p = []
              , c = {}
              , m = s[i] || {}
              , E = m.userIdList || []
              , f = l.mentionedInfo;
            if (f = f || {},
            a && d === k.GROUP && (yn.forEach(f.userIdList, function(e) {
                e !== t._selfUserId || yn.isInclude(E, u) || E.push(u)
            }),
            f.type === Y.ALL && !yn.isInclude(E, u) && E.push(u),
            p = E),
            o === K && d === k.GROUP) {
                var _ = E;
                yn.forEach(E, function(e, t) {
                    e === u && _.splice(t, 1)
                }),
                p = _
            }
            c.userIdList = p,
            f.type && (c.type = f.type),
            0 === p.length ? (delete s[i],
            delete s[r]) : (s[i] = c,
            s[r] = !0),
            yn.isEmpty(s) ? this._storage.remove(n) : this._storage.set(n, s)
        }
        ,
        t.set = function(e, t) {
            t = t || {};
            var n = ei.getConversationKey(e)
              , s = this._storage.get(n) || {};
            yn.forEach(t, function(e, t) {
                var n = Cr[t];
                if (!(yn.isUndefined(n) || yn.isUndefined(e)) && "hasMentiond" !== t && "mentiondInfo" !== t) {
                    var i = Sr[n].defaultVal;
                    yn.isEqual(i, e) ? delete s[n] : s[n] = e
                }
            }),
            s[Tr.UNREAD_COUNT] || delete s[Tr.UNREAD_LAST_TIME],
            yn.isEmpty(s) ? this._storage.remove(n) : this._storage.set(n, s)
        }
        ,
        t.get = function(e) {
            var t = ei.getConversationKey(e)
              , n = this._storage.get(t) || {}
              , s = {};
            return yn.forEach(Sr, function(e, t) {
                var i = e.keyName
                  , r = e.defaultVal;
                s[i] = n[t] || r
            }),
            s
        }
        ,
        t.getValues = function(e) {
            var t = e || yn.noop
              , n = this._storage.getValues() || {}
              , s = [];
            return yn.forEach(n, function(e, n) {
                var i = ei.getConversationByKey(n)
                  , r = i.type
                  , o = i.targetId
                  , a = {};
                yn.forEach(e, function(e, t) {
                    var n = Sr[t] || {}
                      , s = n.keyName
                      , i = n.defaultVal;
                    a[s] = e || i
                }),
                a = yn.extend(a, {
                    type: r,
                    targetId: o
                }),
                a = t(a),
                s.push(a)
            }),
            s
        }
        ,
        e
    }()
      , Rr = function() {
        function e(e) {
            this.isLoading = !1,
            this.pullMsgType = void 0,
            this._queue = new yn.Queue,
            this._option = void 0,
            e = e || {},
            this._option = e
        }
        var t = e.prototype;
        return t._execEvent = function() {
            for (var e = arguments.length, t = Array(e), n = 0; n < e; n++)
                t[n] = arguments[n];
            var s = this
              , i = this._option
              , r = i.event
              , o = i.thisArg
              , a = this._option.onBefore || function() {
                return t
            }
              , d = this._option.onFinished || yn.noop
              , l = this._option.onError || yn.noop;
            return a.apply(void 0, t),
            s.isLoading = !0,
            r.apply(o, t).then(function(e) {
                s.isLoading = !1,
                d.apply(void 0, [e].concat(t))
            })["catch"](function(e) {
                s.isLoading = !1,
                l(e)
            })
        }
        ,
        t.pull = function() {
            for (var e = arguments.length, t = Array(e), n = 0; n < e; n++)
                t[n] = arguments[n];
            this._queue.add({
                event: this._execEvent,
                args: t,
                thisArg: this
            });
            var s = t[0] || {};
            this.pullMsgType = s.type || hn.NORMAL
        }
        ,
        e
    }()
      , Or = {
        CHANGED: "changed"
    }
      , Nr = function() {
        function e(e) {
            var t;
            this._serverEngine = void 0,
            this._eventEmitter = new yn.EventEmitter,
            this._timeStorage = void 0,
            this._handleSetConversationStatus = void 0,
            this._handleConversationStatusChanged = void 0;
            var n = this
              , s = e._selfUserId
              , i = e.option.appkey
              , r = yn.tplEngine(ce.ROOT_KEY_TPL, {
                appkey: i,
                userId: s
            })
              , o = new ei.RCStorage(r)
              , a = o.get(ce.SUB_KEY.TIME) || 0
              , d = new Rr({
                event: n.pull,
                thisArg: n,
                onFinished: function(e) {
                    n._set(e)
                }
            });
            n._handleConversationStatusChanged = function(e) {
                d.pull(e)
            }
            ,
            n._handleSetConversationStatus = function(e) {
                n._set(e)
            }
            ,
            n._timeStorage = o,
            n._serverEngine = e,
            e.watch((t = {},
            t[Cs.CONVERSATION_STATUS_CHANGED] = n._handleConversationStatusChanged,
            t[Cs.CONVERSATION_STATUS_SETED] = n._handleSetConversationStatus,
            t)),
            d.pull(a)
        }
        var t = e.prototype;
        return t.watchChanged = function(e) {
            this._eventEmitter.on(Or.CHANGED, e)
        }
        ,
        t.close = function() {
            var e;
            this._serverEngine.unwatch((e = {},
            e[Cs.CONVERSATION_STATUS_CHANGED] = this._handleConversationStatusChanged,
            e[Cs.CONVERSATION_STATUS_SETED] = this._handleSetConversationStatus,
            e))
        }
        ,
        t.pull = function(e) {
            var t = this._timeStorage.get(ce.SUB_KEY.TIME) || 0;
            return e >= t ? this._serverEngine.getConversationStatus(t) : yn.Defer.reject()
        }
        ,
        t._set = function(e) {
            var t = this;
            if (!yn.isUndefined(e)) {
                var n = t._timeStorage.get(ce.SUB_KEY.TIME) || 0
                  , s = e.length;
                yn.forEach(e, function(e, i) {
                    var r = e.updatedTime || 0;
                    n = r > n ? r : n,
                    t._eventEmitter.emit(Or.CHANGED, {
                        statusItem: e,
                        isLastInAPull: i === s - 1
                    })
                }),
                t._timeStorage.set(ce.SUB_KEY.TIME, n)
            }
        }
        ,
        e
    }()
      , vr = {
        CHANGED: "conversationChanged"
    }
      , Ar = function() {
        function e(e, t) {
            this._selfUserId = void 0,
            this._store = void 0,
            this._eventEmitter = new yn.EventEmitter,
            this._statusManager = void 0,
            this._allConversationList = [],
            this._updatedConversations = {};
            var n = this
              , s = new Nr(t);
            s.watchChanged(function(e) {
                var t = e.statusItem
                  , s = e.isLastInAPull;
                n._addStatus(t, s)
            }),
            n._store = new hr(e),
            n._selfUserId = e.userId,
            n._statusManager = s
        }
        var t = e.prototype;
        return t.watch = function(e) {
            var t = e.conversation;
            this._eventEmitter.on(vr.CHANGED, t)
        }
        ,
        t.addMessage = function(e) {
            var t = this
              , n = e.message
              , s = e.isLastInAPull
              , i = n.type
              , r = n.isPersited
              , o = yn.isInclude(se, i);
            if (o) {
                var a = !1
                  , d = t._store.get(n)
                  , l = [t._setUnreadCount, t._setMentiondInfo];
                if (yn.forEach(l, function(e) {
                    var s = e.call(t, n, d)
                      , i = s.hasChanged
                      , r = s.conversation;
                    a = a || i,
                    d = r
                }),
                a && (t._store.set(n, d),
                t._store.updateMentiondData(n)),
                r) {
                    var u = t._getConversationByMessage(n);
                    u.updatedItems = {
                        latestMessage: {
                            time: n.sentTime,
                            val: n
                        }
                    },
                    t._setUpdatedConversation(u)
                }
                var p = !!yn.isUndefined(s) || s;
                p && t._notifyConversationChanged()
            }
        }
        ,
        t.get = function(e) {
            var t = this._store.get(e)
              , n = t.notificationStatus
              , s = yn.isEqual(n, W.DO_NOT_DISTURB);
            return s && (t.unreadMessageCount = 0),
            t
        }
        ,
        t.read = function(e) {
            var t = this
              , n = e.type
              , s = e.targetId
              , i = t._store
              , r = t._updatedConversations
              , o = ei.getConversationKey(e)
              , a = r[o] || {}
              , d = i.get(e) || {}
              , l = d
              , u = l.unreadMessageCount
              , p = l.hasMentiond;
            if (u || p) {
                var c = ei.DelayTimer.getTime()
                  , m = {
                    type: n,
                    targetId: s,
                    unreadMessageCount: 0,
                    hasMentiond: !1,
                    mentiondInfo: null,
                    updatedItems: {
                        unreadMessageCount: {
                            time: c,
                            val: 0
                        },
                        hasMentiond: {
                            time: c,
                            val: !1
                        },
                        mentiondInfo: {
                            time: c,
                            val: null
                        }
                    }
                };
                d = yn.extendAllowNull(d, m),
                i.set(e, d),
                r[o] = yn.extendAllowNull(a, m),
                t._notifyConversationChanged()
            }
        }
        ,
        t.getTotalUnreadCount = function() {
            var e = this._store
              , t = e.getValues()
              , n = 0;
            return yn.forEach(t, function(e) {
                var t = e.unreadMessageCount;
                t = yn.isNumber(t) ? t : 0,
                n += t
            }),
            n
        }
        ,
        t.getUnreadCount = function(e) {
            var t = this._store
              , n = t.get(e) || {}
              , s = n.unreadMessageCount
              , i = yn.isNumber(s) ? s : 0;
            return i
        }
        ,
        t.close = function() {
            this._statusManager.close()
        }
        ,
        t._getConversationByMessage = function(e) {
            var t = e.type
              , n = e.targetId
              , s = this._store.get(e)
              , i = yn.extend(s, {
                type: t,
                targetId: n,
                latestMessage: e
            });
            return i
        }
        ,
        t._getUpdatedConversationList = function() {
            var e = this
              , t = e._updatedConversations
              , n = [];
            return yn.forEach(t, function(t) {
                var s = e._store.get(t);
                yn.forEach(s, function(e, n) {
                    t[n] = e
                }),
                n.push(t)
            }),
            ei.sortConList(n)
        }
        ,
        t._setUnreadCount = function(e, t) {
            var n = e.content
              , s = e.messageType
              , i = e.sentTime
              , r = e.isCounted
              , o = e.messageDirection
              , a = e.senderUserId
              , d = yn.isEqual(o, F.SEND) || yn.isEqual(a, this._selfUserId)
              , l = yn.isEqual(s, K)
              , u = yn.isObject(n)
              , p = !1
              , c = t.lastUnreadTime || 0
              , m = t.unreadMessageCount || 0;
            if (c > i || d)
                return {
                    hasChanged: p,
                    conversation: t
                };
            if (r && (t.unreadMessageCount = m + 1,
            t.lastUnreadTime = i,
            p = !0),
            l && u) {
                var E = c >= n.sentTime;
                E && m && (t.unreadMessageCount = m - 1,
                p = !0)
            }
            return {
                hasChanged: p,
                conversation: t
            }
        }
        ,
        t._setMentiondInfo = function(e, t) {
            var n = e.content
              , s = e.messageDirection
              , i = e.isMentiond
              , r = yn.isEqual(s, F.SEND)
              , o = yn.isObject(n)
              , a = !1;
            if (r)
                ;
            else
                i && o && n.mentionedInfo && (t.hasMentiond = !0,
                t.mentiondInfo = n.mentionedInfo,
                a = !0);
            return {
                hasChanged: a,
                conversation: t
            }
        }
        ,
        t._setUpdatedConversation = function(e) {
            if (yn.isObject(e) && e.targetId && e.type) {
                var t = this
                  , n = ei.getConversationKey(e)
                  , s = t._updatedConversations[n];
                t._updatedConversations[n] = yn.extendAllowNull(s, e)
            }
        }
        ,
        t._notifyConversationChanged = function() {
            var e = this
              , t = e._eventEmitter
              , n = e._getUpdatedConversationList();
            if (yn.isEmpty(n))
                ;
            else
                yn.setTimeout(function() {
                    t.emit(vr.CHANGED, {
                        updatedConversationList: n
                    }),
                    e._updatedConversations = {}
                }, 0)
        }
        ,
        t._addStatus = function(e, t) {
            var n = e.type
              , s = e.targetId
              , i = e.updatedTime
              , r = e.notificationStatus
              , o = e.isTop
              , a = {};
            yn.isUndefined(r) || (a.notificationStatus = {
                time: i,
                val: r
            }),
            yn.isUndefined(o) || (a.isTop = {
                time: i,
                val: o
            }),
            this._setUpdatedConversation({
                type: n,
                targetId: s,
                updatedItems: a
            }),
            this._store.set({
                type: n,
                targetId: s
            }, {
                notificationStatus: r,
                isTop: o
            }),
            t && this._notifyConversationChanged()
        }
        ,
        e
    }()
      , Mr = ei.MessageTimeSyner
      , br = ei.ChatRoomMessageTimeSyner
      , Ur = {
        MESSAGE_RECEIVED: "msg-received"
    }
      , Dr = function() {
        function e(e, t) {
            var n;
            this._serverEngine = void 0,
            this._pullQueue = void 0,
            this._messageTimeSyner = void 0,
            this._chatRoomMessageTimeSyner = void 0,
            this._eventEmitter = new yn.EventEmitter,
            this._pullMessageTimer = new yn.Timer({
                type: Se.INTERVAL,
                timeout: 18e4
            }),
            this._sentMsgCacheInPulling = {},
            this._handleDirectMessage = void 0,
            this._handleNotifyPull = void 0,
            this._handleJoinChatRoom = void 0,
            this._handleSendMessage = void 0;
            var s = this
              , i = e.option.appkey
              , r = e._selfUserId
              , o = t.startSyncTime
              , a = new Rr({
                event: this._pullEvent,
                thisArg: this,
                onFinished: function() {},
                onError: function() {}
            });
            s._handleDirectMessage = function(e) {
                a.isLoading && a.pullMsgType === hn.CHATROOM ? s.notifyMessage({
                    message: e,
                    hasMore: !0
                }) : s.notifyMessage({
                    message: e,
                    hasMore: !1
                })
            }
            ,
            s._handleNotifyPull = function(e) {
                a.pull(e)
            }
            ,
            s._handleJoinChatRoom = function(e) {
                var t = e.id
                  , n = e.count
                  , i = e.isAutoRejoin;
                if (yn.isEqual(n, nr))
                    s._chatRoomMessageTimeSyner.set(t, ei.DelayTimer.getTime());
                else {
                    var r = hn.CHATROOM
                      , o = i ? s._chatRoomMessageTimeSyner.get(t) + 1 : 0;
                    s._chatRoomMessageTimeSyner.set(t, o),
                    a.pull({
                        type: r,
                        time: o,
                        chrmId: t,
                        count: n
                    })
                }
            }
            ,
            s._handleSendMessage = function(e) {
                a.isLoading ? s._setSentMsgCacheInPulling(e) : s._setPullTime(e)
            }
            ,
            e.watch((n = {},
            n[Cs.DIRECT_MSG] = s._handleDirectMessage,
            n[Cs.NOTIFY_PULL] = s._handleNotifyPull,
            n[Cs.JOIN_CHATROOM] = s._handleJoinChatRoom,
            n[Cs.MESSAGE_SEND] = s._handleSendMessage,
            n)),
            s._serverEngine = e,
            s._pullQueue = a,
            s._messageTimeSyner = new Mr({
                appkey: i,
                userId: r,
                startSyncTime: o
            }),
            s._chatRoomMessageTimeSyner = new br({
                appkey: i,
                userId: r
            }),
            s._pullMessageTimer.start(a.pull, {
                thisArg: a
            }),
            a.pull()
        }
        var t = e.prototype;
        return t.watchMessage = function(e) {
            this._eventEmitter.on(Ur.MESSAGE_RECEIVED, e)
        }
        ,
        t.notifyMessage = function(e) {
            var t = e.message;
            this._setPullTime(t),
            this._eventEmitter.emit(Ur.MESSAGE_RECEIVED, e)
        }
        ,
        t.close = function() {
            var e;
            this._pullMessageTimer.stop(),
            this._sentMsgCacheInPulling = {},
            this._serverEngine.unwatch((e = {},
            e[Cs.DIRECT_MSG] = this._handleDirectMessage,
            e[Cs.NOTIFY_PULL] = this._handleNotifyPull,
            e[Cs.JOIN_CHATROOM] = this._handleJoinChatRoom,
            e[Cs.MESSAGE_SEND] = this._handleSendMessage,
            e))
        }
        ,
        t._pullEvent = function(e) {
            e = e || {};
            var t = this
              , n = t._serverEngine
              , s = t._messageTimeSyner
              , i = t._chatRoomMessageTimeSyner
              , r = e
              , o = r.type
              , a = r.chrmId
              , d = r.time
              , l = r.count
              , u = yn.isEqual(o, hn.CHATROOM)
              , p = s.get()
              , c = u ? i.get(a) : p.inboxTime
              , m = yn.copy(p);
            if (d && d < c)
                return yn.Defer.resolve();
            var E = function(e) {
                var n = e.message
                  , s = e.finished
                  , i = e.isLastInAPull;
                t._displatchMessages({
                    message: n,
                    finished: s,
                    isPullChrmMsg: u,
                    isLastInAPull: i,
                    normalSyncTime: m,
                    chatRoomReceiveTime: c
                })
            };
            return u ? n.pullChrmMessageList(a, c, l, {
                onMessage: E
            }) : n.pullMessageList(m, {
                onMessage: E
            })
        }
        ,
        t._displatchMessages = function(e) {
            var t = this
              , n = e.message
              , s = e.finished
              , i = e.isPullChrmMsg
              , r = e.isLastInAPull
              , o = e.normalSyncTime || {}
              , a = o.inboxTime
              , d = o.sendboxTime
              , l = n.sentTime
              , u = n.messageDirection
              , p = n.messageUId
              , c = u === F.SEND
              , m = c ? d : a;
            l <= m && !i || t._sentMsgCacheInPulling[p] || t.notifyMessage({
                message: n,
                hasMore: !s,
                isLastInAPull: r
            })
        }
        ,
        t._setPullTime = function(e) {
            var t = e.type === k.CHATROOM;
            t ? this._chatRoomMessageTimeSyner.setByMessage(e) : this._messageTimeSyner.setByMessage(e)
        }
        ,
        t._setSentMsgCacheInPulling = function(e) {
            var t = e.messageUId;
            yn.isUndefined(t) || (this._sentMsgCacheInPulling[t] = e)
        }
        ,
        t._consumeSentMsgCacheInPulling = function() {
            var e = this
              , t = e._sentMsgCacheInPulling;
            yn.forEach(t, function(t) {
                e._setPullTime(t)
            }),
            e._sentMsgCacheInPulling = {}
        }
        ,
        e
    }()
      , Lr = function() {
        function e(e, t) {
            this._chatRoomId = void 0,
            this._kvCaches = {},
            this._currentUserId = void 0,
            this._chatRoomId = e,
            this._currentUserId = t
        }
        var t = e.prototype;
        return t.setEntries = function(e) {
            e = e || {};
            var t = this
              , n = e
              , s = n.kvEntries
              , i = n.isFullUpdate;
            s = s || [],
            i = i || !1,
            i && t.clear(),
            yn.forEach(s, function(e) {
                t.setEntry(e, {
                    isFullUpdate: i
                })
            })
        }
        ,
        t.setEntry = function(e, t) {
            t = t || {};
            var n = t
              , s = n.isFullUpdate
              , i = e.key
              , r = e.type
              , o = e.isOverwrite
              , a = e.userId
              , d = this.getSetUserId(i)
              , l = yn.isEqual(r, Q.DELETE)
              , u = yn.isEqual(d, a)
              , p = !this.isExisted(i)
              , c = l ? this.remove : this.add;
            s ? c.call(this, e) : (o || u || p) && c.call(this, e)
        }
        ,
        t.add = function(e) {
            var t = e.key;
            e.isDeleted = !1,
            this._kvCaches[t] = e
        }
        ,
        t.remove = function(e) {
            var t = e.key
              , n = this.get(t) || {};
            n.isDeleted = !0,
            this._kvCaches[t] = n
        }
        ,
        t.clear = function() {
            this._kvCaches = {}
        }
        ,
        t.get = function(e) {
            return this._kvCaches[e]
        }
        ,
        t.getSetUserId = function(e) {
            var t = this.get(e) || {};
            return t.userId
        }
        ,
        t.getValue = function(e) {
            var t = this._kvCaches[e] || {}
              , n = t.isDeleted;
            return n ? null : t.value
        }
        ,
        t.getAll = function() {
            var e = {};
            return yn.forEach(this._kvCaches, function(t, n) {
                t.isDeleted || (e[n] = t.value)
            }),
            e
        }
        ,
        t.getUpdatedTime = function() {
            var e = 0;
            return yn.forEach(this._kvCaches, function(t) {
                var n = t.timestamp || 0;
                e < n && (e = n)
            }),
            e
        }
        ,
        t.isExisted = function(e) {
            var t = this.get(e) || {}
              , n = t.value
              , s = t.isDeleted;
            return n && !s
        }
        ,
        e
    }()
      , Pr = {}
      , wr = function(e) {
        return Pr[e]
    }
      , xr = {
        get: wr,
        set: function(e, t, n) {
            var s = wr(e);
            yn.isEmpty(s) && (s = new Lr(e,n)),
            s.setEntries(t),
            Pr[e] = s
        },
        getValue: function(e, t) {
            var n = wr(e)
              , s = n ? n.getValue(t) : null;
            return s
        },
        getAll: function(e) {
            var t = wr(e)
              , n = {};
            return t && (n = t.getAll()),
            n
        },
        clear: function(e) {
            var t = wr(e) || {};
            t.clear && t.clear()
        }
    }
      , Vr = {
        _caches: {},
        set: function(e, t) {
            Vr._caches[e] = t
        },
        get: function(e) {
            return Vr._caches[e] || 0
        },
        clear: function(e) {
            Vr._caches[e] = 0
        }
    }
      , kr = {
        KV_RECEIVED: "kv-received"
    }
      , Fr = function() {
        function e(e) {
            var t;
            this._serverEngine = void 0,
            this._pullQueue = void 0,
            this._handleChrmKVSet = void 0,
            this._handleChrmKVChanged = void 0,
            this._handleBeforeJoinChrm = void 0,
            this._eventEmitter = new yn.EventEmitter;
            var n = this
              , s = e._selfUserId
              , i = new Rr({
                event: this._pullEvent,
                thisArg: this,
                onFinished: function(e, t) {
                    if (e && t.chrmId) {
                        var i = t.chrmId;
                        e.isFullUpdate && n._reset(i),
                        vi.info(Ns.L_PULL_CHRM_KV_R, {
                            data: e,
                            option: t
                        }),
                        xr.set(i, e, s),
                        Vr.set(i, e.syncTime || 0),
                        n._notifyReceivedKV(i, e)
                    }
                }
            });
            n._handleChrmKVSet = function(e) {
                var t = e.id
                  , n = e.data;
                xr.set(t, n, s)
            }
            ,
            n._handleChrmKVChanged = function(e) {
                n.pull(e)
            }
            ,
            n._handleBeforeJoinChrm = function(e) {
                var t = e.id;
                n._reset(t)
            }
            ,
            e.watch((t = {},
            t[Cs.CHRM_KV_SET] = n._handleChrmKVSet,
            t[Cs.CHRM_KV_CHANGED] = n._handleChrmKVChanged,
            t[Cs.BEFORE_JOIN_CHATROOM] = n._handleBeforeJoinChrm,
            t)),
            this._serverEngine = e,
            this._pullQueue = i
        }
        var t = e.prototype;
        return t._reset = function(e) {
            xr.clear(e),
            Vr.clear(e)
        }
        ,
        t._pullEvent = function(e) {
            var t = e.time
              , n = e.chrmId
              , s = Vr.get(n)
              , i = s > t;
            return vi.info(Ns.L_PULL_CHRM_KV_T, {
                currentTime: s,
                serverTime: t,
                isUpdated: i,
                data: e
            }),
            i ? (vi.info(Ns.L_PULL_CHRM_KV_R, {
                info: "kv is updated. not pull again"
            }),
            yn.Defer.resolve()) : this._serverEngine.pullChatRoomKV({
                id: n
            }, s)
        }
        ,
        t.pull = function(e) {
            this._pullQueue.pull(e)
        }
        ,
        t.getValue = function(e, t) {
            return xr.getValue(e, t)
        }
        ,
        t.getAll = function(e) {
            return xr.getAll(e)
        }
        ,
        t._notifyReceivedKV = function(e, t) {
            var n = this
              , s = t.kvEntries
              , i = [];
            0 < s.length && (yn.forEach(s, function(t) {
                var n = t.key
                  , s = t.value
                  , r = t.type
                  , o = t.timestamp;
                i.push({
                    key: n,
                    value: s,
                    timestamp: o,
                    chatroomId: e,
                    type: r
                })
            }),
            n._eventEmitter.emit(kr.KV_RECEIVED, i))
        }
        ,
        t.watchReceived = function(e) {
            this._eventEmitter.on(kr.KV_RECEIVED, e)
        }
        ,
        t.close = function() {
            var e = this, t;
            e._serverEngine.unwatch((t = {},
            t[Cs.CHRM_KV_SET] = e._handleChrmKVSet,
            t[Cs.CHRM_KV_CHANGED] = e._handleChrmKVChanged,
            t[Cs.BEFORE_JOIN_CHATROOM] = e._handleBeforeJoinChrm,
            t))
        }
        ,
        e
    }()
      , Br = function() {
        function e(e, t) {
            this._storage = void 0;
            var n = yn.tplEngine(me.ROOT_KEY_TPL, {
                appkey: e,
                userId: t
            });
            this._storage = new ei.RCStorage(n)
        }
        var t = e.prototype;
        return t.set = function(e) {
            var t = this
              , n = t._storage
              , s = e.settings
              , i = n.get(me.SUB_KEY.SETTINGS) || {}
              , r = i
              , o = !1;
            yn.forEach(s, function(e, t) {
                e = e || {};
                var s = i[t] || {}
                  , a = e
                  , d = a.version
                  , l = a.status
                  , u = a.value
                  , p = n.get(me.SUB_KEY.VERSION) || 0
                  , c = d > (s.version || 0);
                if (c) {
                    switch (o = !0,
                    l) {
                    case kn.ADD:
                    case kn.UPDATE:
                        r[t] = {
                            value: u,
                            version: d
                        };
                        break;
                    case kn.DELETE:
                        delete r[t];
                        break;
                    default:
                    }
                    d > p && n.set(me.SUB_KEY.VERSION, d)
                }
            }),
            o && (yn.isEmpty(r) ? n.remove(me.SUB_KEY.SETTINGS) : n.set(me.SUB_KEY.SETTINGS, r))
        }
        ,
        t.getSetting = function() {
            var e = this._storage.get(me.SUB_KEY.SETTINGS) || {};
            return yn.map(e, function(e) {
                return e = e || {},
                e.value
            })
        }
        ,
        t.getVersion = function() {
            return this._storage.get(me.SUB_KEY.VERSION) || 0
        }
        ,
        e
    }()
      , Gr = {
        CHANGED: "change"
    }
      , Kr = function() {
        function e(e, t) {
            var n;
            this._serverEngine = void 0,
            this._settingStore = void 0,
            this._pullQueue = void 0,
            this._eventEmitter = new yn.EventEmitter,
            this._handleNotifySettingChanged = void 0;
            var s = this
              , i = t.appkey
              , r = t.userId
              , o = t.isAutoPull
              , a = new Br(i,r)
              , d = a.getVersion() || 0
              , l = new Rr({
                event: e.getUserSettings,
                thisArg: e,
                onFinished: function(e) {
                    e && e.version && (s._settingStore.set(e),
                    s._eventEmitter.emit(Gr.CHANGED, s.get()))
                }
            });
            s._handleNotifySettingChanged = function(e) {
                var t = e.version
                  , n = s._settingStore.getVersion();
                t >= n && l.pull(n)
            }
            ,
            s._settingStore = new Br(i,r),
            s._pullQueue = l,
            s._serverEngine = e,
            e.watch((n = {},
            n[Cs.USER_SETTING_CHANGED] = s._handleNotifySettingChanged,
            n)),
            e.option.connectType !== V.COMET && o && l.pull(d)
        }
        var t = e.prototype;
        return t.watchSettingChanged = function(e) {
            this._eventEmitter.on(Gr.CHANGED, e)
        }
        ,
        t.get = function() {
            return this._settingStore.getSetting() || {}
        }
        ,
        t.close = function() {
            var e;
            this._serverEngine.unwatch((e = {},
            e[Cs.USER_SETTING_CHANGED] = this._handleNotifySettingChanged,
            e))
        }
        ,
        e
    }()
      , Yr = function() {
        function e(e) {
            this._option = void 0,
            this._user = void 0,
            this._naviManager = void 0,
            this._cmpManager = new _r,
            this._conversationManager = void 0,
            this._messageManager = void 0,
            this._chatRoomKVManager = void 0,
            this._userSettingManager = void 0,
            this._serverEngine = void 0,
            this._imEventEmitter = new yn.EventEmitter,
            this._rtcEventEmitter = new yn.EventEmitter,
            this._connectionStatus = v.DISCONNECTED,
            this._connectedDomain = void 0,
            this._networkDetecter = void 0,
            this._joinedChatRoomSyner = void 0;
            var t = this
              , n = e.detect
              , s = new Ji(e);
            s.watch({
                status: function(e) {
                    t._handleConnectionStatus(e)
                }
            }),
            this._serverEngine = s,
            this._option = e,
            this._networkDetecter = new yn.NetworkDetecter(n),
            yn.forEach(Ji.prototype, function(e, n) {
                var i = s
                  , r = t
                  , o = r[n]
                  , a = i[n];
                !o && a && yn.isFunction(a) && (r[n] = function() {
                    for (var e = arguments.length, t = Array(e), n = 0; n < e; n++)
                        t[n] = arguments[n];
                    return a.call.apply(a, [i].concat(t))
                }
                )
            })
        }
        var t = e.prototype;
        return t._emitMessageExpansionWatcher = function(e) {
            var t = e.content
              , n = t.put
              , s = t.del
              , i = t.mid;
            yn.isEmpty(n) || this._imEventEmitter.emit(Ss.EXPANSION, {
                updatedExpansion: {
                    expansion: n,
                    messageUId: i
                }
            }),
            yn.isEmpty(s) || this._imEventEmitter.emit(Ss.EXPANSION, {
                deletedExpansion: {
                    deletedKeys: s,
                    messageUId: i
                }
            })
        }
        ,
        t._notifyMessage = function(e) {
            var t = this
              , n = e.message
              , s = t._serverEngine
              , i = s.getConnectedTime();
            if (ei.isLogCommandMsg(n)) {
                var r = n.content;
                return void vi.uploadFull(0, r, i)
            }
            return ei.isVoipMessage(n) ? void this._rtcEventEmitter.emit(Is.MESSAGE, e) : ei.isExpansionNotifyMsg(n) ? void t._emitMessageExpansionWatcher(n) : void (this._conversationManager.addMessage(e),
            this._imEventEmitter.emit(Ss.MESSAGE, e))
        }
        ,
        t._handleConnectionStatus = function(e) {
            var t = this._cmpManager
              , n = this._naviManager
              , s = this._connectedDomain
              , i = yn.isInclude(P, e)
              , r = yn.isInclude(w, e)
              , o = yn.isEqual(v.KICKED_OFFLINE_BY_OTHER_CLIENT, e);
            i && (t.addInvalid(s),
            t.isAllInvalid() && (n.clear(),
            t.clearInvalid())),
            r && (this.disconnect(),
            this.reconnect(!0)),
            o && this.disconnect();
            var a = x[e] || e;
            this._connectionStatus = a,
            this._imEventEmitter.emit(Ss.STATUS, {
                status: a
            }),
            this._rtcEventEmitter.emit(Is.STATUS, {
                status: a
            })
        }
        ,
        t._handleConnectError = function(e) {
            var t = this._user
              , n = e.code || e.status;
            return (this.disconnect(),
            n === S.CONN_REDIRECTED.code) ? (this._naviManager.clear(),
            this.connect(t)) : (this._connectionStatus = v.DISCONNECTED,
            yn.Defer.reject(e))
        }
        ,
        t._afterConnect = function(e, t) {
            var n = this
              , s = n._serverEngine
              , i = n._option.appkey
              , r = n._imEventEmitter
              , o = n._naviManager
              , a = e.id
              , d = o.getLocalConfig() || {};
            vi.setOption({
                userId: a
            }),
            n._user.id = a;
            var l = new Ar({
                appkey: i,
                userId: a
            },s);
            l.watch({
                conversation: function(e) {
                    var t = e.updatedConversationList;
                    r.emit(Ss.CONVERSATION, {
                        updatedConversationList: t
                    })
                }
            }),
            n._conversationManager = l;
            var u = new Dr(s,{
                startSyncTime: t
            });
            u.watchMessage(function(e) {
                n._notifyMessage(e)
            }),
            n._messageManager = u,
            n._chatRoomKVManager = new Fr(s),
            n._chatRoomKVManager.watchReceived(function(e) {
                n._imEventEmitter.emit(Ss.CHATROOM, {
                    updatedEntries: e
                })
            });
            var p = !!+d.openUS
              , c = new Kr(s,{
                appkey: i,
                userId: a,
                isAutoPull: p
            });
            n._joinedChatRoomSyner = new ei.JoinedChatRoomSyner({
                appkey: i,
                userId: a
            }),
            c.watchSettingChanged(function(e) {
                e = e || {};
                var t = e
                  , s = t.VoipInfo;
                o.setLocalConfig({
                    voipCallInfo: yn.toJSON(s)
                }),
                n._imEventEmitter.emit(Ss.SETTING, e)
            }),
            n._userSettingManager = c
        }
        ,
        t._isInChatroom = function(e) {
            var t = this._joinedChatRoomSyner.get()
              , n = !1;
            return yn.forEach(t, function(t) {
                var s = t.chrmId;
                e === s && (n = !0)
            }),
            n
        }
        ,
        t.watch = function(e) {
            var t = e.status, n = e.message, s = e.conversation, i = e.chatroom, r = e.expansion, o = this, a = (d = {},
            d[Ss.STATUS] = t,
            d[Ss.MESSAGE] = n,
            d[Ss.CONVERSATION] = s,
            d[Ss.CHATROOM] = i,
            d[Ss.EXPANSION] = r,
            d), d;
            yn.forEach(a, function(e, t) {
                yn.isFunction(e) && o._imEventEmitter.on(t, e)
            })
        }
        ,
        t.rtcInnerWatch = function(e) {
            var t = e.status, n = e.message, s = this, i = (r = {},
            r[Is.STATUS] = t,
            r[Is.MESSAGE] = n,
            r), r;
            yn.forEach(i, function(e, t) {
                yn.isFunction(e) && s._rtcEventEmitter.on(t, e)
            })
        }
        ,
        t.rtcInnerUnwatch = function() {
            var e = this._rtcEventEmitter;
            e.clear()
        }
        ,
        t.unwatch = function(e) {
            var t = this._imEventEmitter
              , n = {
                status: "IM_EVENT.STATUS",
                message: "IM_EVENT.MESSAGE",
                conversation: "IM_EVENT.CONVERSATION",
                chatroom: "IM_EVENT.CHATROOM",
                expansion: "IM_EVENT.EXPANSION"
            };
            e ? yn.forEach(e, function(e, s) {
                n[s] && t.off(s, e)
            }) : t.clear()
        }
        ,
        t.getConnectionStatus = function() {
            return this._connectionStatus
        }
        ,
        t.getConnectionUserId = function() {
            var e = this._user || {};
            return e.id
        }
        ,
        t.getAppInfo = function() {
            var e = this._option
              , t = this._naviManager
              , n = this._userSettingManager;
            return yn.extendInShallow(e, {
                navi: t.getLocalConfig(),
                serverConfig: n ? n.get() : {}
            })
        }
        ,
        t.connect = function(e, t) {
            vi.startRealtimeUpload();
            var n = this
              , s = n._option
              , i = n._serverEngine
              , r = n._cmpManager
              , o = ei.getNavReqOption(s, e)
              , a = new fr(o)
              , d = s.isOldServer ? i.getOldServerConfig : i.getServerConfig;
            t = t || {};
            var l = t.isAutoReconnect;
            n._handleConnectionStatus(v.CONNECTING),
            n._user = yn.copy(e),
            n._naviManager = a;
            var u;
            return a.get().then(function(e) {
                var t = ei.getCMPDomainList(e, s);
                return vi.setServerOption(e),
                r.setDomainList(t),
                r.getFaster()
            }).then(function(t) {
                var s = t.domain;
                return n._connectedDomain = s,
                i.connect(e, {
                    domain: s
                })
            }).then(function(e) {
                return u = e,
                l && n.rejoinChatRoom(),
                d.call(i, e.id)
            }).then(function(e) {
                return n._afterConnect(u, e),
                n._handleConnectionStatus(v.CONNECTED),
                u
            })["catch"](function(e) {
                return n._handleConnectError(e)
            })
        }
        ,
        t.reconnect = function(e) {
            var t = this
              , n = t._user;
            return yn.isUndefined(n) ? yn.Defer.reject(S.NOT_CONNECTED) : t._networkDetecter.start().then(function() {
                return t.connect(n, {
                    isAutoReconnect: e
                })
            })
        }
        ,
        t.disconnect = function(e) {
            return e && this._handleConnectionStatus(v.DISCONNECTED),
            this._networkDetecter && this._networkDetecter.stop(),
            this._messageManager && this._messageManager.close(),
            this._chatRoomKVManager && this._chatRoomKVManager.close(),
            this._userSettingManager && this._userSettingManager.close(),
            this._conversationManager && this._conversationManager.close(),
            this._serverEngine.disconnect()
        }
        ,
        t.changeUser = function(e) {
            return this.disconnect(!0),
            this.connect(e)
        }
        ,
        t.sendMessage = function(e, t) {
            var n = this
              , s = yn.toJSON(t.content);
            return yn.getByteLength(s) > 131072 ? yn.Defer.reject(S.MSG_CONTENT_EXCEED_LIMIT) : n._serverEngine.sendMessage(e, t).then(function(e) {
                return n._conversationManager.addMessage({
                    message: e,
                    hasMore: !1
                }),
                e
            })
        }
        ,
        t.recallMessage = function(e, t, n) {
            var s = this;
            return s._serverEngine.recallMessage(e, t, n).then(function(e) {
                return s._conversationManager.addMessage({
                    message: e,
                    hasMore: !1
                }),
                e
            })
        }
        ,
        t.getConversationList = function(e) {
            var t = this._option.isOldServer
              , n = this._serverEngine
              , s = this._conversationManager
              , i = t ? n.getOldConversationList : n.getConversationList;
            return i.call(n, e, {
                afterDecode: function(e) {
                    var t = s.get(e);
                    return e = yn.extendAllowNull(e, t),
                    e
                }
            }).then(function(e) {
                return ei.sortConList(e)
            })
        }
        ,
        t.getLocalConversation = function(e) {
            var t = this._conversationManager.get(e);
            return {
                unreadMessageCount: t.unreadMessageCount || 0,
                hasMentiond: t.hasMentiond || !1,
                mentiondInfo: t.mentiondInfo
            }
        }
        ,
        t.removeConversation = function(e) {
            var t = this._option.isOldServer
              , n = this._serverEngine
              , s = t ? n.removeOldConversation : n.removeConversation;
            return s.call(n, e)
        }
        ,
        t.getTotalUnreadCount = function() {
            var e = this._option.isOldServer
              , t = this._serverEngine;
            if (e) {
                var n = this._conversationManager.getTotalUnreadCount();
                return yn.Defer.resolve(n)
            }
            return t.getTotalUnreadCount()
        }
        ,
        t.getUnreadCount = function(e) {
            var t = this._option.isOldServer;
            if (t) {
                var n = this._conversationManager.getUnreadCount(e);
                return yn.Defer.resolve(n)
            }
        }
        ,
        t.clearUnreadCount = function(e, t) {
            var n = this._option.isOldServer
              , s = this._serverEngine;
            return n ? (this._conversationManager.read(e),
            yn.Defer.resolve()) : s.clearUnreadCount(e, t)
        }
        ,
        t.joinChatRoom = function(e, t) {
            var n = this
              , s = n._serverEngine
              , i = n._naviManager
              , r = n._chatRoomKVManager
              , o = n._joinedChatRoomSyner
              , a = t.isAutoRejoin;
            return s.joinChatRoom(e, t).then(function() {
                return i.get()
            }).then(function(n) {
                var s = n.kvStorage
                  , i = n.joinMChrm;
                a || o.set({
                    chrmId: e.id,
                    count: t.count,
                    isOpenJoinMulitpleChrmService: i
                });
                return s ? r.pull({
                    time: 0,
                    chrmId: e.id
                }) : yn.Defer.resolve()
            })
        }
        ,
        t.quitChatRoom = function(e) {
            var t = this
              , n = t._serverEngine;
            return n.quitChatRoom(e).then(function() {
                return t._joinedChatRoomSyner.remove(e.id),
                yn.Defer.resolve()
            })
        }
        ,
        t.rejoinChatRoom = function() {
            var e = this
              , t = e._joinedChatRoomSyner
              , n = e._imEventEmitter
              , s = t.get();
            yn.forEach(s, function(t) {
                var s = t.chrmId
                  , i = t.count
                  , r = {
                    chrmId: s,
                    count: i
                };
                return e.joinChatRoom({
                    id: s
                }, {
                    count: i,
                    isAutoRejoin: !0,
                    isJoinExist: !0
                }).then(function() {
                    n.emit(Ss.CHATROOM, {
                        rejoinedRoom: r
                    })
                }, function(e) {
                    n.emit(Ss.CHATROOM, {
                        rejoinedRoom: yn.extend(r, {
                            errorCode: e
                        })
                    })
                })
            })
        }
        ,
        t.setChatRoomKV = function(e, t) {
            var n = this;
            return yn.extend(t, {
                type: Q.UPDATE,
                userId: n._user.id
            }),
            t.type = Q.UPDATE,
            n._serverEngine.modifyChatRoomKV(e, t)
        }
        ,
        t.forceSetChatRoomKV = function(e, t) {
            return t.isOverwrite = !0,
            this.setChatRoomKV(e, t)
        }
        ,
        t.removeChatRoomKV = function(e, t) {
            var n = this;
            return yn.extend(t, {
                type: Q.DELETE,
                userId: n._user.id
            }),
            n._serverEngine.modifyChatRoomKV(e, t)
        }
        ,
        t.forceRemoveChatRoomKV = function(e, t) {
            return t.isOverwrite = !0,
            this.removeChatRoomKV(e, t)
        }
        ,
        t.getChatRoomKV = function(e, t) {
            e = e || {};
            var n = this._isInChatroom(e.id);
            if (!n)
                return yn.Defer.reject(S.NOT_IN_CHATROOM);
            var s = this._chatRoomKVManager.getValue(e.id, t);
            return yn.isEmpty(s) ? yn.Defer.reject(S.CHATROOM_KEY_NOT_EXIST) : yn.Defer.resolve(s)
        }
        ,
        t.getAllChatRoomKV = function(e) {
            e = e || {};
            var t = this._isInChatroom(e.id);
            if (!t)
                return yn.Defer.reject(S.NOT_IN_CHATROOM);
            var n = this._chatRoomKVManager.getAll(e.id);
            return yn.Defer.resolve(n)
        }
        ,
        t.getFileToken = function(e, t) {
            var n = this
              , s = ei.genUploadFileName(e, t)
              , i = ei.getUploadFileDomains(n._naviManager.getLocalConfig());
            return n._serverEngine.getFileToken(e, s).then(function(e) {
                return yn.extendInShallow(i, e)
            })
        }
        ,
        t.getFileUrl = function(e, t, n, s) {
            var i = this;
            return s = s || {},
            s.isBosRes ? yn.Defer.resolve(s) : i._serverEngine.getFileUrl(e, t, n)
        }
        ,
        e
    }()
      , qr = function(e) {
        return new Yr(e)
    }
      , Hr = function(e, t) {
        var n = e.event
          , s = e.args;
        s = s || [];
        var i = t[n] || function() {
            return yn.Defer.reject(S.SDK_INTERNAL_ERROR)
        }
        ;
        return i.apply(t, s)
    }
      , jr = function() {
        function e(e) {
            this._engine = void 0,
            this._engine = new qr(e)
        }
        var t = e.prototype;
        return t._isEventNeedConnect = function(e) {
            var t = this._engine
              , n = t.getConnectionStatus()
              , s = n !== v.CONNECTED
              , i = yn.isInclude(_s, e);
            return s && i
        }
        ,
        t._isEventNeedDisconnect = function(e) {
            var t = this._engine
              , n = t.getConnectionStatus()
              , s = ei.isConnected(n) || ei.isConnecting(n)
              , i = yn.isInclude(Ts, e);
            return s && i
        }
        ,
        t._exec = function(e) {
            var t = e.event
              , n = this._engine;
            if (this._isEventNeedConnect(t))
                return yn.Defer.reject(S.NOT_CONNECTED);
            if (this._isEventNeedDisconnect(t))
                return yn.Defer.reject(S.RC_CONNECTION_EXIST);
            var s = Hr(e, n);
            return yn.isPromise(s) ? s["catch"](function(e) {
                var t = e.status || e.code || e
                  , n = yn.isObject(e) ? e.msg : null
                  , s = y[t] || {
                    code: t
                };
                n && (s.msg = n);
                var i = yn.isNumberData(t);
                return i || (yn.isStackError(e) && (e = e.stack.toString()),
                vi.fatal(Ns.L_CRASH_E, {
                    content: {
                        desc: "SDK Error",
                        error: e
                    }
                }),
                s = yn.extendInShallow(S.SDK_INTERNAL_ERROR, {
                    error: e
                })),
                yn.Defer.reject(s)
            }) : s
        }
        ,
        t.exec = function(e) {
            var t = e.event
              , n = vs[t]
              , s = !yn.isEmpty(n)
              , i = n || {}
              , r = i.req
              , o = i.resp;
            s && vi.info(r, e);
            var a = this._exec(e);
            return yn.isPromise(a) ? a.then(function(e) {
                return s && vi.info(o, e),
                e
            })["catch"](function(e) {
                e = e || {};
                var t = e
                  , n = t.code;
                return s && !vi.isIgnoreErrorCode(n) && vi.error(o, e),
                yn.Defer.reject(e)
            }) : (s && vi.info(o, a),
            a)
        }
        ,
        e
    }()
      , Qr = function(e, t, n) {
        n = n || {};
        var s = this;
        s.validate = t,
        s.name = e,
        s.errorInfo = n.errorInfo,
        s.canBeNull = function() {
            return s.validate = function(e) {
                return yn.isUndefined(e) || yn.isNull(e) || t(e)
            }
            ,
            s
        }
    };
    Qr.isType = function(e) {
        return e instanceof Qr
    }
    ,
    Qr.String = new Qr("String",yn.isString),
    Qr.Number = new Qr("Number",yn.isNumber),
    Qr.Boolean = new Qr("Boolean",yn.isBoolean),
    Qr.Function = new Qr("Function",yn.isFunction),
    Qr.Object = new Qr("Object",yn.isObject),
    Qr.Array = new Qr("Array",yn.isArray),
    Qr.NotAllUndefined = new Qr("AllUndefined",function(e) {
        if (yn.isObject(e) || yn.isArray(e)) {
            var t = !1;
            return yn.forEach(e, function(e) {
                yn.isUndefined(e) || (t = !0)
            }),
            t
        }
        return !yn.isUndefined(e)
    }
    );
    var Wr = ei.getConversationTypeList().join("\u3001");
    Qr.ConversationType = new Qr(Wr,ei.isValidConversationType,{
        errorInfo: "Not all settings are empty"
    }),
    Qr.ChatRoomEntryKey = new Qr("ChatRoomEntryKey",ei.isValidChatRoomKey,{
        errorInfo: "ChatRoom Key length must be 1 - 128, Only letters\u3001numbers\u3001+\u3001=\u3001-\u3001_ are supported"
    }),
    Qr.ChatRoomEntryValue = new Qr("ChatRoomEntryValue",ei.isValidChatRoomValue,{
        errorInfo: "ChatRoom Value length must be 1 - 4096"
    });
    var Jr = function() {
        function e(t, n, s) {
            if (void 0 === s && (s = []),
            !(this instanceof e))
                return new e(t,n,s);
            var i = this;
            i.structure = t,
            i.paths = s,
            i.funcName = n,
            i.validate = Qr.isType(t) ? i._validateType : yn.isArray(t) ? i._validateArray : yn.isObject(t) ? i._validateObject : i._validateOther
        }
        var t = e.prototype;
        return t._validateType = function(e) {
            var t = this.structure
              , n = t.validate(e);
            return n ? this._getSuccess() : this._getError(e)
        }
        ,
        t._validateArray = function(e) {
            var t = this.structure;
            if (yn.isEmpty(t))
                return this._getSuccess();
            if (!yn.isArray(e))
                return this._getError(e);
            var n = t[0];
            for (var s in e) {
                var i = e[s]
                  , r = this._validateField(n, s, i);
                if (r.isError)
                    return r
            }
            return this._getSuccess()
        }
        ,
        t._validateObject = function(e) {
            var t = this.structure
              , n = this.paths;
            if (e = e || {},
            yn.isEmpty(t))
                return this._getSuccess();
            if (!yn.isObject(e))
                return this._getError(e);
            var s = [];
            for (var i in e) {
                var r = t[i]
                  , o = e[i]
                  , a = this._validateField(r, i, o);
                if (a.isError)
                    return a;
                s.push(i)
            }
            for (var d in t) {
                var l = t[d]
                  , u = e[d];
                if (!yn.isInclude(s, d) && !l.validate(u)) {
                    var p = yn.copy(n);
                    return p.push(d),
                    this._getError(u, {
                        paths: p,
                        expect: l.name
                    })
                }
            }
            return this._getSuccess()
        }
        ,
        t._validateOther = function(e) {
            var t = this
              , n = t.structure;
            return yn.isEqual(n, e) || yn.isEmpty(n) ? t._getSuccess() : t._getError(e, {
                current: e,
                expect: n
            })
        }
        ,
        t._validateField = function(t, n, s) {
            var i = this.paths
              , r = this.funcName
              , o = yn.copy(i);
            return o.push(n),
            new e(t,r,o).validate(s)
        }
        ,
        t._getError = function(e, t) {
            void 0 === t && (t = []);
            var n = this.structure
              , s = this.paths
              , i = this.funcName;
            t = yn.extend({
                current: e,
                expect: n.name || yn.getTypeName(n),
                paths: s
            }, t),
            s = t.paths;
            var r = t
              , o = r.current
              , a = r.expect
              , d = yn.isEmpty(s) ? "param" : s.join(".")
              , l = yn.getTypeName(o);
            o = yn.toJSON(o) || o,
            o = o + "(" + l + ")";
            var u = yn.tplEngine(S.PARAMETER_ERROR.msg, {
                param: d,
                expect: a,
                current: o
            })
              , p = {
                code: S.PARAMETER_ERROR.code,
                funcName: i,
                msg: u
            }
              , c = yn.toJSON(p);
            return yn.isEmpty(i) && delete p[i],
            n.errorInfo && (p = n.errorInfo),
            {
                isError: !0,
                info: p,
                jsonInfo: c
            }
        }
        ,
        t._getSuccess = function() {
            return {
                isError: !1
            }
        }
        ,
        e
    }(), Xr = function(e, t, n) {
        return Jr(e, n).validate(t)
    }, zr = (d = {},
    d[q.TEXT] = {
        content: Qr.String
    },
    d[q.VOICE] = {
        content: Qr.String,
        duration: Qr.Number
    },
    d[q.HQ_VOICE] = {
        remoteUrl: Qr.String,
        duration: Qr.Number
    },
    d[q.IMAGE] = {
        content: Qr.String,
        imageUri: Qr.String
    },
    d[q.GIF] = {
        gifDataSize: Qr.Number,
        width: Qr.Number,
        height: Qr.Number,
        remoteUrl: Qr.String
    },
    d[q.RICH_CONTENT] = {
        title: Qr.String,
        content: Qr.String,
        imageUri: Qr.String,
        url: Qr.String
    },
    d[q.LOCATION] = {
        content: Qr.String,
        latitude: Qr.Number,
        longitude: Qr.Number,
        poi: Qr.String
    },
    d[q.FILE] = {
        name: Qr.String,
        size: Qr.Number,
        type: Qr.String,
        fileUrl: Qr.String
    },
    d[q.SIGHT] = {
        sightUrl: Qr.String,
        content: Qr.String,
        duration: Qr.Number,
        size: Qr.Number,
        name: Qr.String
    },
    d[q.COMBINE] = {
        remoteUrl: Qr.String,
        conversationType: Qr.Number,
        nameList: Qr.Array,
        summaryList: Qr.Array
    },
    d), Zr = function(e, t, n) {
        var s = zr[e];
        return s ? Xr(s, t, n) : {
            isError: !1,
            info: ""
        }
    }, $r = function(e) {
        var t;
        return t = function() {
            function t(e) {
                this.type = void 0,
                this.targetId = void 0;
                var t = Xr({
                    type: Qr.ConversationType,
                    targetId: Qr.String
                }, e, "new Conversation")
                  , n = t.isError
                  , s = t.jsonInfo;
                return n ? (yn.consoleError(s),
                s) : void yn.extend(this, e)
            }
            t.create = function(e) {
                return new t(e)
            }
            ,
            t.get = function(e) {
                return new t(e)
            }
            ,
            t.merge = function(e) {
                try {
                    return ei.mergeConversationList(e)
                } catch (t) {
                    yn.consoleError(t)
                }
            }
            ,
            t.remove = function(t) {
                var n = Xr({
                    type: Qr.ConversationType,
                    targetId: Qr.String
                }, t, "Conversation.remove")
                  , s = n.isError
                  , i = n.info;
                return s ? yn.Defer.reject(i) : e.exec({
                    event: fs.REMOVE_CONVERSATION,
                    args: [t]
                })
            }
            ,
            t.getList = function(t) {
                var n = Xr({
                    count: Qr.Number.canBeNull(),
                    startTime: Qr.Number.canBeNull()
                }, t, "Conversation.getList")
                  , s = n.isError
                  , i = n.info;
                return s ? yn.Defer.reject(i) : e.exec({
                    event: fs.GET_CONVERSATION_LIST,
                    args: [t]
                })
            }
            ,
            t.getTotalUnreadCount = function() {
                return e.exec({
                    event: fs.GET_TOTAL_UNREAD_COUNT
                })
            }
            ;
            var n = t.prototype;
            return n.send = function(t) {
                var n = Xr({
                    messageType: Qr.String,
                    content: Qr.Object
                }, t, "conversation.send")
                  , s = n.isError
                  , i = n.info;
                if (s)
                    return yn.Defer.reject(i);
                var r = t
                  , o = r.messageType
                  , a = r.content
                  , d = r.expansion
                  , l = Zr(o, a, "conversation.send")
                  , u = l.isError
                  , p = l.info;
                if (u)
                    return yn.Defer.reject(p);
                var c = t
                  , m = c.isMentioned
                  , E = c.mentionedType
                  , f = c.mentionedUserIdList;
                if (m && (t.isMentiond = m),
                E && (t.mentiondType = E),
                f && (t.mentiondUserIdList = f),
                d) {
                    var _ = ei.validateExpansion(d);
                    if (_)
                        return yn.Defer.reject(_)
                }
                return t = yn.extendInShallow(rr[o], t),
                t = yn.extendInShallow(er, t),
                e.exec({
                    event: fs.SEND_MESSAGE,
                    args: [this, t]
                })
            }
            ,
            n.recall = function(t, n) {
                var s = Xr({
                    sentTime: Qr.Number,
                    messageUId: Qr.String
                }, t, "conversation.recall")
                  , i = s.isError
                  , r = s.info;
                return i ? yn.Defer.reject(r) : e.exec({
                    event: fs.RECALL_MESSAGE,
                    args: [this, t, n]
                })
            }
            ,
            n.read = function(t) {
                return e.exec({
                    event: fs.CLEAR_UNREAD_COUNT,
                    args: [this, t]
                })
            }
            ,
            n.getUnreadCount = function() {
                var t = this;
                return e.exec({
                    event: fs.GET_UNREAD_COUNT,
                    args: [t]
                })
            }
            ,
            n.getMessages = function(t) {
                var n = Xr({
                    order: Qr.Number.canBeNull(),
                    count: Qr.Number.canBeNull(),
                    timestrap: Qr.Number.canBeNull()
                }, t, "conversation.getMessages")
                  , s = n.isError
                  , i = n.info;
                return s ? yn.Defer.reject(i) : (t = yn.extendInShallow($i, t),
                e.exec({
                    event: fs.GET_HISTORY_MSGS,
                    args: [this, t]
                }))
            }
            ,
            n.deleteMessages = function(t) {
                var n = Xr([{
                    sentTime: Qr.Number,
                    messageUId: Qr.String,
                    messageDirection: Qr.Number
                }], t, "conversation.deleteMessages")
                  , s = n.isError
                  , i = n.info;
                return s ? yn.Defer.reject(i) : e.exec({
                    event: fs.DELETE_MESSAGES,
                    args: [this, t]
                })
            }
            ,
            n.clearMessages = function(t) {
                var n = Xr({
                    timestrap: Qr.Number
                }, t, "conversation.clearMessages")
                  , s = n.isError
                  , i = n.info;
                return s ? yn.Defer.reject(i) : e.exec({
                    event: fs.CLEAR_MESSAGES,
                    args: [this, t]
                })
            }
            ,
            n.setStatus = function(t) {
                var n = Xr({
                    notificationStatus: Qr.Number.canBeNull(),
                    isTop: Qr.Boolean.canBeNull()
                }, t, "conversation.setStatus")
                  , s = n.isError
                  , i = n.info;
                if (s)
                    return yn.Defer.reject(i);
                var r = Xr(Qr.NotAllUndefined, t);
                if (s = r.isError,
                s)
                    return i = r.info,
                    yn.Defer.reject(i);
                var o = t.notificationStatus
                  , a = t.isTop;
                return e.exec({
                    event: fs.SET_CONVERSATION_STATUS_LIST,
                    args: [[{
                        type: this.type,
                        targetId: this.targetId,
                        notificationStatus: o,
                        isTop: a
                    }]]
                })
            }
            ,
            n.setStatusList = function(t) {
                var n = Xr([{
                    notificationStatus: Qr.Number.canBeNull(),
                    isTop: Qr.Boolean.canBeNull()
                }], t, "conversation.setStatusList")
                  , s = n.isError
                  , i = n.info;
                if (s)
                    return yn.Defer.reject(i);
                var r = this;
                return t = yn.map(t, function(e) {
                    return yn.extend(e, {
                        type: r.type,
                        targetId: r.targetId
                    })
                }),
                e.exec({
                    event: fs.SET_CONVERSATION_STATUS_LIST,
                    args: [t]
                })
            }
            ,
            n.updateMessageExpansion = function(t, n) {
                var s = this
                  , i = Xr({
                    messageUId: Qr.String,
                    canIncludeExpansion: Qr.Boolean
                }, n, "conversation.updateMessageExpansion")
                  , r = i.isError
                  , o = i.info;
                if (r)
                    return yn.Defer.reject(o);
                var a = ei.validateExpansion(t);
                if (a)
                    return yn.Defer.reject(a);
                n = n || {};
                var d = n
                  , l = d.canIncludeExpansion
                  , u = d.expansion
                  , p = yn.extend(u, t)
                  , c = yn.getObjectKeys(p).length;
                if (!l)
                    return yn.Defer.reject(S.MSG_KV_NOT_SUPPORT);
                if (c > Re.TOTAL)
                    return yn.Defer.reject(S.EXPANSION_LIMIT_EXCEET);
                var m = {};
                return yn.extend(m, {
                    type: s.type,
                    targetId: s.targetId,
                    messageUId: n.messageUId,
                    expansionDic: t
                }),
                e.exec({
                    event: fs.UPDATE_EXPANSION_MESSAGE,
                    args: [m]
                })
            }
            ,
            n.removeMessageExpansion = function(t, n) {
                var s = this
                  , i = Xr({
                    messageUId: Qr.String,
                    canIncludeExpansion: Qr.Boolean
                }, n, "conversation.updateMessageExpansion")
                  , r = i.isError
                  , o = i.info;
                if (r)
                    return yn.Defer.reject(o);
                if (yn.isEmpty(t) || !yn.isArray(t))
                    return yn.Defer.reject(S.ILLGAL_PARAMS);
                n = n || {};
                var a = n
                  , d = a.canIncludeExpansion;
                if (!d)
                    return yn.Defer.reject(S.MSG_KV_NOT_SUPPORT);
                var l = {};
                return yn.extend(l, {
                    type: s.type,
                    targetId: s.targetId,
                    messageUId: n.messageUId,
                    keys: t
                }),
                e.exec({
                    event: fs.UPDATE_EXPANSION_MESSAGE,
                    args: [l]
                })
            }
            ,
            n.removeMessageAllExpansion = function(t) {
                return e.exec({
                    event: fs.UPDATE_EXPANSION_MESSAGE,
                    args: [{
                        removeAll: !0
                    }, t]
                })
            }
            ,
            n.destory = function() {
                var t = this;
                return e.exec({
                    event: fs.REMOVE_CONVERSATION,
                    args: [t]
                })
            }
            ,
            t
        }(),
        t
    }, eo = function(e) {
        var t;
        return t = function() {
            function t(e) {
                this.id = void 0;
                var t = Xr({
                    id: Qr.String
                }, e, "new ChatRoom")
                  , n = t.isError
                  , s = t.jsonInfo;
                return n ? (yn.consoleError(s),
                s) : void yn.extend(this, e)
            }
            t.get = function(e) {
                return new t(e)
            }
            ;
            var n = t.prototype;
            return n.join = function(t) {
                var n = Xr({
                    count: Qr.Number.canBeNull()
                }, t, "chatRoom.join")
                  , s = n.isError
                  , i = n.info;
                return s ? yn.Defer.reject(i) : (t = yn.extendInShallow(sr, t),
                e.exec({
                    event: fs.JOIN_CHATROOM,
                    args: [this, t]
                }))
            }
            ,
            n.joinExist = function(t) {
                var n = Xr({
                    count: Qr.Number.canBeNull()
                }, t, "chatRoom.joinExist")
                  , s = n.isError
                  , i = n.info;
                return s ? yn.Defer.reject(i) : (t.isJoinExist = !0,
                t = yn.extendInShallow(sr, t),
                e.exec({
                    event: fs.JOIN_CHATROOM,
                    args: [this, t]
                }))
            }
            ,
            n.quit = function() {
                return e.exec({
                    event: fs.QUIT_CHATROOM,
                    args: [this]
                })
            }
            ,
            n.getInfo = function(t) {
                var n = Xr({
                    count: Qr.Number.canBeNull(),
                    order: Qr.Number.canBeNull()
                }, t, "chatRoom.getInfo")
                  , s = n.isError
                  , i = n.info;
                return s ? yn.Defer.reject(i) : (t = yn.extendInShallow(tr, t),
                e.exec({
                    event: fs.GET_CHATROOM_INFO,
                    args: [this, t]
                }))
            }
            ,
            n.send = function(t) {
                var n = Xr({
                    messageType: Qr.String,
                    content: Qr.Object
                }, t, "chatRoom.send")
                  , s = n.isError
                  , i = n.info;
                if (s)
                    return yn.Defer.reject(i);
                var r = this.id
                  , o = t
                  , a = o.messageType
                  , d = o.content
                  , l = Zr(a, d, "chatRoom.send")
                  , u = l.isError
                  , p = l.info;
                if (u)
                    return yn.Defer.reject(p);
                var c = {
                    type: k.CHATROOM,
                    targetId: r
                };
                return t = yn.extendInShallow(rr[a], t),
                e.exec({
                    event: fs.SEND_MESSAGE,
                    args: [c, t]
                })
            }
            ,
            n.recall = function(t, n) {
                var s = Xr({
                    sentTime: Qr.Number,
                    messageUId: Qr.String
                }, t, "chatroom.recall")
                  , i = s.isError
                  , r = s.info;
                if (i)
                    return yn.Defer.reject(r);
                var o = this.id
                  , a = {
                    type: k.CHATROOM,
                    targetId: o
                };
                return e.exec({
                    event: fs.RECALL_MESSAGE,
                    args: [a, t, n]
                })
            }
            ,
            n.getMessages = function(t) {
                var n = Xr({
                    count: Qr.Number.canBeNull(),
                    order: Qr.Number.canBeNull(),
                    timestrap: Qr.Number
                }, t, "chatRoom.getInfo")
                  , s = n.isError
                  , i = n.info;
                return s ? yn.Defer.reject(i) : (t = yn.extendInShallow(ir, t),
                e.exec({
                    event: fs.GET_CHATROOM_MSGS,
                    args: [this, t]
                }))
            }
            ,
            n.setEntry = function(t) {
                var n = Xr({
                    key: Qr.ChatRoomEntryKey,
                    value: Qr.ChatRoomEntryValue
                }, t, "chatRoom.setEntry")
                  , s = n.isError
                  , i = n.info;
                return s ? yn.Defer.reject(i) : e.exec({
                    event: fs.SET_KV,
                    args: [this, t]
                })
            }
            ,
            n.forceSetEntry = function(t) {
                var n = Xr({
                    key: Qr.ChatRoomEntryKey,
                    value: Qr.ChatRoomEntryValue
                }, t, "chatRoom.forceSetEntry")
                  , s = n.isError
                  , i = n.info;
                return s ? yn.Defer.reject(i) : e.exec({
                    event: fs.FORCE_SET_KV,
                    args: [this, t]
                })
            }
            ,
            n.removeEntry = function(t) {
                var n = Xr({
                    key: Qr.ChatRoomEntryKey
                }, t, "chatRoom.removeEntry")
                  , s = n.isError
                  , i = n.info;
                return s ? yn.Defer.reject(i) : e.exec({
                    event: fs.DEL_KV,
                    args: [this, t]
                })
            }
            ,
            n.forceRemoveEntry = function(t) {
                var n = Xr({
                    key: Qr.ChatRoomEntryKey
                }, t, "chatRoom.forceRemoveEntry")
                  , s = n.isError
                  , i = n.info;
                return s ? yn.Defer.reject(i) : e.exec({
                    event: fs.FORCE_DEL_KV,
                    args: [this, t]
                })
            }
            ,
            n.getEntry = function(t) {
                var n = Xr(Qr.ChatRoomEntryKey, t, "chatRoom.getEntry")
                  , s = n.isError
                  , i = n.info;
                return s ? yn.Defer.reject(i) : e.exec({
                    event: fs.GET_KV,
                    args: [this, t]
                })
            }
            ,
            n.getAllEntries = function() {
                return e.exec({
                    event: fs.GET_ALL_KV,
                    args: [this]
                })
            }
            ,
            t
        }(),
        t
    }, to = function(e) {
        var t;
        return t = function() {
            function t(e) {
                this.roomId = void 0,
                this.option = void 0,
                this.roomId = e.id,
                this.option = e
            }
            t.get = function(e) {
                return new t(e)
            }
            ;
            var n = t.prototype;
            return n.join = function() {
                return e.exec({
                    event: fs.JOIN_RTC,
                    args: [this.option]
                })
            }
            ,
            n.quit = function() {
                return e.exec({
                    event: fs.QUIT_RTC,
                    args: [this.option]
                })
            }
            ,
            n.ping = function() {
                return e.exec({
                    event: fs.PING_RTC,
                    args: [this.option]
                })
            }
            ,
            n.getRoomInfo = function() {
                return e.exec({
                    event: fs.GET_RTC_ROOM_INFO,
                    args: [this.option]
                })
            }
            ,
            n.getUserInfoList = function() {
                return e.exec({
                    event: fs.GET_RTC_USER_INFO_LIST,
                    args: [this.option]
                })
            }
            ,
            n.setUserInfo = function(t) {
                return e.exec({
                    event: fs.SET_RTC_USER_INFO,
                    args: [this.option, t]
                })
            }
            ,
            n.removeUserInfo = function(t) {
                return e.exec({
                    event: fs.DEL_RTC_USER_INFO,
                    args: [this.option, t]
                })
            }
            ,
            n.setData = function(t, n, s, i, r) {
                return e.exec({
                    event: fs.SET_RTC_DATA,
                    args: [this.roomId, t, n, s, i, r]
                })
            }
            ,
            n.getData = function(t, n, s) {
                return e.exec({
                    event: fs.GET_RTC_DATA,
                    args: [this.roomId, t, n, s]
                })
            }
            ,
            n.removeData = function(t, n, s, i) {
                return e.exec({
                    event: fs.DEL_RTC_DATA,
                    args: [this.roomId, t, n, s, i]
                })
            }
            ,
            n.setUserData = function(e, t, n, s) {
                return this.setData(e, t, n, H.PERSON, s)
            }
            ,
            n.setRTCUserData = function(t, n, s) {
                return e.exec({
                    event: fs.SET_RTC_USER_DATA,
                    args: [this.roomId, t, n, s]
                })
            }
            ,
            n.getUserData = function(e, t) {
                return this.getData(e, t, H.PERSON)
            }
            ,
            n.removeUserData = function(e, t, n) {
                return this.removeData(e, t, H.PERSON, n)
            }
            ,
            n.setRoomData = function(e, t, n, s) {
                return this.setData(e, t, n, H.ROOM, s)
            }
            ,
            n.getRoomData = function(e, t) {
                return this.getData(e, t, H.ROOM)
            }
            ,
            n.removeRoomData = function(e, t, n) {
                return this.removeData(e, t, H.ROOM, n)
            }
            ,
            n.getUserList = function() {
                return e.exec({
                    event: fs.GET_RTC_USER_LIST,
                    args: [this.option]
                })
            }
            ,
            n.setOutData = function(t, n, s) {
                return e.exec({
                    event: fs.SET_RTC_OUT_DATA,
                    args: [this.roomId, t, n, s]
                })
            }
            ,
            n.getOutData = function(t) {
                return e.exec({
                    event: fs.GET_RTC_OUT_DATA,
                    args: [this.roomId, t]
                })
            }
            ,
            n.getToken = function() {
                return e.exec({
                    event: fs.GET_RTC_TOKEN,
                    args: [this.option]
                })
            }
            ,
            n.setState = function(t) {
                return e.exec({
                    event: fs.SET_RTC_STATE,
                    args: [this.option, t]
                })
            }
            ,
            n.send = function(t) {
                var n = this.roomId
                  , s = {
                    type: k.RTC_ROOM,
                    targetId: n
                };
                return e.exec({
                    event: fs.SEND_MESSAGE,
                    args: [s, t]
                })
            }
            ,
            t
        }(),
        t
    }, no = function() {
        function e(e) {
            this._engineDispatcher = void 0;
            var t = Xr({
                appkey: Qr.String
            }, e, "RongIMLib.init")
              , n = t.isError
              , s = t.jsonInfo;
            if (n)
                throw Error(s);
            var i = new jr(e);
            this._engineDispatcher = i;
            var r = {
                Conversation: $r(i),
                ChatRoom: eo(i),
                RTC: to(i)
            };
            yn.extend(this, r)
        }
        var t = e.prototype;
        return t.getConnectionStatus = function() {
            return this._engineDispatcher.exec({
                event: fs.GET_CONNECTION_STATUS
            })
        }
        ,
        t.getConnectionUserId = function() {
            return this._engineDispatcher.exec({
                event: fs.GET_CONNECTION_USER_ID
            })
        }
        ,
        t.getConnectedTime = function() {
            return this._engineDispatcher.exec({
                event: fs.GET_CONNECTED_TIME
            })
        }
        ,
        t.getAppInfo = function() {
            return this._engineDispatcher.exec({
                event: fs.GET_APP_INFO
            })
        }
        ,
        t.watch = function(e) {
            var t = Xr({
                conversation: Qr.Function.canBeNull(),
                message: Qr.Function.canBeNull(),
                status: Qr.Function.canBeNull(),
                setting: Qr.Function.canBeNull()
            }, e, "im.watch")
              , n = t.isError
              , s = t.jsonInfo;
            return n ? (yn.consoleError(s),
            s) : this._engineDispatcher.exec({
                event: fs.WATCH,
                args: [e]
            })
        }
        ,
        t.rtcInnerWatch = function(e) {
            var t = Xr({
                message: Qr.Function.canBeNull(),
                status: Qr.Function.canBeNull()
            }, e, "im.watchForRTC")
              , n = t.isError
              , s = t.jsonInfo;
            return n ? (yn.consoleError(s),
            s) : this._engineDispatcher.exec({
                event: fs.RTC_INNER_WATCH,
                args: [e]
            })
        }
        ,
        t.rtcInnerUnwatch = function() {
            return this._engineDispatcher.exec({
                event: fs.RTC_INNER_UNWATCH,
                args: [this]
            })
        }
        ,
        t.unwatch = function(e) {
            return this._engineDispatcher.exec({
                event: fs.UN_WATCH,
                args: [e]
            })
        }
        ,
        t.connect = function(e) {
            var t = Xr({
                token: Qr.String
            }, e, "im.connect")
              , n = t.isError
              , s = t.info;
            return n ? yn.Defer.reject(s) : this._engineDispatcher.exec({
                event: fs.CONNECT,
                args: [e]
            })
        }
        ,
        t.reconnect = function() {
            return this._engineDispatcher.exec({
                event: fs.RECONNECT
            })
        }
        ,
        t.disconnect = function() {
            return this._engineDispatcher.exec({
                event: fs.DISCONNECT,
                args: [!0]
            })
        }
        ,
        t.changeUser = function(e) {
            var t = Xr({
                token: Qr.String
            }, e, "im.changeUser")
              , n = t.isError
              , s = t.info;
            if (n)
                return yn.Defer.reject(s);
            var i = this;
            return i.disconnect().then(function() {
                return i.connect(e)
            })
        }
        ,
        t.getFileToken = function(e, t) {
            return this._engineDispatcher.exec({
                event: fs.GET_UPLOAD_TOKEN,
                args: [e, t]
            })
        }
        ,
        t.getFileUrl = function(e, t, n, s) {
            return this._engineDispatcher.exec({
                event: fs.GET_UPLOAD_URL,
                args: [e, t, n, s]
            })
        }
        ,
        e
    }(), i = function(e, t) {
        var n = e.isDebug
          , s = e.appkey
          , i = e.logger;
        yn.isFunction(i) && vi.watchLog(i),
        vi.setOption({
            isDebug: n,
            appkey: s
        }),
        vi.info(Ns.A_INIT_O, {
            content: e
        }),
        t.watch({
            status: function(e) {
                var t = e.status;
                vi.setOption({
                    isNetworkUnavailable: yn.isEqual(t, v.NETWORK_UNAVAILABLE)
                })
            }
        })
    }, r = function(e) {
        return e = yn.extendInShallow(Zi, e),
        e.connectType = ei.getConnectType(e),
        l || (l = new no(e),
        i(e, l)),
        l
    }, o = function() {
        return l
    }, a = yn.extend({
        init: r,
        getInstance: o,
        env: Be,
        common: ei,
        ERROR_CODE: I,
        Logger: vi
    }, {
        CONNECT_TYPE: V,
        CONNECTION_STATUS: v,
        CONVERSATION_TYPE: k,
        MESSAGE_DIRECTION: F,
        MESSAGS_TIME_ORDER: B,
        CHATROOM_ORDER: G,
        RECALL_MESSAGE_TYPE: K,
        MESSAGE_TYPE: q,
        MENTIOND_TYPE: Y,
        SDK_VERSION: T,
        FILE_TYPE: j,
        CHATROOM_ENTRY_TYPE: Q,
        NOTIFICATION_STATUS: W,
        RECEIVED_STATUS: J
    }), d, l;
    return a
});
