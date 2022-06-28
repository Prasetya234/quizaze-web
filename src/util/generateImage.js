import a from "../assets/character/A.png"
import b from "../assets/character/B.png"
import c from "../assets/character/C.png"
import d from "../assets/character/D.png"
import e from "../assets/character/E.png"
import f from "../assets/character/F.png"
import g from "../assets/character/G.png"
import h from "../assets/character/H.png"
import i from "../assets/character/I.png"
import j from "../assets/character/J.png"
import k from "../assets/character/K.png"
import l from "../assets/character/L.png"
import m from "../assets/character/M.png"
import n from "../assets/character/N.png"
import o from "../assets/character/O.png"
import p from "../assets/character/P.png"
import q from "../assets/character/Q.png"
import r from "../assets/character/R.png"
import s from "../assets/character/S.png"
import t from "../assets/character/T.png"
import u from "../assets/character/U.png"
import v from "../assets/character/V.png"
import w from "../assets/character/W.png"
import x from "../assets/character/X.png"
import y from "../assets/character/Y.png"
import z from "../assets/character/Z.png"
import notprofile from "../assets/icon/not-profile.png"

const images = [
    {
        name: "a",
        value: a
    },
    {
        name: "b",
        value: b
    },
    {
        name: "c",
        value: c
    },
    {
        name: "d",
        value: d
    },
    {
        name: "e",
        value: e
    },
    {
        name: "f",
        value: f
    },

    {
        name: "g",
        value: g
    },
    {
        name: "h",
        value: h
    }, {
        name: "i",
        value: i
    },

    {
        name: "j",
        value: j
    },
    {
        name: "k",
        value: k
    }, {
        name: "l",
        value: l
    },
    {
        name: "m",
        value: m
    },
    {
        name: "n",
        value: n
    },
    {
        name: "o",
        value: o
    },
    {
        name: "p",
        value: p
    },
    {
        name: "q",
        value: q
    },
    {
        name: "r",
        value: r
    },
    {
        name: "s",
        value: s
    },
    {
        name: "t",
        value: t
    },
    {
        name: "u",
        value: u
    },
    {
        name: "v",
        value: v
    },
    {
        name: "w",
        value: w
    },
    {
        name: "x",
        value: x
    },
    {
        name: "y",
        value: y
    },
    {
        name: "z",
        value: z
    },
]

export function imageCharacter(char) {
    if (!char) return notprofile
    const res = images.find((item) => item.name === char[0].toLowerCase())
    return res ? res.value : notprofile
}