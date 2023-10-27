function Wn(t, e) {
  const n = /* @__PURE__ */ Object.create(null), r = t.split(",");
  for (let i = 0; i < r.length; i++)
    n[r[i]] = !0;
  return e ? (i) => !!n[i.toLowerCase()] : (i) => !!n[i];
}
const re = process.env.NODE_ENV !== "production" ? Object.freeze({}) : {}, Mn = process.env.NODE_ENV !== "production" ? Object.freeze([]) : [], Oe = () => {
}, Ol = () => !1, Tu = /^on[^a-z]/, Cr = (t) => Tu.test(t), qr = (t) => t.startsWith("onUpdate:"), ae = Object.assign, Ps = (t, e) => {
  const n = t.indexOf(e);
  n > -1 && t.splice(n, 1);
}, Du = Object.prototype.hasOwnProperty, X = (t, e) => Du.call(t, e), j = Array.isArray, Rn = (t) => hi(t) === "[object Map]", Cu = (t) => hi(t) === "[object Set]", H = (t) => typeof t == "function", ge = (t) => typeof t == "string", Ss = (t) => typeof t == "symbol", le = (t) => t !== null && typeof t == "object", Vs = (t) => (le(t) || H(t)) && H(t.then) && H(t.catch), Pu = Object.prototype.toString, hi = (t) => Pu.call(t), Ms = (t) => hi(t).slice(8, -1), Su = (t) => hi(t) === "[object Object]", Rs = (t) => ge(t) && t !== "NaN" && t[0] !== "-" && "" + parseInt(t, 10) === t, zr = /* @__PURE__ */ Wn(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), Vu = /* @__PURE__ */ Wn(
  "bind,cloak,else-if,else,for,html,if,model,on,once,pre,show,slot,text,memo"
), pi = (t) => {
  const e = /* @__PURE__ */ Object.create(null);
  return (n) => e[n] || (e[n] = t(n));
}, Mu = /-(\w)/g, Dt = pi((t) => t.replace(Mu, (e, n) => n ? n.toUpperCase() : "")), Ru = /\B([A-Z])/g, He = pi(
  (t) => t.replace(Ru, "-$1").toLowerCase()
), _i = pi((t) => t.charAt(0).toUpperCase() + t.slice(1)), Zt = pi((t) => t ? `on${_i(t)}` : ""), _n = (t, e) => !Object.is(t, e), Zn = (t, e) => {
  for (let n = 0; n < t.length; n++)
    t[n](e);
}, Qr = (t, e, n) => {
  Object.defineProperty(t, e, {
    configurable: !0,
    enumerable: !1,
    value: n
  });
}, ku = (t) => {
  const e = parseFloat(t);
  return isNaN(e) ? t : e;
}, wo = (t) => {
  const e = ge(t) ? Number(t) : NaN;
  return isNaN(e) ? t : e;
};
let To;
const Jr = () => To || (To = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function mi(t) {
  if (j(t)) {
    const e = {};
    for (let n = 0; n < t.length; n++) {
      const r = t[n], i = ge(r) ? $u(r) : mi(r);
      if (i)
        for (const s in i)
          e[s] = i[s];
    }
    return e;
  } else if (ge(t) || le(t))
    return t;
}
const Au = /;(?![^(]*\))/g, Iu = /:([^]+)/, Fu = /\/\*[^]*?\*\//g;
function $u(t) {
  const e = {};
  return t.replace(Fu, "").split(Au).forEach((n) => {
    if (n) {
      const r = n.split(Iu);
      r.length > 1 && (e[r[0].trim()] = r[1].trim());
    }
  }), e;
}
function ks(t) {
  let e = "";
  if (ge(t))
    e = t;
  else if (j(t))
    for (let n = 0; n < t.length; n++) {
      const r = ks(t[n]);
      r && (e += r + " ");
    }
  else if (le(t))
    for (const n in t)
      t[n] && (e += n + " ");
  return e.trim();
}
const Lu = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", zu = /* @__PURE__ */ Wn(Lu);
function Nl(t) {
  return !!t || t === "";
}
function Zr(t, ...e) {
  console.warn(`[Vue warn] ${t}`, ...e);
}
let Be;
class Bu {
  constructor(e = !1) {
    this.detached = e, this._active = !0, this.effects = [], this.cleanups = [], this.parent = Be, !e && Be && (this.index = (Be.scopes || (Be.scopes = [])).push(
      this
    ) - 1);
  }
  get active() {
    return this._active;
  }
  run(e) {
    if (this._active) {
      const n = Be;
      try {
        return Be = this, e();
      } finally {
        Be = n;
      }
    } else
      process.env.NODE_ENV !== "production" && Zr("cannot run an inactive effect scope.");
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    Be = this;
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    Be = this.parent;
  }
  stop(e) {
    if (this._active) {
      let n, r;
      for (n = 0, r = this.effects.length; n < r; n++)
        this.effects[n].stop();
      for (n = 0, r = this.cleanups.length; n < r; n++)
        this.cleanups[n]();
      if (this.scopes)
        for (n = 0, r = this.scopes.length; n < r; n++)
          this.scopes[n].stop(!0);
      if (!this.detached && this.parent && !e) {
        const i = this.parent.scopes.pop();
        i && i !== this && (this.parent.scopes[this.index] = i, i.index = this.index);
      }
      this.parent = void 0, this._active = !1;
    }
  }
}
function ju(t, e = Be) {
  e && e.active && e.effects.push(t);
}
function wl() {
  return Be;
}
function Uu(t) {
  Be ? Be.cleanups.push(t) : process.env.NODE_ENV !== "production" && Zr(
    "onScopeDispose() is called when there is no active effect scope to be associated with."
  );
}
const _r = (t) => {
  const e = new Set(t);
  return e.w = 0, e.n = 0, e;
}, Tl = (t) => (t.w & jt) > 0, Dl = (t) => (t.n & jt) > 0, Hu = ({ deps: t }) => {
  if (t.length)
    for (let e = 0; e < t.length; e++)
      t[e].w |= jt;
}, Wu = (t) => {
  const { deps: e } = t;
  if (e.length) {
    let n = 0;
    for (let r = 0; r < e.length; r++) {
      const i = e[r];
      Tl(i) && !Dl(i) ? i.delete(t) : e[n++] = i, i.w &= ~jt, i.n &= ~jt;
    }
    e.length = n;
  }
}, Xi = /* @__PURE__ */ new WeakMap();
let nr = 0, jt = 1;
const qi = 30;
let Me;
const rn = Symbol(process.env.NODE_ENV !== "production" ? "iterate" : ""), Qi = Symbol(process.env.NODE_ENV !== "production" ? "Map key iterate" : "");
class As {
  constructor(e, n = null, r) {
    this.fn = e, this.scheduler = n, this.active = !0, this.deps = [], this.parent = void 0, ju(this, r);
  }
  run() {
    if (!this.active)
      return this.fn();
    let e = Me, n = Lt;
    for (; e; ) {
      if (e === this)
        return;
      e = e.parent;
    }
    try {
      return this.parent = Me, Me = this, Lt = !0, jt = 1 << ++nr, nr <= qi ? Hu(this) : Do(this), this.fn();
    } finally {
      nr <= qi && Wu(this), jt = 1 << --nr, Me = this.parent, Lt = n, this.parent = void 0, this.deferStop && this.stop();
    }
  }
  stop() {
    Me === this ? this.deferStop = !0 : this.active && (Do(this), this.onStop && this.onStop(), this.active = !1);
  }
}
function Do(t) {
  const { deps: e } = t;
  if (e.length) {
    for (let n = 0; n < e.length; n++)
      e[n].delete(t);
    e.length = 0;
  }
}
let Lt = !0;
const Cl = [];
function vn() {
  Cl.push(Lt), Lt = !1;
}
function yn() {
  const t = Cl.pop();
  Lt = t === void 0 ? !0 : t;
}
function we(t, e, n) {
  if (Lt && Me) {
    let r = Xi.get(t);
    r || Xi.set(t, r = /* @__PURE__ */ new Map());
    let i = r.get(n);
    i || r.set(n, i = _r());
    const s = process.env.NODE_ENV !== "production" ? { effect: Me, target: t, type: e, key: n } : void 0;
    Ji(i, s);
  }
}
function Ji(t, e) {
  let n = !1;
  nr <= qi ? Dl(t) || (t.n |= jt, n = !Tl(t)) : n = !t.has(Me), n && (t.add(Me), Me.deps.push(t), process.env.NODE_ENV !== "production" && Me.onTrack && Me.onTrack(
    ae(
      {
        effect: Me
      },
      e
    )
  ));
}
function gt(t, e, n, r, i, s) {
  const o = Xi.get(t);
  if (!o)
    return;
  let l = [];
  if (e === "clear")
    l = [...o.values()];
  else if (n === "length" && j(t)) {
    const u = Number(r);
    o.forEach((c, f) => {
      (f === "length" || f >= u) && l.push(c);
    });
  } else
    switch (n !== void 0 && l.push(o.get(n)), e) {
      case "add":
        j(t) ? Rs(n) && l.push(o.get("length")) : (l.push(o.get(rn)), Rn(t) && l.push(o.get(Qi)));
        break;
      case "delete":
        j(t) || (l.push(o.get(rn)), Rn(t) && l.push(o.get(Qi)));
        break;
      case "set":
        Rn(t) && l.push(o.get(rn));
        break;
    }
  const a = process.env.NODE_ENV !== "production" ? { target: t, type: e, key: n, newValue: r, oldValue: i, oldTarget: s } : void 0;
  if (l.length === 1)
    l[0] && (process.env.NODE_ENV !== "production" ? Cn(l[0], a) : Cn(l[0]));
  else {
    const u = [];
    for (const c of l)
      c && u.push(...c);
    process.env.NODE_ENV !== "production" ? Cn(_r(u), a) : Cn(_r(u));
  }
}
function Cn(t, e) {
  const n = j(t) ? t : [...t];
  for (const r of n)
    r.computed && Co(r, e);
  for (const r of n)
    r.computed || Co(r, e);
}
function Co(t, e) {
  (t !== Me || t.allowRecurse) && (process.env.NODE_ENV !== "production" && t.onTrigger && t.onTrigger(ae({ effect: t }, e)), t.scheduler ? t.scheduler() : t.run());
}
const Yu = /* @__PURE__ */ Wn("__proto__,__v_isRef,__isVue"), Pl = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((t) => t !== "arguments" && t !== "caller").map((t) => Symbol[t]).filter(Ss)
), Po = /* @__PURE__ */ Ku();
function Ku() {
  const t = {};
  return ["includes", "indexOf", "lastIndexOf"].forEach((e) => {
    t[e] = function(...n) {
      const r = Y(this);
      for (let s = 0, o = this.length; s < o; s++)
        we(r, "get", s + "");
      const i = r[e](...n);
      return i === -1 || i === !1 ? r[e](...n.map(Y)) : i;
    };
  }), ["push", "pop", "shift", "unshift", "splice"].forEach((e) => {
    t[e] = function(...n) {
      vn();
      const r = Y(this)[e].apply(this, n);
      return yn(), r;
    };
  }), t;
}
function Xu(t) {
  const e = Y(this);
  return we(e, "has", t), e.hasOwnProperty(t);
}
class Sl {
  constructor(e = !1, n = !1) {
    this._isReadonly = e, this._shallow = n;
  }
  get(e, n, r) {
    const i = this._isReadonly, s = this._shallow;
    if (n === "__v_isReactive")
      return !i;
    if (n === "__v_isReadonly")
      return i;
    if (n === "__v_isShallow")
      return s;
    if (n === "__v_raw" && r === (i ? s ? Fl : Il : s ? Al : kl).get(e))
      return e;
    const o = j(e);
    if (!i) {
      if (o && X(Po, n))
        return Reflect.get(Po, n, r);
      if (n === "hasOwnProperty")
        return Xu;
    }
    const l = Reflect.get(e, n, r);
    return (Ss(n) ? Pl.has(n) : Yu(n)) || (i || we(e, "get", n), s) ? l : ve(l) ? o && Rs(n) ? l : l.value : le(l) ? i ? $l(l) : Fs(l) : l;
  }
}
class Vl extends Sl {
  constructor(e = !1) {
    super(!1, e);
  }
  set(e, n, r, i) {
    let s = e[n];
    if (Ut(s) && ve(s) && !ve(r))
      return !1;
    if (!this._shallow && (!Gr(r) && !Ut(r) && (s = Y(s), r = Y(r)), !j(e) && ve(s) && !ve(r)))
      return s.value = r, !0;
    const o = j(e) && Rs(n) ? Number(n) < e.length : X(e, n), l = Reflect.set(e, n, r, i);
    return e === Y(i) && (o ? _n(r, s) && gt(e, "set", n, r, s) : gt(e, "add", n, r)), l;
  }
  deleteProperty(e, n) {
    const r = X(e, n), i = e[n], s = Reflect.deleteProperty(e, n);
    return s && r && gt(e, "delete", n, void 0, i), s;
  }
  has(e, n) {
    const r = Reflect.has(e, n);
    return (!Ss(n) || !Pl.has(n)) && we(e, "has", n), r;
  }
  ownKeys(e) {
    return we(
      e,
      "iterate",
      j(e) ? "length" : rn
    ), Reflect.ownKeys(e);
  }
}
class Ml extends Sl {
  constructor(e = !1) {
    super(!0, e);
  }
  set(e, n) {
    return process.env.NODE_ENV !== "production" && Zr(
      `Set operation on key "${String(n)}" failed: target is readonly.`,
      e
    ), !0;
  }
  deleteProperty(e, n) {
    return process.env.NODE_ENV !== "production" && Zr(
      `Delete operation on key "${String(n)}" failed: target is readonly.`,
      e
    ), !0;
  }
}
const qu = /* @__PURE__ */ new Vl(), Qu = /* @__PURE__ */ new Ml(), Ju = /* @__PURE__ */ new Vl(
  !0
), Zu = /* @__PURE__ */ new Ml(!0), Is = (t) => t, gi = (t) => Reflect.getPrototypeOf(t);
function Rr(t, e, n = !1, r = !1) {
  t = t.__v_raw;
  const i = Y(t), s = Y(e);
  n || (_n(e, s) && we(i, "get", e), we(i, "get", s));
  const { has: o } = gi(i), l = r ? Is : n ? $s : mr;
  if (o.call(i, e))
    return l(t.get(e));
  if (o.call(i, s))
    return l(t.get(s));
  t !== i && t.get(e);
}
function kr(t, e = !1) {
  const n = this.__v_raw, r = Y(n), i = Y(t);
  return e || (_n(t, i) && we(r, "has", t), we(r, "has", i)), t === i ? n.has(t) : n.has(t) || n.has(i);
}
function Ar(t, e = !1) {
  return t = t.__v_raw, !e && we(Y(t), "iterate", rn), Reflect.get(t, "size", t);
}
function So(t) {
  t = Y(t);
  const e = Y(this);
  return gi(e).has.call(e, t) || (e.add(t), gt(e, "add", t, t)), this;
}
function Vo(t, e) {
  e = Y(e);
  const n = Y(this), { has: r, get: i } = gi(n);
  let s = r.call(n, t);
  s ? process.env.NODE_ENV !== "production" && Rl(n, r, t) : (t = Y(t), s = r.call(n, t));
  const o = i.call(n, t);
  return n.set(t, e), s ? _n(e, o) && gt(n, "set", t, e, o) : gt(n, "add", t, e), this;
}
function Mo(t) {
  const e = Y(this), { has: n, get: r } = gi(e);
  let i = n.call(e, t);
  i ? process.env.NODE_ENV !== "production" && Rl(e, n, t) : (t = Y(t), i = n.call(e, t));
  const s = r ? r.call(e, t) : void 0, o = e.delete(t);
  return i && gt(e, "delete", t, void 0, s), o;
}
function Ro() {
  const t = Y(this), e = t.size !== 0, n = process.env.NODE_ENV !== "production" ? Rn(t) ? new Map(t) : new Set(t) : void 0, r = t.clear();
  return e && gt(t, "clear", void 0, void 0, n), r;
}
function Ir(t, e) {
  return function(r, i) {
    const s = this, o = s.__v_raw, l = Y(o), a = e ? Is : t ? $s : mr;
    return !t && we(l, "iterate", rn), o.forEach((u, c) => r.call(i, a(u), a(c), s));
  };
}
function Fr(t, e, n) {
  return function(...r) {
    const i = this.__v_raw, s = Y(i), o = Rn(s), l = t === "entries" || t === Symbol.iterator && o, a = t === "keys" && o, u = i[t](...r), c = n ? Is : e ? $s : mr;
    return !e && we(
      s,
      "iterate",
      a ? Qi : rn
    ), {
      // iterator protocol
      next() {
        const { value: f, done: d } = u.next();
        return d ? { value: f, done: d } : {
          value: l ? [c(f[0]), c(f[1])] : c(f),
          done: d
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function Mt(t) {
  return function(...e) {
    if (process.env.NODE_ENV !== "production") {
      const n = e[0] ? `on key "${e[0]}" ` : "";
      console.warn(
        `${_i(t)} operation ${n}failed: target is readonly.`,
        Y(this)
      );
    }
    return t === "delete" ? !1 : this;
  };
}
function Gu() {
  const t = {
    get(s) {
      return Rr(this, s);
    },
    get size() {
      return Ar(this);
    },
    has: kr,
    add: So,
    set: Vo,
    delete: Mo,
    clear: Ro,
    forEach: Ir(!1, !1)
  }, e = {
    get(s) {
      return Rr(this, s, !1, !0);
    },
    get size() {
      return Ar(this);
    },
    has: kr,
    add: So,
    set: Vo,
    delete: Mo,
    clear: Ro,
    forEach: Ir(!1, !0)
  }, n = {
    get(s) {
      return Rr(this, s, !0);
    },
    get size() {
      return Ar(this, !0);
    },
    has(s) {
      return kr.call(this, s, !0);
    },
    add: Mt("add"),
    set: Mt("set"),
    delete: Mt("delete"),
    clear: Mt("clear"),
    forEach: Ir(!0, !1)
  }, r = {
    get(s) {
      return Rr(this, s, !0, !0);
    },
    get size() {
      return Ar(this, !0);
    },
    has(s) {
      return kr.call(this, s, !0);
    },
    add: Mt("add"),
    set: Mt("set"),
    delete: Mt("delete"),
    clear: Mt("clear"),
    forEach: Ir(!0, !0)
  };
  return ["keys", "values", "entries", Symbol.iterator].forEach((s) => {
    t[s] = Fr(
      s,
      !1,
      !1
    ), n[s] = Fr(
      s,
      !0,
      !1
    ), e[s] = Fr(
      s,
      !1,
      !0
    ), r[s] = Fr(
      s,
      !0,
      !0
    );
  }), [
    t,
    n,
    e,
    r
  ];
}
const [
  ec,
  tc,
  nc,
  rc
] = /* @__PURE__ */ Gu();
function vi(t, e) {
  const n = e ? t ? rc : nc : t ? tc : ec;
  return (r, i, s) => i === "__v_isReactive" ? !t : i === "__v_isReadonly" ? t : i === "__v_raw" ? r : Reflect.get(
    X(n, i) && i in r ? n : r,
    i,
    s
  );
}
const ic = {
  get: /* @__PURE__ */ vi(!1, !1)
}, sc = {
  get: /* @__PURE__ */ vi(!1, !0)
}, oc = {
  get: /* @__PURE__ */ vi(!0, !1)
}, lc = {
  get: /* @__PURE__ */ vi(!0, !0)
};
function Rl(t, e, n) {
  const r = Y(n);
  if (r !== n && e.call(t, r)) {
    const i = Ms(t);
    console.warn(
      `Reactive ${i} contains both the raw and reactive versions of the same object${i === "Map" ? " as keys" : ""}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`
    );
  }
}
const kl = /* @__PURE__ */ new WeakMap(), Al = /* @__PURE__ */ new WeakMap(), Il = /* @__PURE__ */ new WeakMap(), Fl = /* @__PURE__ */ new WeakMap();
function ac(t) {
  switch (t) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function uc(t) {
  return t.__v_skip || !Object.isExtensible(t) ? 0 : ac(Ms(t));
}
function Fs(t) {
  return Ut(t) ? t : yi(
    t,
    !1,
    qu,
    ic,
    kl
  );
}
function cc(t) {
  return yi(
    t,
    !1,
    Ju,
    sc,
    Al
  );
}
function $l(t) {
  return yi(
    t,
    !0,
    Qu,
    oc,
    Il
  );
}
function rr(t) {
  return yi(
    t,
    !0,
    Zu,
    lc,
    Fl
  );
}
function yi(t, e, n, r, i) {
  if (!le(t))
    return process.env.NODE_ENV !== "production" && console.warn(`value cannot be made reactive: ${String(t)}`), t;
  if (t.__v_raw && !(e && t.__v_isReactive))
    return t;
  const s = i.get(t);
  if (s)
    return s;
  const o = uc(t);
  if (o === 0)
    return t;
  const l = new Proxy(
    t,
    o === 2 ? r : n
  );
  return i.set(t, l), l;
}
function sn(t) {
  return Ut(t) ? sn(t.__v_raw) : !!(t && t.__v_isReactive);
}
function Ut(t) {
  return !!(t && t.__v_isReadonly);
}
function Gr(t) {
  return !!(t && t.__v_isShallow);
}
function Zi(t) {
  return sn(t) || Ut(t);
}
function Y(t) {
  const e = t && t.__v_raw;
  return e ? Y(e) : t;
}
function Ll(t) {
  return Qr(t, "__v_skip", !0), t;
}
const mr = (t) => le(t) ? Fs(t) : t, $s = (t) => le(t) ? $l(t) : t;
function zl(t) {
  Lt && Me && (t = Y(t), process.env.NODE_ENV !== "production" ? Ji(t.dep || (t.dep = _r()), {
    target: t,
    type: "get",
    key: "value"
  }) : Ji(t.dep || (t.dep = _r())));
}
function Bl(t, e) {
  t = Y(t);
  const n = t.dep;
  n && (process.env.NODE_ENV !== "production" ? Cn(n, {
    target: t,
    type: "set",
    key: "value",
    newValue: e
  }) : Cn(n));
}
function ve(t) {
  return !!(t && t.__v_isRef === !0);
}
function se(t) {
  return fc(t, !1);
}
function fc(t, e) {
  return ve(t) ? t : new dc(t, e);
}
class dc {
  constructor(e, n) {
    this.__v_isShallow = n, this.dep = void 0, this.__v_isRef = !0, this._rawValue = n ? e : Y(e), this._value = n ? e : mr(e);
  }
  get value() {
    return zl(this), this._value;
  }
  set value(e) {
    const n = this.__v_isShallow || Gr(e) || Ut(e);
    e = n ? e : Y(e), _n(e, this._rawValue) && (this._rawValue = e, this._value = n ? e : mr(e), Bl(this, e));
  }
}
function jl(t) {
  return ve(t) ? t.value : t;
}
const hc = {
  get: (t, e, n) => jl(Reflect.get(t, e, n)),
  set: (t, e, n, r) => {
    const i = t[e];
    return ve(i) && !ve(n) ? (i.value = n, !0) : Reflect.set(t, e, n, r);
  }
};
function Ul(t) {
  return sn(t) ? t : new Proxy(t, hc);
}
class pc {
  constructor(e, n, r, i) {
    this._setter = n, this.dep = void 0, this.__v_isRef = !0, this.__v_isReadonly = !1, this._dirty = !0, this.effect = new As(e, () => {
      this._dirty || (this._dirty = !0, Bl(this));
    }), this.effect.computed = this, this.effect.active = this._cacheable = !i, this.__v_isReadonly = r;
  }
  get value() {
    const e = Y(this);
    return zl(e), (e._dirty || !e._cacheable) && (e._dirty = !1, e._value = e.effect.run()), e._value;
  }
  set value(e) {
    this._setter(e);
  }
}
function _c(t, e, n = !1) {
  let r, i;
  const s = H(t);
  s ? (r = t, i = process.env.NODE_ENV !== "production" ? () => {
    console.warn("Write operation failed: computed value is readonly");
  } : Oe) : (r = t.get, i = t.set);
  const o = new pc(r, i, s || !i, n);
  return process.env.NODE_ENV !== "production" && e && !n && (o.effect.onTrack = e.onTrack, o.effect.onTrigger = e.onTrigger), o;
}
const on = [];
function Br(t) {
  on.push(t);
}
function jr() {
  on.pop();
}
function k(t, ...e) {
  if (process.env.NODE_ENV === "production")
    return;
  vn();
  const n = on.length ? on[on.length - 1].component : null, r = n && n.appContext.config.warnHandler, i = mc();
  if (r)
    Ct(
      r,
      n,
      11,
      [
        t + e.join(""),
        n && n.proxy,
        i.map(
          ({ vnode: s }) => `at <${Ti(n, s.type)}>`
        ).join(`
`),
        i
      ]
    );
  else {
    const s = [`[Vue warn]: ${t}`, ...e];
    i.length && s.push(`
`, ...gc(i)), console.warn(...s);
  }
  yn();
}
function mc() {
  let t = on[on.length - 1];
  if (!t)
    return [];
  const e = [];
  for (; t; ) {
    const n = e[0];
    n && n.vnode === t ? n.recurseCount++ : e.push({
      vnode: t,
      recurseCount: 0
    });
    const r = t.component && t.component.parent;
    t = r && r.vnode;
  }
  return e;
}
function gc(t) {
  const e = [];
  return t.forEach((n, r) => {
    e.push(...r === 0 ? [] : [`
`], ...vc(n));
  }), e;
}
function vc({ vnode: t, recurseCount: e }) {
  const n = e > 0 ? `... (${e} recursive calls)` : "", r = t.component ? t.component.parent == null : !1, i = ` at <${Ti(
    t.component,
    t.type,
    r
  )}`, s = ">" + n;
  return t.props ? [i, ...yc(t.props), s] : [i + s];
}
function yc(t) {
  const e = [], n = Object.keys(t);
  return n.slice(0, 3).forEach((r) => {
    e.push(...Hl(r, t[r]));
  }), n.length > 3 && e.push(" ..."), e;
}
function Hl(t, e, n) {
  return ge(e) ? (e = JSON.stringify(e), n ? e : [`${t}=${e}`]) : typeof e == "number" || typeof e == "boolean" || e == null ? n ? e : [`${t}=${e}`] : ve(e) ? (e = Hl(t, Y(e.value), !0), n ? e : [`${t}=Ref<`, e, ">"]) : H(e) ? [`${t}=fn${e.name ? `<${e.name}>` : ""}`] : (e = Y(e), n ? e : [`${t}=`, e]);
}
const Ls = {
  sp: "serverPrefetch hook",
  bc: "beforeCreate hook",
  c: "created hook",
  bm: "beforeMount hook",
  m: "mounted hook",
  bu: "beforeUpdate hook",
  u: "updated",
  bum: "beforeUnmount hook",
  um: "unmounted hook",
  a: "activated hook",
  da: "deactivated hook",
  ec: "errorCaptured hook",
  rtc: "renderTracked hook",
  rtg: "renderTriggered hook",
  0: "setup function",
  1: "render function",
  2: "watcher getter",
  3: "watcher callback",
  4: "watcher cleanup function",
  5: "native event handler",
  6: "component event handler",
  7: "vnode hook",
  8: "directive hook",
  9: "transition hook",
  10: "app errorHandler",
  11: "app warnHandler",
  12: "ref function",
  13: "async component loader",
  14: "scheduler flush. This is likely a Vue internals bug. Please open an issue at https://new-issue.vuejs.org/?repo=vuejs/core"
};
function Ct(t, e, n, r) {
  let i;
  try {
    i = r ? t(...r) : t();
  } catch (s) {
    xi(s, e, n);
  }
  return i;
}
function at(t, e, n, r) {
  if (H(t)) {
    const s = Ct(t, e, n, r);
    return s && Vs(s) && s.catch((o) => {
      xi(o, e, n);
    }), s;
  }
  const i = [];
  for (let s = 0; s < t.length; s++)
    i.push(at(t[s], e, n, r));
  return i;
}
function xi(t, e, n, r = !0) {
  const i = e ? e.vnode : null;
  if (e) {
    let s = e.parent;
    const o = e.proxy, l = process.env.NODE_ENV !== "production" ? Ls[n] : n;
    for (; s; ) {
      const u = s.ec;
      if (u) {
        for (let c = 0; c < u.length; c++)
          if (u[c](t, o, l) === !1)
            return;
      }
      s = s.parent;
    }
    const a = e.appContext.config.errorHandler;
    if (a) {
      Ct(
        a,
        null,
        10,
        [t, o, l]
      );
      return;
    }
  }
  xc(t, n, i, r);
}
function xc(t, e, n, r = !0) {
  if (process.env.NODE_ENV !== "production") {
    const i = Ls[e];
    if (n && Br(n), k(`Unhandled error${i ? ` during execution of ${i}` : ""}`), n && jr(), r)
      throw t;
    console.error(t);
  } else
    console.error(t);
}
let gr = !1, Gi = !1;
const Te = [];
let ht = 0;
const kn = [];
let dt = null, Rt = 0;
const Wl = /* @__PURE__ */ Promise.resolve();
let zs = null;
const bc = 100;
function Bs(t) {
  const e = zs || Wl;
  return t ? e.then(this ? t.bind(this) : t) : e;
}
function Ec(t) {
  let e = ht + 1, n = Te.length;
  for (; e < n; ) {
    const r = e + n >>> 1;
    vr(Te[r]) < t ? e = r + 1 : n = r;
  }
  return e;
}
function bi(t) {
  (!Te.length || !Te.includes(
    t,
    gr && t.allowRecurse ? ht + 1 : ht
  )) && (t.id == null ? Te.push(t) : Te.splice(Ec(t.id), 0, t), Yl());
}
function Yl() {
  !gr && !Gi && (Gi = !0, zs = Wl.then(ql));
}
function Oc(t) {
  const e = Te.indexOf(t);
  e > ht && Te.splice(e, 1);
}
function Kl(t) {
  j(t) ? kn.push(...t) : (!dt || !dt.includes(
    t,
    t.allowRecurse ? Rt + 1 : Rt
  )) && kn.push(t), Yl();
}
function ko(t, e = gr ? ht + 1 : 0) {
  for (process.env.NODE_ENV !== "production" && (t = t || /* @__PURE__ */ new Map()); e < Te.length; e++) {
    const n = Te[e];
    if (n && n.pre) {
      if (process.env.NODE_ENV !== "production" && js(t, n))
        continue;
      Te.splice(e, 1), e--, n();
    }
  }
}
function Xl(t) {
  if (kn.length) {
    const e = [...new Set(kn)];
    if (kn.length = 0, dt) {
      dt.push(...e);
      return;
    }
    for (dt = e, process.env.NODE_ENV !== "production" && (t = t || /* @__PURE__ */ new Map()), dt.sort((n, r) => vr(n) - vr(r)), Rt = 0; Rt < dt.length; Rt++)
      process.env.NODE_ENV !== "production" && js(t, dt[Rt]) || dt[Rt]();
    dt = null, Rt = 0;
  }
}
const vr = (t) => t.id == null ? 1 / 0 : t.id, Nc = (t, e) => {
  const n = vr(t) - vr(e);
  if (n === 0) {
    if (t.pre && !e.pre)
      return -1;
    if (e.pre && !t.pre)
      return 1;
  }
  return n;
};
function ql(t) {
  Gi = !1, gr = !0, process.env.NODE_ENV !== "production" && (t = t || /* @__PURE__ */ new Map()), Te.sort(Nc);
  const e = process.env.NODE_ENV !== "production" ? (n) => js(t, n) : Oe;
  try {
    for (ht = 0; ht < Te.length; ht++) {
      const n = Te[ht];
      if (n && n.active !== !1) {
        if (process.env.NODE_ENV !== "production" && e(n))
          continue;
        Ct(n, null, 14);
      }
    }
  } finally {
    ht = 0, Te.length = 0, Xl(t), gr = !1, zs = null, (Te.length || kn.length) && ql(t);
  }
}
function js(t, e) {
  if (!t.has(e))
    t.set(e, 1);
  else {
    const n = t.get(e);
    if (n > bc) {
      const r = e.ownerInstance, i = r && Ea(r.type);
      return k(
        `Maximum recursive updates exceeded${i ? ` in component <${i}>` : ""}. This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function.`
      ), !0;
    } else
      t.set(e, n + 1);
  }
}
let ln = !1;
const Dn = /* @__PURE__ */ new Set();
process.env.NODE_ENV !== "production" && (Jr().__VUE_HMR_RUNTIME__ = {
  createRecord: Ri(Ql),
  rerender: Ri(Dc),
  reload: Ri(Cc)
});
const mn = /* @__PURE__ */ new Map();
function wc(t) {
  const e = t.type.__hmrId;
  let n = mn.get(e);
  n || (Ql(e, t.type), n = mn.get(e)), n.instances.add(t);
}
function Tc(t) {
  mn.get(t.type.__hmrId).instances.delete(t);
}
function Ql(t, e) {
  return mn.has(t) ? !1 : (mn.set(t, {
    initialDef: ar(e),
    instances: /* @__PURE__ */ new Set()
  }), !0);
}
function ar(t) {
  return Oa(t) ? t.__vccOpts : t;
}
function Dc(t, e) {
  const n = mn.get(t);
  n && (n.initialDef.render = e, [...n.instances].forEach((r) => {
    e && (r.render = e, ar(r.type).render = e), r.renderCache = [], ln = !0, r.update(), ln = !1;
  }));
}
function Cc(t, e) {
  const n = mn.get(t);
  if (!n)
    return;
  e = ar(e), Ao(n.initialDef, e);
  const r = [...n.instances];
  for (const i of r) {
    const s = ar(i.type);
    Dn.has(s) || (s !== n.initialDef && Ao(s, e), Dn.add(s)), i.appContext.propsCache.delete(i.type), i.appContext.emitsCache.delete(i.type), i.appContext.optionsCache.delete(i.type), i.ceReload ? (Dn.add(s), i.ceReload(e.styles), Dn.delete(s)) : i.parent ? bi(i.parent.update) : i.appContext.reload ? i.appContext.reload() : typeof window < "u" ? window.location.reload() : console.warn(
      "[HMR] Root or manually mounted instance modified. Full reload required."
    );
  }
  Kl(() => {
    for (const i of r)
      Dn.delete(
        ar(i.type)
      );
  });
}
function Ao(t, e) {
  ae(t, e);
  for (const n in t)
    n !== "__file" && !(n in e) && delete t[n];
}
function Ri(t) {
  return (e, n) => {
    try {
      return t(e, n);
    } catch (r) {
      console.error(r), console.warn(
        "[HMR] Something went wrong during Vue component hot-reload. Full reload required."
      );
    }
  };
}
let pt, ir = [], es = !1;
function Pr(t, ...e) {
  pt ? pt.emit(t, ...e) : es || ir.push({ event: t, args: e });
}
function Jl(t, e) {
  var n, r;
  pt = t, pt ? (pt.enabled = !0, ir.forEach(({ event: i, args: s }) => pt.emit(i, ...s)), ir = []) : /* handle late devtools injection - only do this if we are in an actual */ /* browser environment to avoid the timer handle stalling test runner exit */ /* (#4815) */ typeof window < "u" && // some envs mock window but not fully
  window.HTMLElement && // also exclude jsdom
  !((r = (n = window.navigator) == null ? void 0 : n.userAgent) != null && r.includes("jsdom")) ? ((e.__VUE_DEVTOOLS_HOOK_REPLAY__ = e.__VUE_DEVTOOLS_HOOK_REPLAY__ || []).push((s) => {
    Jl(s, e);
  }), setTimeout(() => {
    pt || (e.__VUE_DEVTOOLS_HOOK_REPLAY__ = null, es = !0, ir = []);
  }, 3e3)) : (es = !0, ir = []);
}
function Pc(t, e) {
  Pr("app:init", t, e, {
    Fragment: Ue,
    Text: Sr,
    Comment: et,
    Static: cr
  });
}
function Sc(t) {
  Pr("app:unmount", t);
}
const Vc = /* @__PURE__ */ Us(
  "component:added"
  /* COMPONENT_ADDED */
), Zl = /* @__PURE__ */ Us(
  "component:updated"
  /* COMPONENT_UPDATED */
), Mc = /* @__PURE__ */ Us(
  "component:removed"
  /* COMPONENT_REMOVED */
), Rc = (t) => {
  pt && typeof pt.cleanupBuffer == "function" && // remove the component if it wasn't buffered
  !pt.cleanupBuffer(t) && Mc(t);
};
function Us(t) {
  return (e) => {
    Pr(
      t,
      e.appContext.app,
      e.uid,
      e.parent ? e.parent.uid : void 0,
      e
    );
  };
}
const kc = /* @__PURE__ */ Gl(
  "perf:start"
  /* PERFORMANCE_START */
), Ac = /* @__PURE__ */ Gl(
  "perf:end"
  /* PERFORMANCE_END */
);
function Gl(t) {
  return (e, n, r) => {
    Pr(t, e.appContext.app, e.uid, e, n, r);
  };
}
function Ic(t, e, n) {
  Pr(
    "component:emit",
    t.appContext.app,
    t,
    e,
    n
  );
}
function Fc(t, e, ...n) {
  if (t.isUnmounted)
    return;
  const r = t.vnode.props || re;
  if (process.env.NODE_ENV !== "production") {
    const {
      emitsOptions: c,
      propsOptions: [f]
    } = t;
    if (c)
      if (!(e in c))
        (!f || !(Zt(e) in f)) && k(
          `Component emitted event "${e}" but it is neither declared in the emits option nor as an "${Zt(e)}" prop.`
        );
      else {
        const d = c[e];
        H(d) && (d(...n) || k(
          `Invalid event arguments: event validation failed for event "${e}".`
        ));
      }
  }
  let i = n;
  const s = e.startsWith("update:"), o = s && e.slice(7);
  if (o && o in r) {
    const c = `${o === "modelValue" ? "model" : o}Modifiers`, { number: f, trim: d } = r[c] || re;
    d && (i = n.map((_) => ge(_) ? _.trim() : _)), f && (i = n.map(ku));
  }
  if (process.env.NODE_ENV !== "production" && Ic(t, e, i), process.env.NODE_ENV !== "production") {
    const c = e.toLowerCase();
    c !== e && r[Zt(c)] && k(
      `Event "${c}" is emitted in component ${Ti(
        t,
        t.type
      )} but the handler is registered for "${e}". Note that HTML attributes are case-insensitive and you cannot use v-on to listen to camelCase events when using in-DOM templates. You should probably use "${He(e)}" instead of "${e}".`
    );
  }
  let l, a = r[l = Zt(e)] || // also try camelCase event handler (#2249)
  r[l = Zt(Dt(e))];
  !a && s && (a = r[l = Zt(He(e))]), a && at(
    a,
    t,
    6,
    i
  );
  const u = r[l + "Once"];
  if (u) {
    if (!t.emitted)
      t.emitted = {};
    else if (t.emitted[l])
      return;
    t.emitted[l] = !0, at(
      u,
      t,
      6,
      i
    );
  }
}
function ea(t, e, n = !1) {
  const r = e.emitsCache, i = r.get(t);
  if (i !== void 0)
    return i;
  const s = t.emits;
  let o = {}, l = !1;
  if (!H(t)) {
    const a = (u) => {
      const c = ea(u, e, !0);
      c && (l = !0, ae(o, c));
    };
    !n && e.mixins.length && e.mixins.forEach(a), t.extends && a(t.extends), t.mixins && t.mixins.forEach(a);
  }
  return !s && !l ? (le(t) && r.set(t, null), null) : (j(s) ? s.forEach((a) => o[a] = null) : ae(o, s), le(t) && r.set(t, o), o);
}
function Ei(t, e) {
  return !t || !Cr(e) ? !1 : (e = e.slice(2).replace(/Once$/, ""), X(t, e[0].toLowerCase() + e.slice(1)) || X(t, He(e)) || X(t, e));
}
let Ne = null, ta = null;
function ei(t) {
  const e = Ne;
  return Ne = t, ta = t && t.type.__scopeId || null, e;
}
function $c(t, e = Ne, n) {
  if (!e || t._n)
    return t;
  const r = (...i) => {
    r._d && Ko(-1);
    const s = ei(e);
    let o;
    try {
      o = t(...i);
    } finally {
      ei(s), r._d && Ko(1);
    }
    return process.env.NODE_ENV !== "production" && Zl(e), o;
  };
  return r._n = !0, r._c = !0, r._d = !0, r;
}
let ts = !1;
function ti() {
  ts = !0;
}
function ki(t) {
  const {
    type: e,
    vnode: n,
    proxy: r,
    withProxy: i,
    props: s,
    propsOptions: [o],
    slots: l,
    attrs: a,
    emit: u,
    render: c,
    renderCache: f,
    data: d,
    setupState: _,
    ctx: g,
    inheritAttrs: p
  } = t;
  let y, E;
  const O = ei(t);
  process.env.NODE_ENV !== "production" && (ts = !1);
  try {
    if (n.shapeFlag & 4) {
      const v = i || r;
      y = ot(
        c.call(
          v,
          v,
          f,
          s,
          _,
          d,
          g
        )
      ), E = a;
    } else {
      const v = e;
      process.env.NODE_ENV !== "production" && a === s && ti(), y = ot(
        v.length > 1 ? v(
          s,
          process.env.NODE_ENV !== "production" ? {
            get attrs() {
              return ti(), a;
            },
            slots: l,
            emit: u
          } : { attrs: a, slots: l, emit: u }
        ) : v(
          s,
          null
          /* we know it doesn't need it */
        )
      ), E = e.props ? a : zc(a);
    }
  } catch (v) {
    fr.length = 0, xi(v, t, 1), y = vt(et);
  }
  let b = y, T;
  if (process.env.NODE_ENV !== "production" && y.patchFlag > 0 && y.patchFlag & 2048 && ([b, T] = Lc(y)), E && p !== !1) {
    const v = Object.keys(E), { shapeFlag: V } = b;
    if (v.length) {
      if (V & 7)
        o && v.some(qr) && (E = Bc(
          E,
          o
        )), b = Ht(b, E);
      else if (process.env.NODE_ENV !== "production" && !ts && b.type !== et) {
        const A = Object.keys(a), R = [], C = [];
        for (let W = 0, K = A.length; W < K; W++) {
          const J = A[W];
          Cr(J) ? qr(J) || R.push(J[2].toLowerCase() + J.slice(3)) : C.push(J);
        }
        C.length && k(
          `Extraneous non-props attributes (${C.join(", ")}) were passed to component but could not be automatically inherited because component renders fragment or text root nodes.`
        ), R.length && k(
          `Extraneous non-emits event listeners (${R.join(", ")}) were passed to component but could not be automatically inherited because component renders fragment or text root nodes. If the listener is intended to be a component custom event listener only, declare it using the "emits" option.`
        );
      }
    }
  }
  return n.dirs && (process.env.NODE_ENV !== "production" && !Io(b) && k(
    "Runtime directive used on component with non-element root node. The directives will not function as intended."
  ), b = Ht(b), b.dirs = b.dirs ? b.dirs.concat(n.dirs) : n.dirs), n.transition && (process.env.NODE_ENV !== "production" && !Io(b) && k(
    "Component inside <Transition> renders non-element root node that cannot be animated."
  ), b.transition = n.transition), process.env.NODE_ENV !== "production" && T ? T(b) : y = b, ei(O), y;
}
const Lc = (t) => {
  const e = t.children, n = t.dynamicChildren, r = na(e);
  if (!r)
    return [t, void 0];
  const i = e.indexOf(r), s = n ? n.indexOf(r) : -1, o = (l) => {
    e[i] = l, n && (s > -1 ? n[s] = l : l.patchFlag > 0 && (t.dynamicChildren = [...n, l]));
  };
  return [ot(r), o];
};
function na(t) {
  let e;
  for (let n = 0; n < t.length; n++) {
    const r = t[n];
    if (Ni(r)) {
      if (r.type !== et || r.children === "v-if") {
        if (e)
          return;
        e = r;
      }
    } else
      return;
  }
  return e;
}
const zc = (t) => {
  let e;
  for (const n in t)
    (n === "class" || n === "style" || Cr(n)) && ((e || (e = {}))[n] = t[n]);
  return e;
}, Bc = (t, e) => {
  const n = {};
  for (const r in t)
    (!qr(r) || !(r.slice(9) in e)) && (n[r] = t[r]);
  return n;
}, Io = (t) => t.shapeFlag & 7 || t.type === et;
function jc(t, e, n) {
  const { props: r, children: i, component: s } = t, { props: o, children: l, patchFlag: a } = e, u = s.emitsOptions;
  if (process.env.NODE_ENV !== "production" && (i || l) && ln || e.dirs || e.transition)
    return !0;
  if (n && a >= 0) {
    if (a & 1024)
      return !0;
    if (a & 16)
      return r ? Fo(r, o, u) : !!o;
    if (a & 8) {
      const c = e.dynamicProps;
      for (let f = 0; f < c.length; f++) {
        const d = c[f];
        if (o[d] !== r[d] && !Ei(u, d))
          return !0;
      }
    }
  } else
    return (i || l) && (!l || !l.$stable) ? !0 : r === o ? !1 : r ? o ? Fo(r, o, u) : !0 : !!o;
  return !1;
}
function Fo(t, e, n) {
  const r = Object.keys(e);
  if (r.length !== Object.keys(t).length)
    return !0;
  for (let i = 0; i < r.length; i++) {
    const s = r[i];
    if (e[s] !== t[s] && !Ei(n, s))
      return !0;
  }
  return !1;
}
function Uc({ vnode: t, parent: e }, n) {
  for (; e && e.subTree === t; )
    (t = e.vnode).el = n, e = e.parent;
}
const Hc = (t) => t.__isSuspense;
function Wc(t, e) {
  e && e.pendingBranch ? j(t) ? e.effects.push(...t) : e.effects.push(t) : Kl(t);
}
function Yc(t, e) {
  return Hs(
    t,
    null,
    process.env.NODE_ENV !== "production" ? ae({}, e, { flush: "post" }) : { flush: "post" }
  );
}
const $r = {};
function an(t, e, n) {
  return process.env.NODE_ENV !== "production" && !H(e) && k(
    "`watch(fn, options?)` signature has been moved to a separate API. Use `watchEffect(fn, options?)` instead. `watch` now only supports `watch(source, cb, options?) signature."
  ), Hs(t, e, n);
}
function Hs(t, e, { immediate: n, deep: r, flush: i, onTrack: s, onTrigger: o } = re) {
  var l;
  process.env.NODE_ENV !== "production" && !e && (n !== void 0 && k(
    'watch() "immediate" option is only respected when using the watch(source, callback, options?) signature.'
  ), r !== void 0 && k(
    'watch() "deep" option is only respected when using the watch(source, callback, options?) signature.'
  ));
  const a = (v) => {
    k(
      "Invalid watch source: ",
      v,
      "A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types."
    );
  }, u = wl() === ((l = xe) == null ? void 0 : l.scope) ? xe : null;
  let c, f = !1, d = !1;
  if (ve(t) ? (c = () => t.value, f = Gr(t)) : sn(t) ? (c = () => t, r = !0) : j(t) ? (d = !0, f = t.some((v) => sn(v) || Gr(v)), c = () => t.map((v) => {
    if (ve(v))
      return v.value;
    if (sn(v))
      return Pn(v);
    if (H(v))
      return Ct(v, u, 2);
    process.env.NODE_ENV !== "production" && a(v);
  })) : H(t) ? e ? c = () => Ct(t, u, 2) : c = () => {
    if (!(u && u.isUnmounted))
      return _ && _(), at(
        t,
        u,
        3,
        [g]
      );
  } : (c = Oe, process.env.NODE_ENV !== "production" && a(t)), e && r) {
    const v = c;
    c = () => Pn(v());
  }
  let _, g = (v) => {
    _ = b.onStop = () => {
      Ct(v, u, 4);
    };
  }, p;
  if (xr)
    if (g = Oe, e ? n && at(e, u, 3, [
      c(),
      d ? [] : void 0,
      g
    ]) : c(), i === "sync") {
      const v = Gf();
      p = v.__watcherHandles || (v.__watcherHandles = []);
    } else
      return Oe;
  let y = d ? new Array(t.length).fill($r) : $r;
  const E = () => {
    if (b.active)
      if (e) {
        const v = b.run();
        (r || f || (d ? v.some((V, A) => _n(V, y[A])) : _n(v, y))) && (_ && _(), at(e, u, 3, [
          v,
          // pass undefined as the old value when it's changed for the first time
          y === $r ? void 0 : d && y[0] === $r ? [] : y,
          g
        ]), y = v);
      } else
        b.run();
  };
  E.allowRecurse = !!e;
  let O;
  i === "sync" ? O = E : i === "post" ? O = () => ke(E, u && u.suspense) : (E.pre = !0, u && (E.id = u.uid), O = () => bi(E));
  const b = new As(c, O);
  process.env.NODE_ENV !== "production" && (b.onTrack = s, b.onTrigger = o), e ? n ? E() : y = b.run() : i === "post" ? ke(
    b.run.bind(b),
    u && u.suspense
  ) : b.run();
  const T = () => {
    b.stop(), u && u.scope && Ps(u.scope.effects, b);
  };
  return p && p.push(T), T;
}
function Kc(t, e, n) {
  const r = this.proxy, i = ge(t) ? t.includes(".") ? ra(r, t) : () => r[t] : t.bind(r, r);
  let s;
  H(e) ? s = e : (s = e.handler, n = e);
  const o = xe;
  $n(this);
  const l = Hs(i, s.bind(r), n);
  return o ? $n(o) : cn(), l;
}
function ra(t, e) {
  const n = e.split(".");
  return () => {
    let r = t;
    for (let i = 0; i < n.length && r; i++)
      r = r[n[i]];
    return r;
  };
}
function Pn(t, e) {
  if (!le(t) || t.__v_skip || (e = e || /* @__PURE__ */ new Set(), e.has(t)))
    return t;
  if (e.add(t), ve(t))
    Pn(t.value, e);
  else if (j(t))
    for (let n = 0; n < t.length; n++)
      Pn(t[n], e);
  else if (Cu(t) || Rn(t))
    t.forEach((n) => {
      Pn(n, e);
    });
  else if (Su(t))
    for (const n in t)
      Pn(t[n], e);
  return t;
}
function ia(t) {
  Vu(t) && k("Do not use built-in directive ids as custom directive id: " + t);
}
function Xt(t, e, n, r) {
  const i = t.dirs, s = e && e.dirs;
  for (let o = 0; o < i.length; o++) {
    const l = i[o];
    s && (l.oldValue = s[o].value);
    let a = l.dir[r];
    a && (vn(), at(a, n, 8, [
      t.el,
      l,
      t,
      e
    ]), yn());
  }
}
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function xn(t, e) {
  return H(t) ? (
    // #8326: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    /* @__PURE__ */ (() => ae({ name: t.name }, e, { setup: t }))()
  ) : t;
}
const ur = (t) => !!t.type.__asyncLoader, Ws = (t) => t.type.__isKeepAlive;
function Xc(t, e) {
  sa(t, "a", e);
}
function qc(t, e) {
  sa(t, "da", e);
}
function sa(t, e, n = xe) {
  const r = t.__wdc || (t.__wdc = () => {
    let i = n;
    for (; i; ) {
      if (i.isDeactivated)
        return;
      i = i.parent;
    }
    return t();
  });
  if (Oi(e, r, n), n) {
    let i = n.parent;
    for (; i && i.parent; )
      Ws(i.parent.vnode) && Qc(r, e, n, i), i = i.parent;
  }
}
function Qc(t, e, n, r) {
  const i = Oi(
    e,
    t,
    r,
    !0
    /* prepend */
  );
  Ys(() => {
    Ps(r[e], i);
  }, n);
}
function Oi(t, e, n = xe, r = !1) {
  if (n) {
    const i = n[t] || (n[t] = []), s = e.__weh || (e.__weh = (...o) => {
      if (n.isUnmounted)
        return;
      vn(), $n(n);
      const l = at(e, n, t, o);
      return cn(), yn(), l;
    });
    return r ? i.unshift(s) : i.push(s), s;
  } else if (process.env.NODE_ENV !== "production") {
    const i = Zt(Ls[t].replace(/ hook$/, ""));
    k(
      `${i} is called when there is no active component instance to be associated with. Lifecycle injection APIs can only be used during execution of setup(). If you are using async setup(), make sure to register lifecycle hooks before the first await statement.`
    );
  }
}
const Vt = (t) => (e, n = xe) => (
  // post-create lifecycle registrations are noops during SSR (except for serverPrefetch)
  (!xr || t === "sp") && Oi(t, (...r) => e(...r), n)
), Jc = Vt("bm"), Yn = Vt("m"), Zc = Vt("bu"), Gc = Vt("u"), ef = Vt("bum"), Ys = Vt("um"), tf = Vt("sp"), nf = Vt(
  "rtg"
), rf = Vt(
  "rtc"
);
function sf(t, e = xe) {
  Oi("ec", t, e);
}
const of = Symbol.for("v-ndc");
function Ks(t, e, n = {}, r, i) {
  if (Ne.isCE || Ne.parent && ur(Ne.parent) && Ne.parent.isCE)
    return e !== "default" && (n.name = e), vt("slot", n, r && r());
  let s = t[e];
  process.env.NODE_ENV !== "production" && s && s.length > 1 && (k(
    "SSR-optimized slot function detected in a non-SSR-optimized render function. You need to mark this component with $dynamic-slots in the parent template."
  ), s = () => []), s && s._c && (s._d = !1), bn();
  const o = s && oa(s(n)), l = If(
    Ue,
    {
      key: n.key || // slot content array of a dynamic conditional slot may have a branch
      // key attached in the `createSlots` helper, respect that
      o && o.key || `_${e}`
    },
    o || (r ? r() : []),
    o && t._ === 1 ? 64 : -2
  );
  return !i && l.scopeId && (l.slotScopeIds = [l.scopeId + "-s"]), s && s._c && (s._d = !0), l;
}
function oa(t) {
  return t.some((e) => Ni(e) ? !(e.type === et || e.type === Ue && !oa(e.children)) : !0) ? t : null;
}
const ns = (t) => t ? xa(t) ? to(t) || t.proxy : ns(t.parent) : null, un = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ ae(/* @__PURE__ */ Object.create(null), {
    $: (t) => t,
    $el: (t) => t.vnode.el,
    $data: (t) => t.data,
    $props: (t) => process.env.NODE_ENV !== "production" ? rr(t.props) : t.props,
    $attrs: (t) => process.env.NODE_ENV !== "production" ? rr(t.attrs) : t.attrs,
    $slots: (t) => process.env.NODE_ENV !== "production" ? rr(t.slots) : t.slots,
    $refs: (t) => process.env.NODE_ENV !== "production" ? rr(t.refs) : t.refs,
    $parent: (t) => ns(t.parent),
    $root: (t) => ns(t.root),
    $emit: (t) => t.emit,
    $options: (t) => qs(t),
    $forceUpdate: (t) => t.f || (t.f = () => bi(t.update)),
    $nextTick: (t) => t.n || (t.n = Bs.bind(t.proxy)),
    $watch: (t) => Kc.bind(t)
  })
), Xs = (t) => t === "_" || t === "$", Ai = (t, e) => t !== re && !t.__isScriptSetup && X(t, e), la = {
  get({ _: t }, e) {
    const { ctx: n, setupState: r, data: i, props: s, accessCache: o, type: l, appContext: a } = t;
    if (process.env.NODE_ENV !== "production" && e === "__isVue")
      return !0;
    let u;
    if (e[0] !== "$") {
      const _ = o[e];
      if (_ !== void 0)
        switch (_) {
          case 1:
            return r[e];
          case 2:
            return i[e];
          case 4:
            return n[e];
          case 3:
            return s[e];
        }
      else {
        if (Ai(r, e))
          return o[e] = 1, r[e];
        if (i !== re && X(i, e))
          return o[e] = 2, i[e];
        if (
          // only cache other properties when instance has declared (thus stable)
          // props
          (u = t.propsOptions[0]) && X(u, e)
        )
          return o[e] = 3, s[e];
        if (n !== re && X(n, e))
          return o[e] = 4, n[e];
        rs && (o[e] = 0);
      }
    }
    const c = un[e];
    let f, d;
    if (c)
      return e === "$attrs" ? (we(t, "get", e), process.env.NODE_ENV !== "production" && ti()) : process.env.NODE_ENV !== "production" && e === "$slots" && we(t, "get", e), c(t);
    if (
      // css module (injected by vue-loader)
      (f = l.__cssModules) && (f = f[e])
    )
      return f;
    if (n !== re && X(n, e))
      return o[e] = 4, n[e];
    if (
      // global properties
      d = a.config.globalProperties, X(d, e)
    )
      return d[e];
    process.env.NODE_ENV !== "production" && Ne && (!ge(e) || // #1091 avoid internal isRef/isVNode checks on component instance leading
    // to infinite warning loop
    e.indexOf("__v") !== 0) && (i !== re && Xs(e[0]) && X(i, e) ? k(
      `Property ${JSON.stringify(
        e
      )} must be accessed via $data because it starts with a reserved character ("$" or "_") and is not proxied on the render context.`
    ) : t === Ne && k(
      `Property ${JSON.stringify(e)} was accessed during render but is not defined on instance.`
    ));
  },
  set({ _: t }, e, n) {
    const { data: r, setupState: i, ctx: s } = t;
    return Ai(i, e) ? (i[e] = n, !0) : process.env.NODE_ENV !== "production" && i.__isScriptSetup && X(i, e) ? (k(`Cannot mutate <script setup> binding "${e}" from Options API.`), !1) : r !== re && X(r, e) ? (r[e] = n, !0) : X(t.props, e) ? (process.env.NODE_ENV !== "production" && k(`Attempting to mutate prop "${e}". Props are readonly.`), !1) : e[0] === "$" && e.slice(1) in t ? (process.env.NODE_ENV !== "production" && k(
      `Attempting to mutate public property "${e}". Properties starting with $ are reserved and readonly.`
    ), !1) : (process.env.NODE_ENV !== "production" && e in t.appContext.config.globalProperties ? Object.defineProperty(s, e, {
      enumerable: !0,
      configurable: !0,
      value: n
    }) : s[e] = n, !0);
  },
  has({
    _: { data: t, setupState: e, accessCache: n, ctx: r, appContext: i, propsOptions: s }
  }, o) {
    let l;
    return !!n[o] || t !== re && X(t, o) || Ai(e, o) || (l = s[0]) && X(l, o) || X(r, o) || X(un, o) || X(i.config.globalProperties, o);
  },
  defineProperty(t, e, n) {
    return n.get != null ? t._.accessCache[e] = 0 : X(n, "value") && this.set(t, e, n.value, null), Reflect.defineProperty(t, e, n);
  }
};
process.env.NODE_ENV !== "production" && (la.ownKeys = (t) => (k(
  "Avoid app logic that relies on enumerating keys on a component instance. The keys will be empty in production mode to avoid performance overhead."
), Reflect.ownKeys(t)));
function lf(t) {
  const e = {};
  return Object.defineProperty(e, "_", {
    configurable: !0,
    enumerable: !1,
    get: () => t
  }), Object.keys(un).forEach((n) => {
    Object.defineProperty(e, n, {
      configurable: !0,
      enumerable: !1,
      get: () => un[n](t),
      // intercepted by the proxy so no need for implementation,
      // but needed to prevent set errors
      set: Oe
    });
  }), e;
}
function af(t) {
  const {
    ctx: e,
    propsOptions: [n]
  } = t;
  n && Object.keys(n).forEach((r) => {
    Object.defineProperty(e, r, {
      enumerable: !0,
      configurable: !0,
      get: () => t.props[r],
      set: Oe
    });
  });
}
function uf(t) {
  const { ctx: e, setupState: n } = t;
  Object.keys(Y(n)).forEach((r) => {
    if (!n.__isScriptSetup) {
      if (Xs(r[0])) {
        k(
          `setup() return property ${JSON.stringify(
            r
          )} should not start with "$" or "_" which are reserved prefixes for Vue internals.`
        );
        return;
      }
      Object.defineProperty(e, r, {
        enumerable: !0,
        configurable: !0,
        get: () => n[r],
        set: Oe
      });
    }
  });
}
function $o(t) {
  return j(t) ? t.reduce(
    (e, n) => (e[n] = null, e),
    {}
  ) : t;
}
function cf() {
  const t = /* @__PURE__ */ Object.create(null);
  return (e, n) => {
    t[n] ? k(`${e} property "${n}" is already defined in ${t[n]}.`) : t[n] = e;
  };
}
let rs = !0;
function ff(t) {
  const e = qs(t), n = t.proxy, r = t.ctx;
  rs = !1, e.beforeCreate && Lo(e.beforeCreate, t, "bc");
  const {
    // state
    data: i,
    computed: s,
    methods: o,
    watch: l,
    provide: a,
    inject: u,
    // lifecycle
    created: c,
    beforeMount: f,
    mounted: d,
    beforeUpdate: _,
    updated: g,
    activated: p,
    deactivated: y,
    beforeDestroy: E,
    beforeUnmount: O,
    destroyed: b,
    unmounted: T,
    render: v,
    renderTracked: V,
    renderTriggered: A,
    errorCaptured: R,
    serverPrefetch: C,
    // public API
    expose: W,
    inheritAttrs: K,
    // assets
    components: J,
    directives: oe,
    filters: ue
  } = e, G = process.env.NODE_ENV !== "production" ? cf() : null;
  if (process.env.NODE_ENV !== "production") {
    const [L] = t.propsOptions;
    if (L)
      for (const B in L)
        G("Props", B);
  }
  if (u && df(u, r, G), o)
    for (const L in o) {
      const B = o[L];
      H(B) ? (process.env.NODE_ENV !== "production" ? Object.defineProperty(r, L, {
        value: B.bind(n),
        configurable: !0,
        enumerable: !0,
        writable: !0
      }) : r[L] = B.bind(n), process.env.NODE_ENV !== "production" && G("Methods", L)) : process.env.NODE_ENV !== "production" && k(
        `Method "${L}" has type "${typeof B}" in the component definition. Did you reference the function correctly?`
      );
    }
  if (i) {
    process.env.NODE_ENV !== "production" && !H(i) && k(
      "The data option must be a function. Plain object usage is no longer supported."
    );
    const L = i.call(n, n);
    if (process.env.NODE_ENV !== "production" && Vs(L) && k(
      "data() returned a Promise - note data() cannot be async; If you intend to perform data fetching before component renders, use async setup() + <Suspense>."
    ), !le(L))
      process.env.NODE_ENV !== "production" && k("data() should return an object.");
    else if (t.data = Fs(L), process.env.NODE_ENV !== "production")
      for (const B in L)
        G("Data", B), Xs(B[0]) || Object.defineProperty(r, B, {
          configurable: !0,
          enumerable: !0,
          get: () => L[B],
          set: Oe
        });
  }
  if (rs = !0, s)
    for (const L in s) {
      const B = s[L], ye = H(B) ? B.bind(n, n) : H(B.get) ? B.get.bind(n, n) : Oe;
      process.env.NODE_ENV !== "production" && ye === Oe && k(`Computed property "${L}" has no getter.`);
      const nt = !H(B) && H(B.set) ? B.set.bind(n) : process.env.NODE_ENV !== "production" ? () => {
        k(
          `Write operation failed: computed property "${L}" is readonly.`
        );
      } : Oe, rt = qe({
        get: ye,
        set: nt
      });
      Object.defineProperty(r, L, {
        enumerable: !0,
        configurable: !0,
        get: () => rt.value,
        set: (Re) => rt.value = Re
      }), process.env.NODE_ENV !== "production" && G("Computed", L);
    }
  if (l)
    for (const L in l)
      aa(l[L], r, n, L);
  if (a) {
    const L = H(a) ? a.call(n) : a;
    Reflect.ownKeys(L).forEach((B) => {
      vf(B, L[B]);
    });
  }
  c && Lo(c, t, "c");
  function Z(L, B) {
    j(B) ? B.forEach((ye) => L(ye.bind(n))) : B && L(B.bind(n));
  }
  if (Z(Jc, f), Z(Yn, d), Z(Zc, _), Z(Gc, g), Z(Xc, p), Z(qc, y), Z(sf, R), Z(rf, V), Z(nf, A), Z(ef, O), Z(Ys, T), Z(tf, C), j(W))
    if (W.length) {
      const L = t.exposed || (t.exposed = {});
      W.forEach((B) => {
        Object.defineProperty(L, B, {
          get: () => n[B],
          set: (ye) => n[B] = ye
        });
      });
    } else
      t.exposed || (t.exposed = {});
  v && t.render === Oe && (t.render = v), K != null && (t.inheritAttrs = K), J && (t.components = J), oe && (t.directives = oe);
}
function df(t, e, n = Oe) {
  j(t) && (t = is(t));
  for (const r in t) {
    const i = t[r];
    let s;
    le(i) ? "default" in i ? s = Ur(
      i.from || r,
      i.default,
      !0
      /* treat default function as factory */
    ) : s = Ur(i.from || r) : s = Ur(i), ve(s) ? Object.defineProperty(e, r, {
      enumerable: !0,
      configurable: !0,
      get: () => s.value,
      set: (o) => s.value = o
    }) : e[r] = s, process.env.NODE_ENV !== "production" && n("Inject", r);
  }
}
function Lo(t, e, n) {
  at(
    j(t) ? t.map((r) => r.bind(e.proxy)) : t.bind(e.proxy),
    e,
    n
  );
}
function aa(t, e, n, r) {
  const i = r.includes(".") ? ra(n, r) : () => n[r];
  if (ge(t)) {
    const s = e[t];
    H(s) ? an(i, s) : process.env.NODE_ENV !== "production" && k(`Invalid watch handler specified by key "${t}"`, s);
  } else if (H(t))
    an(i, t.bind(n));
  else if (le(t))
    if (j(t))
      t.forEach((s) => aa(s, e, n, r));
    else {
      const s = H(t.handler) ? t.handler.bind(n) : e[t.handler];
      H(s) ? an(i, s, t) : process.env.NODE_ENV !== "production" && k(`Invalid watch handler specified by key "${t.handler}"`, s);
    }
  else
    process.env.NODE_ENV !== "production" && k(`Invalid watch option: "${r}"`, t);
}
function qs(t) {
  const e = t.type, { mixins: n, extends: r } = e, {
    mixins: i,
    optionsCache: s,
    config: { optionMergeStrategies: o }
  } = t.appContext, l = s.get(e);
  let a;
  return l ? a = l : !i.length && !n && !r ? a = e : (a = {}, i.length && i.forEach(
    (u) => ni(a, u, o, !0)
  ), ni(a, e, o)), le(e) && s.set(e, a), a;
}
function ni(t, e, n, r = !1) {
  const { mixins: i, extends: s } = e;
  s && ni(t, s, n, !0), i && i.forEach(
    (o) => ni(t, o, n, !0)
  );
  for (const o in e)
    if (r && o === "expose")
      process.env.NODE_ENV !== "production" && k(
        '"expose" option is ignored when declared in mixins or extends. It should only be declared in the base component itself.'
      );
    else {
      const l = hf[o] || n && n[o];
      t[o] = l ? l(t[o], e[o]) : e[o];
    }
  return t;
}
const hf = {
  data: zo,
  props: Bo,
  emits: Bo,
  // objects
  methods: sr,
  computed: sr,
  // lifecycle
  beforeCreate: Ve,
  created: Ve,
  beforeMount: Ve,
  mounted: Ve,
  beforeUpdate: Ve,
  updated: Ve,
  beforeDestroy: Ve,
  beforeUnmount: Ve,
  destroyed: Ve,
  unmounted: Ve,
  activated: Ve,
  deactivated: Ve,
  errorCaptured: Ve,
  serverPrefetch: Ve,
  // assets
  components: sr,
  directives: sr,
  // watch
  watch: _f,
  // provide / inject
  provide: zo,
  inject: pf
};
function zo(t, e) {
  return e ? t ? function() {
    return ae(
      H(t) ? t.call(this, this) : t,
      H(e) ? e.call(this, this) : e
    );
  } : e : t;
}
function pf(t, e) {
  return sr(is(t), is(e));
}
function is(t) {
  if (j(t)) {
    const e = {};
    for (let n = 0; n < t.length; n++)
      e[t[n]] = t[n];
    return e;
  }
  return t;
}
function Ve(t, e) {
  return t ? [...new Set([].concat(t, e))] : e;
}
function sr(t, e) {
  return t ? ae(/* @__PURE__ */ Object.create(null), t, e) : e;
}
function Bo(t, e) {
  return t ? j(t) && j(e) ? [.../* @__PURE__ */ new Set([...t, ...e])] : ae(
    /* @__PURE__ */ Object.create(null),
    $o(t),
    $o(e ?? {})
  ) : e;
}
function _f(t, e) {
  if (!t)
    return e;
  if (!e)
    return t;
  const n = ae(/* @__PURE__ */ Object.create(null), t);
  for (const r in e)
    n[r] = Ve(t[r], e[r]);
  return n;
}
function ua() {
  return {
    app: null,
    config: {
      isNativeTag: Ol,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: /* @__PURE__ */ Object.create(null),
    optionsCache: /* @__PURE__ */ new WeakMap(),
    propsCache: /* @__PURE__ */ new WeakMap(),
    emitsCache: /* @__PURE__ */ new WeakMap()
  };
}
let mf = 0;
function gf(t, e) {
  return function(r, i = null) {
    H(r) || (r = ae({}, r)), i != null && !le(i) && (process.env.NODE_ENV !== "production" && k("root props passed to app.mount() must be an object."), i = null);
    const s = ua();
    process.env.NODE_ENV !== "production" && Object.defineProperty(s.config, "unwrapInjectedRef", {
      get() {
        return !0;
      },
      set() {
        k(
          "app.config.unwrapInjectedRef has been deprecated. 3.3 now always unwraps injected refs in Options API."
        );
      }
    });
    const o = /* @__PURE__ */ new WeakSet();
    let l = !1;
    const a = s.app = {
      _uid: mf++,
      _component: r,
      _props: i,
      _container: null,
      _context: s,
      _instance: null,
      version: Jo,
      get config() {
        return s.config;
      },
      set config(u) {
        process.env.NODE_ENV !== "production" && k(
          "app.config cannot be replaced. Modify individual options instead."
        );
      },
      use(u, ...c) {
        return o.has(u) ? process.env.NODE_ENV !== "production" && k("Plugin has already been applied to target app.") : u && H(u.install) ? (o.add(u), u.install(a, ...c)) : H(u) ? (o.add(u), u(a, ...c)) : process.env.NODE_ENV !== "production" && k(
          'A plugin must either be a function or an object with an "install" function.'
        ), a;
      },
      mixin(u) {
        return s.mixins.includes(u) ? process.env.NODE_ENV !== "production" && k(
          "Mixin has already been applied to target app" + (u.name ? `: ${u.name}` : "")
        ) : s.mixins.push(u), a;
      },
      component(u, c) {
        return process.env.NODE_ENV !== "production" && as(u, s.config), c ? (process.env.NODE_ENV !== "production" && s.components[u] && k(`Component "${u}" has already been registered in target app.`), s.components[u] = c, a) : s.components[u];
      },
      directive(u, c) {
        return process.env.NODE_ENV !== "production" && ia(u), c ? (process.env.NODE_ENV !== "production" && s.directives[u] && k(`Directive "${u}" has already been registered in target app.`), s.directives[u] = c, a) : s.directives[u];
      },
      mount(u, c, f) {
        if (l)
          process.env.NODE_ENV !== "production" && k(
            "App has already been mounted.\nIf you want to remount the same app, move your app creation logic into a factory function and create fresh app instances for each mount - e.g. `const createMyApp = () => createApp(App)`"
          );
        else {
          process.env.NODE_ENV !== "production" && u.__vue_app__ && k(
            "There is already an app instance mounted on the host container.\n If you want to mount another app on the same host container, you need to unmount the previous app by calling `app.unmount()` first."
          );
          const d = vt(r, i);
          return d.appContext = s, process.env.NODE_ENV !== "production" && (s.reload = () => {
            t(Ht(d), u, f);
          }), c && e ? e(d, u) : t(d, u, f), l = !0, a._container = u, u.__vue_app__ = a, process.env.NODE_ENV !== "production" && (a._instance = d.component, Pc(a, Jo)), to(d.component) || d.component.proxy;
        }
      },
      unmount() {
        l ? (t(null, a._container), process.env.NODE_ENV !== "production" && (a._instance = null, Sc(a)), delete a._container.__vue_app__) : process.env.NODE_ENV !== "production" && k("Cannot unmount an app that is not mounted.");
      },
      provide(u, c) {
        return process.env.NODE_ENV !== "production" && u in s.provides && k(
          `App already provides property with key "${String(u)}". It will be overwritten with the new value.`
        ), s.provides[u] = c, a;
      },
      runWithContext(u) {
        ri = a;
        try {
          return u();
        } finally {
          ri = null;
        }
      }
    };
    return a;
  };
}
let ri = null;
function vf(t, e) {
  if (!xe)
    process.env.NODE_ENV !== "production" && k("provide() can only be used inside setup().");
  else {
    let n = xe.provides;
    const r = xe.parent && xe.parent.provides;
    r === n && (n = xe.provides = Object.create(r)), n[t] = e;
  }
}
function Ur(t, e, n = !1) {
  const r = xe || Ne;
  if (r || ri) {
    const i = r ? r.parent == null ? r.vnode.appContext && r.vnode.appContext.provides : r.parent.provides : ri._context.provides;
    if (i && t in i)
      return i[t];
    if (arguments.length > 1)
      return n && H(e) ? e.call(r && r.proxy) : e;
    process.env.NODE_ENV !== "production" && k(`injection "${String(t)}" not found.`);
  } else
    process.env.NODE_ENV !== "production" && k("inject() can only be used inside setup() or functional components.");
}
function yf(t, e, n, r = !1) {
  const i = {}, s = {};
  Qr(s, wi, 1), t.propsDefaults = /* @__PURE__ */ Object.create(null), ca(t, e, i, s);
  for (const o in t.propsOptions[0])
    o in i || (i[o] = void 0);
  process.env.NODE_ENV !== "production" && da(e || {}, i, t), n ? t.props = r ? i : cc(i) : t.type.props ? t.props = i : t.props = s, t.attrs = s;
}
function xf(t) {
  for (; t; ) {
    if (t.type.__hmrId)
      return !0;
    t = t.parent;
  }
}
function bf(t, e, n, r) {
  const {
    props: i,
    attrs: s,
    vnode: { patchFlag: o }
  } = t, l = Y(i), [a] = t.propsOptions;
  let u = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    !(process.env.NODE_ENV !== "production" && xf(t)) && (r || o > 0) && !(o & 16)
  ) {
    if (o & 8) {
      const c = t.vnode.dynamicProps;
      for (let f = 0; f < c.length; f++) {
        let d = c[f];
        if (Ei(t.emitsOptions, d))
          continue;
        const _ = e[d];
        if (a)
          if (X(s, d))
            _ !== s[d] && (s[d] = _, u = !0);
          else {
            const g = Dt(d);
            i[g] = ss(
              a,
              l,
              g,
              _,
              t,
              !1
              /* isAbsent */
            );
          }
        else
          _ !== s[d] && (s[d] = _, u = !0);
      }
    }
  } else {
    ca(t, e, i, s) && (u = !0);
    let c;
    for (const f in l)
      (!e || // for camelCase
      !X(e, f) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((c = He(f)) === f || !X(e, c))) && (a ? n && // for camelCase
      (n[f] !== void 0 || // for kebab-case
      n[c] !== void 0) && (i[f] = ss(
        a,
        l,
        f,
        void 0,
        t,
        !0
        /* isAbsent */
      )) : delete i[f]);
    if (s !== l)
      for (const f in s)
        (!e || !X(e, f)) && (delete s[f], u = !0);
  }
  u && gt(t, "set", "$attrs"), process.env.NODE_ENV !== "production" && da(e || {}, i, t);
}
function ca(t, e, n, r) {
  const [i, s] = t.propsOptions;
  let o = !1, l;
  if (e)
    for (let a in e) {
      if (zr(a))
        continue;
      const u = e[a];
      let c;
      i && X(i, c = Dt(a)) ? !s || !s.includes(c) ? n[c] = u : (l || (l = {}))[c] = u : Ei(t.emitsOptions, a) || (!(a in r) || u !== r[a]) && (r[a] = u, o = !0);
    }
  if (s) {
    const a = Y(n), u = l || re;
    for (let c = 0; c < s.length; c++) {
      const f = s[c];
      n[f] = ss(
        i,
        a,
        f,
        u[f],
        t,
        !X(u, f)
      );
    }
  }
  return o;
}
function ss(t, e, n, r, i, s) {
  const o = t[n];
  if (o != null) {
    const l = X(o, "default");
    if (l && r === void 0) {
      const a = o.default;
      if (o.type !== Function && !o.skipFactory && H(a)) {
        const { propsDefaults: u } = i;
        n in u ? r = u[n] : ($n(i), r = u[n] = a.call(
          null,
          e
        ), cn());
      } else
        r = a;
    }
    o[
      0
      /* shouldCast */
    ] && (s && !l ? r = !1 : o[
      1
      /* shouldCastTrue */
    ] && (r === "" || r === He(n)) && (r = !0));
  }
  return r;
}
function fa(t, e, n = !1) {
  const r = e.propsCache, i = r.get(t);
  if (i)
    return i;
  const s = t.props, o = {}, l = [];
  let a = !1;
  if (!H(t)) {
    const c = (f) => {
      a = !0;
      const [d, _] = fa(f, e, !0);
      ae(o, d), _ && l.push(..._);
    };
    !n && e.mixins.length && e.mixins.forEach(c), t.extends && c(t.extends), t.mixins && t.mixins.forEach(c);
  }
  if (!s && !a)
    return le(t) && r.set(t, Mn), Mn;
  if (j(s))
    for (let c = 0; c < s.length; c++) {
      process.env.NODE_ENV !== "production" && !ge(s[c]) && k("props must be strings when using array syntax.", s[c]);
      const f = Dt(s[c]);
      jo(f) && (o[f] = re);
    }
  else if (s) {
    process.env.NODE_ENV !== "production" && !le(s) && k("invalid props options", s);
    for (const c in s) {
      const f = Dt(c);
      if (jo(f)) {
        const d = s[c], _ = o[f] = j(d) || H(d) ? { type: d } : ae({}, d);
        if (_) {
          const g = Ho(Boolean, _.type), p = Ho(String, _.type);
          _[
            0
            /* shouldCast */
          ] = g > -1, _[
            1
            /* shouldCastTrue */
          ] = p < 0 || g < p, (g > -1 || X(_, "default")) && l.push(f);
        }
      }
    }
  }
  const u = [o, l];
  return le(t) && r.set(t, u), u;
}
function jo(t) {
  return t[0] !== "$" ? !0 : (process.env.NODE_ENV !== "production" && k(`Invalid prop name: "${t}" is a reserved property.`), !1);
}
function os(t) {
  const e = t && t.toString().match(/^\s*(function|class) (\w+)/);
  return e ? e[2] : t === null ? "null" : "";
}
function Uo(t, e) {
  return os(t) === os(e);
}
function Ho(t, e) {
  return j(e) ? e.findIndex((n) => Uo(n, t)) : H(e) && Uo(e, t) ? 0 : -1;
}
function da(t, e, n) {
  const r = Y(e), i = n.propsOptions[0];
  for (const s in i) {
    let o = i[s];
    o != null && Ef(
      s,
      r[s],
      o,
      !X(t, s) && !X(t, He(s))
    );
  }
}
function Ef(t, e, n, r) {
  const { type: i, required: s, validator: o, skipCheck: l } = n;
  if (s && r) {
    k('Missing required prop: "' + t + '"');
    return;
  }
  if (!(e == null && !s)) {
    if (i != null && i !== !0 && !l) {
      let a = !1;
      const u = j(i) ? i : [i], c = [];
      for (let f = 0; f < u.length && !a; f++) {
        const { valid: d, expectedType: _ } = Nf(e, u[f]);
        c.push(_ || ""), a = d;
      }
      if (!a) {
        k(wf(t, e, c));
        return;
      }
    }
    o && !o(e) && k('Invalid prop: custom validator check failed for prop "' + t + '".');
  }
}
const Of = /* @__PURE__ */ Wn(
  "String,Number,Boolean,Function,Symbol,BigInt"
);
function Nf(t, e) {
  let n;
  const r = os(e);
  if (Of(r)) {
    const i = typeof t;
    n = i === r.toLowerCase(), !n && i === "object" && (n = t instanceof e);
  } else
    r === "Object" ? n = le(t) : r === "Array" ? n = j(t) : r === "null" ? n = t === null : n = t instanceof e;
  return {
    valid: n,
    expectedType: r
  };
}
function wf(t, e, n) {
  let r = `Invalid prop: type check failed for prop "${t}". Expected ${n.map(_i).join(" | ")}`;
  const i = n[0], s = Ms(e), o = Wo(e, i), l = Wo(e, s);
  return n.length === 1 && Yo(i) && !Tf(i, s) && (r += ` with value ${o}`), r += `, got ${s} `, Yo(s) && (r += `with value ${l}.`), r;
}
function Wo(t, e) {
  return e === "String" ? `"${t}"` : e === "Number" ? `${Number(t)}` : `${t}`;
}
function Yo(t) {
  return ["string", "number", "boolean"].some((n) => t.toLowerCase() === n);
}
function Tf(...t) {
  return t.some((e) => e.toLowerCase() === "boolean");
}
const ha = (t) => t[0] === "_" || t === "$stable", Qs = (t) => j(t) ? t.map(ot) : [ot(t)], Df = (t, e, n) => {
  if (e._n)
    return e;
  const r = $c((...i) => (process.env.NODE_ENV !== "production" && xe && k(
    `Slot "${t}" invoked outside of the render function: this will not track dependencies used in the slot. Invoke the slot function inside the render function instead.`
  ), Qs(e(...i))), n);
  return r._c = !1, r;
}, pa = (t, e, n) => {
  const r = t._ctx;
  for (const i in t) {
    if (ha(i))
      continue;
    const s = t[i];
    if (H(s))
      e[i] = Df(i, s, r);
    else if (s != null) {
      process.env.NODE_ENV !== "production" && k(
        `Non-function value encountered for slot "${i}". Prefer function slots for better performance.`
      );
      const o = Qs(s);
      e[i] = () => o;
    }
  }
}, _a = (t, e) => {
  process.env.NODE_ENV !== "production" && !Ws(t.vnode) && k(
    "Non-function value encountered for default slot. Prefer function slots for better performance."
  );
  const n = Qs(e);
  t.slots.default = () => n;
}, Cf = (t, e) => {
  if (t.vnode.shapeFlag & 32) {
    const n = e._;
    n ? (t.slots = Y(e), Qr(e, "_", n)) : pa(
      e,
      t.slots = {}
    );
  } else
    t.slots = {}, e && _a(t, e);
  Qr(t.slots, wi, 1);
}, Pf = (t, e, n) => {
  const { vnode: r, slots: i } = t;
  let s = !0, o = re;
  if (r.shapeFlag & 32) {
    const l = e._;
    l ? process.env.NODE_ENV !== "production" && ln ? (ae(i, e), gt(t, "set", "$slots")) : n && l === 1 ? s = !1 : (ae(i, e), !n && l === 1 && delete i._) : (s = !e.$stable, pa(e, i)), o = e;
  } else
    e && (_a(t, e), o = { default: 1 });
  if (s)
    for (const l in i)
      !ha(l) && o[l] == null && delete i[l];
};
function ls(t, e, n, r, i = !1) {
  if (j(t)) {
    t.forEach(
      (d, _) => ls(
        d,
        e && (j(e) ? e[_] : e),
        n,
        r,
        i
      )
    );
    return;
  }
  if (ur(r) && !i)
    return;
  const s = r.shapeFlag & 4 ? to(r.component) || r.component.proxy : r.el, o = i ? null : s, { i: l, r: a } = t;
  if (process.env.NODE_ENV !== "production" && !l) {
    k(
      "Missing ref owner context. ref cannot be used on hoisted vnodes. A vnode with ref must be created inside the render function."
    );
    return;
  }
  const u = e && e.r, c = l.refs === re ? l.refs = {} : l.refs, f = l.setupState;
  if (u != null && u !== a && (ge(u) ? (c[u] = null, X(f, u) && (f[u] = null)) : ve(u) && (u.value = null)), H(a))
    Ct(a, l, 12, [o, c]);
  else {
    const d = ge(a), _ = ve(a);
    if (d || _) {
      const g = () => {
        if (t.f) {
          const p = d ? X(f, a) ? f[a] : c[a] : a.value;
          i ? j(p) && Ps(p, s) : j(p) ? p.includes(s) || p.push(s) : d ? (c[a] = [s], X(f, a) && (f[a] = c[a])) : (a.value = [s], t.k && (c[t.k] = a.value));
        } else
          d ? (c[a] = o, X(f, a) && (f[a] = o)) : _ ? (a.value = o, t.k && (c[t.k] = o)) : process.env.NODE_ENV !== "production" && k("Invalid template ref type:", a, `(${typeof a})`);
      };
      o ? (g.id = -1, ke(g, n)) : g();
    } else
      process.env.NODE_ENV !== "production" && k("Invalid template ref type:", a, `(${typeof a})`);
  }
}
let Gn, At;
function Ot(t, e) {
  t.appContext.config.performance && ii() && At.mark(`vue-${e}-${t.uid}`), process.env.NODE_ENV !== "production" && kc(t, e, ii() ? At.now() : Date.now());
}
function Nt(t, e) {
  if (t.appContext.config.performance && ii()) {
    const n = `vue-${e}-${t.uid}`, r = n + ":end";
    At.mark(r), At.measure(
      `<${Ti(t, t.type)}> ${e}`,
      n,
      r
    ), At.clearMarks(n), At.clearMarks(r);
  }
  process.env.NODE_ENV !== "production" && Ac(t, e, ii() ? At.now() : Date.now());
}
function ii() {
  return Gn !== void 0 || (typeof window < "u" && window.performance ? (Gn = !0, At = window.performance) : Gn = !1), Gn;
}
function Sf() {
  const t = [];
  if (process.env.NODE_ENV !== "production" && t.length) {
    const e = t.length > 1;
    console.warn(
      `Feature flag${e ? "s" : ""} ${t.join(", ")} ${e ? "are" : "is"} not explicitly defined. You are running the esm-bundler build of Vue, which expects these compile-time feature flags to be globally injected via the bundler config in order to get better tree-shaking in the production bundle.

For more details, see https://link.vuejs.org/feature-flags.`
    );
  }
}
const ke = Wc;
function Vf(t) {
  return Mf(t);
}
function Mf(t, e) {
  Sf();
  const n = Jr();
  n.__VUE__ = !0, process.env.NODE_ENV !== "production" && Jl(n.__VUE_DEVTOOLS_GLOBAL_HOOK__, n);
  const {
    insert: r,
    remove: i,
    patchProp: s,
    createElement: o,
    createText: l,
    createComment: a,
    setText: u,
    setElementText: c,
    parentNode: f,
    nextSibling: d,
    setScopeId: _ = Oe,
    insertStaticContent: g
  } = t, p = (h, m, x, w = null, N = null, S = null, I = !1, P = null, M = process.env.NODE_ENV !== "production" && ln ? !1 : !!m.dynamicChildren) => {
    if (h === m)
      return;
    h && !er(h, m) && (w = Mr(h), it(h, N, S, !0), h = null), m.patchFlag === -2 && (M = !1, m.dynamicChildren = null);
    const { type: D, ref: $, shapeFlag: F } = m;
    switch (D) {
      case Sr:
        y(h, m, x, w);
        break;
      case et:
        E(h, m, x, w);
        break;
      case cr:
        h == null ? O(m, x, w, I) : process.env.NODE_ENV !== "production" && b(h, m, x, I);
        break;
      case Ue:
        oe(
          h,
          m,
          x,
          w,
          N,
          S,
          I,
          P,
          M
        );
        break;
      default:
        F & 1 ? V(
          h,
          m,
          x,
          w,
          N,
          S,
          I,
          P,
          M
        ) : F & 6 ? ue(
          h,
          m,
          x,
          w,
          N,
          S,
          I,
          P,
          M
        ) : F & 64 || F & 128 ? D.process(
          h,
          m,
          x,
          w,
          N,
          S,
          I,
          P,
          M,
          On
        ) : process.env.NODE_ENV !== "production" && k("Invalid VNode type:", D, `(${typeof D})`);
    }
    $ != null && N && ls($, h && h.ref, S, m || h, !m);
  }, y = (h, m, x, w) => {
    if (h == null)
      r(
        m.el = l(m.children),
        x,
        w
      );
    else {
      const N = m.el = h.el;
      m.children !== h.children && u(N, m.children);
    }
  }, E = (h, m, x, w) => {
    h == null ? r(
      m.el = a(m.children || ""),
      x,
      w
    ) : m.el = h.el;
  }, O = (h, m, x, w) => {
    [h.el, h.anchor] = g(
      h.children,
      m,
      x,
      w,
      h.el,
      h.anchor
    );
  }, b = (h, m, x, w) => {
    if (m.children !== h.children) {
      const N = d(h.anchor);
      v(h), [m.el, m.anchor] = g(
        m.children,
        x,
        N,
        w
      );
    } else
      m.el = h.el, m.anchor = h.anchor;
  }, T = ({ el: h, anchor: m }, x, w) => {
    let N;
    for (; h && h !== m; )
      N = d(h), r(h, x, w), h = N;
    r(m, x, w);
  }, v = ({ el: h, anchor: m }) => {
    let x;
    for (; h && h !== m; )
      x = d(h), i(h), h = x;
    i(m);
  }, V = (h, m, x, w, N, S, I, P, M) => {
    I = I || m.type === "svg", h == null ? A(
      m,
      x,
      w,
      N,
      S,
      I,
      P,
      M
    ) : W(
      h,
      m,
      N,
      S,
      I,
      P,
      M
    );
  }, A = (h, m, x, w, N, S, I, P) => {
    let M, D;
    const { type: $, props: F, shapeFlag: z, transition: U, dirs: q } = h;
    if (M = h.el = o(
      h.type,
      S,
      F && F.is,
      F
    ), z & 8 ? c(M, h.children) : z & 16 && C(
      h.children,
      M,
      null,
      w,
      N,
      S && $ !== "foreignObject",
      I,
      P
    ), q && Xt(h, null, w, "created"), R(M, h, h.scopeId, I, w), F) {
      for (const ee in F)
        ee !== "value" && !zr(ee) && s(
          M,
          ee,
          null,
          F[ee],
          S,
          h.children,
          w,
          N,
          Et
        );
      "value" in F && s(M, "value", null, F.value), (D = F.onVnodeBeforeMount) && ft(D, w, h);
    }
    process.env.NODE_ENV !== "production" && (Object.defineProperty(M, "__vnode", {
      value: h,
      enumerable: !1
    }), Object.defineProperty(M, "__vueParentComponent", {
      value: w,
      enumerable: !1
    })), q && Xt(h, null, w, "beforeMount");
    const te = (!N || N && !N.pendingBranch) && U && !U.persisted;
    te && U.beforeEnter(M), r(M, m, x), ((D = F && F.onVnodeMounted) || te || q) && ke(() => {
      D && ft(D, w, h), te && U.enter(M), q && Xt(h, null, w, "mounted");
    }, N);
  }, R = (h, m, x, w, N) => {
    if (x && _(h, x), w)
      for (let S = 0; S < w.length; S++)
        _(h, w[S]);
    if (N) {
      let S = N.subTree;
      if (process.env.NODE_ENV !== "production" && S.patchFlag > 0 && S.patchFlag & 2048 && (S = na(S.children) || S), m === S) {
        const I = N.vnode;
        R(
          h,
          I,
          I.scopeId,
          I.slotScopeIds,
          N.parent
        );
      }
    }
  }, C = (h, m, x, w, N, S, I, P, M = 0) => {
    for (let D = M; D < h.length; D++) {
      const $ = h[D] = P ? kt(h[D]) : ot(h[D]);
      p(
        null,
        $,
        m,
        x,
        w,
        N,
        S,
        I,
        P
      );
    }
  }, W = (h, m, x, w, N, S, I) => {
    const P = m.el = h.el;
    let { patchFlag: M, dynamicChildren: D, dirs: $ } = m;
    M |= h.patchFlag & 16;
    const F = h.props || re, z = m.props || re;
    let U;
    x && qt(x, !1), (U = z.onVnodeBeforeUpdate) && ft(U, x, m, h), $ && Xt(m, h, x, "beforeUpdate"), x && qt(x, !0), process.env.NODE_ENV !== "production" && ln && (M = 0, I = !1, D = null);
    const q = N && m.type !== "foreignObject";
    if (D ? (K(
      h.dynamicChildren,
      D,
      P,
      x,
      w,
      q,
      S
    ), process.env.NODE_ENV !== "production" && Hr(h, m)) : I || ye(
      h,
      m,
      P,
      null,
      x,
      w,
      q,
      S,
      !1
    ), M > 0) {
      if (M & 16)
        J(
          P,
          m,
          F,
          z,
          x,
          w,
          N
        );
      else if (M & 2 && F.class !== z.class && s(P, "class", null, z.class, N), M & 4 && s(P, "style", F.style, z.style, N), M & 8) {
        const te = m.dynamicProps;
        for (let ee = 0; ee < te.length; ee++) {
          const _e = te[ee], st = F[_e], Nn = z[_e];
          (Nn !== st || _e === "value") && s(
            P,
            _e,
            st,
            Nn,
            N,
            h.children,
            x,
            w,
            Et
          );
        }
      }
      M & 1 && h.children !== m.children && c(P, m.children);
    } else
      !I && D == null && J(
        P,
        m,
        F,
        z,
        x,
        w,
        N
      );
    ((U = z.onVnodeUpdated) || $) && ke(() => {
      U && ft(U, x, m, h), $ && Xt(m, h, x, "updated");
    }, w);
  }, K = (h, m, x, w, N, S, I) => {
    for (let P = 0; P < m.length; P++) {
      const M = h[P], D = m[P], $ = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        M.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (M.type === Ue || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !er(M, D) || // - In the case of a component, it could contain anything.
        M.shapeFlag & 70) ? f(M.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          x
        )
      );
      p(
        M,
        D,
        $,
        null,
        w,
        N,
        S,
        I,
        !0
      );
    }
  }, J = (h, m, x, w, N, S, I) => {
    if (x !== w) {
      if (x !== re)
        for (const P in x)
          !zr(P) && !(P in w) && s(
            h,
            P,
            x[P],
            null,
            I,
            m.children,
            N,
            S,
            Et
          );
      for (const P in w) {
        if (zr(P))
          continue;
        const M = w[P], D = x[P];
        M !== D && P !== "value" && s(
          h,
          P,
          D,
          M,
          I,
          m.children,
          N,
          S,
          Et
        );
      }
      "value" in w && s(h, "value", x.value, w.value);
    }
  }, oe = (h, m, x, w, N, S, I, P, M) => {
    const D = m.el = h ? h.el : l(""), $ = m.anchor = h ? h.anchor : l("");
    let { patchFlag: F, dynamicChildren: z, slotScopeIds: U } = m;
    process.env.NODE_ENV !== "production" && // #5523 dev root fragment may inherit directives
    (ln || F & 2048) && (F = 0, M = !1, z = null), U && (P = P ? P.concat(U) : U), h == null ? (r(D, x, w), r($, x, w), C(
      m.children,
      x,
      $,
      N,
      S,
      I,
      P,
      M
    )) : F > 0 && F & 64 && z && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    h.dynamicChildren ? (K(
      h.dynamicChildren,
      z,
      x,
      N,
      S,
      I,
      P
    ), process.env.NODE_ENV !== "production" ? Hr(h, m) : (
      // #2080 if the stable fragment has a key, it's a <template v-for> that may
      //  get moved around. Make sure all root level vnodes inherit el.
      // #2134 or if it's a component root, it may also get moved around
      // as the component is being moved.
      (m.key != null || N && m === N.subTree) && Hr(
        h,
        m,
        !0
        /* shallow */
      )
    )) : ye(
      h,
      m,
      x,
      $,
      N,
      S,
      I,
      P,
      M
    );
  }, ue = (h, m, x, w, N, S, I, P, M) => {
    m.slotScopeIds = P, h == null ? m.shapeFlag & 512 ? N.ctx.activate(
      m,
      x,
      w,
      I,
      M
    ) : G(
      m,
      x,
      w,
      N,
      S,
      I,
      M
    ) : Z(h, m, M);
  }, G = (h, m, x, w, N, S, I) => {
    const P = h.component = Uf(
      h,
      w,
      N
    );
    if (process.env.NODE_ENV !== "production" && P.type.__hmrId && wc(P), process.env.NODE_ENV !== "production" && (Br(h), Ot(P, "mount")), Ws(h) && (P.ctx.renderer = On), process.env.NODE_ENV !== "production" && Ot(P, "init"), Wf(P), process.env.NODE_ENV !== "production" && Nt(P, "init"), P.asyncDep) {
      if (N && N.registerDep(P, L), !h.el) {
        const M = P.subTree = vt(et);
        E(null, M, m, x);
      }
      return;
    }
    L(
      P,
      h,
      m,
      x,
      N,
      S,
      I
    ), process.env.NODE_ENV !== "production" && (jr(), Nt(P, "mount"));
  }, Z = (h, m, x) => {
    const w = m.component = h.component;
    if (jc(h, m, x))
      if (w.asyncDep && !w.asyncResolved) {
        process.env.NODE_ENV !== "production" && Br(m), B(w, m, x), process.env.NODE_ENV !== "production" && jr();
        return;
      } else
        w.next = m, Oc(w.update), w.update();
    else
      m.el = h.el, w.vnode = m;
  }, L = (h, m, x, w, N, S, I) => {
    const P = () => {
      if (h.isMounted) {
        let { next: $, bu: F, u: z, parent: U, vnode: q } = h, te = $, ee;
        process.env.NODE_ENV !== "production" && Br($ || h.vnode), qt(h, !1), $ ? ($.el = q.el, B(h, $, I)) : $ = q, F && Zn(F), (ee = $.props && $.props.onVnodeBeforeUpdate) && ft(ee, U, $, q), qt(h, !0), process.env.NODE_ENV !== "production" && Ot(h, "render");
        const _e = ki(h);
        process.env.NODE_ENV !== "production" && Nt(h, "render");
        const st = h.subTree;
        h.subTree = _e, process.env.NODE_ENV !== "production" && Ot(h, "patch"), p(
          st,
          _e,
          // parent may have changed if it's in a teleport
          f(st.el),
          // anchor may have changed if it's in a fragment
          Mr(st),
          h,
          N,
          S
        ), process.env.NODE_ENV !== "production" && Nt(h, "patch"), $.el = _e.el, te === null && Uc(h, _e.el), z && ke(z, N), (ee = $.props && $.props.onVnodeUpdated) && ke(
          () => ft(ee, U, $, q),
          N
        ), process.env.NODE_ENV !== "production" && Zl(h), process.env.NODE_ENV !== "production" && jr();
      } else {
        let $;
        const { el: F, props: z } = m, { bm: U, m: q, parent: te } = h, ee = ur(m);
        if (qt(h, !1), U && Zn(U), !ee && ($ = z && z.onVnodeBeforeMount) && ft($, te, m), qt(h, !0), F && Mi) {
          const _e = () => {
            process.env.NODE_ENV !== "production" && Ot(h, "render"), h.subTree = ki(h), process.env.NODE_ENV !== "production" && Nt(h, "render"), process.env.NODE_ENV !== "production" && Ot(h, "hydrate"), Mi(
              F,
              h.subTree,
              h,
              N,
              null
            ), process.env.NODE_ENV !== "production" && Nt(h, "hydrate");
          };
          ee ? m.type.__asyncLoader().then(
            // note: we are moving the render call into an async callback,
            // which means it won't track dependencies - but it's ok because
            // a server-rendered async wrapper is already in resolved state
            // and it will never need to change.
            () => !h.isUnmounted && _e()
          ) : _e();
        } else {
          process.env.NODE_ENV !== "production" && Ot(h, "render");
          const _e = h.subTree = ki(h);
          process.env.NODE_ENV !== "production" && Nt(h, "render"), process.env.NODE_ENV !== "production" && Ot(h, "patch"), p(
            null,
            _e,
            x,
            w,
            h,
            N,
            S
          ), process.env.NODE_ENV !== "production" && Nt(h, "patch"), m.el = _e.el;
        }
        if (q && ke(q, N), !ee && ($ = z && z.onVnodeMounted)) {
          const _e = m;
          ke(
            () => ft($, te, _e),
            N
          );
        }
        (m.shapeFlag & 256 || te && ur(te.vnode) && te.vnode.shapeFlag & 256) && h.a && ke(h.a, N), h.isMounted = !0, process.env.NODE_ENV !== "production" && Vc(h), m = x = w = null;
      }
    }, M = h.effect = new As(
      P,
      () => bi(D),
      h.scope
      // track it in component's effect scope
    ), D = h.update = () => M.run();
    D.id = h.uid, qt(h, !0), process.env.NODE_ENV !== "production" && (M.onTrack = h.rtc ? ($) => Zn(h.rtc, $) : void 0, M.onTrigger = h.rtg ? ($) => Zn(h.rtg, $) : void 0, D.ownerInstance = h), D();
  }, B = (h, m, x) => {
    m.component = h;
    const w = h.vnode.props;
    h.vnode = m, h.next = null, bf(h, m.props, w, x), Pf(h, m.children, x), vn(), ko(), yn();
  }, ye = (h, m, x, w, N, S, I, P, M = !1) => {
    const D = h && h.children, $ = h ? h.shapeFlag : 0, F = m.children, { patchFlag: z, shapeFlag: U } = m;
    if (z > 0) {
      if (z & 128) {
        rt(
          D,
          F,
          x,
          w,
          N,
          S,
          I,
          P,
          M
        );
        return;
      } else if (z & 256) {
        nt(
          D,
          F,
          x,
          w,
          N,
          S,
          I,
          P,
          M
        );
        return;
      }
    }
    U & 8 ? ($ & 16 && Et(D, N, S), F !== D && c(x, F)) : $ & 16 ? U & 16 ? rt(
      D,
      F,
      x,
      w,
      N,
      S,
      I,
      P,
      M
    ) : Et(D, N, S, !0) : ($ & 8 && c(x, ""), U & 16 && C(
      F,
      x,
      w,
      N,
      S,
      I,
      P,
      M
    ));
  }, nt = (h, m, x, w, N, S, I, P, M) => {
    h = h || Mn, m = m || Mn;
    const D = h.length, $ = m.length, F = Math.min(D, $);
    let z;
    for (z = 0; z < F; z++) {
      const U = m[z] = M ? kt(m[z]) : ot(m[z]);
      p(
        h[z],
        U,
        x,
        null,
        N,
        S,
        I,
        P,
        M
      );
    }
    D > $ ? Et(
      h,
      N,
      S,
      !0,
      !1,
      F
    ) : C(
      m,
      x,
      w,
      N,
      S,
      I,
      P,
      M,
      F
    );
  }, rt = (h, m, x, w, N, S, I, P, M) => {
    let D = 0;
    const $ = m.length;
    let F = h.length - 1, z = $ - 1;
    for (; D <= F && D <= z; ) {
      const U = h[D], q = m[D] = M ? kt(m[D]) : ot(m[D]);
      if (er(U, q))
        p(
          U,
          q,
          x,
          null,
          N,
          S,
          I,
          P,
          M
        );
      else
        break;
      D++;
    }
    for (; D <= F && D <= z; ) {
      const U = h[F], q = m[z] = M ? kt(m[z]) : ot(m[z]);
      if (er(U, q))
        p(
          U,
          q,
          x,
          null,
          N,
          S,
          I,
          P,
          M
        );
      else
        break;
      F--, z--;
    }
    if (D > F) {
      if (D <= z) {
        const U = z + 1, q = U < $ ? m[U].el : w;
        for (; D <= z; )
          p(
            null,
            m[D] = M ? kt(m[D]) : ot(m[D]),
            x,
            q,
            N,
            S,
            I,
            P,
            M
          ), D++;
      }
    } else if (D > z)
      for (; D <= F; )
        it(h[D], N, S, !0), D++;
    else {
      const U = D, q = D, te = /* @__PURE__ */ new Map();
      for (D = q; D <= z; D++) {
        const Se = m[D] = M ? kt(m[D]) : ot(m[D]);
        Se.key != null && (process.env.NODE_ENV !== "production" && te.has(Se.key) && k(
          "Duplicate keys found during update:",
          JSON.stringify(Se.key),
          "Make sure keys are unique."
        ), te.set(Se.key, D));
      }
      let ee, _e = 0;
      const st = z - q + 1;
      let Nn = !1, Eo = 0;
      const Jn = new Array(st);
      for (D = 0; D < st; D++)
        Jn[D] = 0;
      for (D = U; D <= F; D++) {
        const Se = h[D];
        if (_e >= st) {
          it(Se, N, S, !0);
          continue;
        }
        let ct;
        if (Se.key != null)
          ct = te.get(Se.key);
        else
          for (ee = q; ee <= z; ee++)
            if (Jn[ee - q] === 0 && er(Se, m[ee])) {
              ct = ee;
              break;
            }
        ct === void 0 ? it(Se, N, S, !0) : (Jn[ct - q] = D + 1, ct >= Eo ? Eo = ct : Nn = !0, p(
          Se,
          m[ct],
          x,
          null,
          N,
          S,
          I,
          P,
          M
        ), _e++);
      }
      const Oo = Nn ? Rf(Jn) : Mn;
      for (ee = Oo.length - 1, D = st - 1; D >= 0; D--) {
        const Se = q + D, ct = m[Se], No = Se + 1 < $ ? m[Se + 1].el : w;
        Jn[D] === 0 ? p(
          null,
          ct,
          x,
          No,
          N,
          S,
          I,
          P,
          M
        ) : Nn && (ee < 0 || D !== Oo[ee] ? Re(ct, x, No, 2) : ee--);
      }
    }
  }, Re = (h, m, x, w, N = null) => {
    const { el: S, type: I, transition: P, children: M, shapeFlag: D } = h;
    if (D & 6) {
      Re(h.component.subTree, m, x, w);
      return;
    }
    if (D & 128) {
      h.suspense.move(m, x, w);
      return;
    }
    if (D & 64) {
      I.move(h, m, x, On);
      return;
    }
    if (I === Ue) {
      r(S, m, x);
      for (let F = 0; F < M.length; F++)
        Re(M[F], m, x, w);
      r(h.anchor, m, x);
      return;
    }
    if (I === cr) {
      T(h, m, x);
      return;
    }
    if (w !== 2 && D & 1 && P)
      if (w === 0)
        P.beforeEnter(S), r(S, m, x), ke(() => P.enter(S), N);
      else {
        const { leave: F, delayLeave: z, afterLeave: U } = P, q = () => r(S, m, x), te = () => {
          F(S, () => {
            q(), U && U();
          });
        };
        z ? z(S, q, te) : te();
      }
    else
      r(S, m, x);
  }, it = (h, m, x, w = !1, N = !1) => {
    const {
      type: S,
      props: I,
      ref: P,
      children: M,
      dynamicChildren: D,
      shapeFlag: $,
      patchFlag: F,
      dirs: z
    } = h;
    if (P != null && ls(P, null, x, h, !0), $ & 256) {
      m.ctx.deactivate(h);
      return;
    }
    const U = $ & 1 && z, q = !ur(h);
    let te;
    if (q && (te = I && I.onVnodeBeforeUnmount) && ft(te, m, h), $ & 6)
      wu(h.component, x, w);
    else {
      if ($ & 128) {
        h.suspense.unmount(x, w);
        return;
      }
      U && Xt(h, null, m, "beforeUnmount"), $ & 64 ? h.type.remove(
        h,
        m,
        x,
        N,
        On,
        w
      ) : D && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (S !== Ue || F > 0 && F & 64) ? Et(
        D,
        m,
        x,
        !1,
        !0
      ) : (S === Ue && F & 384 || !N && $ & 16) && Et(M, m, x), w && ze(h);
    }
    (q && (te = I && I.onVnodeUnmounted) || U) && ke(() => {
      te && ft(te, m, h), U && Xt(h, null, m, "unmounted");
    }, x);
  }, ze = (h) => {
    const { type: m, el: x, anchor: w, transition: N } = h;
    if (m === Ue) {
      process.env.NODE_ENV !== "production" && h.patchFlag > 0 && h.patchFlag & 2048 && N && !N.persisted ? h.children.forEach((I) => {
        I.type === et ? i(I.el) : ze(I);
      }) : bt(x, w);
      return;
    }
    if (m === cr) {
      v(h);
      return;
    }
    const S = () => {
      i(x), N && !N.persisted && N.afterLeave && N.afterLeave();
    };
    if (h.shapeFlag & 1 && N && !N.persisted) {
      const { leave: I, delayLeave: P } = N, M = () => I(x, S);
      P ? P(h.el, S, M) : M();
    } else
      S();
  }, bt = (h, m) => {
    let x;
    for (; h !== m; )
      x = d(h), i(h), h = x;
    i(m);
  }, wu = (h, m, x) => {
    process.env.NODE_ENV !== "production" && h.type.__hmrId && Tc(h);
    const { bum: w, scope: N, update: S, subTree: I, um: P } = h;
    w && Zn(w), N.stop(), S && (S.active = !1, it(I, h, m, x)), P && ke(P, m), ke(() => {
      h.isUnmounted = !0;
    }, m), m && m.pendingBranch && !m.isUnmounted && h.asyncDep && !h.asyncResolved && h.suspenseId === m.pendingId && (m.deps--, m.deps === 0 && m.resolve()), process.env.NODE_ENV !== "production" && Rc(h);
  }, Et = (h, m, x, w = !1, N = !1, S = 0) => {
    for (let I = S; I < h.length; I++)
      it(h[I], m, x, w, N);
  }, Mr = (h) => h.shapeFlag & 6 ? Mr(h.component.subTree) : h.shapeFlag & 128 ? h.suspense.next() : d(h.anchor || h.el), bo = (h, m, x) => {
    h == null ? m._vnode && it(m._vnode, null, null, !0) : p(m._vnode || null, h, m, null, null, null, x), ko(), Xl(), m._vnode = h;
  }, On = {
    p,
    um: it,
    m: Re,
    r: ze,
    mt: G,
    mc: C,
    pc: ye,
    pbc: K,
    n: Mr,
    o: t
  };
  let Vi, Mi;
  return e && ([Vi, Mi] = e(
    On
  )), {
    render: bo,
    hydrate: Vi,
    createApp: gf(bo, Vi)
  };
}
function qt({ effect: t, update: e }, n) {
  t.allowRecurse = e.allowRecurse = n;
}
function Hr(t, e, n = !1) {
  const r = t.children, i = e.children;
  if (j(r) && j(i))
    for (let s = 0; s < r.length; s++) {
      const o = r[s];
      let l = i[s];
      l.shapeFlag & 1 && !l.dynamicChildren && ((l.patchFlag <= 0 || l.patchFlag === 32) && (l = i[s] = kt(i[s]), l.el = o.el), n || Hr(o, l)), l.type === Sr && (l.el = o.el), process.env.NODE_ENV !== "production" && l.type === et && !l.el && (l.el = o.el);
    }
}
function Rf(t) {
  const e = t.slice(), n = [0];
  let r, i, s, o, l;
  const a = t.length;
  for (r = 0; r < a; r++) {
    const u = t[r];
    if (u !== 0) {
      if (i = n[n.length - 1], t[i] < u) {
        e[r] = i, n.push(r);
        continue;
      }
      for (s = 0, o = n.length - 1; s < o; )
        l = s + o >> 1, t[n[l]] < u ? s = l + 1 : o = l;
      u < t[n[s]] && (s > 0 && (e[r] = n[s - 1]), n[s] = r);
    }
  }
  for (s = n.length, o = n[s - 1]; s-- > 0; )
    n[s] = o, o = e[o];
  return n;
}
const kf = (t) => t.__isTeleport, Ue = Symbol.for("v-fgt"), Sr = Symbol.for("v-txt"), et = Symbol.for("v-cmt"), cr = Symbol.for("v-stc"), fr = [];
let lt = null;
function bn(t = !1) {
  fr.push(lt = t ? null : []);
}
function Af() {
  fr.pop(), lt = fr[fr.length - 1] || null;
}
let yr = 1;
function Ko(t) {
  yr += t;
}
function ma(t) {
  return t.dynamicChildren = yr > 0 ? lt || Mn : null, Af(), yr > 0 && lt && lt.push(t), t;
}
function Kn(t, e, n, r, i, s) {
  return ma(
    Js(
      t,
      e,
      n,
      r,
      i,
      s,
      !0
      /* isBlock */
    )
  );
}
function If(t, e, n, r, i) {
  return ma(
    vt(
      t,
      e,
      n,
      r,
      i,
      !0
      /* isBlock: prevent a block from tracking itself */
    )
  );
}
function Ni(t) {
  return t ? t.__v_isVNode === !0 : !1;
}
function er(t, e) {
  return process.env.NODE_ENV !== "production" && e.shapeFlag & 6 && Dn.has(e.type) ? (t.shapeFlag &= -257, e.shapeFlag &= -513, !1) : t.type === e.type && t.key === e.key;
}
const Ff = (...t) => va(
  ...t
), wi = "__vInternal", ga = ({ key: t }) => t ?? null, Wr = ({
  ref: t,
  ref_key: e,
  ref_for: n
}) => (typeof t == "number" && (t = "" + t), t != null ? ge(t) || ve(t) || H(t) ? { i: Ne, r: t, k: e, f: !!n } : t : null);
function Js(t, e = null, n = null, r = 0, i = null, s = t === Ue ? 0 : 1, o = !1, l = !1) {
  const a = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: t,
    props: e,
    key: e && ga(e),
    ref: e && Wr(e),
    scopeId: ta,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: s,
    patchFlag: r,
    dynamicProps: i,
    dynamicChildren: null,
    appContext: null,
    ctx: Ne
  };
  return l ? (Zs(a, n), s & 128 && t.normalize(a)) : n && (a.shapeFlag |= ge(n) ? 8 : 16), process.env.NODE_ENV !== "production" && a.key !== a.key && k("VNode created with invalid key (NaN). VNode type:", a.type), yr > 0 && // avoid a block node from tracking itself
  !o && // has current parent block
  lt && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (a.patchFlag > 0 || s & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  a.patchFlag !== 32 && lt.push(a), a;
}
const vt = process.env.NODE_ENV !== "production" ? Ff : va;
function va(t, e = null, n = null, r = 0, i = null, s = !1) {
  if ((!t || t === of) && (process.env.NODE_ENV !== "production" && !t && k(`Invalid vnode type when creating vnode: ${t}.`), t = et), Ni(t)) {
    const l = Ht(
      t,
      e,
      !0
      /* mergeRef: true */
    );
    return n && Zs(l, n), yr > 0 && !s && lt && (l.shapeFlag & 6 ? lt[lt.indexOf(t)] = l : lt.push(l)), l.patchFlag |= -2, l;
  }
  if (Oa(t) && (t = t.__vccOpts), e) {
    e = $f(e);
    let { class: l, style: a } = e;
    l && !ge(l) && (e.class = ks(l)), le(a) && (Zi(a) && !j(a) && (a = ae({}, a)), e.style = mi(a));
  }
  const o = ge(t) ? 1 : Hc(t) ? 128 : kf(t) ? 64 : le(t) ? 4 : H(t) ? 2 : 0;
  return process.env.NODE_ENV !== "production" && o & 4 && Zi(t) && (t = Y(t), k(
    "Vue received a Component which was made a reactive object. This can lead to unnecessary performance overhead, and should be avoided by marking the component with `markRaw` or using `shallowRef` instead of `ref`.",
    `
Component that was made reactive: `,
    t
  )), Js(
    t,
    e,
    n,
    r,
    i,
    o,
    s,
    !0
  );
}
function $f(t) {
  return t ? Zi(t) || wi in t ? ae({}, t) : t : null;
}
function Ht(t, e, n = !1) {
  const { props: r, ref: i, patchFlag: s, children: o } = t, l = e ? zf(r || {}, e) : r;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: t.type,
    props: l,
    key: l && ga(l),
    ref: e && e.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && i ? j(i) ? i.concat(Wr(e)) : [i, Wr(e)] : Wr(e)
    ) : i,
    scopeId: t.scopeId,
    slotScopeIds: t.slotScopeIds,
    children: process.env.NODE_ENV !== "production" && s === -1 && j(o) ? o.map(ya) : o,
    target: t.target,
    targetAnchor: t.targetAnchor,
    staticCount: t.staticCount,
    shapeFlag: t.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: e && t.type !== Ue ? s === -1 ? 16 : s | 16 : s,
    dynamicProps: t.dynamicProps,
    dynamicChildren: t.dynamicChildren,
    appContext: t.appContext,
    dirs: t.dirs,
    transition: t.transition,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: t.component,
    suspense: t.suspense,
    ssContent: t.ssContent && Ht(t.ssContent),
    ssFallback: t.ssFallback && Ht(t.ssFallback),
    el: t.el,
    anchor: t.anchor,
    ctx: t.ctx,
    ce: t.ce
  };
}
function ya(t) {
  const e = Ht(t);
  return j(t.children) && (e.children = t.children.map(ya)), e;
}
function Lf(t = " ", e = 0) {
  return vt(Sr, null, t, e);
}
function ot(t) {
  return t == null || typeof t == "boolean" ? vt(et) : j(t) ? vt(
    Ue,
    null,
    // #3666, avoid reference pollution when reusing vnode
    t.slice()
  ) : typeof t == "object" ? kt(t) : vt(Sr, null, String(t));
}
function kt(t) {
  return t.el === null && t.patchFlag !== -1 || t.memo ? t : Ht(t);
}
function Zs(t, e) {
  let n = 0;
  const { shapeFlag: r } = t;
  if (e == null)
    e = null;
  else if (j(e))
    n = 16;
  else if (typeof e == "object")
    if (r & 65) {
      const i = e.default;
      i && (i._c && (i._d = !1), Zs(t, i()), i._c && (i._d = !0));
      return;
    } else {
      n = 32;
      const i = e._;
      !i && !(wi in e) ? e._ctx = Ne : i === 3 && Ne && (Ne.slots._ === 1 ? e._ = 1 : (e._ = 2, t.patchFlag |= 1024));
    }
  else
    H(e) ? (e = { default: e, _ctx: Ne }, n = 32) : (e = String(e), r & 64 ? (n = 16, e = [Lf(e)]) : n = 8);
  t.children = e, t.shapeFlag |= n;
}
function zf(...t) {
  const e = {};
  for (let n = 0; n < t.length; n++) {
    const r = t[n];
    for (const i in r)
      if (i === "class")
        e.class !== r.class && (e.class = ks([e.class, r.class]));
      else if (i === "style")
        e.style = mi([e.style, r.style]);
      else if (Cr(i)) {
        const s = e[i], o = r[i];
        o && s !== o && !(j(s) && s.includes(o)) && (e[i] = s ? [].concat(s, o) : o);
      } else
        i !== "" && (e[i] = r[i]);
  }
  return e;
}
function ft(t, e, n, r = null) {
  at(t, e, 7, [
    n,
    r
  ]);
}
const Bf = ua();
let jf = 0;
function Uf(t, e, n) {
  const r = t.type, i = (e ? e.appContext : t.appContext) || Bf, s = {
    uid: jf++,
    vnode: t,
    type: r,
    parent: e,
    appContext: i,
    root: null,
    // to be immediately set
    next: null,
    subTree: null,
    // will be set synchronously right after creation
    effect: null,
    update: null,
    // will be set synchronously right after creation
    scope: new Bu(
      !0
      /* detached */
    ),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: e ? e.provides : Object.create(i.provides),
    accessCache: null,
    renderCache: [],
    // local resolved assets
    components: null,
    directives: null,
    // resolved props and emits options
    propsOptions: fa(r, i),
    emitsOptions: ea(r, i),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: re,
    // inheritAttrs
    inheritAttrs: r.inheritAttrs,
    // state
    ctx: re,
    data: re,
    props: re,
    attrs: re,
    slots: re,
    refs: re,
    setupState: re,
    setupContext: null,
    attrsProxy: null,
    slotsProxy: null,
    // suspense related
    suspense: n,
    suspenseId: n ? n.pendingId : 0,
    asyncDep: null,
    asyncResolved: !1,
    // lifecycle hooks
    // not using enums here because it results in computed properties
    isMounted: !1,
    isUnmounted: !1,
    isDeactivated: !1,
    bc: null,
    c: null,
    bm: null,
    m: null,
    bu: null,
    u: null,
    um: null,
    bum: null,
    da: null,
    a: null,
    rtg: null,
    rtc: null,
    ec: null,
    sp: null
  };
  return process.env.NODE_ENV !== "production" ? s.ctx = lf(s) : s.ctx = { _: s }, s.root = e ? e.root : s, s.emit = Fc.bind(null, s), t.ce && t.ce(s), s;
}
let xe = null;
const Gs = () => xe || Ne;
let eo, wn, Xo = "__VUE_INSTANCE_SETTERS__";
(wn = Jr()[Xo]) || (wn = Jr()[Xo] = []), wn.push((t) => xe = t), eo = (t) => {
  wn.length > 1 ? wn.forEach((e) => e(t)) : wn[0](t);
};
const $n = (t) => {
  eo(t), t.scope.on();
}, cn = () => {
  xe && xe.scope.off(), eo(null);
}, Hf = /* @__PURE__ */ Wn("slot,component");
function as(t, e) {
  const n = e.isNativeTag || Ol;
  (Hf(t) || n(t)) && k(
    "Do not use built-in or reserved HTML elements as component id: " + t
  );
}
function xa(t) {
  return t.vnode.shapeFlag & 4;
}
let xr = !1;
function Wf(t, e = !1) {
  xr = e;
  const { props: n, children: r } = t.vnode, i = xa(t);
  yf(t, n, i, e), Cf(t, r);
  const s = i ? Yf(t, e) : void 0;
  return xr = !1, s;
}
function Yf(t, e) {
  var n;
  const r = t.type;
  if (process.env.NODE_ENV !== "production") {
    if (r.name && as(r.name, t.appContext.config), r.components) {
      const s = Object.keys(r.components);
      for (let o = 0; o < s.length; o++)
        as(s[o], t.appContext.config);
    }
    if (r.directives) {
      const s = Object.keys(r.directives);
      for (let o = 0; o < s.length; o++)
        ia(s[o]);
    }
    r.compilerOptions && Kf() && k(
      '"compilerOptions" is only supported when using a build of Vue that includes the runtime compiler. Since you are using a runtime-only build, the options should be passed via your build tool config instead.'
    );
  }
  t.accessCache = /* @__PURE__ */ Object.create(null), t.proxy = Ll(new Proxy(t.ctx, la)), process.env.NODE_ENV !== "production" && af(t);
  const { setup: i } = r;
  if (i) {
    const s = t.setupContext = i.length > 1 ? qf(t) : null;
    $n(t), vn();
    const o = Ct(
      i,
      t,
      0,
      [process.env.NODE_ENV !== "production" ? rr(t.props) : t.props, s]
    );
    if (yn(), cn(), Vs(o)) {
      if (o.then(cn, cn), e)
        return o.then((l) => {
          qo(t, l, e);
        }).catch((l) => {
          xi(l, t, 0);
        });
      if (t.asyncDep = o, process.env.NODE_ENV !== "production" && !t.suspense) {
        const l = (n = r.name) != null ? n : "Anonymous";
        k(
          `Component <${l}>: setup function returned a promise, but no <Suspense> boundary was found in the parent component tree. A component with async setup() must be nested in a <Suspense> in order to be rendered.`
        );
      }
    } else
      qo(t, o, e);
  } else
    ba(t, e);
}
function qo(t, e, n) {
  H(e) ? t.type.__ssrInlineRender ? t.ssrRender = e : t.render = e : le(e) ? (process.env.NODE_ENV !== "production" && Ni(e) && k(
    "setup() should not return VNodes directly - return a render function instead."
  ), process.env.NODE_ENV !== "production" && (t.devtoolsRawSetupState = e), t.setupState = Ul(e), process.env.NODE_ENV !== "production" && uf(t)) : process.env.NODE_ENV !== "production" && e !== void 0 && k(
    `setup() should return an object. Received: ${e === null ? "null" : typeof e}`
  ), ba(t, n);
}
let us;
const Kf = () => !us;
function ba(t, e, n) {
  const r = t.type;
  if (!t.render) {
    if (!e && us && !r.render) {
      const i = r.template || qs(t).template;
      if (i) {
        process.env.NODE_ENV !== "production" && Ot(t, "compile");
        const { isCustomElement: s, compilerOptions: o } = t.appContext.config, { delimiters: l, compilerOptions: a } = r, u = ae(
          ae(
            {
              isCustomElement: s,
              delimiters: l
            },
            o
          ),
          a
        );
        r.render = us(i, u), process.env.NODE_ENV !== "production" && Nt(t, "compile");
      }
    }
    t.render = r.render || Oe;
  }
  {
    $n(t), vn();
    try {
      ff(t);
    } finally {
      yn(), cn();
    }
  }
  process.env.NODE_ENV !== "production" && !r.render && t.render === Oe && !e && (r.template ? k(
    'Component provided template option but runtime compilation is not supported in this build of Vue. Configure your bundler to alias "vue" to "vue/dist/vue.esm-bundler.js".'
    /* should not happen */
  ) : k("Component is missing template or render function."));
}
function Qo(t) {
  return t.attrsProxy || (t.attrsProxy = new Proxy(
    t.attrs,
    process.env.NODE_ENV !== "production" ? {
      get(e, n) {
        return ti(), we(t, "get", "$attrs"), e[n];
      },
      set() {
        return k("setupContext.attrs is readonly."), !1;
      },
      deleteProperty() {
        return k("setupContext.attrs is readonly."), !1;
      }
    } : {
      get(e, n) {
        return we(t, "get", "$attrs"), e[n];
      }
    }
  ));
}
function Xf(t) {
  return t.slotsProxy || (t.slotsProxy = new Proxy(t.slots, {
    get(e, n) {
      return we(t, "get", "$slots"), e[n];
    }
  }));
}
function qf(t) {
  const e = (n) => {
    if (process.env.NODE_ENV !== "production" && (t.exposed && k("expose() should be called only once per setup()."), n != null)) {
      let r = typeof n;
      r === "object" && (j(n) ? r = "array" : ve(n) && (r = "ref")), r !== "object" && k(
        `expose() should be passed a plain object, received ${r}.`
      );
    }
    t.exposed = n || {};
  };
  return process.env.NODE_ENV !== "production" ? Object.freeze({
    get attrs() {
      return Qo(t);
    },
    get slots() {
      return Xf(t);
    },
    get emit() {
      return (n, ...r) => t.emit(n, ...r);
    },
    expose: e
  }) : {
    get attrs() {
      return Qo(t);
    },
    slots: t.slots,
    emit: t.emit,
    expose: e
  };
}
function to(t) {
  if (t.exposed)
    return t.exposeProxy || (t.exposeProxy = new Proxy(Ul(Ll(t.exposed)), {
      get(e, n) {
        if (n in e)
          return e[n];
        if (n in un)
          return un[n](t);
      },
      has(e, n) {
        return n in e || n in un;
      }
    }));
}
const Qf = /(?:^|[-_])(\w)/g, Jf = (t) => t.replace(Qf, (e) => e.toUpperCase()).replace(/[-_]/g, "");
function Ea(t, e = !0) {
  return H(t) ? t.displayName || t.name : t.name || e && t.__name;
}
function Ti(t, e, n = !1) {
  let r = Ea(e);
  if (!r && e.__file) {
    const i = e.__file.match(/([^/\\]+)\.\w+$/);
    i && (r = i[1]);
  }
  if (!r && t && t.parent) {
    const i = (s) => {
      for (const o in s)
        if (s[o] === e)
          return o;
    };
    r = i(
      t.components || t.parent.type.components
    ) || i(t.appContext.components);
  }
  return r ? Jf(r) : n ? "App" : "Anonymous";
}
function Oa(t) {
  return H(t) && "__vccOpts" in t;
}
const qe = (t, e) => _c(t, e, xr), Zf = Symbol.for("v-scx"), Gf = () => {
  {
    const t = Ur(Zf);
    return t || process.env.NODE_ENV !== "production" && k(
      "Server rendering context not provided. Make sure to only call useSSRContext() conditionally in the server build."
    ), t;
  }
};
function Ii(t) {
  return !!(t && t.__v_isShallow);
}
function ed() {
  if (process.env.NODE_ENV === "production" || typeof window > "u")
    return;
  const t = { style: "color:#3ba776" }, e = { style: "color:#0b1bc9" }, n = { style: "color:#b62e24" }, r = { style: "color:#9d288c" }, i = {
    header(f) {
      return le(f) ? f.__isVue ? ["div", t, "VueInstance"] : ve(f) ? [
        "div",
        {},
        ["span", t, c(f)],
        "<",
        l(f.value),
        ">"
      ] : sn(f) ? [
        "div",
        {},
        ["span", t, Ii(f) ? "ShallowReactive" : "Reactive"],
        "<",
        l(f),
        `>${Ut(f) ? " (readonly)" : ""}`
      ] : Ut(f) ? [
        "div",
        {},
        ["span", t, Ii(f) ? "ShallowReadonly" : "Readonly"],
        "<",
        l(f),
        ">"
      ] : null : null;
    },
    hasBody(f) {
      return f && f.__isVue;
    },
    body(f) {
      if (f && f.__isVue)
        return [
          "div",
          {},
          ...s(f.$)
        ];
    }
  };
  function s(f) {
    const d = [];
    f.type.props && f.props && d.push(o("props", Y(f.props))), f.setupState !== re && d.push(o("setup", f.setupState)), f.data !== re && d.push(o("data", Y(f.data)));
    const _ = a(f, "computed");
    _ && d.push(o("computed", _));
    const g = a(f, "inject");
    return g && d.push(o("injected", g)), d.push([
      "div",
      {},
      [
        "span",
        {
          style: r.style + ";opacity:0.66"
        },
        "$ (internal): "
      ],
      ["object", { object: f }]
    ]), d;
  }
  function o(f, d) {
    return d = ae({}, d), Object.keys(d).length ? [
      "div",
      { style: "line-height:1.25em;margin-bottom:0.6em" },
      [
        "div",
        {
          style: "color:#476582"
        },
        f
      ],
      [
        "div",
        {
          style: "padding-left:1.25em"
        },
        ...Object.keys(d).map((_) => [
          "div",
          {},
          ["span", r, _ + ": "],
          l(d[_], !1)
        ])
      ]
    ] : ["span", {}];
  }
  function l(f, d = !0) {
    return typeof f == "number" ? ["span", e, f] : typeof f == "string" ? ["span", n, JSON.stringify(f)] : typeof f == "boolean" ? ["span", r, f] : le(f) ? ["object", { object: d ? Y(f) : f }] : ["span", n, String(f)];
  }
  function a(f, d) {
    const _ = f.type;
    if (H(_))
      return;
    const g = {};
    for (const p in f.ctx)
      u(_, p, d) && (g[p] = f.ctx[p]);
    return g;
  }
  function u(f, d, _) {
    const g = f[_];
    if (j(g) && g.includes(d) || le(g) && d in g || f.extends && u(f.extends, d, _) || f.mixins && f.mixins.some((p) => u(p, d, _)))
      return !0;
  }
  function c(f) {
    return Ii(f) ? "ShallowRef" : f.effect ? "ComputedRef" : "Ref";
  }
  window.devtoolsFormatters ? window.devtoolsFormatters.push(i) : window.devtoolsFormatters = [i];
}
const Jo = "3.3.6", td = "http://www.w3.org/2000/svg", en = typeof document < "u" ? document : null, Zo = en && /* @__PURE__ */ en.createElement("template"), nd = {
  insert: (t, e, n) => {
    e.insertBefore(t, n || null);
  },
  remove: (t) => {
    const e = t.parentNode;
    e && e.removeChild(t);
  },
  createElement: (t, e, n, r) => {
    const i = e ? en.createElementNS(td, t) : en.createElement(t, n ? { is: n } : void 0);
    return t === "select" && r && r.multiple != null && i.setAttribute("multiple", r.multiple), i;
  },
  createText: (t) => en.createTextNode(t),
  createComment: (t) => en.createComment(t),
  setText: (t, e) => {
    t.nodeValue = e;
  },
  setElementText: (t, e) => {
    t.textContent = e;
  },
  parentNode: (t) => t.parentNode,
  nextSibling: (t) => t.nextSibling,
  querySelector: (t) => en.querySelector(t),
  setScopeId(t, e) {
    t.setAttribute(e, "");
  },
  // __UNSAFE__
  // Reason: innerHTML.
  // Static content here can only come from compiled templates.
  // As long as the user only uses trusted templates, this is safe.
  insertStaticContent(t, e, n, r, i, s) {
    const o = n ? n.previousSibling : e.lastChild;
    if (i && (i === s || i.nextSibling))
      for (; e.insertBefore(i.cloneNode(!0), n), !(i === s || !(i = i.nextSibling)); )
        ;
    else {
      Zo.innerHTML = r ? `<svg>${t}</svg>` : t;
      const l = Zo.content;
      if (r) {
        const a = l.firstChild;
        for (; a.firstChild; )
          l.appendChild(a.firstChild);
        l.removeChild(a);
      }
      e.insertBefore(l, n);
    }
    return [
      // first
      o ? o.nextSibling : e.firstChild,
      // last
      n ? n.previousSibling : e.lastChild
    ];
  }
}, rd = Symbol("_vtc");
function id(t, e, n) {
  const r = t[rd];
  r && (e = (e ? [e, ...r] : [...r]).join(" ")), e == null ? t.removeAttribute("class") : n ? t.setAttribute("class", e) : t.className = e;
}
const sd = Symbol("_vod");
function od(t, e, n) {
  const r = t.style, i = ge(n);
  if (n && !i) {
    if (e && !ge(e))
      for (const s in e)
        n[s] == null && cs(r, s, "");
    for (const s in n)
      cs(r, s, n[s]);
  } else {
    const s = r.display;
    i ? e !== n && (r.cssText = n) : e && t.removeAttribute("style"), sd in t && (r.display = s);
  }
}
const ld = /[^\\];\s*$/, Go = /\s*!important$/;
function cs(t, e, n) {
  if (j(n))
    n.forEach((r) => cs(t, e, r));
  else if (n == null && (n = ""), process.env.NODE_ENV !== "production" && ld.test(n) && k(
    `Unexpected semicolon at the end of '${e}' style value: '${n}'`
  ), e.startsWith("--"))
    t.setProperty(e, n);
  else {
    const r = ad(t, e);
    Go.test(n) ? t.setProperty(
      He(r),
      n.replace(Go, ""),
      "important"
    ) : t[r] = n;
  }
}
const el = ["Webkit", "Moz", "ms"], Fi = {};
function ad(t, e) {
  const n = Fi[e];
  if (n)
    return n;
  let r = Dt(e);
  if (r !== "filter" && r in t)
    return Fi[e] = r;
  r = _i(r);
  for (let i = 0; i < el.length; i++) {
    const s = el[i] + r;
    if (s in t)
      return Fi[e] = s;
  }
  return e;
}
const tl = "http://www.w3.org/1999/xlink";
function ud(t, e, n, r, i) {
  if (r && e.startsWith("xlink:"))
    n == null ? t.removeAttributeNS(tl, e.slice(6, e.length)) : t.setAttributeNS(tl, e, n);
  else {
    const s = zu(e);
    n == null || s && !Nl(n) ? t.removeAttribute(e) : t.setAttribute(e, s ? "" : n);
  }
}
function cd(t, e, n, r, i, s, o) {
  if (e === "innerHTML" || e === "textContent") {
    r && o(r, i, s), t[e] = n ?? "";
    return;
  }
  const l = t.tagName;
  if (e === "value" && l !== "PROGRESS" && // custom elements may use _value internally
  !l.includes("-")) {
    t._value = n;
    const u = l === "OPTION" ? t.getAttribute("value") : t.value, c = n ?? "";
    u !== c && (t.value = c), n == null && t.removeAttribute(e);
    return;
  }
  let a = !1;
  if (n === "" || n == null) {
    const u = typeof t[e];
    u === "boolean" ? n = Nl(n) : n == null && u === "string" ? (n = "", a = !0) : u === "number" && (n = 0, a = !0);
  }
  try {
    t[e] = n;
  } catch (u) {
    process.env.NODE_ENV !== "production" && !a && k(
      `Failed setting prop "${e}" on <${l.toLowerCase()}>: value ${n} is invalid.`,
      u
    );
  }
  a && t.removeAttribute(e);
}
function fd(t, e, n, r) {
  t.addEventListener(e, n, r);
}
function dd(t, e, n, r) {
  t.removeEventListener(e, n, r);
}
const nl = Symbol("_vei");
function hd(t, e, n, r, i = null) {
  const s = t[nl] || (t[nl] = {}), o = s[e];
  if (r && o)
    o.value = r;
  else {
    const [l, a] = pd(e);
    if (r) {
      const u = s[e] = gd(r, i);
      fd(t, l, u, a);
    } else
      o && (dd(t, l, o, a), s[e] = void 0);
  }
}
const rl = /(?:Once|Passive|Capture)$/;
function pd(t) {
  let e;
  if (rl.test(t)) {
    e = {};
    let r;
    for (; r = t.match(rl); )
      t = t.slice(0, t.length - r[0].length), e[r[0].toLowerCase()] = !0;
  }
  return [t[2] === ":" ? t.slice(3) : He(t.slice(2)), e];
}
let $i = 0;
const _d = /* @__PURE__ */ Promise.resolve(), md = () => $i || (_d.then(() => $i = 0), $i = Date.now());
function gd(t, e) {
  const n = (r) => {
    if (!r._vts)
      r._vts = Date.now();
    else if (r._vts <= n.attached)
      return;
    at(
      vd(r, n.value),
      e,
      5,
      [r]
    );
  };
  return n.value = t, n.attached = md(), n;
}
function vd(t, e) {
  if (j(e)) {
    const n = t.stopImmediatePropagation;
    return t.stopImmediatePropagation = () => {
      n.call(t), t._stopped = !0;
    }, e.map((r) => (i) => !i._stopped && r && r(i));
  } else
    return e;
}
const il = /^on[a-z]/, yd = (t, e, n, r, i = !1, s, o, l, a) => {
  e === "class" ? id(t, r, i) : e === "style" ? od(t, n, r) : Cr(e) ? qr(e) || hd(t, e, n, r, o) : (e[0] === "." ? (e = e.slice(1), !0) : e[0] === "^" ? (e = e.slice(1), !1) : xd(t, e, r, i)) ? cd(
    t,
    e,
    r,
    s,
    o,
    l,
    a
  ) : (e === "true-value" ? t._trueValue = r : e === "false-value" && (t._falseValue = r), ud(t, e, r, i));
};
function xd(t, e, n, r) {
  return r ? !!(e === "innerHTML" || e === "textContent" || e in t && il.test(e) && H(n)) : e === "spellcheck" || e === "draggable" || e === "translate" || e === "form" || e === "list" && t.tagName === "INPUT" || e === "type" && t.tagName === "TEXTAREA" || il.test(e) && ge(n) ? !1 : e in t;
}
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function Xn(t, e) {
  const n = /* @__PURE__ */ xn(t);
  class r extends no {
    constructor(s) {
      super(n, s, e);
    }
  }
  return r.def = n, r;
}
const bd = typeof HTMLElement < "u" ? HTMLElement : class {
};
class no extends bd {
  constructor(e, n = {}, r) {
    super(), this._def = e, this._props = n, this._instance = null, this._connected = !1, this._resolved = !1, this._numberProps = null, this._ob = null, this.shadowRoot && r ? r(this._createVNode(), this.shadowRoot) : (process.env.NODE_ENV !== "production" && this.shadowRoot && k(
      "Custom element has pre-rendered declarative shadow root but is not defined as hydratable. Use `defineSSRCustomElement`."
    ), this.attachShadow({ mode: "open" }), this._def.__asyncLoader || this._resolveProps(this._def));
  }
  connectedCallback() {
    this._connected = !0, this._instance || (this._resolved ? this._update() : this._resolveDef());
  }
  disconnectedCallback() {
    this._connected = !1, this._ob && (this._ob.disconnect(), this._ob = null), Bs(() => {
      this._connected || (ol(null, this.shadowRoot), this._instance = null);
    });
  }
  /**
   * resolve inner component definition (handle possible async component)
   */
  _resolveDef() {
    this._resolved = !0;
    for (let r = 0; r < this.attributes.length; r++)
      this._setAttr(this.attributes[r].name);
    this._ob = new MutationObserver((r) => {
      for (const i of r)
        this._setAttr(i.attributeName);
    }), this._ob.observe(this, { attributes: !0 });
    const e = (r, i = !1) => {
      const { props: s, styles: o } = r;
      let l;
      if (s && !j(s))
        for (const a in s) {
          const u = s[a];
          (u === Number || u && u.type === Number) && (a in this._props && (this._props[a] = wo(this._props[a])), (l || (l = /* @__PURE__ */ Object.create(null)))[Dt(a)] = !0);
        }
      this._numberProps = l, i && this._resolveProps(r), this._applyStyles(o), this._update();
    }, n = this._def.__asyncLoader;
    n ? n().then((r) => e(r, !0)) : e(this._def);
  }
  _resolveProps(e) {
    const { props: n } = e, r = j(n) ? n : Object.keys(n || {});
    for (const i of Object.keys(this))
      i[0] !== "_" && r.includes(i) && this._setProp(i, this[i], !0, !1);
    for (const i of r.map(Dt))
      Object.defineProperty(this, i, {
        get() {
          return this._getProp(i);
        },
        set(s) {
          this._setProp(i, s);
        }
      });
  }
  _setAttr(e) {
    let n = this.getAttribute(e);
    const r = Dt(e);
    this._numberProps && this._numberProps[r] && (n = wo(n)), this._setProp(r, n, !1);
  }
  /**
   * @internal
   */
  _getProp(e) {
    return this._props[e];
  }
  /**
   * @internal
   */
  _setProp(e, n, r = !0, i = !0) {
    n !== this._props[e] && (this._props[e] = n, i && this._instance && this._update(), r && (n === !0 ? this.setAttribute(He(e), "") : typeof n == "string" || typeof n == "number" ? this.setAttribute(He(e), n + "") : n || this.removeAttribute(He(e))));
  }
  _update() {
    ol(this._createVNode(), this.shadowRoot);
  }
  _createVNode() {
    const e = vt(this._def, ae({}, this._props));
    return this._instance || (e.ce = (n) => {
      this._instance = n, n.isCE = !0, process.env.NODE_ENV !== "production" && (n.ceReload = (s) => {
        this._styles && (this._styles.forEach((o) => this.shadowRoot.removeChild(o)), this._styles.length = 0), this._applyStyles(s), this._instance = null, this._update();
      });
      const r = (s, o) => {
        this.dispatchEvent(
          new CustomEvent(s, {
            detail: o
          })
        );
      };
      n.emit = (s, ...o) => {
        r(s, o), He(s) !== s && r(He(s), o);
      };
      let i = this;
      for (; i = i && (i.parentNode || i.host); )
        if (i instanceof no) {
          n.parent = i._instance, n.provides = i._instance.provides;
          break;
        }
    }), e;
  }
  _applyStyles(e) {
    e && e.forEach((n) => {
      const r = document.createElement("style");
      r.textContent = n, this.shadowRoot.appendChild(r), process.env.NODE_ENV !== "production" && (this._styles || (this._styles = [])).push(r);
    });
  }
}
function qn(t) {
  const e = Gs();
  if (!e) {
    process.env.NODE_ENV !== "production" && k("useCssVars is called without current active component instance.");
    return;
  }
  const n = e.ut = (i = t(e.proxy)) => {
    Array.from(
      document.querySelectorAll(`[data-v-owner="${e.uid}"]`)
    ).forEach((s) => ds(s, i));
  }, r = () => {
    const i = t(e.proxy);
    fs(e.subTree, i), n(i);
  };
  Yc(r), Yn(() => {
    const i = new MutationObserver(r);
    i.observe(e.subTree.el.parentNode, { childList: !0 }), Ys(() => i.disconnect());
  });
}
function fs(t, e) {
  if (t.shapeFlag & 128) {
    const n = t.suspense;
    t = n.activeBranch, n.pendingBranch && !n.isHydrating && n.effects.push(() => {
      fs(n.activeBranch, e);
    });
  }
  for (; t.component; )
    t = t.component.subTree;
  if (t.shapeFlag & 1 && t.el)
    ds(t.el, e);
  else if (t.type === Ue)
    t.children.forEach((n) => fs(n, e));
  else if (t.type === cr) {
    let { el: n, anchor: r } = t;
    for (; n && (ds(n, e), n !== r); )
      n = n.nextSibling;
  }
}
function ds(t, e) {
  if (t.nodeType === 1) {
    const n = t.style;
    for (const r in e)
      n.setProperty(`--${r}`, e[r]);
  }
}
const Ed = /* @__PURE__ */ ae({ patchProp: yd }, nd);
let sl;
function Od() {
  return sl || (sl = Vf(Ed));
}
const ol = (...t) => {
  Od().render(...t);
};
function Nd() {
  ed();
}
process.env.NODE_ENV !== "production" && Nd();
const wd = { class: "text-flash" }, Td = /* @__PURE__ */ xn({
  __name: "TextFlash",
  props: {
    lineColor: { default: "white" },
    lineHeight: { default: "1px" },
    hoverTextColor: { default: "currentColor" }
  },
  setup(t) {
    return qn((e) => ({
      "2c672104": e.lineColor,
      "57bb546c": e.lineHeight,
      "264d960b": e.hoverTextColor
    })), (e, n) => (bn(), Kn("div", wd, [
      Ks(e.$slots, "default")
    ]));
  }
}), Dd = `.text-flash{--text-flash-line-color: var(--2c672104);--text-flash-line-height: var(--57bb546c);--text-flash-line-offset: .6px;--text-flash-easing: cubic-bezier(.19, 1, .22, 1);--text-flash-hover-text-color: var(--264d960b);position:relative;display:inline-flex;transition:.5s}.text-flash:before,.text-flash:after{position:absolute;content:"";left:0;bottom:calc((var(--text-flash-line-height) + var(--text-flash-line-offset)) * -1);display:block;width:100%;height:var(--text-flash-line-height);background:var(--text-flash-line-color);transition:1.1s var(--text-flash-easing)}.text-flash:before{transform:scaleX(0);transform-origin:left}.text-flash:after{transform-origin:right;transition-delay:.25s}.text-flash:hover{color:var(--text-flash-hover-text-color)}.text-flash:hover:before{transform:scaleX(1);transition-delay:.25s}.text-flash:hover:after{transform:scaleX(0);transition-delay:0s}
`, Qn = (t, e) => {
  const n = t.__vccOpts || t;
  for (const [r, i] of e)
    n[r] = i;
  return n;
}, Cd = /* @__PURE__ */ Qn(Td, [["styles", [Dd]]]), Pd = /* @__PURE__ */ Xn(Cd);
function Sd(t = "text-flash") {
  customElements.define(t, Pd);
}
function Na(t) {
  return wl() ? (Uu(t), !0) : !1;
}
function wa(t) {
  return typeof t == "function" ? t() : jl(t);
}
const Vd = typeof window < "u" && typeof document < "u", Md = Object.prototype.toString, Rd = (t) => Md.call(t) === "[object Object]", kd = () => {
};
function Ad(t, e = !0) {
  Gs() ? Yn(t) : e ? t() : Bs(t);
}
function Ln(t) {
  var e;
  const n = wa(t);
  return (e = n == null ? void 0 : n.$el) != null ? e : n;
}
const Di = Vd ? window : void 0;
function tn(...t) {
  let e, n, r, i;
  if (typeof t[0] == "string" || Array.isArray(t[0]) ? ([n, r, i] = t, e = Di) : [e, n, r, i] = t, !e)
    return kd;
  Array.isArray(n) || (n = [n]), Array.isArray(r) || (r = [r]);
  const s = [], o = () => {
    s.forEach((c) => c()), s.length = 0;
  }, l = (c, f, d, _) => (c.addEventListener(f, d, _), () => c.removeEventListener(f, d, _)), a = an(
    () => [Ln(e), wa(i)],
    ([c, f]) => {
      if (o(), !c)
        return;
      const d = Rd(f) ? { ...f } : f;
      s.push(
        ...n.flatMap((_) => r.map((g) => l(c, _, g, d)))
      );
    },
    { immediate: !0, flush: "post" }
  ), u = () => {
    a(), o();
  };
  return Na(u), u;
}
function Id() {
  const t = se(!1);
  return Gs() && Yn(() => {
    t.value = !0;
  }), t;
}
function Fd(t) {
  const e = Id();
  return qe(() => (e.value, !!t()));
}
function $d(t, e, n = {}) {
  const { window: r = Di, ...i } = n;
  let s;
  const o = Fd(() => r && "ResizeObserver" in r), l = () => {
    s && (s.disconnect(), s = void 0);
  }, a = qe(() => Array.isArray(t) ? t.map((f) => Ln(f)) : [Ln(t)]), u = an(
    a,
    (f) => {
      if (l(), o.value && r) {
        s = new ResizeObserver(e);
        for (const d of f)
          d && s.observe(d, i);
      }
    },
    { immediate: !0, flush: "post", deep: !0 }
  ), c = () => {
    l(), u();
  };
  return Na(c), {
    isSupported: o,
    stop: c
  };
}
function Ld(t, e = {}) {
  const {
    reset: n = !0,
    windowResize: r = !0,
    windowScroll: i = !0,
    immediate: s = !0
  } = e, o = se(0), l = se(0), a = se(0), u = se(0), c = se(0), f = se(0), d = se(0), _ = se(0);
  function g() {
    const p = Ln(t);
    if (!p) {
      n && (o.value = 0, l.value = 0, a.value = 0, u.value = 0, c.value = 0, f.value = 0, d.value = 0, _.value = 0);
      return;
    }
    const y = p.getBoundingClientRect();
    o.value = y.height, l.value = y.bottom, a.value = y.left, u.value = y.right, c.value = y.top, f.value = y.width, d.value = y.x, _.value = y.y;
  }
  return $d(t, g), an(() => Ln(t), (p) => !p && g()), i && tn("scroll", g, { capture: !0, passive: !0 }), r && tn("resize", g, { passive: !0 }), Ad(() => {
    s && g();
  }), {
    height: o,
    bottom: l,
    left: a,
    right: u,
    top: c,
    width: f,
    x: d,
    y: _,
    update: g
  };
}
const zd = {
  page: (t) => [t.pageX, t.pageY],
  client: (t) => [t.clientX, t.clientY],
  screen: (t) => [t.screenX, t.screenY],
  movement: (t) => t instanceof Touch ? null : [t.movementX, t.movementY]
};
function Bd(t = {}) {
  const {
    type: e = "page",
    touch: n = !0,
    resetOnTouchEnds: r = !1,
    initialValue: i = { x: 0, y: 0 },
    window: s = Di,
    target: o = s,
    scroll: l = !0,
    eventFilter: a
  } = t;
  let u = null;
  const c = se(i.x), f = se(i.y), d = se(null), _ = typeof e == "function" ? e : zd[e], g = (v) => {
    const V = _(v);
    u = v, V && ([c.value, f.value] = V, d.value = "mouse");
  }, p = (v) => {
    if (v.touches.length > 0) {
      const V = _(v.touches[0]);
      V && ([c.value, f.value] = V, d.value = "touch");
    }
  }, y = () => {
    if (!u || !s)
      return;
    const v = _(u);
    u instanceof MouseEvent && v && (c.value = v[0] + s.scrollX, f.value = v[1] + s.scrollY);
  }, E = () => {
    c.value = i.x, f.value = i.y;
  }, O = a ? (v) => a(() => g(v), {}) : (v) => g(v), b = a ? (v) => a(() => p(v), {}) : (v) => p(v), T = a ? () => a(() => y(), {}) : () => y();
  if (o) {
    const v = { passive: !0 };
    tn(o, ["mousemove", "dragover"], O, v), n && e !== "movement" && (tn(o, ["touchstart", "touchmove"], b, v), r && tn(o, "touchend", E, v)), l && e === "page" && tn(s, "scroll", T, { passive: !0 });
  }
  return {
    x: c,
    y: f,
    sourceType: d
  };
}
function jd(t, e = {}) {
  const {
    handleOutside: n = !0,
    window: r = Di
  } = e, { x: i, y: s, sourceType: o } = Bd(e), l = se(t ?? (r == null ? void 0 : r.document.body)), a = se(0), u = se(0), c = se(0), f = se(0), d = se(0), _ = se(0), g = se(!0);
  let p = () => {
  };
  return r && (p = an(
    [l, i, s],
    () => {
      const y = Ln(l);
      if (!y)
        return;
      const {
        left: E,
        top: O,
        width: b,
        height: T
      } = y.getBoundingClientRect();
      c.value = E + r.pageXOffset, f.value = O + r.pageYOffset, d.value = T, _.value = b;
      const v = i.value - c.value, V = s.value - f.value;
      g.value = b === 0 || T === 0 || v < 0 || V < 0 || v > b || V > T, (n || !g.value) && (a.value = v, u.value = V);
    },
    { immediate: !0 }
  ), tn(document, "mouseleave", () => {
    g.value = !0;
  })), {
    x: i,
    y: s,
    sourceType: o,
    elementX: a,
    elementY: u,
    elementPositionX: c,
    elementPositionY: f,
    elementHeight: d,
    elementWidth: _,
    isOutside: g,
    stop: p
  };
}
const Ud = /* @__PURE__ */ xn({
  __name: "MagnetMouse",
  props: {
    threshold: { default: 100 },
    transitionDuration: { default: 0.3 },
    strength: { default: 0.45 }
  },
  setup(t) {
    qn((O) => ({
      "5d55d048": n.value
    }));
    const e = t, n = qe(() => `${e.transitionDuration}s`), r = se(null), { x: i, y: s } = jd(r), { left: o, top: l, width: a, height: u } = Ld(r), c = qe(() => o.value + a.value / 2), f = qe(() => l.value + u.value / 2), d = qe(() => c.value - i.value), _ = qe(() => f.value - s.value), g = qe(() => Math.hypot(d.value, _.value)), p = qe(() => g.value < e.threshold), y = qe(() => -e.strength * Math.floor(d.value)), E = qe(() => -e.strength * Math.floor(_.value));
    return (O, b) => (bn(), Kn("div", {
      class: "magnet-mouse",
      ref_key: "target",
      ref: r,
      style: mi({
        "--magnet-mouse-x": `${p.value ? y.value : 0}px`,
        "--magnet-mouse-y": `${p.value ? E.value : 0}px`
      })
    }, [
      Ks(O.$slots, "default")
    ], 4));
  }
}), Hd = `.magnet-mouse{--magnet-mouse-x: 0;--magnet-mouse-y: 0;--magnet-mouse-transition-duration: var(--5d55d048);display:inline-flex;transform:translate(var(--magnet-mouse-x),var(--magnet-mouse-y));transition:var(--magnet-mouse-transition-duration)}
`, Wd = /* @__PURE__ */ Qn(Ud, [["styles", [Hd]]]), Yd = /* @__PURE__ */ Xn(Wd);
function Kd(t = "magnet-mouse") {
  customElements.define(t, Yd);
}
const Xd = /* @__PURE__ */ xn({
  __name: "TextBlink",
  props: {
    text: {},
    textColor: { default: "white" },
    textSize: { default: "1rem" },
    textWeight: { default: "normal" },
    textFont: { default: "" },
    textLeading: { default: "normal" },
    textStyle: { default: "normal" },
    textWhiteSpace: { default: "normal" }
  },
  setup(t) {
    qn((r) => ({
      "00c7d7e0": r.textColor,
      c6299c98: r.textSize,
      "1578f36b": r.textWeight,
      c63543fc: r.textFont,
      "534ed873": r.textLeading,
      "0080025e": r.textStyle,
      "656e65d0": r.textWhiteSpace
    }));
    const e = t, n = se(null);
    return Yn(() => {
      const r = e.text;
      if (n.value && r) {
        let i = r.split("");
        n.value.textContent = "", i == null || i.forEach((s, o) => {
          var f;
          o += 1;
          let l = document.createElement("span"), a = o / 20;
          o % 2 === 0 ? a -= 0.1 : a += 0.05;
          let u = document.createElement("span");
          u.textContent = s, u.style.transitionDelay = `${a}s`, u.classList.add("out"), l.append(u);
          let c = document.createElement("span");
          c.textContent = s, c.style.transitionDelay = `${a}s`, c.classList.add("in"), l.append(c), (f = n.value) == null || f.append(l);
        });
      }
    }), (r, i) => (bn(), Kn("div", {
      class: "text-blink",
      ref_key: "parent",
      ref: n
    }, null, 512));
  }
}), qd = `.text-blink{--text-blink-color: var(--00c7d7e0);--text-blink-size: var(--c6299c98);--text-blink-weight: var(--1578f36b);--text-blink-font: var(--c63543fc);--text-blink-leading: var(--534ed873);--text-blink-style: var(--0080025e);--text-blink-white-space: var(--656e65d0);display:flex}.text-blink span{position:relative;overflow:hidden;transition:.6s;color:var(--text-blink-color);font-size:var(--text-blink-size);font-weight:var(--text-blink-weight);font-family:var(--text-blink-font);line-height:var(--text-blink-leading);font-style:var(--text-blink-style);white-space:var(--text-blink-white-space)}.text-blink span .out{display:inline-flex}.text-blink span .in{position:absolute;left:0;opacity:0;transform:translate(100%)}.text-blink:hover span .out{opacity:0;transform:translate(-100%)}.text-blink:hover span .in{opacity:1;transform:translate(0)}
`, Qd = /* @__PURE__ */ Qn(Xd, [["styles", [qd]]]), Jd = /* @__PURE__ */ Xn(Qd);
function Zd(t = "text-blink") {
  customElements.define(t, Jd);
}
function wt(t) {
  if (t === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return t;
}
function Ta(t, e) {
  t.prototype = Object.create(e.prototype), t.prototype.constructor = t, t.__proto__ = e;
}
/*!
 * GSAP 3.12.2
 * https://greensock.com
 *
 * @license Copyright 2008-2023, GreenSock. All rights reserved.
 * Subject to the terms at https://greensock.com/standard-license or for
 * Club GreenSock members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/
var Ye = {
  autoSleep: 120,
  force3D: "auto",
  nullTargetWarn: 1,
  units: {
    lineHeight: ""
  }
}, zn = {
  duration: 0.5,
  overwrite: !1,
  delay: 0
}, ro, Ce, de, Je = 1e8, ie = 1 / Je, hs = Math.PI * 2, Gd = hs / 4, eh = 0, Da = Math.sqrt, th = Math.cos, nh = Math.sin, be = function(e) {
  return typeof e == "string";
}, he = function(e) {
  return typeof e == "function";
}, Pt = function(e) {
  return typeof e == "number";
}, io = function(e) {
  return typeof e > "u";
}, xt = function(e) {
  return typeof e == "object";
}, Ie = function(e) {
  return e !== !1;
}, so = function() {
  return typeof window < "u";
}, Lr = function(e) {
  return he(e) || be(e);
}, Ca = typeof ArrayBuffer == "function" && ArrayBuffer.isView || function() {
}, Pe = Array.isArray, ps = /(?:-?\.?\d|\.)+/gi, Pa = /[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g, Sn = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g, Li = /[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi, Sa = /[+-]=-?[.\d]+/, Va = /[^,'"\[\]\s]+/gi, rh = /^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i, ce, Qe, _s, oo, Ke = {}, si = {}, Ma, Ra = function(e) {
  return (si = gn(e, Ke)) && Le;
}, lo = function(e, n) {
  return console.warn("Invalid property", e, "set to", n, "Missing plugin? gsap.registerPlugin()");
}, oi = function(e, n) {
  return !n && console.warn(e);
}, ka = function(e, n) {
  return e && (Ke[e] = n) && si && (si[e] = n) || Ke;
}, br = function() {
  return 0;
}, ih = {
  suppressEvents: !0,
  isStart: !0,
  kill: !1
}, Yr = {
  suppressEvents: !0,
  kill: !1
}, sh = {
  suppressEvents: !0
}, ao = {}, zt = [], ms = {}, Aa, je = {}, zi = {}, ll = 30, Kr = [], uo = "", co = function(e) {
  var n = e[0], r, i;
  if (xt(n) || he(n) || (e = [e]), !(r = (n._gsap || {}).harness)) {
    for (i = Kr.length; i-- && !Kr[i].targetTest(n); )
      ;
    r = Kr[i];
  }
  for (i = e.length; i--; )
    e[i] && (e[i]._gsap || (e[i]._gsap = new su(e[i], r))) || e.splice(i, 1);
  return e;
}, fn = function(e) {
  return e._gsap || co(Ze(e))[0]._gsap;
}, Ia = function(e, n, r) {
  return (r = e[n]) && he(r) ? e[n]() : io(r) && e.getAttribute && e.getAttribute(n) || r;
}, Fe = function(e, n) {
  return (e = e.split(",")).forEach(n) || e;
}, pe = function(e) {
  return Math.round(e * 1e5) / 1e5 || 0;
}, Ee = function(e) {
  return Math.round(e * 1e7) / 1e7 || 0;
}, An = function(e, n) {
  var r = n.charAt(0), i = parseFloat(n.substr(2));
  return e = parseFloat(e), r === "+" ? e + i : r === "-" ? e - i : r === "*" ? e * i : e / i;
}, oh = function(e, n) {
  for (var r = n.length, i = 0; e.indexOf(n[i]) < 0 && ++i < r; )
    ;
  return i < r;
}, li = function() {
  var e = zt.length, n = zt.slice(0), r, i;
  for (ms = {}, zt.length = 0, r = 0; r < e; r++)
    i = n[r], i && i._lazy && (i.render(i._lazy[0], i._lazy[1], !0)._lazy = 0);
}, Fa = function(e, n, r, i) {
  zt.length && !Ce && li(), e.render(n, r, i || Ce && n < 0 && (e._initted || e._startAt)), zt.length && !Ce && li();
}, $a = function(e) {
  var n = parseFloat(e);
  return (n || n === 0) && (e + "").match(Va).length < 2 ? n : be(e) ? e.trim() : e;
}, La = function(e) {
  return e;
}, tt = function(e, n) {
  for (var r in n)
    r in e || (e[r] = n[r]);
  return e;
}, lh = function(e) {
  return function(n, r) {
    for (var i in r)
      i in n || i === "duration" && e || i === "ease" || (n[i] = r[i]);
  };
}, gn = function(e, n) {
  for (var r in n)
    e[r] = n[r];
  return e;
}, al = function t(e, n) {
  for (var r in n)
    r !== "__proto__" && r !== "constructor" && r !== "prototype" && (e[r] = xt(n[r]) ? t(e[r] || (e[r] = {}), n[r]) : n[r]);
  return e;
}, ai = function(e, n) {
  var r = {}, i;
  for (i in e)
    i in n || (r[i] = e[i]);
  return r;
}, dr = function(e) {
  var n = e.parent || ce, r = e.keyframes ? lh(Pe(e.keyframes)) : tt;
  if (Ie(e.inherit))
    for (; n; )
      r(e, n.vars.defaults), n = n.parent || n._dp;
  return e;
}, ah = function(e, n) {
  for (var r = e.length, i = r === n.length; i && r-- && e[r] === n[r]; )
    ;
  return r < 0;
}, za = function(e, n, r, i, s) {
  r === void 0 && (r = "_first"), i === void 0 && (i = "_last");
  var o = e[i], l;
  if (s)
    for (l = n[s]; o && o[s] > l; )
      o = o._prev;
  return o ? (n._next = o._next, o._next = n) : (n._next = e[r], e[r] = n), n._next ? n._next._prev = n : e[i] = n, n._prev = o, n.parent = n._dp = e, n;
}, Ci = function(e, n, r, i) {
  r === void 0 && (r = "_first"), i === void 0 && (i = "_last");
  var s = n._prev, o = n._next;
  s ? s._next = o : e[r] === n && (e[r] = o), o ? o._prev = s : e[i] === n && (e[i] = s), n._next = n._prev = n.parent = null;
}, Wt = function(e, n) {
  e.parent && (!n || e.parent.autoRemoveChildren) && e.parent.remove && e.parent.remove(e), e._act = 0;
}, dn = function(e, n) {
  if (e && (!n || n._end > e._dur || n._start < 0))
    for (var r = e; r; )
      r._dirty = 1, r = r.parent;
  return e;
}, uh = function(e) {
  for (var n = e.parent; n && n.parent; )
    n._dirty = 1, n.totalDuration(), n = n.parent;
  return e;
}, gs = function(e, n, r, i) {
  return e._startAt && (Ce ? e._startAt.revert(Yr) : e.vars.immediateRender && !e.vars.autoRevert || e._startAt.render(n, !0, i));
}, ch = function t(e) {
  return !e || e._ts && t(e.parent);
}, ul = function(e) {
  return e._repeat ? Bn(e._tTime, e = e.duration() + e._rDelay) * e : 0;
}, Bn = function(e, n) {
  var r = Math.floor(e /= n);
  return e && r === e ? r - 1 : r;
}, ui = function(e, n) {
  return (e - n._start) * n._ts + (n._ts >= 0 ? 0 : n._dirty ? n.totalDuration() : n._tDur);
}, Pi = function(e) {
  return e._end = Ee(e._start + (e._tDur / Math.abs(e._ts || e._rts || ie) || 0));
}, Si = function(e, n) {
  var r = e._dp;
  return r && r.smoothChildTiming && e._ts && (e._start = Ee(r._time - (e._ts > 0 ? n / e._ts : ((e._dirty ? e.totalDuration() : e._tDur) - n) / -e._ts)), Pi(e), r._dirty || dn(r, e)), e;
}, Ba = function(e, n) {
  var r;
  if ((n._time || !n._dur && n._initted || n._start < e._time && (n._dur || !n.add)) && (r = ui(e.rawTime(), n), (!n._dur || Vr(0, n.totalDuration(), r) - n._tTime > ie) && n.render(r, !0)), dn(e, n)._dp && e._initted && e._time >= e._dur && e._ts) {
    if (e._dur < e.duration())
      for (r = e; r._dp; )
        r.rawTime() >= 0 && r.totalTime(r._tTime), r = r._dp;
    e._zTime = -ie;
  }
}, _t = function(e, n, r, i) {
  return n.parent && Wt(n), n._start = Ee((Pt(r) ? r : r || e !== ce ? Xe(e, r, n) : e._time) + n._delay), n._end = Ee(n._start + (n.totalDuration() / Math.abs(n.timeScale()) || 0)), za(e, n, "_first", "_last", e._sort ? "_start" : 0), vs(n) || (e._recent = n), i || Ba(e, n), e._ts < 0 && Si(e, e._tTime), e;
}, ja = function(e, n) {
  return (Ke.ScrollTrigger || lo("scrollTrigger", n)) && Ke.ScrollTrigger.create(n, e);
}, Ua = function(e, n, r, i, s) {
  if (ho(e, n, s), !e._initted)
    return 1;
  if (!r && e._pt && !Ce && (e._dur && e.vars.lazy !== !1 || !e._dur && e.vars.lazy) && Aa !== We.frame)
    return zt.push(e), e._lazy = [s, i], 1;
}, fh = function t(e) {
  var n = e.parent;
  return n && n._ts && n._initted && !n._lock && (n.rawTime() < 0 || t(n));
}, vs = function(e) {
  var n = e.data;
  return n === "isFromStart" || n === "isStart";
}, dh = function(e, n, r, i) {
  var s = e.ratio, o = n < 0 || !n && (!e._start && fh(e) && !(!e._initted && vs(e)) || (e._ts < 0 || e._dp._ts < 0) && !vs(e)) ? 0 : 1, l = e._rDelay, a = 0, u, c, f;
  if (l && e._repeat && (a = Vr(0, e._tDur, n), c = Bn(a, l), e._yoyo && c & 1 && (o = 1 - o), c !== Bn(e._tTime, l) && (s = 1 - o, e.vars.repeatRefresh && e._initted && e.invalidate())), o !== s || Ce || i || e._zTime === ie || !n && e._zTime) {
    if (!e._initted && Ua(e, n, i, r, a))
      return;
    for (f = e._zTime, e._zTime = n || (r ? ie : 0), r || (r = n && !f), e.ratio = o, e._from && (o = 1 - o), e._time = 0, e._tTime = a, u = e._pt; u; )
      u.r(o, u.d), u = u._next;
    n < 0 && gs(e, n, r, !0), e._onUpdate && !r && Ge(e, "onUpdate"), a && e._repeat && !r && e.parent && Ge(e, "onRepeat"), (n >= e._tDur || n < 0) && e.ratio === o && (o && Wt(e, 1), !r && !Ce && (Ge(e, o ? "onComplete" : "onReverseComplete", !0), e._prom && e._prom()));
  } else
    e._zTime || (e._zTime = n);
}, hh = function(e, n, r) {
  var i;
  if (r > n)
    for (i = e._first; i && i._start <= r; ) {
      if (i.data === "isPause" && i._start > n)
        return i;
      i = i._next;
    }
  else
    for (i = e._last; i && i._start >= r; ) {
      if (i.data === "isPause" && i._start < n)
        return i;
      i = i._prev;
    }
}, jn = function(e, n, r, i) {
  var s = e._repeat, o = Ee(n) || 0, l = e._tTime / e._tDur;
  return l && !i && (e._time *= o / e._dur), e._dur = o, e._tDur = s ? s < 0 ? 1e10 : Ee(o * (s + 1) + e._rDelay * s) : o, l > 0 && !i && Si(e, e._tTime = e._tDur * l), e.parent && Pi(e), r || dn(e.parent, e), e;
}, cl = function(e) {
  return e instanceof Ae ? dn(e) : jn(e, e._dur);
}, ph = {
  _start: 0,
  endTime: br,
  totalDuration: br
}, Xe = function t(e, n, r) {
  var i = e.labels, s = e._recent || ph, o = e.duration() >= Je ? s.endTime(!1) : e._dur, l, a, u;
  return be(n) && (isNaN(n) || n in i) ? (a = n.charAt(0), u = n.substr(-1) === "%", l = n.indexOf("="), a === "<" || a === ">" ? (l >= 0 && (n = n.replace(/=/, "")), (a === "<" ? s._start : s.endTime(s._repeat >= 0)) + (parseFloat(n.substr(1)) || 0) * (u ? (l < 0 ? s : r).totalDuration() / 100 : 1)) : l < 0 ? (n in i || (i[n] = o), i[n]) : (a = parseFloat(n.charAt(l - 1) + n.substr(l + 1)), u && r && (a = a / 100 * (Pe(r) ? r[0] : r).totalDuration()), l > 1 ? t(e, n.substr(0, l - 1), r) + a : o + a)) : n == null ? o : +n;
}, hr = function(e, n, r) {
  var i = Pt(n[1]), s = (i ? 2 : 1) + (e < 2 ? 0 : 1), o = n[s], l, a;
  if (i && (o.duration = n[1]), o.parent = r, e) {
    for (l = o, a = r; a && !("immediateRender" in l); )
      l = a.vars.defaults || {}, a = Ie(a.vars.inherit) && a.parent;
    o.immediateRender = Ie(l.immediateRender), e < 2 ? o.runBackwards = 1 : o.startAt = n[s - 1];
  }
  return new me(n[0], o, n[s + 1]);
}, Kt = function(e, n) {
  return e || e === 0 ? n(e) : n;
}, Vr = function(e, n, r) {
  return r < e ? e : r > n ? n : r;
}, De = function(e, n) {
  return !be(e) || !(n = rh.exec(e)) ? "" : n[1];
}, _h = function(e, n, r) {
  return Kt(r, function(i) {
    return Vr(e, n, i);
  });
}, ys = [].slice, Ha = function(e, n) {
  return e && xt(e) && "length" in e && (!n && !e.length || e.length - 1 in e && xt(e[0])) && !e.nodeType && e !== Qe;
}, mh = function(e, n, r) {
  return r === void 0 && (r = []), e.forEach(function(i) {
    var s;
    return be(i) && !n || Ha(i, 1) ? (s = r).push.apply(s, Ze(i)) : r.push(i);
  }) || r;
}, Ze = function(e, n, r) {
  return de && !n && de.selector ? de.selector(e) : be(e) && !r && (_s || !Un()) ? ys.call((n || oo).querySelectorAll(e), 0) : Pe(e) ? mh(e, r) : Ha(e) ? ys.call(e, 0) : e ? [e] : [];
}, xs = function(e) {
  return e = Ze(e)[0] || oi("Invalid scope") || {}, function(n) {
    var r = e.current || e.nativeElement || e;
    return Ze(n, r.querySelectorAll ? r : r === e ? oi("Invalid scope") || oo.createElement("div") : e);
  };
}, Wa = function(e) {
  return e.sort(function() {
    return 0.5 - Math.random();
  });
}, Ya = function(e) {
  if (he(e))
    return e;
  var n = xt(e) ? e : {
    each: e
  }, r = hn(n.ease), i = n.from || 0, s = parseFloat(n.base) || 0, o = {}, l = i > 0 && i < 1, a = isNaN(i) || l, u = n.axis, c = i, f = i;
  return be(i) ? c = f = {
    center: 0.5,
    edges: 0.5,
    end: 1
  }[i] || 0 : !l && a && (c = i[0], f = i[1]), function(d, _, g) {
    var p = (g || n).length, y = o[p], E, O, b, T, v, V, A, R, C;
    if (!y) {
      if (C = n.grid === "auto" ? 0 : (n.grid || [1, Je])[1], !C) {
        for (A = -Je; A < (A = g[C++].getBoundingClientRect().left) && C < p; )
          ;
        C--;
      }
      for (y = o[p] = [], E = a ? Math.min(C, p) * c - 0.5 : i % C, O = C === Je ? 0 : a ? p * f / C - 0.5 : i / C | 0, A = 0, R = Je, V = 0; V < p; V++)
        b = V % C - E, T = O - (V / C | 0), y[V] = v = u ? Math.abs(u === "y" ? T : b) : Da(b * b + T * T), v > A && (A = v), v < R && (R = v);
      i === "random" && Wa(y), y.max = A - R, y.min = R, y.v = p = (parseFloat(n.amount) || parseFloat(n.each) * (C > p ? p - 1 : u ? u === "y" ? p / C : C : Math.max(C, p / C)) || 0) * (i === "edges" ? -1 : 1), y.b = p < 0 ? s - p : s, y.u = De(n.amount || n.each) || 0, r = r && p < 0 ? nu(r) : r;
    }
    return p = (y[d] - y.min) / y.max || 0, Ee(y.b + (r ? r(p) : p) * y.v) + y.u;
  };
}, bs = function(e) {
  var n = Math.pow(10, ((e + "").split(".")[1] || "").length);
  return function(r) {
    var i = Ee(Math.round(parseFloat(r) / e) * e * n);
    return (i - i % 1) / n + (Pt(r) ? 0 : De(r));
  };
}, Ka = function(e, n) {
  var r = Pe(e), i, s;
  return !r && xt(e) && (i = r = e.radius || Je, e.values ? (e = Ze(e.values), (s = !Pt(e[0])) && (i *= i)) : e = bs(e.increment)), Kt(n, r ? he(e) ? function(o) {
    return s = e(o), Math.abs(s - o) <= i ? s : o;
  } : function(o) {
    for (var l = parseFloat(s ? o.x : o), a = parseFloat(s ? o.y : 0), u = Je, c = 0, f = e.length, d, _; f--; )
      s ? (d = e[f].x - l, _ = e[f].y - a, d = d * d + _ * _) : d = Math.abs(e[f] - l), d < u && (u = d, c = f);
    return c = !i || u <= i ? e[c] : o, s || c === o || Pt(o) ? c : c + De(o);
  } : bs(e));
}, Xa = function(e, n, r, i) {
  return Kt(Pe(e) ? !n : r === !0 ? !!(r = 0) : !i, function() {
    return Pe(e) ? e[~~(Math.random() * e.length)] : (r = r || 1e-5) && (i = r < 1 ? Math.pow(10, (r + "").length - 2) : 1) && Math.floor(Math.round((e - r / 2 + Math.random() * (n - e + r * 0.99)) / r) * r * i) / i;
  });
}, gh = function() {
  for (var e = arguments.length, n = new Array(e), r = 0; r < e; r++)
    n[r] = arguments[r];
  return function(i) {
    return n.reduce(function(s, o) {
      return o(s);
    }, i);
  };
}, vh = function(e, n) {
  return function(r) {
    return e(parseFloat(r)) + (n || De(r));
  };
}, yh = function(e, n, r) {
  return Qa(e, n, 0, 1, r);
}, qa = function(e, n, r) {
  return Kt(r, function(i) {
    return e[~~n(i)];
  });
}, xh = function t(e, n, r) {
  var i = n - e;
  return Pe(e) ? qa(e, t(0, e.length), n) : Kt(r, function(s) {
    return (i + (s - e) % i) % i + e;
  });
}, bh = function t(e, n, r) {
  var i = n - e, s = i * 2;
  return Pe(e) ? qa(e, t(0, e.length - 1), n) : Kt(r, function(o) {
    return o = (s + (o - e) % s) % s || 0, e + (o > i ? s - o : o);
  });
}, Er = function(e) {
  for (var n = 0, r = "", i, s, o, l; ~(i = e.indexOf("random(", n)); )
    o = e.indexOf(")", i), l = e.charAt(i + 7) === "[", s = e.substr(i + 7, o - i - 7).match(l ? Va : ps), r += e.substr(n, i - n) + Xa(l ? s : +s[0], l ? 0 : +s[1], +s[2] || 1e-5), n = o + 1;
  return r + e.substr(n, e.length - n);
}, Qa = function(e, n, r, i, s) {
  var o = n - e, l = i - r;
  return Kt(s, function(a) {
    return r + ((a - e) / o * l || 0);
  });
}, Eh = function t(e, n, r, i) {
  var s = isNaN(e + n) ? 0 : function(_) {
    return (1 - _) * e + _ * n;
  };
  if (!s) {
    var o = be(e), l = {}, a, u, c, f, d;
    if (r === !0 && (i = 1) && (r = null), o)
      e = {
        p: e
      }, n = {
        p: n
      };
    else if (Pe(e) && !Pe(n)) {
      for (c = [], f = e.length, d = f - 2, u = 1; u < f; u++)
        c.push(t(e[u - 1], e[u]));
      f--, s = function(g) {
        g *= f;
        var p = Math.min(d, ~~g);
        return c[p](g - p);
      }, r = n;
    } else
      i || (e = gn(Pe(e) ? [] : {}, e));
    if (!c) {
      for (a in n)
        fo.call(l, e, a, "get", n[a]);
      s = function(g) {
        return mo(g, l) || (o ? e.p : e);
      };
    }
  }
  return Kt(r, s);
}, fl = function(e, n, r) {
  var i = e.labels, s = Je, o, l, a;
  for (o in i)
    l = i[o] - n, l < 0 == !!r && l && s > (l = Math.abs(l)) && (a = o, s = l);
  return a;
}, Ge = function(e, n, r) {
  var i = e.vars, s = i[n], o = de, l = e._ctx, a, u, c;
  if (s)
    return a = i[n + "Params"], u = i.callbackScope || e, r && zt.length && li(), l && (de = l), c = a ? s.apply(u, a) : s.call(u), de = o, c;
}, or = function(e) {
  return Wt(e), e.scrollTrigger && e.scrollTrigger.kill(!!Ce), e.progress() < 1 && Ge(e, "onInterrupt"), e;
}, Vn, Ja = [], Za = function(e) {
  if (so() && e) {
    e = !e.name && e.default || e;
    var n = e.name, r = he(e), i = n && !r && e.init ? function() {
      this._props = [];
    } : e, s = {
      init: br,
      render: mo,
      add: fo,
      kill: $h,
      modifier: Fh,
      rawVars: 0
    }, o = {
      targetTest: 0,
      get: 0,
      getSetter: _o,
      aliases: {},
      register: 0
    };
    if (Un(), e !== i) {
      if (je[n])
        return;
      tt(i, tt(ai(e, s), o)), gn(i.prototype, gn(s, ai(e, o))), je[i.prop = n] = i, e.targetTest && (Kr.push(i), ao[n] = 1), n = (n === "css" ? "CSS" : n.charAt(0).toUpperCase() + n.substr(1)) + "Plugin";
    }
    ka(n, i), e.register && e.register(Le, i, $e);
  } else
    e && Ja.push(e);
}, ne = 255, lr = {
  aqua: [0, ne, ne],
  lime: [0, ne, 0],
  silver: [192, 192, 192],
  black: [0, 0, 0],
  maroon: [128, 0, 0],
  teal: [0, 128, 128],
  blue: [0, 0, ne],
  navy: [0, 0, 128],
  white: [ne, ne, ne],
  olive: [128, 128, 0],
  yellow: [ne, ne, 0],
  orange: [ne, 165, 0],
  gray: [128, 128, 128],
  purple: [128, 0, 128],
  green: [0, 128, 0],
  red: [ne, 0, 0],
  pink: [ne, 192, 203],
  cyan: [0, ne, ne],
  transparent: [ne, ne, ne, 0]
}, Bi = function(e, n, r) {
  return e += e < 0 ? 1 : e > 1 ? -1 : 0, (e * 6 < 1 ? n + (r - n) * e * 6 : e < 0.5 ? r : e * 3 < 2 ? n + (r - n) * (2 / 3 - e) * 6 : n) * ne + 0.5 | 0;
}, Ga = function(e, n, r) {
  var i = e ? Pt(e) ? [e >> 16, e >> 8 & ne, e & ne] : 0 : lr.black, s, o, l, a, u, c, f, d, _, g;
  if (!i) {
    if (e.substr(-1) === "," && (e = e.substr(0, e.length - 1)), lr[e])
      i = lr[e];
    else if (e.charAt(0) === "#") {
      if (e.length < 6 && (s = e.charAt(1), o = e.charAt(2), l = e.charAt(3), e = "#" + s + s + o + o + l + l + (e.length === 5 ? e.charAt(4) + e.charAt(4) : "")), e.length === 9)
        return i = parseInt(e.substr(1, 6), 16), [i >> 16, i >> 8 & ne, i & ne, parseInt(e.substr(7), 16) / 255];
      e = parseInt(e.substr(1), 16), i = [e >> 16, e >> 8 & ne, e & ne];
    } else if (e.substr(0, 3) === "hsl") {
      if (i = g = e.match(ps), !n)
        a = +i[0] % 360 / 360, u = +i[1] / 100, c = +i[2] / 100, o = c <= 0.5 ? c * (u + 1) : c + u - c * u, s = c * 2 - o, i.length > 3 && (i[3] *= 1), i[0] = Bi(a + 1 / 3, s, o), i[1] = Bi(a, s, o), i[2] = Bi(a - 1 / 3, s, o);
      else if (~e.indexOf("="))
        return i = e.match(Pa), r && i.length < 4 && (i[3] = 1), i;
    } else
      i = e.match(ps) || lr.transparent;
    i = i.map(Number);
  }
  return n && !g && (s = i[0] / ne, o = i[1] / ne, l = i[2] / ne, f = Math.max(s, o, l), d = Math.min(s, o, l), c = (f + d) / 2, f === d ? a = u = 0 : (_ = f - d, u = c > 0.5 ? _ / (2 - f - d) : _ / (f + d), a = f === s ? (o - l) / _ + (o < l ? 6 : 0) : f === o ? (l - s) / _ + 2 : (s - o) / _ + 4, a *= 60), i[0] = ~~(a + 0.5), i[1] = ~~(u * 100 + 0.5), i[2] = ~~(c * 100 + 0.5)), r && i.length < 4 && (i[3] = 1), i;
}, eu = function(e) {
  var n = [], r = [], i = -1;
  return e.split(Bt).forEach(function(s) {
    var o = s.match(Sn) || [];
    n.push.apply(n, o), r.push(i += o.length + 1);
  }), n.c = r, n;
}, dl = function(e, n, r) {
  var i = "", s = (e + i).match(Bt), o = n ? "hsla(" : "rgba(", l = 0, a, u, c, f;
  if (!s)
    return e;
  if (s = s.map(function(d) {
    return (d = Ga(d, n, 1)) && o + (n ? d[0] + "," + d[1] + "%," + d[2] + "%," + d[3] : d.join(",")) + ")";
  }), r && (c = eu(e), a = r.c, a.join(i) !== c.c.join(i)))
    for (u = e.replace(Bt, "1").split(Sn), f = u.length - 1; l < f; l++)
      i += u[l] + (~a.indexOf(l) ? s.shift() || o + "0,0,0,0)" : (c.length ? c : s.length ? s : r).shift());
  if (!u)
    for (u = e.split(Bt), f = u.length - 1; l < f; l++)
      i += u[l] + s[l];
  return i + u[f];
}, Bt = function() {
  var t = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b", e;
  for (e in lr)
    t += "|" + e + "\\b";
  return new RegExp(t + ")", "gi");
}(), Oh = /hsl[a]?\(/, tu = function(e) {
  var n = e.join(" "), r;
  if (Bt.lastIndex = 0, Bt.test(n))
    return r = Oh.test(n), e[1] = dl(e[1], r), e[0] = dl(e[0], r, eu(e[1])), !0;
}, Or, We = function() {
  var t = Date.now, e = 500, n = 33, r = t(), i = r, s = 1e3 / 240, o = s, l = [], a, u, c, f, d, _, g = function p(y) {
    var E = t() - i, O = y === !0, b, T, v, V;
    if (E > e && (r += E - n), i += E, v = i - r, b = v - o, (b > 0 || O) && (V = ++f.frame, d = v - f.time * 1e3, f.time = v = v / 1e3, o += b + (b >= s ? 4 : s - b), T = 1), O || (a = u(p)), T)
      for (_ = 0; _ < l.length; _++)
        l[_](v, d, V, y);
  };
  return f = {
    time: 0,
    frame: 0,
    tick: function() {
      g(!0);
    },
    deltaRatio: function(y) {
      return d / (1e3 / (y || 60));
    },
    wake: function() {
      Ma && (!_s && so() && (Qe = _s = window, oo = Qe.document || {}, Ke.gsap = Le, (Qe.gsapVersions || (Qe.gsapVersions = [])).push(Le.version), Ra(si || Qe.GreenSockGlobals || !Qe.gsap && Qe || {}), c = Qe.requestAnimationFrame, Ja.forEach(Za)), a && f.sleep(), u = c || function(y) {
        return setTimeout(y, o - f.time * 1e3 + 1 | 0);
      }, Or = 1, g(2));
    },
    sleep: function() {
      (c ? Qe.cancelAnimationFrame : clearTimeout)(a), Or = 0, u = br;
    },
    lagSmoothing: function(y, E) {
      e = y || 1 / 0, n = Math.min(E || 33, e);
    },
    fps: function(y) {
      s = 1e3 / (y || 240), o = f.time * 1e3 + s;
    },
    add: function(y, E, O) {
      var b = E ? function(T, v, V, A) {
        y(T, v, V, A), f.remove(b);
      } : y;
      return f.remove(y), l[O ? "unshift" : "push"](b), Un(), b;
    },
    remove: function(y, E) {
      ~(E = l.indexOf(y)) && l.splice(E, 1) && _ >= E && _--;
    },
    _listeners: l
  }, f;
}(), Un = function() {
  return !Or && We.wake();
}, Q = {}, Nh = /^[\d.\-M][\d.\-,\s]/, wh = /["']/g, Th = function(e) {
  for (var n = {}, r = e.substr(1, e.length - 3).split(":"), i = r[0], s = 1, o = r.length, l, a, u; s < o; s++)
    a = r[s], l = s !== o - 1 ? a.lastIndexOf(",") : a.length, u = a.substr(0, l), n[i] = isNaN(u) ? u.replace(wh, "").trim() : +u, i = a.substr(l + 1).trim();
  return n;
}, Dh = function(e) {
  var n = e.indexOf("(") + 1, r = e.indexOf(")"), i = e.indexOf("(", n);
  return e.substring(n, ~i && i < r ? e.indexOf(")", r + 1) : r);
}, Ch = function(e) {
  var n = (e + "").split("("), r = Q[n[0]];
  return r && n.length > 1 && r.config ? r.config.apply(null, ~e.indexOf("{") ? [Th(n[1])] : Dh(e).split(",").map($a)) : Q._CE && Nh.test(e) ? Q._CE("", e) : r;
}, nu = function(e) {
  return function(n) {
    return 1 - e(1 - n);
  };
}, ru = function t(e, n) {
  for (var r = e._first, i; r; )
    r instanceof Ae ? t(r, n) : r.vars.yoyoEase && (!r._yoyo || !r._repeat) && r._yoyo !== n && (r.timeline ? t(r.timeline, n) : (i = r._ease, r._ease = r._yEase, r._yEase = i, r._yoyo = n)), r = r._next;
}, hn = function(e, n) {
  return e && (he(e) ? e : Q[e] || Ch(e)) || n;
}, En = function(e, n, r, i) {
  r === void 0 && (r = function(a) {
    return 1 - n(1 - a);
  }), i === void 0 && (i = function(a) {
    return a < 0.5 ? n(a * 2) / 2 : 1 - n((1 - a) * 2) / 2;
  });
  var s = {
    easeIn: n,
    easeOut: r,
    easeInOut: i
  }, o;
  return Fe(e, function(l) {
    Q[l] = Ke[l] = s, Q[o = l.toLowerCase()] = r;
    for (var a in s)
      Q[o + (a === "easeIn" ? ".in" : a === "easeOut" ? ".out" : ".inOut")] = Q[l + "." + a] = s[a];
  }), s;
}, iu = function(e) {
  return function(n) {
    return n < 0.5 ? (1 - e(1 - n * 2)) / 2 : 0.5 + e((n - 0.5) * 2) / 2;
  };
}, ji = function t(e, n, r) {
  var i = n >= 1 ? n : 1, s = (r || (e ? 0.3 : 0.45)) / (n < 1 ? n : 1), o = s / hs * (Math.asin(1 / i) || 0), l = function(c) {
    return c === 1 ? 1 : i * Math.pow(2, -10 * c) * nh((c - o) * s) + 1;
  }, a = e === "out" ? l : e === "in" ? function(u) {
    return 1 - l(1 - u);
  } : iu(l);
  return s = hs / s, a.config = function(u, c) {
    return t(e, u, c);
  }, a;
}, Ui = function t(e, n) {
  n === void 0 && (n = 1.70158);
  var r = function(o) {
    return o ? --o * o * ((n + 1) * o + n) + 1 : 0;
  }, i = e === "out" ? r : e === "in" ? function(s) {
    return 1 - r(1 - s);
  } : iu(r);
  return i.config = function(s) {
    return t(e, s);
  }, i;
};
Fe("Linear,Quad,Cubic,Quart,Quint,Strong", function(t, e) {
  var n = e < 5 ? e + 1 : e;
  En(t + ",Power" + (n - 1), e ? function(r) {
    return Math.pow(r, n);
  } : function(r) {
    return r;
  }, function(r) {
    return 1 - Math.pow(1 - r, n);
  }, function(r) {
    return r < 0.5 ? Math.pow(r * 2, n) / 2 : 1 - Math.pow((1 - r) * 2, n) / 2;
  });
});
Q.Linear.easeNone = Q.none = Q.Linear.easeIn;
En("Elastic", ji("in"), ji("out"), ji());
(function(t, e) {
  var n = 1 / e, r = 2 * n, i = 2.5 * n, s = function(l) {
    return l < n ? t * l * l : l < r ? t * Math.pow(l - 1.5 / e, 2) + 0.75 : l < i ? t * (l -= 2.25 / e) * l + 0.9375 : t * Math.pow(l - 2.625 / e, 2) + 0.984375;
  };
  En("Bounce", function(o) {
    return 1 - s(1 - o);
  }, s);
})(7.5625, 2.75);
En("Expo", function(t) {
  return t ? Math.pow(2, 10 * (t - 1)) : 0;
});
En("Circ", function(t) {
  return -(Da(1 - t * t) - 1);
});
En("Sine", function(t) {
  return t === 1 ? 1 : -th(t * Gd) + 1;
});
En("Back", Ui("in"), Ui("out"), Ui());
Q.SteppedEase = Q.steps = Ke.SteppedEase = {
  config: function(e, n) {
    e === void 0 && (e = 1);
    var r = 1 / e, i = e + (n ? 0 : 1), s = n ? 1 : 0, o = 1 - ie;
    return function(l) {
      return ((i * Vr(0, o, l) | 0) + s) * r;
    };
  }
};
zn.ease = Q["quad.out"];
Fe("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt", function(t) {
  return uo += t + "," + t + "Params,";
});
var su = function(e, n) {
  this.id = eh++, e._gsap = this, this.target = e, this.harness = n, this.get = n ? n.get : Ia, this.set = n ? n.getSetter : _o;
}, Nr = /* @__PURE__ */ function() {
  function t(n) {
    this.vars = n, this._delay = +n.delay || 0, (this._repeat = n.repeat === 1 / 0 ? -2 : n.repeat || 0) && (this._rDelay = n.repeatDelay || 0, this._yoyo = !!n.yoyo || !!n.yoyoEase), this._ts = 1, jn(this, +n.duration, 1, 1), this.data = n.data, de && (this._ctx = de, de.data.push(this)), Or || We.wake();
  }
  var e = t.prototype;
  return e.delay = function(r) {
    return r || r === 0 ? (this.parent && this.parent.smoothChildTiming && this.startTime(this._start + r - this._delay), this._delay = r, this) : this._delay;
  }, e.duration = function(r) {
    return arguments.length ? this.totalDuration(this._repeat > 0 ? r + (r + this._rDelay) * this._repeat : r) : this.totalDuration() && this._dur;
  }, e.totalDuration = function(r) {
    return arguments.length ? (this._dirty = 0, jn(this, this._repeat < 0 ? r : (r - this._repeat * this._rDelay) / (this._repeat + 1))) : this._tDur;
  }, e.totalTime = function(r, i) {
    if (Un(), !arguments.length)
      return this._tTime;
    var s = this._dp;
    if (s && s.smoothChildTiming && this._ts) {
      for (Si(this, r), !s._dp || s.parent || Ba(s, this); s && s.parent; )
        s.parent._time !== s._start + (s._ts >= 0 ? s._tTime / s._ts : (s.totalDuration() - s._tTime) / -s._ts) && s.totalTime(s._tTime, !0), s = s.parent;
      !this.parent && this._dp.autoRemoveChildren && (this._ts > 0 && r < this._tDur || this._ts < 0 && r > 0 || !this._tDur && !r) && _t(this._dp, this, this._start - this._delay);
    }
    return (this._tTime !== r || !this._dur && !i || this._initted && Math.abs(this._zTime) === ie || !r && !this._initted && (this.add || this._ptLookup)) && (this._ts || (this._pTime = r), Fa(this, r, i)), this;
  }, e.time = function(r, i) {
    return arguments.length ? this.totalTime(Math.min(this.totalDuration(), r + ul(this)) % (this._dur + this._rDelay) || (r ? this._dur : 0), i) : this._time;
  }, e.totalProgress = function(r, i) {
    return arguments.length ? this.totalTime(this.totalDuration() * r, i) : this.totalDuration() ? Math.min(1, this._tTime / this._tDur) : this.ratio;
  }, e.progress = function(r, i) {
    return arguments.length ? this.totalTime(this.duration() * (this._yoyo && !(this.iteration() & 1) ? 1 - r : r) + ul(this), i) : this.duration() ? Math.min(1, this._time / this._dur) : this.ratio;
  }, e.iteration = function(r, i) {
    var s = this.duration() + this._rDelay;
    return arguments.length ? this.totalTime(this._time + (r - 1) * s, i) : this._repeat ? Bn(this._tTime, s) + 1 : 1;
  }, e.timeScale = function(r) {
    if (!arguments.length)
      return this._rts === -ie ? 0 : this._rts;
    if (this._rts === r)
      return this;
    var i = this.parent && this._ts ? ui(this.parent._time, this) : this._tTime;
    return this._rts = +r || 0, this._ts = this._ps || r === -ie ? 0 : this._rts, this.totalTime(Vr(-Math.abs(this._delay), this._tDur, i), !0), Pi(this), uh(this);
  }, e.paused = function(r) {
    return arguments.length ? (this._ps !== r && (this._ps = r, r ? (this._pTime = this._tTime || Math.max(-this._delay, this.rawTime()), this._ts = this._act = 0) : (Un(), this._ts = this._rts, this.totalTime(this.parent && !this.parent.smoothChildTiming ? this.rawTime() : this._tTime || this._pTime, this.progress() === 1 && Math.abs(this._zTime) !== ie && (this._tTime -= ie)))), this) : this._ps;
  }, e.startTime = function(r) {
    if (arguments.length) {
      this._start = r;
      var i = this.parent || this._dp;
      return i && (i._sort || !this.parent) && _t(i, this, r - this._delay), this;
    }
    return this._start;
  }, e.endTime = function(r) {
    return this._start + (Ie(r) ? this.totalDuration() : this.duration()) / Math.abs(this._ts || 1);
  }, e.rawTime = function(r) {
    var i = this.parent || this._dp;
    return i ? r && (!this._ts || this._repeat && this._time && this.totalProgress() < 1) ? this._tTime % (this._dur + this._rDelay) : this._ts ? ui(i.rawTime(r), this) : this._tTime : this._tTime;
  }, e.revert = function(r) {
    r === void 0 && (r = sh);
    var i = Ce;
    return Ce = r, (this._initted || this._startAt) && (this.timeline && this.timeline.revert(r), this.totalTime(-0.01, r.suppressEvents)), this.data !== "nested" && r.kill !== !1 && this.kill(), Ce = i, this;
  }, e.globalTime = function(r) {
    for (var i = this, s = arguments.length ? r : i.rawTime(); i; )
      s = i._start + s / (i._ts || 1), i = i._dp;
    return !this.parent && this._sat ? this._sat.vars.immediateRender ? -1 / 0 : this._sat.globalTime(r) : s;
  }, e.repeat = function(r) {
    return arguments.length ? (this._repeat = r === 1 / 0 ? -2 : r, cl(this)) : this._repeat === -2 ? 1 / 0 : this._repeat;
  }, e.repeatDelay = function(r) {
    if (arguments.length) {
      var i = this._time;
      return this._rDelay = r, cl(this), i ? this.time(i) : this;
    }
    return this._rDelay;
  }, e.yoyo = function(r) {
    return arguments.length ? (this._yoyo = r, this) : this._yoyo;
  }, e.seek = function(r, i) {
    return this.totalTime(Xe(this, r), Ie(i));
  }, e.restart = function(r, i) {
    return this.play().totalTime(r ? -this._delay : 0, Ie(i));
  }, e.play = function(r, i) {
    return r != null && this.seek(r, i), this.reversed(!1).paused(!1);
  }, e.reverse = function(r, i) {
    return r != null && this.seek(r || this.totalDuration(), i), this.reversed(!0).paused(!1);
  }, e.pause = function(r, i) {
    return r != null && this.seek(r, i), this.paused(!0);
  }, e.resume = function() {
    return this.paused(!1);
  }, e.reversed = function(r) {
    return arguments.length ? (!!r !== this.reversed() && this.timeScale(-this._rts || (r ? -ie : 0)), this) : this._rts < 0;
  }, e.invalidate = function() {
    return this._initted = this._act = 0, this._zTime = -ie, this;
  }, e.isActive = function() {
    var r = this.parent || this._dp, i = this._start, s;
    return !!(!r || this._ts && this._initted && r.isActive() && (s = r.rawTime(!0)) >= i && s < this.endTime(!0) - ie);
  }, e.eventCallback = function(r, i, s) {
    var o = this.vars;
    return arguments.length > 1 ? (i ? (o[r] = i, s && (o[r + "Params"] = s), r === "onUpdate" && (this._onUpdate = i)) : delete o[r], this) : o[r];
  }, e.then = function(r) {
    var i = this;
    return new Promise(function(s) {
      var o = he(r) ? r : La, l = function() {
        var u = i.then;
        i.then = null, he(o) && (o = o(i)) && (o.then || o === i) && (i.then = u), s(o), i.then = u;
      };
      i._initted && i.totalProgress() === 1 && i._ts >= 0 || !i._tTime && i._ts < 0 ? l() : i._prom = l;
    });
  }, e.kill = function() {
    or(this);
  }, t;
}();
tt(Nr.prototype, {
  _time: 0,
  _start: 0,
  _end: 0,
  _tTime: 0,
  _tDur: 0,
  _dirty: 0,
  _repeat: 0,
  _yoyo: !1,
  parent: null,
  _initted: !1,
  _rDelay: 0,
  _ts: 1,
  _dp: 0,
  ratio: 0,
  _zTime: -ie,
  _prom: 0,
  _ps: !1,
  _rts: 1
});
var Ae = /* @__PURE__ */ function(t) {
  Ta(e, t);
  function e(r, i) {
    var s;
    return r === void 0 && (r = {}), s = t.call(this, r) || this, s.labels = {}, s.smoothChildTiming = !!r.smoothChildTiming, s.autoRemoveChildren = !!r.autoRemoveChildren, s._sort = Ie(r.sortChildren), ce && _t(r.parent || ce, wt(s), i), r.reversed && s.reverse(), r.paused && s.paused(!0), r.scrollTrigger && ja(wt(s), r.scrollTrigger), s;
  }
  var n = e.prototype;
  return n.to = function(i, s, o) {
    return hr(0, arguments, this), this;
  }, n.from = function(i, s, o) {
    return hr(1, arguments, this), this;
  }, n.fromTo = function(i, s, o, l) {
    return hr(2, arguments, this), this;
  }, n.set = function(i, s, o) {
    return s.duration = 0, s.parent = this, dr(s).repeatDelay || (s.repeat = 0), s.immediateRender = !!s.immediateRender, new me(i, s, Xe(this, o), 1), this;
  }, n.call = function(i, s, o) {
    return _t(this, me.delayedCall(0, i, s), o);
  }, n.staggerTo = function(i, s, o, l, a, u, c) {
    return o.duration = s, o.stagger = o.stagger || l, o.onComplete = u, o.onCompleteParams = c, o.parent = this, new me(i, o, Xe(this, a)), this;
  }, n.staggerFrom = function(i, s, o, l, a, u, c) {
    return o.runBackwards = 1, dr(o).immediateRender = Ie(o.immediateRender), this.staggerTo(i, s, o, l, a, u, c);
  }, n.staggerFromTo = function(i, s, o, l, a, u, c, f) {
    return l.startAt = o, dr(l).immediateRender = Ie(l.immediateRender), this.staggerTo(i, s, l, a, u, c, f);
  }, n.render = function(i, s, o) {
    var l = this._time, a = this._dirty ? this.totalDuration() : this._tDur, u = this._dur, c = i <= 0 ? 0 : Ee(i), f = this._zTime < 0 != i < 0 && (this._initted || !u), d, _, g, p, y, E, O, b, T, v, V, A;
    if (this !== ce && c > a && i >= 0 && (c = a), c !== this._tTime || o || f) {
      if (l !== this._time && u && (c += this._time - l, i += this._time - l), d = c, T = this._start, b = this._ts, E = !b, f && (u || (l = this._zTime), (i || !s) && (this._zTime = i)), this._repeat) {
        if (V = this._yoyo, y = u + this._rDelay, this._repeat < -1 && i < 0)
          return this.totalTime(y * 100 + i, s, o);
        if (d = Ee(c % y), c === a ? (p = this._repeat, d = u) : (p = ~~(c / y), p && p === c / y && (d = u, p--), d > u && (d = u)), v = Bn(this._tTime, y), !l && this._tTime && v !== p && this._tTime - v * y - this._dur <= 0 && (v = p), V && p & 1 && (d = u - d, A = 1), p !== v && !this._lock) {
          var R = V && v & 1, C = R === (V && p & 1);
          if (p < v && (R = !R), l = R ? 0 : c % u ? u : c, this._lock = 1, this.render(l || (A ? 0 : Ee(p * y)), s, !u)._lock = 0, this._tTime = c, !s && this.parent && Ge(this, "onRepeat"), this.vars.repeatRefresh && !A && (this.invalidate()._lock = 1), l && l !== this._time || E !== !this._ts || this.vars.onRepeat && !this.parent && !this._act)
            return this;
          if (u = this._dur, a = this._tDur, C && (this._lock = 2, l = R ? u : -1e-4, this.render(l, !0), this.vars.repeatRefresh && !A && this.invalidate()), this._lock = 0, !this._ts && !E)
            return this;
          ru(this, A);
        }
      }
      if (this._hasPause && !this._forcing && this._lock < 2 && (O = hh(this, Ee(l), Ee(d)), O && (c -= d - (d = O._start))), this._tTime = c, this._time = d, this._act = !b, this._initted || (this._onUpdate = this.vars.onUpdate, this._initted = 1, this._zTime = i, l = 0), !l && d && !s && !p && (Ge(this, "onStart"), this._tTime !== c))
        return this;
      if (d >= l && i >= 0)
        for (_ = this._first; _; ) {
          if (g = _._next, (_._act || d >= _._start) && _._ts && O !== _) {
            if (_.parent !== this)
              return this.render(i, s, o);
            if (_.render(_._ts > 0 ? (d - _._start) * _._ts : (_._dirty ? _.totalDuration() : _._tDur) + (d - _._start) * _._ts, s, o), d !== this._time || !this._ts && !E) {
              O = 0, g && (c += this._zTime = -ie);
              break;
            }
          }
          _ = g;
        }
      else {
        _ = this._last;
        for (var W = i < 0 ? i : d; _; ) {
          if (g = _._prev, (_._act || W <= _._end) && _._ts && O !== _) {
            if (_.parent !== this)
              return this.render(i, s, o);
            if (_.render(_._ts > 0 ? (W - _._start) * _._ts : (_._dirty ? _.totalDuration() : _._tDur) + (W - _._start) * _._ts, s, o || Ce && (_._initted || _._startAt)), d !== this._time || !this._ts && !E) {
              O = 0, g && (c += this._zTime = W ? -ie : ie);
              break;
            }
          }
          _ = g;
        }
      }
      if (O && !s && (this.pause(), O.render(d >= l ? 0 : -ie)._zTime = d >= l ? 1 : -1, this._ts))
        return this._start = T, Pi(this), this.render(i, s, o);
      this._onUpdate && !s && Ge(this, "onUpdate", !0), (c === a && this._tTime >= this.totalDuration() || !c && l) && (T === this._start || Math.abs(b) !== Math.abs(this._ts)) && (this._lock || ((i || !u) && (c === a && this._ts > 0 || !c && this._ts < 0) && Wt(this, 1), !s && !(i < 0 && !l) && (c || l || !a) && (Ge(this, c === a && i >= 0 ? "onComplete" : "onReverseComplete", !0), this._prom && !(c < a && this.timeScale() > 0) && this._prom())));
    }
    return this;
  }, n.add = function(i, s) {
    var o = this;
    if (Pt(s) || (s = Xe(this, s, i)), !(i instanceof Nr)) {
      if (Pe(i))
        return i.forEach(function(l) {
          return o.add(l, s);
        }), this;
      if (be(i))
        return this.addLabel(i, s);
      if (he(i))
        i = me.delayedCall(0, i);
      else
        return this;
    }
    return this !== i ? _t(this, i, s) : this;
  }, n.getChildren = function(i, s, o, l) {
    i === void 0 && (i = !0), s === void 0 && (s = !0), o === void 0 && (o = !0), l === void 0 && (l = -Je);
    for (var a = [], u = this._first; u; )
      u._start >= l && (u instanceof me ? s && a.push(u) : (o && a.push(u), i && a.push.apply(a, u.getChildren(!0, s, o)))), u = u._next;
    return a;
  }, n.getById = function(i) {
    for (var s = this.getChildren(1, 1, 1), o = s.length; o--; )
      if (s[o].vars.id === i)
        return s[o];
  }, n.remove = function(i) {
    return be(i) ? this.removeLabel(i) : he(i) ? this.killTweensOf(i) : (Ci(this, i), i === this._recent && (this._recent = this._last), dn(this));
  }, n.totalTime = function(i, s) {
    return arguments.length ? (this._forcing = 1, !this._dp && this._ts && (this._start = Ee(We.time - (this._ts > 0 ? i / this._ts : (this.totalDuration() - i) / -this._ts))), t.prototype.totalTime.call(this, i, s), this._forcing = 0, this) : this._tTime;
  }, n.addLabel = function(i, s) {
    return this.labels[i] = Xe(this, s), this;
  }, n.removeLabel = function(i) {
    return delete this.labels[i], this;
  }, n.addPause = function(i, s, o) {
    var l = me.delayedCall(0, s || br, o);
    return l.data = "isPause", this._hasPause = 1, _t(this, l, Xe(this, i));
  }, n.removePause = function(i) {
    var s = this._first;
    for (i = Xe(this, i); s; )
      s._start === i && s.data === "isPause" && Wt(s), s = s._next;
  }, n.killTweensOf = function(i, s, o) {
    for (var l = this.getTweensOf(i, o), a = l.length; a--; )
      It !== l[a] && l[a].kill(i, s);
    return this;
  }, n.getTweensOf = function(i, s) {
    for (var o = [], l = Ze(i), a = this._first, u = Pt(s), c; a; )
      a instanceof me ? oh(a._targets, l) && (u ? (!It || a._initted && a._ts) && a.globalTime(0) <= s && a.globalTime(a.totalDuration()) > s : !s || a.isActive()) && o.push(a) : (c = a.getTweensOf(l, s)).length && o.push.apply(o, c), a = a._next;
    return o;
  }, n.tweenTo = function(i, s) {
    s = s || {};
    var o = this, l = Xe(o, i), a = s, u = a.startAt, c = a.onStart, f = a.onStartParams, d = a.immediateRender, _, g = me.to(o, tt({
      ease: s.ease || "none",
      lazy: !1,
      immediateRender: !1,
      time: l,
      overwrite: "auto",
      duration: s.duration || Math.abs((l - (u && "time" in u ? u.time : o._time)) / o.timeScale()) || ie,
      onStart: function() {
        if (o.pause(), !_) {
          var y = s.duration || Math.abs((l - (u && "time" in u ? u.time : o._time)) / o.timeScale());
          g._dur !== y && jn(g, y, 0, 1).render(g._time, !0, !0), _ = 1;
        }
        c && c.apply(g, f || []);
      }
    }, s));
    return d ? g.render(0) : g;
  }, n.tweenFromTo = function(i, s, o) {
    return this.tweenTo(s, tt({
      startAt: {
        time: Xe(this, i)
      }
    }, o));
  }, n.recent = function() {
    return this._recent;
  }, n.nextLabel = function(i) {
    return i === void 0 && (i = this._time), fl(this, Xe(this, i));
  }, n.previousLabel = function(i) {
    return i === void 0 && (i = this._time), fl(this, Xe(this, i), 1);
  }, n.currentLabel = function(i) {
    return arguments.length ? this.seek(i, !0) : this.previousLabel(this._time + ie);
  }, n.shiftChildren = function(i, s, o) {
    o === void 0 && (o = 0);
    for (var l = this._first, a = this.labels, u; l; )
      l._start >= o && (l._start += i, l._end += i), l = l._next;
    if (s)
      for (u in a)
        a[u] >= o && (a[u] += i);
    return dn(this);
  }, n.invalidate = function(i) {
    var s = this._first;
    for (this._lock = 0; s; )
      s.invalidate(i), s = s._next;
    return t.prototype.invalidate.call(this, i);
  }, n.clear = function(i) {
    i === void 0 && (i = !0);
    for (var s = this._first, o; s; )
      o = s._next, this.remove(s), s = o;
    return this._dp && (this._time = this._tTime = this._pTime = 0), i && (this.labels = {}), dn(this);
  }, n.totalDuration = function(i) {
    var s = 0, o = this, l = o._last, a = Je, u, c, f;
    if (arguments.length)
      return o.timeScale((o._repeat < 0 ? o.duration() : o.totalDuration()) / (o.reversed() ? -i : i));
    if (o._dirty) {
      for (f = o.parent; l; )
        u = l._prev, l._dirty && l.totalDuration(), c = l._start, c > a && o._sort && l._ts && !o._lock ? (o._lock = 1, _t(o, l, c - l._delay, 1)._lock = 0) : a = c, c < 0 && l._ts && (s -= c, (!f && !o._dp || f && f.smoothChildTiming) && (o._start += c / o._ts, o._time -= c, o._tTime -= c), o.shiftChildren(-c, !1, -1 / 0), a = 0), l._end > s && l._ts && (s = l._end), l = u;
      jn(o, o === ce && o._time > s ? o._time : s, 1, 1), o._dirty = 0;
    }
    return o._tDur;
  }, e.updateRoot = function(i) {
    if (ce._ts && (Fa(ce, ui(i, ce)), Aa = We.frame), We.frame >= ll) {
      ll += Ye.autoSleep || 120;
      var s = ce._first;
      if ((!s || !s._ts) && Ye.autoSleep && We._listeners.length < 2) {
        for (; s && !s._ts; )
          s = s._next;
        s || We.sleep();
      }
    }
  }, e;
}(Nr);
tt(Ae.prototype, {
  _lock: 0,
  _hasPause: 0,
  _forcing: 0
});
var Ph = function(e, n, r, i, s, o, l) {
  var a = new $e(this._pt, e, n, 0, 1, fu, null, s), u = 0, c = 0, f, d, _, g, p, y, E, O;
  for (a.b = r, a.e = i, r += "", i += "", (E = ~i.indexOf("random(")) && (i = Er(i)), o && (O = [r, i], o(O, e, n), r = O[0], i = O[1]), d = r.match(Li) || []; f = Li.exec(i); )
    g = f[0], p = i.substring(u, f.index), _ ? _ = (_ + 1) % 5 : p.substr(-5) === "rgba(" && (_ = 1), g !== d[c++] && (y = parseFloat(d[c - 1]) || 0, a._pt = {
      _next: a._pt,
      p: p || c === 1 ? p : ",",
      //note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.
      s: y,
      c: g.charAt(1) === "=" ? An(y, g) - y : parseFloat(g) - y,
      m: _ && _ < 4 ? Math.round : 0
    }, u = Li.lastIndex);
  return a.c = u < i.length ? i.substring(u, i.length) : "", a.fp = l, (Sa.test(i) || E) && (a.e = 0), this._pt = a, a;
}, fo = function(e, n, r, i, s, o, l, a, u, c) {
  he(i) && (i = i(s || 0, e, o));
  var f = e[n], d = r !== "get" ? r : he(f) ? u ? e[n.indexOf("set") || !he(e["get" + n.substr(3)]) ? n : "get" + n.substr(3)](u) : e[n]() : f, _ = he(f) ? u ? kh : uu : po, g;
  if (be(i) && (~i.indexOf("random(") && (i = Er(i)), i.charAt(1) === "=" && (g = An(d, i) + (De(d) || 0), (g || g === 0) && (i = g))), !c || d !== i || Es)
    return !isNaN(d * i) && i !== "" ? (g = new $e(this._pt, e, n, +d || 0, i - (d || 0), typeof f == "boolean" ? Ih : cu, 0, _), u && (g.fp = u), l && g.modifier(l, this, e), this._pt = g) : (!f && !(n in e) && lo(n, i), Ph.call(this, e, n, d, i, _, a || Ye.stringFilter, u));
}, Sh = function(e, n, r, i, s) {
  if (he(e) && (e = pr(e, s, n, r, i)), !xt(e) || e.style && e.nodeType || Pe(e) || Ca(e))
    return be(e) ? pr(e, s, n, r, i) : e;
  var o = {}, l;
  for (l in e)
    o[l] = pr(e[l], s, n, r, i);
  return o;
}, ou = function(e, n, r, i, s, o) {
  var l, a, u, c;
  if (je[e] && (l = new je[e]()).init(s, l.rawVars ? n[e] : Sh(n[e], i, s, o, r), r, i, o) !== !1 && (r._pt = a = new $e(r._pt, s, e, 0, 1, l.render, l, 0, l.priority), r !== Vn))
    for (u = r._ptLookup[r._targets.indexOf(s)], c = l._props.length; c--; )
      u[l._props[c]] = a;
  return l;
}, It, Es, ho = function t(e, n, r) {
  var i = e.vars, s = i.ease, o = i.startAt, l = i.immediateRender, a = i.lazy, u = i.onUpdate, c = i.onUpdateParams, f = i.callbackScope, d = i.runBackwards, _ = i.yoyoEase, g = i.keyframes, p = i.autoRevert, y = e._dur, E = e._startAt, O = e._targets, b = e.parent, T = b && b.data === "nested" ? b.vars.targets : O, v = e._overwrite === "auto" && !ro, V = e.timeline, A, R, C, W, K, J, oe, ue, G, Z, L, B, ye;
  if (V && (!g || !s) && (s = "none"), e._ease = hn(s, zn.ease), e._yEase = _ ? nu(hn(_ === !0 ? s : _, zn.ease)) : 0, _ && e._yoyo && !e._repeat && (_ = e._yEase, e._yEase = e._ease, e._ease = _), e._from = !V && !!i.runBackwards, !V || g && !i.stagger) {
    if (ue = O[0] ? fn(O[0]).harness : 0, B = ue && i[ue.prop], A = ai(i, ao), E && (E._zTime < 0 && E.progress(1), n < 0 && d && l && !p ? E.render(-1, !0) : E.revert(d && y ? Yr : ih), E._lazy = 0), o) {
      if (Wt(e._startAt = me.set(O, tt({
        data: "isStart",
        overwrite: !1,
        parent: b,
        immediateRender: !0,
        lazy: !E && Ie(a),
        startAt: null,
        delay: 0,
        onUpdate: u,
        onUpdateParams: c,
        callbackScope: f,
        stagger: 0
      }, o))), e._startAt._dp = 0, e._startAt._sat = e, n < 0 && (Ce || !l && !p) && e._startAt.revert(Yr), l && y && n <= 0 && r <= 0) {
        n && (e._zTime = n);
        return;
      }
    } else if (d && y && !E) {
      if (n && (l = !1), C = tt({
        overwrite: !1,
        data: "isFromStart",
        //we tag the tween with as "isFromStart" so that if [inside a plugin] we need to only do something at the very END of a tween, we have a way of identifying this tween as merely the one that's setting the beginning values for a "from()" tween. For example, clearProps in CSSPlugin should only get applied at the very END of a tween and without this tag, from(...{height:100, clearProps:"height", delay:1}) would wipe the height at the beginning of the tween and after 1 second, it'd kick back in.
        lazy: l && !E && Ie(a),
        immediateRender: l,
        //zero-duration tweens render immediately by default, but if we're not specifically instructed to render this tween immediately, we should skip this and merely _init() to record the starting values (rendering them immediately would push them to completion which is wasteful in that case - we'd have to render(-1) immediately after)
        stagger: 0,
        parent: b
        //ensures that nested tweens that had a stagger are handled properly, like gsap.from(".class", {y: gsap.utils.wrap([-100,100]), stagger: 0.5})
      }, A), B && (C[ue.prop] = B), Wt(e._startAt = me.set(O, C)), e._startAt._dp = 0, e._startAt._sat = e, n < 0 && (Ce ? e._startAt.revert(Yr) : e._startAt.render(-1, !0)), e._zTime = n, !l)
        t(e._startAt, ie, ie);
      else if (!n)
        return;
    }
    for (e._pt = e._ptCache = 0, a = y && Ie(a) || a && !y, R = 0; R < O.length; R++) {
      if (K = O[R], oe = K._gsap || co(O)[R]._gsap, e._ptLookup[R] = Z = {}, ms[oe.id] && zt.length && li(), L = T === O ? R : T.indexOf(K), ue && (G = new ue()).init(K, B || A, e, L, T) !== !1 && (e._pt = W = new $e(e._pt, K, G.name, 0, 1, G.render, G, 0, G.priority), G._props.forEach(function(nt) {
        Z[nt] = W;
      }), G.priority && (J = 1)), !ue || B)
        for (C in A)
          je[C] && (G = ou(C, A, e, L, K, T)) ? G.priority && (J = 1) : Z[C] = W = fo.call(e, K, C, "get", A[C], L, T, 0, i.stringFilter);
      e._op && e._op[R] && e.kill(K, e._op[R]), v && e._pt && (It = e, ce.killTweensOf(K, Z, e.globalTime(n)), ye = !e.parent, It = 0), e._pt && a && (ms[oe.id] = 1);
    }
    J && du(e), e._onInit && e._onInit(e);
  }
  e._onUpdate = u, e._initted = (!e._op || e._pt) && !ye, g && n <= 0 && V.render(Je, !0, !0);
}, Vh = function(e, n, r, i, s, o, l) {
  var a = (e._pt && e._ptCache || (e._ptCache = {}))[n], u, c, f, d;
  if (!a)
    for (a = e._ptCache[n] = [], f = e._ptLookup, d = e._targets.length; d--; ) {
      if (u = f[d][n], u && u.d && u.d._pt)
        for (u = u.d._pt; u && u.p !== n && u.fp !== n; )
          u = u._next;
      if (!u)
        return Es = 1, e.vars[n] = "+=0", ho(e, l), Es = 0, 1;
      a.push(u);
    }
  for (d = a.length; d--; )
    c = a[d], u = c._pt || c, u.s = (i || i === 0) && !s ? i : u.s + (i || 0) + o * u.c, u.c = r - u.s, c.e && (c.e = pe(r) + De(c.e)), c.b && (c.b = u.s + De(c.b));
}, Mh = function(e, n) {
  var r = e[0] ? fn(e[0]).harness : 0, i = r && r.aliases, s, o, l, a;
  if (!i)
    return n;
  s = gn({}, n);
  for (o in i)
    if (o in s)
      for (a = i[o].split(","), l = a.length; l--; )
        s[a[l]] = s[o];
  return s;
}, Rh = function(e, n, r, i) {
  var s = n.ease || i || "power1.inOut", o, l;
  if (Pe(n))
    l = r[e] || (r[e] = []), n.forEach(function(a, u) {
      return l.push({
        t: u / (n.length - 1) * 100,
        v: a,
        e: s
      });
    });
  else
    for (o in n)
      l = r[o] || (r[o] = []), o === "ease" || l.push({
        t: parseFloat(e),
        v: n[o],
        e: s
      });
}, pr = function(e, n, r, i, s) {
  return he(e) ? e.call(n, r, i, s) : be(e) && ~e.indexOf("random(") ? Er(e) : e;
}, lu = uo + "repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert", au = {};
Fe(lu + ",id,stagger,delay,duration,paused,scrollTrigger", function(t) {
  return au[t] = 1;
});
var me = /* @__PURE__ */ function(t) {
  Ta(e, t);
  function e(r, i, s, o) {
    var l;
    typeof i == "number" && (s.duration = i, i = s, s = null), l = t.call(this, o ? i : dr(i)) || this;
    var a = l.vars, u = a.duration, c = a.delay, f = a.immediateRender, d = a.stagger, _ = a.overwrite, g = a.keyframes, p = a.defaults, y = a.scrollTrigger, E = a.yoyoEase, O = i.parent || ce, b = (Pe(r) || Ca(r) ? Pt(r[0]) : "length" in i) ? [r] : Ze(r), T, v, V, A, R, C, W, K;
    if (l._targets = b.length ? co(b) : oi("GSAP target " + r + " not found. https://greensock.com", !Ye.nullTargetWarn) || [], l._ptLookup = [], l._overwrite = _, g || d || Lr(u) || Lr(c)) {
      if (i = l.vars, T = l.timeline = new Ae({
        data: "nested",
        defaults: p || {},
        targets: O && O.data === "nested" ? O.vars.targets : b
      }), T.kill(), T.parent = T._dp = wt(l), T._start = 0, d || Lr(u) || Lr(c)) {
        if (A = b.length, W = d && Ya(d), xt(d))
          for (R in d)
            ~lu.indexOf(R) && (K || (K = {}), K[R] = d[R]);
        for (v = 0; v < A; v++)
          V = ai(i, au), V.stagger = 0, E && (V.yoyoEase = E), K && gn(V, K), C = b[v], V.duration = +pr(u, wt(l), v, C, b), V.delay = (+pr(c, wt(l), v, C, b) || 0) - l._delay, !d && A === 1 && V.delay && (l._delay = c = V.delay, l._start += c, V.delay = 0), T.to(C, V, W ? W(v, C, b) : 0), T._ease = Q.none;
        T.duration() ? u = c = 0 : l.timeline = 0;
      } else if (g) {
        dr(tt(T.vars.defaults, {
          ease: "none"
        })), T._ease = hn(g.ease || i.ease || "none");
        var J = 0, oe, ue, G;
        if (Pe(g))
          g.forEach(function(Z) {
            return T.to(b, Z, ">");
          }), T.duration();
        else {
          V = {};
          for (R in g)
            R === "ease" || R === "easeEach" || Rh(R, g[R], V, g.easeEach);
          for (R in V)
            for (oe = V[R].sort(function(Z, L) {
              return Z.t - L.t;
            }), J = 0, v = 0; v < oe.length; v++)
              ue = oe[v], G = {
                ease: ue.e,
                duration: (ue.t - (v ? oe[v - 1].t : 0)) / 100 * u
              }, G[R] = ue.v, T.to(b, G, J), J += G.duration;
          T.duration() < u && T.to({}, {
            duration: u - T.duration()
          });
        }
      }
      u || l.duration(u = T.duration());
    } else
      l.timeline = 0;
    return _ === !0 && !ro && (It = wt(l), ce.killTweensOf(b), It = 0), _t(O, wt(l), s), i.reversed && l.reverse(), i.paused && l.paused(!0), (f || !u && !g && l._start === Ee(O._time) && Ie(f) && ch(wt(l)) && O.data !== "nested") && (l._tTime = -ie, l.render(Math.max(0, -c) || 0)), y && ja(wt(l), y), l;
  }
  var n = e.prototype;
  return n.render = function(i, s, o) {
    var l = this._time, a = this._tDur, u = this._dur, c = i < 0, f = i > a - ie && !c ? a : i < ie ? 0 : i, d, _, g, p, y, E, O, b, T;
    if (!u)
      dh(this, i, s, o);
    else if (f !== this._tTime || !i || o || !this._initted && this._tTime || this._startAt && this._zTime < 0 !== c) {
      if (d = f, b = this.timeline, this._repeat) {
        if (p = u + this._rDelay, this._repeat < -1 && c)
          return this.totalTime(p * 100 + i, s, o);
        if (d = Ee(f % p), f === a ? (g = this._repeat, d = u) : (g = ~~(f / p), g && g === f / p && (d = u, g--), d > u && (d = u)), E = this._yoyo && g & 1, E && (T = this._yEase, d = u - d), y = Bn(this._tTime, p), d === l && !o && this._initted)
          return this._tTime = f, this;
        g !== y && (b && this._yEase && ru(b, E), this.vars.repeatRefresh && !E && !this._lock && (this._lock = o = 1, this.render(Ee(p * g), !0).invalidate()._lock = 0));
      }
      if (!this._initted) {
        if (Ua(this, c ? i : d, o, s, f))
          return this._tTime = 0, this;
        if (l !== this._time)
          return this;
        if (u !== this._dur)
          return this.render(i, s, o);
      }
      if (this._tTime = f, this._time = d, !this._act && this._ts && (this._act = 1, this._lazy = 0), this.ratio = O = (T || this._ease)(d / u), this._from && (this.ratio = O = 1 - O), d && !l && !s && !g && (Ge(this, "onStart"), this._tTime !== f))
        return this;
      for (_ = this._pt; _; )
        _.r(O, _.d), _ = _._next;
      b && b.render(i < 0 ? i : !d && E ? -ie : b._dur * b._ease(d / this._dur), s, o) || this._startAt && (this._zTime = i), this._onUpdate && !s && (c && gs(this, i, s, o), Ge(this, "onUpdate")), this._repeat && g !== y && this.vars.onRepeat && !s && this.parent && Ge(this, "onRepeat"), (f === this._tDur || !f) && this._tTime === f && (c && !this._onUpdate && gs(this, i, !0, !0), (i || !u) && (f === this._tDur && this._ts > 0 || !f && this._ts < 0) && Wt(this, 1), !s && !(c && !l) && (f || l || E) && (Ge(this, f === a ? "onComplete" : "onReverseComplete", !0), this._prom && !(f < a && this.timeScale() > 0) && this._prom()));
    }
    return this;
  }, n.targets = function() {
    return this._targets;
  }, n.invalidate = function(i) {
    return (!i || !this.vars.runBackwards) && (this._startAt = 0), this._pt = this._op = this._onUpdate = this._lazy = this.ratio = 0, this._ptLookup = [], this.timeline && this.timeline.invalidate(i), t.prototype.invalidate.call(this, i);
  }, n.resetTo = function(i, s, o, l) {
    Or || We.wake(), this._ts || this.play();
    var a = Math.min(this._dur, (this._dp._time - this._start) * this._ts), u;
    return this._initted || ho(this, a), u = this._ease(a / this._dur), Vh(this, i, s, o, l, u, a) ? this.resetTo(i, s, o, l) : (Si(this, 0), this.parent || za(this._dp, this, "_first", "_last", this._dp._sort ? "_start" : 0), this.render(0));
  }, n.kill = function(i, s) {
    if (s === void 0 && (s = "all"), !i && (!s || s === "all"))
      return this._lazy = this._pt = 0, this.parent ? or(this) : this;
    if (this.timeline) {
      var o = this.timeline.totalDuration();
      return this.timeline.killTweensOf(i, s, It && It.vars.overwrite !== !0)._first || or(this), this.parent && o !== this.timeline.totalDuration() && jn(this, this._dur * this.timeline._tDur / o, 0, 1), this;
    }
    var l = this._targets, a = i ? Ze(i) : l, u = this._ptLookup, c = this._pt, f, d, _, g, p, y, E;
    if ((!s || s === "all") && ah(l, a))
      return s === "all" && (this._pt = 0), or(this);
    for (f = this._op = this._op || [], s !== "all" && (be(s) && (p = {}, Fe(s, function(O) {
      return p[O] = 1;
    }), s = p), s = Mh(l, s)), E = l.length; E--; )
      if (~a.indexOf(l[E])) {
        d = u[E], s === "all" ? (f[E] = s, g = d, _ = {}) : (_ = f[E] = f[E] || {}, g = s);
        for (p in g)
          y = d && d[p], y && ((!("kill" in y.d) || y.d.kill(p) === !0) && Ci(this, y, "_pt"), delete d[p]), _ !== "all" && (_[p] = 1);
      }
    return this._initted && !this._pt && c && or(this), this;
  }, e.to = function(i, s) {
    return new e(i, s, arguments[2]);
  }, e.from = function(i, s) {
    return hr(1, arguments);
  }, e.delayedCall = function(i, s, o, l) {
    return new e(s, 0, {
      immediateRender: !1,
      lazy: !1,
      overwrite: !1,
      delay: i,
      onComplete: s,
      onReverseComplete: s,
      onCompleteParams: o,
      onReverseCompleteParams: o,
      callbackScope: l
    });
  }, e.fromTo = function(i, s, o) {
    return hr(2, arguments);
  }, e.set = function(i, s) {
    return s.duration = 0, s.repeatDelay || (s.repeat = 0), new e(i, s);
  }, e.killTweensOf = function(i, s, o) {
    return ce.killTweensOf(i, s, o);
  }, e;
}(Nr);
tt(me.prototype, {
  _targets: [],
  _lazy: 0,
  _startAt: 0,
  _op: 0,
  _onInit: 0
});
Fe("staggerTo,staggerFrom,staggerFromTo", function(t) {
  me[t] = function() {
    var e = new Ae(), n = ys.call(arguments, 0);
    return n.splice(t === "staggerFromTo" ? 5 : 4, 0, 0), e[t].apply(e, n);
  };
});
var po = function(e, n, r) {
  return e[n] = r;
}, uu = function(e, n, r) {
  return e[n](r);
}, kh = function(e, n, r, i) {
  return e[n](i.fp, r);
}, Ah = function(e, n, r) {
  return e.setAttribute(n, r);
}, _o = function(e, n) {
  return he(e[n]) ? uu : io(e[n]) && e.setAttribute ? Ah : po;
}, cu = function(e, n) {
  return n.set(n.t, n.p, Math.round((n.s + n.c * e) * 1e6) / 1e6, n);
}, Ih = function(e, n) {
  return n.set(n.t, n.p, !!(n.s + n.c * e), n);
}, fu = function(e, n) {
  var r = n._pt, i = "";
  if (!e && n.b)
    i = n.b;
  else if (e === 1 && n.e)
    i = n.e;
  else {
    for (; r; )
      i = r.p + (r.m ? r.m(r.s + r.c * e) : Math.round((r.s + r.c * e) * 1e4) / 1e4) + i, r = r._next;
    i += n.c;
  }
  n.set(n.t, n.p, i, n);
}, mo = function(e, n) {
  for (var r = n._pt; r; )
    r.r(e, r.d), r = r._next;
}, Fh = function(e, n, r, i) {
  for (var s = this._pt, o; s; )
    o = s._next, s.p === i && s.modifier(e, n, r), s = o;
}, $h = function(e) {
  for (var n = this._pt, r, i; n; )
    i = n._next, n.p === e && !n.op || n.op === e ? Ci(this, n, "_pt") : n.dep || (r = 1), n = i;
  return !r;
}, Lh = function(e, n, r, i) {
  i.mSet(e, n, i.m.call(i.tween, r, i.mt), i);
}, du = function(e) {
  for (var n = e._pt, r, i, s, o; n; ) {
    for (r = n._next, i = s; i && i.pr > n.pr; )
      i = i._next;
    (n._prev = i ? i._prev : o) ? n._prev._next = n : s = n, (n._next = i) ? i._prev = n : o = n, n = r;
  }
  e._pt = s;
}, $e = /* @__PURE__ */ function() {
  function t(n, r, i, s, o, l, a, u, c) {
    this.t = r, this.s = s, this.c = o, this.p = i, this.r = l || cu, this.d = a || this, this.set = u || po, this.pr = c || 0, this._next = n, n && (n._prev = this);
  }
  var e = t.prototype;
  return e.modifier = function(r, i, s) {
    this.mSet = this.mSet || this.set, this.set = Lh, this.m = r, this.mt = s, this.tween = i;
  }, t;
}();
Fe(uo + "parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger", function(t) {
  return ao[t] = 1;
});
Ke.TweenMax = Ke.TweenLite = me;
Ke.TimelineLite = Ke.TimelineMax = Ae;
ce = new Ae({
  sortChildren: !1,
  defaults: zn,
  autoRemoveChildren: !0,
  id: "root",
  smoothChildTiming: !0
});
Ye.stringFilter = tu;
var pn = [], Xr = {}, zh = [], hl = 0, Bh = 0, Hi = function(e) {
  return (Xr[e] || zh).map(function(n) {
    return n();
  });
}, Os = function() {
  var e = Date.now(), n = [];
  e - hl > 2 && (Hi("matchMediaInit"), pn.forEach(function(r) {
    var i = r.queries, s = r.conditions, o, l, a, u;
    for (l in i)
      o = Qe.matchMedia(i[l]).matches, o && (a = 1), o !== s[l] && (s[l] = o, u = 1);
    u && (r.revert(), a && n.push(r));
  }), Hi("matchMediaRevert"), n.forEach(function(r) {
    return r.onMatch(r);
  }), hl = e, Hi("matchMedia"));
}, hu = /* @__PURE__ */ function() {
  function t(n, r) {
    this.selector = r && xs(r), this.data = [], this._r = [], this.isReverted = !1, this.id = Bh++, n && this.add(n);
  }
  var e = t.prototype;
  return e.add = function(r, i, s) {
    he(r) && (s = i, i = r, r = he);
    var o = this, l = function() {
      var u = de, c = o.selector, f;
      return u && u !== o && u.data.push(o), s && (o.selector = xs(s)), de = o, f = i.apply(o, arguments), he(f) && o._r.push(f), de = u, o.selector = c, o.isReverted = !1, f;
    };
    return o.last = l, r === he ? l(o) : r ? o[r] = l : l;
  }, e.ignore = function(r) {
    var i = de;
    de = null, r(this), de = i;
  }, e.getTweens = function() {
    var r = [];
    return this.data.forEach(function(i) {
      return i instanceof t ? r.push.apply(r, i.getTweens()) : i instanceof me && !(i.parent && i.parent.data === "nested") && r.push(i);
    }), r;
  }, e.clear = function() {
    this._r.length = this.data.length = 0;
  }, e.kill = function(r, i) {
    var s = this;
    if (r) {
      var o = this.getTweens();
      this.data.forEach(function(a) {
        a.data === "isFlip" && (a.revert(), a.getChildren(!0, !0, !1).forEach(function(u) {
          return o.splice(o.indexOf(u), 1);
        }));
      }), o.map(function(a) {
        return {
          g: a.globalTime(0),
          t: a
        };
      }).sort(function(a, u) {
        return u.g - a.g || -1 / 0;
      }).forEach(function(a) {
        return a.t.revert(r);
      }), this.data.forEach(function(a) {
        return !(a instanceof me) && a.revert && a.revert(r);
      }), this._r.forEach(function(a) {
        return a(r, s);
      }), this.isReverted = !0;
    } else
      this.data.forEach(function(a) {
        return a.kill && a.kill();
      });
    if (this.clear(), i)
      for (var l = pn.length; l--; )
        pn[l].id === this.id && pn.splice(l, 1);
  }, e.revert = function(r) {
    this.kill(r || {});
  }, t;
}(), jh = /* @__PURE__ */ function() {
  function t(n) {
    this.contexts = [], this.scope = n;
  }
  var e = t.prototype;
  return e.add = function(r, i, s) {
    xt(r) || (r = {
      matches: r
    });
    var o = new hu(0, s || this.scope), l = o.conditions = {}, a, u, c;
    de && !o.selector && (o.selector = de.selector), this.contexts.push(o), i = o.add("onMatch", i), o.queries = r;
    for (u in r)
      u === "all" ? c = 1 : (a = Qe.matchMedia(r[u]), a && (pn.indexOf(o) < 0 && pn.push(o), (l[u] = a.matches) && (c = 1), a.addListener ? a.addListener(Os) : a.addEventListener("change", Os)));
    return c && i(o), this;
  }, e.revert = function(r) {
    this.kill(r || {});
  }, e.kill = function(r) {
    this.contexts.forEach(function(i) {
      return i.kill(r, !0);
    });
  }, t;
}(), ci = {
  registerPlugin: function() {
    for (var e = arguments.length, n = new Array(e), r = 0; r < e; r++)
      n[r] = arguments[r];
    n.forEach(function(i) {
      return Za(i);
    });
  },
  timeline: function(e) {
    return new Ae(e);
  },
  getTweensOf: function(e, n) {
    return ce.getTweensOf(e, n);
  },
  getProperty: function(e, n, r, i) {
    be(e) && (e = Ze(e)[0]);
    var s = fn(e || {}).get, o = r ? La : $a;
    return r === "native" && (r = ""), e && (n ? o((je[n] && je[n].get || s)(e, n, r, i)) : function(l, a, u) {
      return o((je[l] && je[l].get || s)(e, l, a, u));
    });
  },
  quickSetter: function(e, n, r) {
    if (e = Ze(e), e.length > 1) {
      var i = e.map(function(c) {
        return Le.quickSetter(c, n, r);
      }), s = i.length;
      return function(c) {
        for (var f = s; f--; )
          i[f](c);
      };
    }
    e = e[0] || {};
    var o = je[n], l = fn(e), a = l.harness && (l.harness.aliases || {})[n] || n, u = o ? function(c) {
      var f = new o();
      Vn._pt = 0, f.init(e, r ? c + r : c, Vn, 0, [e]), f.render(1, f), Vn._pt && mo(1, Vn);
    } : l.set(e, a);
    return o ? u : function(c) {
      return u(e, a, r ? c + r : c, l, 1);
    };
  },
  quickTo: function(e, n, r) {
    var i, s = Le.to(e, gn((i = {}, i[n] = "+=0.1", i.paused = !0, i), r || {})), o = function(a, u, c) {
      return s.resetTo(n, a, u, c);
    };
    return o.tween = s, o;
  },
  isTweening: function(e) {
    return ce.getTweensOf(e, !0).length > 0;
  },
  defaults: function(e) {
    return e && e.ease && (e.ease = hn(e.ease, zn.ease)), al(zn, e || {});
  },
  config: function(e) {
    return al(Ye, e || {});
  },
  registerEffect: function(e) {
    var n = e.name, r = e.effect, i = e.plugins, s = e.defaults, o = e.extendTimeline;
    (i || "").split(",").forEach(function(l) {
      return l && !je[l] && !Ke[l] && oi(n + " effect requires " + l + " plugin.");
    }), zi[n] = function(l, a, u) {
      return r(Ze(l), tt(a || {}, s), u);
    }, o && (Ae.prototype[n] = function(l, a, u) {
      return this.add(zi[n](l, xt(a) ? a : (u = a) && {}, this), u);
    });
  },
  registerEase: function(e, n) {
    Q[e] = hn(n);
  },
  parseEase: function(e, n) {
    return arguments.length ? hn(e, n) : Q;
  },
  getById: function(e) {
    return ce.getById(e);
  },
  exportRoot: function(e, n) {
    e === void 0 && (e = {});
    var r = new Ae(e), i, s;
    for (r.smoothChildTiming = Ie(e.smoothChildTiming), ce.remove(r), r._dp = 0, r._time = r._tTime = ce._time, i = ce._first; i; )
      s = i._next, (n || !(!i._dur && i instanceof me && i.vars.onComplete === i._targets[0])) && _t(r, i, i._start - i._delay), i = s;
    return _t(ce, r, 0), r;
  },
  context: function(e, n) {
    return e ? new hu(e, n) : de;
  },
  matchMedia: function(e) {
    return new jh(e);
  },
  matchMediaRefresh: function() {
    return pn.forEach(function(e) {
      var n = e.conditions, r, i;
      for (i in n)
        n[i] && (n[i] = !1, r = 1);
      r && e.revert();
    }) || Os();
  },
  addEventListener: function(e, n) {
    var r = Xr[e] || (Xr[e] = []);
    ~r.indexOf(n) || r.push(n);
  },
  removeEventListener: function(e, n) {
    var r = Xr[e], i = r && r.indexOf(n);
    i >= 0 && r.splice(i, 1);
  },
  utils: {
    wrap: xh,
    wrapYoyo: bh,
    distribute: Ya,
    random: Xa,
    snap: Ka,
    normalize: yh,
    getUnit: De,
    clamp: _h,
    splitColor: Ga,
    toArray: Ze,
    selector: xs,
    mapRange: Qa,
    pipe: gh,
    unitize: vh,
    interpolate: Eh,
    shuffle: Wa
  },
  install: Ra,
  effects: zi,
  ticker: We,
  updateRoot: Ae.updateRoot,
  plugins: je,
  globalTimeline: ce,
  core: {
    PropTween: $e,
    globals: ka,
    Tween: me,
    Timeline: Ae,
    Animation: Nr,
    getCache: fn,
    _removeLinkedListItem: Ci,
    reverting: function() {
      return Ce;
    },
    context: function(e) {
      return e && de && (de.data.push(e), e._ctx = de), de;
    },
    suppressOverwrites: function(e) {
      return ro = e;
    }
  }
};
Fe("to,from,fromTo,delayedCall,set,killTweensOf", function(t) {
  return ci[t] = me[t];
});
We.add(Ae.updateRoot);
Vn = ci.to({}, {
  duration: 0
});
var Uh = function(e, n) {
  for (var r = e._pt; r && r.p !== n && r.op !== n && r.fp !== n; )
    r = r._next;
  return r;
}, Hh = function(e, n) {
  var r = e._targets, i, s, o;
  for (i in n)
    for (s = r.length; s--; )
      o = e._ptLookup[s][i], o && (o = o.d) && (o._pt && (o = Uh(o, i)), o && o.modifier && o.modifier(n[i], e, r[s], i));
}, Wi = function(e, n) {
  return {
    name: e,
    rawVars: 1,
    //don't pre-process function-based values or "random()" strings.
    init: function(i, s, o) {
      o._onInit = function(l) {
        var a, u;
        if (be(s) && (a = {}, Fe(s, function(c) {
          return a[c] = 1;
        }), s = a), n) {
          a = {};
          for (u in s)
            a[u] = n(s[u]);
          s = a;
        }
        Hh(l, s);
      };
    }
  };
}, Le = ci.registerPlugin({
  name: "attr",
  init: function(e, n, r, i, s) {
    var o, l, a;
    this.tween = r;
    for (o in n)
      a = e.getAttribute(o) || "", l = this.add(e, "setAttribute", (a || 0) + "", n[o], i, s, 0, 0, o), l.op = o, l.b = a, this._props.push(o);
  },
  render: function(e, n) {
    for (var r = n._pt; r; )
      Ce ? r.set(r.t, r.p, r.b, r) : r.r(e, r.d), r = r._next;
  }
}, {
  name: "endArray",
  init: function(e, n) {
    for (var r = n.length; r--; )
      this.add(e, r, e[r] || 0, n[r], 0, 0, 0, 0, 0, 1);
  }
}, Wi("roundProps", bs), Wi("modifiers"), Wi("snap", Ka)) || ci;
me.version = Ae.version = Le.version = "3.12.2";
Ma = 1;
so() && Un();
Q.Power0;
Q.Power1;
Q.Power2;
Q.Power3;
Q.Power4;
Q.Linear;
Q.Quad;
Q.Cubic;
Q.Quart;
Q.Quint;
Q.Strong;
Q.Elastic;
Q.Back;
Q.SteppedEase;
Q.Bounce;
Q.Sine;
Q.Expo;
Q.Circ;
/*!
 * CSSPlugin 3.12.2
 * https://greensock.com
 *
 * Copyright 2008-2023, GreenSock. All rights reserved.
 * Subject to the terms at https://greensock.com/standard-license or for
 * Club GreenSock members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/
var pl, Ft, In, go, nn, _l, vo, Wh = function() {
  return typeof window < "u";
}, St = {}, Gt = 180 / Math.PI, Fn = Math.PI / 180, Tn = Math.atan2, ml = 1e8, yo = /([A-Z])/g, Yh = /(left|right|width|margin|padding|x)/i, Kh = /[\s,\(]\S/, mt = {
  autoAlpha: "opacity,visibility",
  scale: "scaleX,scaleY",
  alpha: "opacity"
}, Ns = function(e, n) {
  return n.set(n.t, n.p, Math.round((n.s + n.c * e) * 1e4) / 1e4 + n.u, n);
}, Xh = function(e, n) {
  return n.set(n.t, n.p, e === 1 ? n.e : Math.round((n.s + n.c * e) * 1e4) / 1e4 + n.u, n);
}, qh = function(e, n) {
  return n.set(n.t, n.p, e ? Math.round((n.s + n.c * e) * 1e4) / 1e4 + n.u : n.b, n);
}, Qh = function(e, n) {
  var r = n.s + n.c * e;
  n.set(n.t, n.p, ~~(r + (r < 0 ? -0.5 : 0.5)) + n.u, n);
}, pu = function(e, n) {
  return n.set(n.t, n.p, e ? n.e : n.b, n);
}, _u = function(e, n) {
  return n.set(n.t, n.p, e !== 1 ? n.b : n.e, n);
}, Jh = function(e, n, r) {
  return e.style[n] = r;
}, Zh = function(e, n, r) {
  return e.style.setProperty(n, r);
}, Gh = function(e, n, r) {
  return e._gsap[n] = r;
}, ep = function(e, n, r) {
  return e._gsap.scaleX = e._gsap.scaleY = r;
}, tp = function(e, n, r, i, s) {
  var o = e._gsap;
  o.scaleX = o.scaleY = r, o.renderTransform(s, o);
}, np = function(e, n, r, i, s) {
  var o = e._gsap;
  o[n] = r, o.renderTransform(s, o);
}, fe = "transform", ut = fe + "Origin", rp = function t(e, n) {
  var r = this, i = this.target, s = i.style;
  if (e in St && s) {
    if (this.tfm = this.tfm || {}, e !== "transform")
      e = mt[e] || e, ~e.indexOf(",") ? e.split(",").forEach(function(o) {
        return r.tfm[o] = Tt(i, o);
      }) : this.tfm[e] = i._gsap.x ? i._gsap[e] : Tt(i, e);
    else
      return mt.transform.split(",").forEach(function(o) {
        return t.call(r, o, n);
      });
    if (this.props.indexOf(fe) >= 0)
      return;
    i._gsap.svg && (this.svgo = i.getAttribute("data-svg-origin"), this.props.push(ut, n, "")), e = fe;
  }
  (s || n) && this.props.push(e, n, s[e]);
}, mu = function(e) {
  e.translate && (e.removeProperty("translate"), e.removeProperty("scale"), e.removeProperty("rotate"));
}, ip = function() {
  var e = this.props, n = this.target, r = n.style, i = n._gsap, s, o;
  for (s = 0; s < e.length; s += 3)
    e[s + 1] ? n[e[s]] = e[s + 2] : e[s + 2] ? r[e[s]] = e[s + 2] : r.removeProperty(e[s].substr(0, 2) === "--" ? e[s] : e[s].replace(yo, "-$1").toLowerCase());
  if (this.tfm) {
    for (o in this.tfm)
      i[o] = this.tfm[o];
    i.svg && (i.renderTransform(), n.setAttribute("data-svg-origin", this.svgo || "")), s = vo(), (!s || !s.isStart) && !r[fe] && (mu(r), i.uncache = 1);
  }
}, gu = function(e, n) {
  var r = {
    target: e,
    props: [],
    revert: ip,
    save: rp
  };
  return e._gsap || Le.core.getCache(e), n && n.split(",").forEach(function(i) {
    return r.save(i);
  }), r;
}, vu, ws = function(e, n) {
  var r = Ft.createElementNS ? Ft.createElementNS((n || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"), e) : Ft.createElement(e);
  return r.style ? r : Ft.createElement(e);
}, yt = function t(e, n, r) {
  var i = getComputedStyle(e);
  return i[n] || i.getPropertyValue(n.replace(yo, "-$1").toLowerCase()) || i.getPropertyValue(n) || !r && t(e, Hn(n) || n, 1) || "";
}, gl = "O,Moz,ms,Ms,Webkit".split(","), Hn = function(e, n, r) {
  var i = n || nn, s = i.style, o = 5;
  if (e in s && !r)
    return e;
  for (e = e.charAt(0).toUpperCase() + e.substr(1); o-- && !(gl[o] + e in s); )
    ;
  return o < 0 ? null : (o === 3 ? "ms" : o >= 0 ? gl[o] : "") + e;
}, Ts = function() {
  Wh() && window.document && (pl = window, Ft = pl.document, In = Ft.documentElement, nn = ws("div") || {
    style: {}
  }, ws("div"), fe = Hn(fe), ut = fe + "Origin", nn.style.cssText = "border-width:0;line-height:0;position:absolute;padding:0", vu = !!Hn("perspective"), vo = Le.core.reverting, go = 1);
}, Yi = function t(e) {
  var n = ws("svg", this.ownerSVGElement && this.ownerSVGElement.getAttribute("xmlns") || "http://www.w3.org/2000/svg"), r = this.parentNode, i = this.nextSibling, s = this.style.cssText, o;
  if (In.appendChild(n), n.appendChild(this), this.style.display = "block", e)
    try {
      o = this.getBBox(), this._gsapBBox = this.getBBox, this.getBBox = t;
    } catch {
    }
  else
    this._gsapBBox && (o = this._gsapBBox());
  return r && (i ? r.insertBefore(this, i) : r.appendChild(this)), In.removeChild(n), this.style.cssText = s, o;
}, vl = function(e, n) {
  for (var r = n.length; r--; )
    if (e.hasAttribute(n[r]))
      return e.getAttribute(n[r]);
}, yu = function(e) {
  var n;
  try {
    n = e.getBBox();
  } catch {
    n = Yi.call(e, !0);
  }
  return n && (n.width || n.height) || e.getBBox === Yi || (n = Yi.call(e, !0)), n && !n.width && !n.x && !n.y ? {
    x: +vl(e, ["x", "cx", "x1"]) || 0,
    y: +vl(e, ["y", "cy", "y1"]) || 0,
    width: 0,
    height: 0
  } : n;
}, xu = function(e) {
  return !!(e.getCTM && (!e.parentNode || e.ownerSVGElement) && yu(e));
}, wr = function(e, n) {
  if (n) {
    var r = e.style;
    n in St && n !== ut && (n = fe), r.removeProperty ? ((n.substr(0, 2) === "ms" || n.substr(0, 6) === "webkit") && (n = "-" + n), r.removeProperty(n.replace(yo, "-$1").toLowerCase())) : r.removeAttribute(n);
  }
}, $t = function(e, n, r, i, s, o) {
  var l = new $e(e._pt, n, r, 0, 1, o ? _u : pu);
  return e._pt = l, l.b = i, l.e = s, e._props.push(r), l;
}, yl = {
  deg: 1,
  rad: 1,
  turn: 1
}, sp = {
  grid: 1,
  flex: 1
}, Yt = function t(e, n, r, i) {
  var s = parseFloat(r) || 0, o = (r + "").trim().substr((s + "").length) || "px", l = nn.style, a = Yh.test(n), u = e.tagName.toLowerCase() === "svg", c = (u ? "client" : "offset") + (a ? "Width" : "Height"), f = 100, d = i === "px", _ = i === "%", g, p, y, E;
  return i === o || !s || yl[i] || yl[o] ? s : (o !== "px" && !d && (s = t(e, n, r, "px")), E = e.getCTM && xu(e), (_ || o === "%") && (St[n] || ~n.indexOf("adius")) ? (g = E ? e.getBBox()[a ? "width" : "height"] : e[c], pe(_ ? s / g * f : s / 100 * g)) : (l[a ? "width" : "height"] = f + (d ? o : i), p = ~n.indexOf("adius") || i === "em" && e.appendChild && !u ? e : e.parentNode, E && (p = (e.ownerSVGElement || {}).parentNode), (!p || p === Ft || !p.appendChild) && (p = Ft.body), y = p._gsap, y && _ && y.width && a && y.time === We.time && !y.uncache ? pe(s / y.width * f) : ((_ || o === "%") && !sp[yt(p, "display")] && (l.position = yt(e, "position")), p === e && (l.position = "static"), p.appendChild(nn), g = nn[c], p.removeChild(nn), l.position = "absolute", a && _ && (y = fn(p), y.time = We.time, y.width = p[c]), pe(d ? g * s / f : g && s ? f / g * s : 0))));
}, Tt = function(e, n, r, i) {
  var s;
  return go || Ts(), n in mt && n !== "transform" && (n = mt[n], ~n.indexOf(",") && (n = n.split(",")[0])), St[n] && n !== "transform" ? (s = Dr(e, i), s = n !== "transformOrigin" ? s[n] : s.svg ? s.origin : di(yt(e, ut)) + " " + s.zOrigin + "px") : (s = e.style[n], (!s || s === "auto" || i || ~(s + "").indexOf("calc(")) && (s = fi[n] && fi[n](e, n, r) || yt(e, n) || Ia(e, n) || (n === "opacity" ? 1 : 0))), r && !~(s + "").trim().indexOf(" ") ? Yt(e, n, s, r) + r : s;
}, op = function(e, n, r, i) {
  if (!r || r === "none") {
    var s = Hn(n, e, 1), o = s && yt(e, s, 1);
    o && o !== r ? (n = s, r = o) : n === "borderColor" && (r = yt(e, "borderTopColor"));
  }
  var l = new $e(this._pt, e.style, n, 0, 1, fu), a = 0, u = 0, c, f, d, _, g, p, y, E, O, b, T, v;
  if (l.b = r, l.e = i, r += "", i += "", i === "auto" && (e.style[n] = i, i = yt(e, n) || i, e.style[n] = r), c = [r, i], tu(c), r = c[0], i = c[1], d = r.match(Sn) || [], v = i.match(Sn) || [], v.length) {
    for (; f = Sn.exec(i); )
      y = f[0], O = i.substring(a, f.index), g ? g = (g + 1) % 5 : (O.substr(-5) === "rgba(" || O.substr(-5) === "hsla(") && (g = 1), y !== (p = d[u++] || "") && (_ = parseFloat(p) || 0, T = p.substr((_ + "").length), y.charAt(1) === "=" && (y = An(_, y) + T), E = parseFloat(y), b = y.substr((E + "").length), a = Sn.lastIndex - b.length, b || (b = b || Ye.units[n] || T, a === i.length && (i += b, l.e += b)), T !== b && (_ = Yt(e, n, p, b) || 0), l._pt = {
        _next: l._pt,
        p: O || u === 1 ? O : ",",
        //note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.
        s: _,
        c: E - _,
        m: g && g < 4 || n === "zIndex" ? Math.round : 0
      });
    l.c = a < i.length ? i.substring(a, i.length) : "";
  } else
    l.r = n === "display" && i === "none" ? _u : pu;
  return Sa.test(i) && (l.e = 0), this._pt = l, l;
}, xl = {
  top: "0%",
  bottom: "100%",
  left: "0%",
  right: "100%",
  center: "50%"
}, lp = function(e) {
  var n = e.split(" "), r = n[0], i = n[1] || "50%";
  return (r === "top" || r === "bottom" || i === "left" || i === "right") && (e = r, r = i, i = e), n[0] = xl[r] || r, n[1] = xl[i] || i, n.join(" ");
}, ap = function(e, n) {
  if (n.tween && n.tween._time === n.tween._dur) {
    var r = n.t, i = r.style, s = n.u, o = r._gsap, l, a, u;
    if (s === "all" || s === !0)
      i.cssText = "", a = 1;
    else
      for (s = s.split(","), u = s.length; --u > -1; )
        l = s[u], St[l] && (a = 1, l = l === "transformOrigin" ? ut : fe), wr(r, l);
    a && (wr(r, fe), o && (o.svg && r.removeAttribute("transform"), Dr(r, 1), o.uncache = 1, mu(i)));
  }
}, fi = {
  clearProps: function(e, n, r, i, s) {
    if (s.data !== "isFromStart") {
      var o = e._pt = new $e(e._pt, n, r, 0, 0, ap);
      return o.u = i, o.pr = -10, o.tween = s, e._props.push(r), 1;
    }
  }
  /* className feature (about 0.4kb gzipped).
  , className(plugin, target, property, endValue, tween) {
  	let _renderClassName = (ratio, data) => {
  			data.css.render(ratio, data.css);
  			if (!ratio || ratio === 1) {
  				let inline = data.rmv,
  					target = data.t,
  					p;
  				target.setAttribute("class", ratio ? data.e : data.b);
  				for (p in inline) {
  					_removeProperty(target, p);
  				}
  			}
  		},
  		_getAllStyles = (target) => {
  			let styles = {},
  				computed = getComputedStyle(target),
  				p;
  			for (p in computed) {
  				if (isNaN(p) && p !== "cssText" && p !== "length") {
  					styles[p] = computed[p];
  				}
  			}
  			_setDefaults(styles, _parseTransform(target, 1));
  			return styles;
  		},
  		startClassList = target.getAttribute("class"),
  		style = target.style,
  		cssText = style.cssText,
  		cache = target._gsap,
  		classPT = cache.classPT,
  		inlineToRemoveAtEnd = {},
  		data = {t:target, plugin:plugin, rmv:inlineToRemoveAtEnd, b:startClassList, e:(endValue.charAt(1) !== "=") ? endValue : startClassList.replace(new RegExp("(?:\\s|^)" + endValue.substr(2) + "(?![\\w-])"), "") + ((endValue.charAt(0) === "+") ? " " + endValue.substr(2) : "")},
  		changingVars = {},
  		startVars = _getAllStyles(target),
  		transformRelated = /(transform|perspective)/i,
  		endVars, p;
  	if (classPT) {
  		classPT.r(1, classPT.d);
  		_removeLinkedListItem(classPT.d.plugin, classPT, "_pt");
  	}
  	target.setAttribute("class", data.e);
  	endVars = _getAllStyles(target, true);
  	target.setAttribute("class", startClassList);
  	for (p in endVars) {
  		if (endVars[p] !== startVars[p] && !transformRelated.test(p)) {
  			changingVars[p] = endVars[p];
  			if (!style[p] && style[p] !== "0") {
  				inlineToRemoveAtEnd[p] = 1;
  			}
  		}
  	}
  	cache.classPT = plugin._pt = new PropTween(plugin._pt, target, "className", 0, 0, _renderClassName, data, 0, -11);
  	if (style.cssText !== cssText) { //only apply if things change. Otherwise, in cases like a background-image that's pulled dynamically, it could cause a refresh. See https://greensock.com/forums/topic/20368-possible-gsap-bug-switching-classnames-in-chrome/.
  		style.cssText = cssText; //we recorded cssText before we swapped classes and ran _getAllStyles() because in cases when a className tween is overwritten, we remove all the related tweening properties from that class change (otherwise class-specific stuff can't override properties we've directly set on the target's style object due to specificity).
  	}
  	_parseTransform(target, true); //to clear the caching of transforms
  	data.css = new gsap.plugins.css();
  	data.css.init(target, changingVars, tween);
  	plugin._props.push(...data.css._props);
  	return 1;
  }
  */
}, Tr = [1, 0, 0, 1, 0, 0], bu = {}, Eu = function(e) {
  return e === "matrix(1, 0, 0, 1, 0, 0)" || e === "none" || !e;
}, bl = function(e) {
  var n = yt(e, fe);
  return Eu(n) ? Tr : n.substr(7).match(Pa).map(pe);
}, xo = function(e, n) {
  var r = e._gsap || fn(e), i = e.style, s = bl(e), o, l, a, u;
  return r.svg && e.getAttribute("transform") ? (a = e.transform.baseVal.consolidate().matrix, s = [a.a, a.b, a.c, a.d, a.e, a.f], s.join(",") === "1,0,0,1,0,0" ? Tr : s) : (s === Tr && !e.offsetParent && e !== In && !r.svg && (a = i.display, i.display = "block", o = e.parentNode, (!o || !e.offsetParent) && (u = 1, l = e.nextElementSibling, In.appendChild(e)), s = bl(e), a ? i.display = a : wr(e, "display"), u && (l ? o.insertBefore(e, l) : o ? o.appendChild(e) : In.removeChild(e))), n && s.length > 6 ? [s[0], s[1], s[4], s[5], s[12], s[13]] : s);
}, Ds = function(e, n, r, i, s, o) {
  var l = e._gsap, a = s || xo(e, !0), u = l.xOrigin || 0, c = l.yOrigin || 0, f = l.xOffset || 0, d = l.yOffset || 0, _ = a[0], g = a[1], p = a[2], y = a[3], E = a[4], O = a[5], b = n.split(" "), T = parseFloat(b[0]) || 0, v = parseFloat(b[1]) || 0, V, A, R, C;
  r ? a !== Tr && (A = _ * y - g * p) && (R = T * (y / A) + v * (-p / A) + (p * O - y * E) / A, C = T * (-g / A) + v * (_ / A) - (_ * O - g * E) / A, T = R, v = C) : (V = yu(e), T = V.x + (~b[0].indexOf("%") ? T / 100 * V.width : T), v = V.y + (~(b[1] || b[0]).indexOf("%") ? v / 100 * V.height : v)), i || i !== !1 && l.smooth ? (E = T - u, O = v - c, l.xOffset = f + (E * _ + O * p) - E, l.yOffset = d + (E * g + O * y) - O) : l.xOffset = l.yOffset = 0, l.xOrigin = T, l.yOrigin = v, l.smooth = !!i, l.origin = n, l.originIsAbsolute = !!r, e.style[ut] = "0px 0px", o && ($t(o, l, "xOrigin", u, T), $t(o, l, "yOrigin", c, v), $t(o, l, "xOffset", f, l.xOffset), $t(o, l, "yOffset", d, l.yOffset)), e.setAttribute("data-svg-origin", T + " " + v);
}, Dr = function(e, n) {
  var r = e._gsap || new su(e);
  if ("x" in r && !n && !r.uncache)
    return r;
  var i = e.style, s = r.scaleX < 0, o = "px", l = "deg", a = getComputedStyle(e), u = yt(e, ut) || "0", c, f, d, _, g, p, y, E, O, b, T, v, V, A, R, C, W, K, J, oe, ue, G, Z, L, B, ye, nt, rt, Re, it, ze, bt;
  return c = f = d = p = y = E = O = b = T = 0, _ = g = 1, r.svg = !!(e.getCTM && xu(e)), a.translate && ((a.translate !== "none" || a.scale !== "none" || a.rotate !== "none") && (i[fe] = (a.translate !== "none" ? "translate3d(" + (a.translate + " 0 0").split(" ").slice(0, 3).join(", ") + ") " : "") + (a.rotate !== "none" ? "rotate(" + a.rotate + ") " : "") + (a.scale !== "none" ? "scale(" + a.scale.split(" ").join(",") + ") " : "") + (a[fe] !== "none" ? a[fe] : "")), i.scale = i.rotate = i.translate = "none"), A = xo(e, r.svg), r.svg && (r.uncache ? (B = e.getBBox(), u = r.xOrigin - B.x + "px " + (r.yOrigin - B.y) + "px", L = "") : L = !n && e.getAttribute("data-svg-origin"), Ds(e, L || u, !!L || r.originIsAbsolute, r.smooth !== !1, A)), v = r.xOrigin || 0, V = r.yOrigin || 0, A !== Tr && (K = A[0], J = A[1], oe = A[2], ue = A[3], c = G = A[4], f = Z = A[5], A.length === 6 ? (_ = Math.sqrt(K * K + J * J), g = Math.sqrt(ue * ue + oe * oe), p = K || J ? Tn(J, K) * Gt : 0, O = oe || ue ? Tn(oe, ue) * Gt + p : 0, O && (g *= Math.abs(Math.cos(O * Fn))), r.svg && (c -= v - (v * K + V * oe), f -= V - (v * J + V * ue))) : (bt = A[6], it = A[7], nt = A[8], rt = A[9], Re = A[10], ze = A[11], c = A[12], f = A[13], d = A[14], R = Tn(bt, Re), y = R * Gt, R && (C = Math.cos(-R), W = Math.sin(-R), L = G * C + nt * W, B = Z * C + rt * W, ye = bt * C + Re * W, nt = G * -W + nt * C, rt = Z * -W + rt * C, Re = bt * -W + Re * C, ze = it * -W + ze * C, G = L, Z = B, bt = ye), R = Tn(-oe, Re), E = R * Gt, R && (C = Math.cos(-R), W = Math.sin(-R), L = K * C - nt * W, B = J * C - rt * W, ye = oe * C - Re * W, ze = ue * W + ze * C, K = L, J = B, oe = ye), R = Tn(J, K), p = R * Gt, R && (C = Math.cos(R), W = Math.sin(R), L = K * C + J * W, B = G * C + Z * W, J = J * C - K * W, Z = Z * C - G * W, K = L, G = B), y && Math.abs(y) + Math.abs(p) > 359.9 && (y = p = 0, E = 180 - E), _ = pe(Math.sqrt(K * K + J * J + oe * oe)), g = pe(Math.sqrt(Z * Z + bt * bt)), R = Tn(G, Z), O = Math.abs(R) > 2e-4 ? R * Gt : 0, T = ze ? 1 / (ze < 0 ? -ze : ze) : 0), r.svg && (L = e.getAttribute("transform"), r.forceCSS = e.setAttribute("transform", "") || !Eu(yt(e, fe)), L && e.setAttribute("transform", L))), Math.abs(O) > 90 && Math.abs(O) < 270 && (s ? (_ *= -1, O += p <= 0 ? 180 : -180, p += p <= 0 ? 180 : -180) : (g *= -1, O += O <= 0 ? 180 : -180)), n = n || r.uncache, r.x = c - ((r.xPercent = c && (!n && r.xPercent || (Math.round(e.offsetWidth / 2) === Math.round(-c) ? -50 : 0))) ? e.offsetWidth * r.xPercent / 100 : 0) + o, r.y = f - ((r.yPercent = f && (!n && r.yPercent || (Math.round(e.offsetHeight / 2) === Math.round(-f) ? -50 : 0))) ? e.offsetHeight * r.yPercent / 100 : 0) + o, r.z = d + o, r.scaleX = pe(_), r.scaleY = pe(g), r.rotation = pe(p) + l, r.rotationX = pe(y) + l, r.rotationY = pe(E) + l, r.skewX = O + l, r.skewY = b + l, r.transformPerspective = T + o, (r.zOrigin = parseFloat(u.split(" ")[2]) || 0) && (i[ut] = di(u)), r.xOffset = r.yOffset = 0, r.force3D = Ye.force3D, r.renderTransform = r.svg ? cp : vu ? Ou : up, r.uncache = 0, r;
}, di = function(e) {
  return (e = e.split(" "))[0] + " " + e[1];
}, Ki = function(e, n, r) {
  var i = De(n);
  return pe(parseFloat(n) + parseFloat(Yt(e, "x", r + "px", i))) + i;
}, up = function(e, n) {
  n.z = "0px", n.rotationY = n.rotationX = "0deg", n.force3D = 0, Ou(e, n);
}, Qt = "0deg", tr = "0px", Jt = ") ", Ou = function(e, n) {
  var r = n || this, i = r.xPercent, s = r.yPercent, o = r.x, l = r.y, a = r.z, u = r.rotation, c = r.rotationY, f = r.rotationX, d = r.skewX, _ = r.skewY, g = r.scaleX, p = r.scaleY, y = r.transformPerspective, E = r.force3D, O = r.target, b = r.zOrigin, T = "", v = E === "auto" && e && e !== 1 || E === !0;
  if (b && (f !== Qt || c !== Qt)) {
    var V = parseFloat(c) * Fn, A = Math.sin(V), R = Math.cos(V), C;
    V = parseFloat(f) * Fn, C = Math.cos(V), o = Ki(O, o, A * C * -b), l = Ki(O, l, -Math.sin(V) * -b), a = Ki(O, a, R * C * -b + b);
  }
  y !== tr && (T += "perspective(" + y + Jt), (i || s) && (T += "translate(" + i + "%, " + s + "%) "), (v || o !== tr || l !== tr || a !== tr) && (T += a !== tr || v ? "translate3d(" + o + ", " + l + ", " + a + ") " : "translate(" + o + ", " + l + Jt), u !== Qt && (T += "rotate(" + u + Jt), c !== Qt && (T += "rotateY(" + c + Jt), f !== Qt && (T += "rotateX(" + f + Jt), (d !== Qt || _ !== Qt) && (T += "skew(" + d + ", " + _ + Jt), (g !== 1 || p !== 1) && (T += "scale(" + g + ", " + p + Jt), O.style[fe] = T || "translate(0, 0)";
}, cp = function(e, n) {
  var r = n || this, i = r.xPercent, s = r.yPercent, o = r.x, l = r.y, a = r.rotation, u = r.skewX, c = r.skewY, f = r.scaleX, d = r.scaleY, _ = r.target, g = r.xOrigin, p = r.yOrigin, y = r.xOffset, E = r.yOffset, O = r.forceCSS, b = parseFloat(o), T = parseFloat(l), v, V, A, R, C;
  a = parseFloat(a), u = parseFloat(u), c = parseFloat(c), c && (c = parseFloat(c), u += c, a += c), a || u ? (a *= Fn, u *= Fn, v = Math.cos(a) * f, V = Math.sin(a) * f, A = Math.sin(a - u) * -d, R = Math.cos(a - u) * d, u && (c *= Fn, C = Math.tan(u - c), C = Math.sqrt(1 + C * C), A *= C, R *= C, c && (C = Math.tan(c), C = Math.sqrt(1 + C * C), v *= C, V *= C)), v = pe(v), V = pe(V), A = pe(A), R = pe(R)) : (v = f, R = d, V = A = 0), (b && !~(o + "").indexOf("px") || T && !~(l + "").indexOf("px")) && (b = Yt(_, "x", o, "px"), T = Yt(_, "y", l, "px")), (g || p || y || E) && (b = pe(b + g - (g * v + p * A) + y), T = pe(T + p - (g * V + p * R) + E)), (i || s) && (C = _.getBBox(), b = pe(b + i / 100 * C.width), T = pe(T + s / 100 * C.height)), C = "matrix(" + v + "," + V + "," + A + "," + R + "," + b + "," + T + ")", _.setAttribute("transform", C), O && (_.style[fe] = C);
}, fp = function(e, n, r, i, s) {
  var o = 360, l = be(s), a = parseFloat(s) * (l && ~s.indexOf("rad") ? Gt : 1), u = a - i, c = i + u + "deg", f, d;
  return l && (f = s.split("_")[1], f === "short" && (u %= o, u !== u % (o / 2) && (u += u < 0 ? o : -o)), f === "cw" && u < 0 ? u = (u + o * ml) % o - ~~(u / o) * o : f === "ccw" && u > 0 && (u = (u - o * ml) % o - ~~(u / o) * o)), e._pt = d = new $e(e._pt, n, r, i, u, Xh), d.e = c, d.u = "deg", e._props.push(r), d;
}, El = function(e, n) {
  for (var r in n)
    e[r] = n[r];
  return e;
}, dp = function(e, n, r) {
  var i = El({}, r._gsap), s = "perspective,force3D,transformOrigin,svgOrigin", o = r.style, l, a, u, c, f, d, _, g;
  i.svg ? (u = r.getAttribute("transform"), r.setAttribute("transform", ""), o[fe] = n, l = Dr(r, 1), wr(r, fe), r.setAttribute("transform", u)) : (u = getComputedStyle(r)[fe], o[fe] = n, l = Dr(r, 1), o[fe] = u);
  for (a in St)
    u = i[a], c = l[a], u !== c && s.indexOf(a) < 0 && (_ = De(u), g = De(c), f = _ !== g ? Yt(r, a, u, g) : parseFloat(u), d = parseFloat(c), e._pt = new $e(e._pt, l, a, f, d - f, Ns), e._pt.u = g || 0, e._props.push(a));
  El(l, i);
};
Fe("padding,margin,Width,Radius", function(t, e) {
  var n = "Top", r = "Right", i = "Bottom", s = "Left", o = (e < 3 ? [n, r, i, s] : [n + s, n + r, i + r, i + s]).map(function(l) {
    return e < 2 ? t + l : "border" + l + t;
  });
  fi[e > 1 ? "border" + t : t] = function(l, a, u, c, f) {
    var d, _;
    if (arguments.length < 4)
      return d = o.map(function(g) {
        return Tt(l, g, u);
      }), _ = d.join(" "), _.split(d[0]).length === 5 ? d[0] : _;
    d = (c + "").split(" "), _ = {}, o.forEach(function(g, p) {
      return _[g] = d[p] = d[p] || d[(p - 1) / 2 | 0];
    }), l.init(a, _, f);
  };
});
var Nu = {
  name: "css",
  register: Ts,
  targetTest: function(e) {
    return e.style && e.nodeType;
  },
  init: function(e, n, r, i, s) {
    var o = this._props, l = e.style, a = r.vars.startAt, u, c, f, d, _, g, p, y, E, O, b, T, v, V, A, R;
    go || Ts(), this.styles = this.styles || gu(e), R = this.styles.props, this.tween = r;
    for (p in n)
      if (p !== "autoRound" && (c = n[p], !(je[p] && ou(p, n, r, i, e, s)))) {
        if (_ = typeof c, g = fi[p], _ === "function" && (c = c.call(r, i, e, s), _ = typeof c), _ === "string" && ~c.indexOf("random(") && (c = Er(c)), g)
          g(this, e, p, c, r) && (A = 1);
        else if (p.substr(0, 2) === "--")
          u = (getComputedStyle(e).getPropertyValue(p) + "").trim(), c += "", Bt.lastIndex = 0, Bt.test(u) || (y = De(u), E = De(c)), E ? y !== E && (u = Yt(e, p, u, E) + E) : y && (c += y), this.add(l, "setProperty", u, c, i, s, 0, 0, p), o.push(p), R.push(p, 0, l[p]);
        else if (_ !== "undefined") {
          if (a && p in a ? (u = typeof a[p] == "function" ? a[p].call(r, i, e, s) : a[p], be(u) && ~u.indexOf("random(") && (u = Er(u)), De(u + "") || (u += Ye.units[p] || De(Tt(e, p)) || ""), (u + "").charAt(1) === "=" && (u = Tt(e, p))) : u = Tt(e, p), d = parseFloat(u), O = _ === "string" && c.charAt(1) === "=" && c.substr(0, 2), O && (c = c.substr(2)), f = parseFloat(c), p in mt && (p === "autoAlpha" && (d === 1 && Tt(e, "visibility") === "hidden" && f && (d = 0), R.push("visibility", 0, l.visibility), $t(this, l, "visibility", d ? "inherit" : "hidden", f ? "inherit" : "hidden", !f)), p !== "scale" && p !== "transform" && (p = mt[p], ~p.indexOf(",") && (p = p.split(",")[0]))), b = p in St, b) {
            if (this.styles.save(p), T || (v = e._gsap, v.renderTransform && !n.parseTransform || Dr(e, n.parseTransform), V = n.smoothOrigin !== !1 && v.smooth, T = this._pt = new $e(this._pt, l, fe, 0, 1, v.renderTransform, v, 0, -1), T.dep = 1), p === "scale")
              this._pt = new $e(this._pt, v, "scaleY", v.scaleY, (O ? An(v.scaleY, O + f) : f) - v.scaleY || 0, Ns), this._pt.u = 0, o.push("scaleY", p), p += "X";
            else if (p === "transformOrigin") {
              R.push(ut, 0, l[ut]), c = lp(c), v.svg ? Ds(e, c, 0, V, 0, this) : (E = parseFloat(c.split(" ")[2]) || 0, E !== v.zOrigin && $t(this, v, "zOrigin", v.zOrigin, E), $t(this, l, p, di(u), di(c)));
              continue;
            } else if (p === "svgOrigin") {
              Ds(e, c, 1, V, 0, this);
              continue;
            } else if (p in bu) {
              fp(this, v, p, d, O ? An(d, O + c) : c);
              continue;
            } else if (p === "smoothOrigin") {
              $t(this, v, "smooth", v.smooth, c);
              continue;
            } else if (p === "force3D") {
              v[p] = c;
              continue;
            } else if (p === "transform") {
              dp(this, c, e);
              continue;
            }
          } else
            p in l || (p = Hn(p) || p);
          if (b || (f || f === 0) && (d || d === 0) && !Kh.test(c) && p in l)
            y = (u + "").substr((d + "").length), f || (f = 0), E = De(c) || (p in Ye.units ? Ye.units[p] : y), y !== E && (d = Yt(e, p, u, E)), this._pt = new $e(this._pt, b ? v : l, p, d, (O ? An(d, O + f) : f) - d, !b && (E === "px" || p === "zIndex") && n.autoRound !== !1 ? Qh : Ns), this._pt.u = E || 0, y !== E && E !== "%" && (this._pt.b = u, this._pt.r = qh);
          else if (p in l)
            op.call(this, e, p, u, O ? O + c : c);
          else if (p in e)
            this.add(e, p, u || e[p], O ? O + c : c, i, s);
          else if (p !== "parseTransform") {
            lo(p, c);
            continue;
          }
          b || (p in l ? R.push(p, 0, l[p]) : R.push(p, 1, u || e[p])), o.push(p);
        }
      }
    A && du(this);
  },
  render: function(e, n) {
    if (n.tween._time || !vo())
      for (var r = n._pt; r; )
        r.r(e, r.d), r = r._next;
    else
      n.styles.revert();
  },
  get: Tt,
  aliases: mt,
  getSetter: function(e, n, r) {
    var i = mt[n];
    return i && i.indexOf(",") < 0 && (n = i), n in St && n !== ut && (e._gsap.x || Tt(e, "x")) ? r && _l === r ? n === "scale" ? ep : Gh : (_l = r || {}) && (n === "scale" ? tp : np) : e.style && !io(e.style[n]) ? Jh : ~n.indexOf("-") ? Zh : _o(e, n);
  },
  core: {
    _removeProperty: wr,
    _getMatrix: xo
  }
};
Le.utils.checkPrefix = Hn;
Le.core.getStyleSaver = gu;
(function(t, e, n, r) {
  var i = Fe(t + "," + e + "," + n, function(s) {
    St[s] = 1;
  });
  Fe(e, function(s) {
    Ye.units[s] = "deg", bu[s] = 1;
  }), mt[i[13]] = t + "," + e, Fe(r, function(s) {
    var o = s.split(":");
    mt[o[1]] = i[o[0]];
  });
})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent", "rotation,rotationX,rotationY,skewX,skewY", "transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective", "0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");
Fe("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective", function(t) {
  Ye.units[t] = "px";
});
Le.registerPlugin(Nu);
var Cs = Le.registerPlugin(Nu) || Le;
Cs.core.Tween;
const hp = ["fill"], pp = /* @__PURE__ */ xn({
  __name: "CurveMask",
  props: {
    zIndex: { default: 5 },
    maskColor: { default: "black" }
  },
  emits: [
    "open-start",
    "open-end",
    "close-start",
    "close-end"
  ],
  setup(t, { expose: e, emit: n }) {
    qn((u) => ({
      "09e7e913": u.zIndex
    }));
    const r = n, i = se(!1), s = se(null), o = se(null);
    return e({
      open: () => {
        if (i.value)
          return;
        i.value = !0, Cs.timeline({
          onStart: () => {
            s.value && (s.value.style.pointerEvents = "auto"), r("open-start");
          },
          onComplete: () => {
            i.value = !1;
          }
        }).set(o.value, {
          attr: { d: "M 0 100 V 100 Q 50 100 100 100 V 100 z" }
        }).to(
          o.value,
          {
            duration: 0.8,
            ease: "power4.in",
            attr: { d: "M 0 100 V 50 Q 50 0 100 50 V 100 z" }
          },
          0
        ).to(o.value, {
          duration: 0.3,
          ease: "power2",
          attr: { d: "M 0 100 V 0 Q 50 0 100 0 V 100 z" },
          onComplete: () => {
            r("open-end");
          }
        });
      },
      close: () => {
        if (i.value)
          return;
        i.value = !0, Cs.timeline({
          onStart: () => {
            s.value && (s.value.style.pointerEvents = "none"), r("close-start");
          },
          onComplete: () => {
            i.value = !1;
          }
        }).set(o.value, {
          attr: { d: "M 0 0 V 100 Q 50 100 100 100 V 0 z" }
        }).to(o.value, {
          duration: 0.3,
          ease: "power2.in",
          attr: { d: "M 0 0 V 50 Q 50 0 100 50 V 0 z" }
        }).to(o.value, {
          duration: 0.8,
          ease: "power4",
          attr: { d: "M 0 0 V 0 Q 50 0 100 0 V 0 z" },
          onComplete: () => {
            r("close-end");
          }
        });
      }
    }), (u, c) => (bn(), Kn("svg", {
      class: "curve-mask",
      width: "100%",
      height: "100%",
      viewBox: "0 0 100 100",
      preserveAspectRatio: "none",
      fill: u.maskColor,
      ref_key: "overlay",
      ref: s
    }, [
      Js("path", {
        class: "curve-mask__path",
        "vector-effect": "non-scaling-stroke",
        d: "M 0 100 V 100 Q 50 100 100 100 V 100 z",
        ref_key: "overlayPath",
        ref: o
      }, null, 512)
    ], 8, hp));
  }
}), _p = `.curve-mask{position:absolute;z-index:var(--09e7e913);top:0;left:0;width:100%;height:100%;pointer-events:none}
`, mp = /* @__PURE__ */ Qn(pp, [["styles", [_p]]]), gp = /* @__PURE__ */ Xn(mp);
function vp(t = "curve-mask") {
  customElements.define(t, gp);
}
const yp = { class: "text-underline" }, xp = /* @__PURE__ */ xn({
  __name: "TextUnderline",
  props: {
    lineColor: { default: "white" },
    lineHeight: { default: "3px" },
    hoverTextColor: { default: "currentColor" }
  },
  setup(t) {
    return qn((e) => ({
      "197a2a41": e.lineColor,
      "1dc4f209": e.lineHeight,
      "6ce51d28": e.hoverTextColor
    })), (e, n) => (bn(), Kn("div", yp, [
      Ks(e.$slots, "default")
    ]));
  }
}), bp = `.text-underline{--text-underline-line-color: var(--197a2a41);--text-underline-line-height: var(--1dc4f209);--text-underline-hover-text-color: var(--6ce51d28);position:relative;display:inline-flex;transition:.5s}.text-underline:after{position:absolute;content:"";top:100%;left:0;width:100%;height:var(--text-underline-line-height);background:var(--text-underline-line-color);transform:scaleX(0);transform-origin:right;transition:transform .5s}.text-underline:hover{color:var(--text-underline-hover-text-color)}.text-underline:hover:after{transform:scaleX(1);transform-origin:left}
`, Ep = /* @__PURE__ */ Qn(xp, [["styles", [bp]]]), Op = /* @__PURE__ */ Xn(Ep);
function Np(t = "text-underline") {
  customElements.define(t, Op);
}
const wp = /* @__PURE__ */ xn({
  __name: "TextFloat",
  props: {
    text: {},
    textColor: { default: "white" },
    textSize: { default: "1rem" },
    textWeight: { default: "normal" },
    textFont: { default: "" },
    textLeading: { default: "normal" },
    textStyle: { default: "normal" },
    textWhiteSpace: { default: "normal" },
    stagger: { default: 0 }
  },
  setup(t) {
    qn((r) => ({
      "0c97ceb2": r.textColor,
      "93c6ca5c": r.textSize,
      b016e5ee: r.textWeight,
      "93d271c0": r.textFont,
      10467295: r.textLeading,
      "0d7bbd00": r.textStyle,
      "91afff24": r.textWhiteSpace
    }));
    const e = t, n = se(null);
    return Yn(() => {
      const r = e.text;
      if (n.value && r) {
        let i = r.split("");
        n.value.textContent = "", i.forEach((s, o) => {
          var a;
          let l = document.createElement("span");
          l.textContent = s, l.style.transitionDelay = `${o / 20 * e.stagger}s`, l.dataset.text = s, (a = n.value) == null || a.append(l);
        });
      }
    }), (r, i) => (bn(), Kn("div", {
      class: "text-float",
      ref_key: "parent",
      ref: n
    }, null, 512));
  }
}), Tp = `.text-float{--text-float-color: var(--0c97ceb2);--text-float-size: var(--93c6ca5c);--text-float-weight: var(--b016e5ee);--text-float-font: var(--93d271c0);--text-float-leading: var(--10467295);--text-float-style: var(--0d7bbd00);--text-float-white-space: var(--91afff24);display:flex;overflow:hidden}.text-float span{position:relative;transition:.3s;color:var(--text-float-color);font-size:var(--text-float-size);font-weight:var(--text-float-weight);font-family:var(--text-float-font);line-height:var(--text-float-leading);font-style:var(--text-float-style);white-space:var(--text-float-white-space)}.text-float span:before{position:absolute;content:attr(data-text);transform:translateY(130%)}.text-float:hover span{transform:translateY(-130%)}
`, Dp = /* @__PURE__ */ Qn(wp, [["styles", [Tp]]]), Cp = /* @__PURE__ */ Xn(Dp);
function Pp(t = "text-float") {
  customElements.define(t, Cp);
}
function Sp() {
  Sd(), Kd(), Zd(), vp(), Np(), Pp();
}
export {
  Sp as register
};
