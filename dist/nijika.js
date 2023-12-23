function Yn(t, e) {
  const n = /* @__PURE__ */ Object.create(null), r = t.split(",");
  for (let i = 0; i < r.length; i++)
    n[r[i]] = !0;
  return e ? (i) => !!n[i.toLowerCase()] : (i) => !!n[i];
}
const ie = process.env.NODE_ENV !== "production" ? Object.freeze({}) : {}, An = process.env.NODE_ENV !== "production" ? Object.freeze([]) : [], be = () => {
}, Ol = () => !1, Sr = (t) => t.charCodeAt(0) === 111 && t.charCodeAt(1) === 110 && // uppercase letter
(t.charCodeAt(2) > 122 || t.charCodeAt(2) < 97), Qr = (t) => t.startsWith("onUpdate:"), ae = Object.assign, Ps = (t, e) => {
  const n = t.indexOf(e);
  n > -1 && t.splice(n, 1);
}, Du = Object.prototype.hasOwnProperty, X = (t, e) => Du.call(t, e), B = Array.isArray, Rn = (t) => pi(t) === "[object Map]", Cu = (t) => pi(t) === "[object Set]", U = (t) => typeof t == "function", ge = (t) => typeof t == "string", hi = (t) => typeof t == "symbol", le = (t) => t !== null && typeof t == "object", Vs = (t) => (le(t) || U(t)) && U(t.then) && U(t.catch), Su = Object.prototype.toString, pi = (t) => Su.call(t), Ms = (t) => pi(t).slice(8, -1), Pu = (t) => pi(t) === "[object Object]", As = (t) => ge(t) && t !== "NaN" && t[0] !== "-" && "" + parseInt(t, 10) === t, Br = /* @__PURE__ */ Yn(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), Vu = /* @__PURE__ */ Yn(
  "bind,cloak,else-if,else,for,html,if,model,on,once,pre,show,slot,text,memo"
), _i = (t) => {
  const e = /* @__PURE__ */ Object.create(null);
  return (n) => e[n] || (e[n] = t(n));
}, Mu = /-(\w)/g, Dt = _i((t) => t.replace(Mu, (e, n) => n ? n.toUpperCase() : "")), Au = /\B([A-Z])/g, We = _i(
  (t) => t.replace(Au, "-$1").toLowerCase()
), mi = _i((t) => t.charAt(0).toUpperCase() + t.slice(1)), Zt = _i((t) => t ? `on${mi(t)}` : ""), _n = (t, e) => !Object.is(t, e), Gn = (t, e) => {
  for (let n = 0; n < t.length; n++)
    t[n](e);
}, Jr = (t, e, n) => {
  Object.defineProperty(t, e, {
    configurable: !0,
    enumerable: !1,
    value: n
  });
}, Ru = (t) => {
  const e = parseFloat(t);
  return isNaN(e) ? t : e;
}, wo = (t) => {
  const e = ge(t) ? Number(t) : NaN;
  return isNaN(e) ? t : e;
};
let To;
const Zr = () => To || (To = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function gi(t) {
  if (B(t)) {
    const e = {};
    for (let n = 0; n < t.length; n++) {
      const r = t[n], i = ge(r) ? $u(r) : gi(r);
      if (i)
        for (const s in i)
          e[s] = i[s];
    }
    return e;
  } else if (ge(t) || le(t))
    return t;
}
const ku = /;(?![^(]*\))/g, Iu = /:([^]+)/, Fu = /\/\*[^]*?\*\//g;
function $u(t) {
  const e = {};
  return t.replace(Fu, "").split(ku).forEach((n) => {
    if (n) {
      const r = n.split(Iu);
      r.length > 1 && (e[r[0].trim()] = r[1].trim());
    }
  }), e;
}
function Rs(t) {
  let e = "";
  if (ge(t))
    e = t;
  else if (B(t))
    for (let n = 0; n < t.length; n++) {
      const r = Rs(t[n]);
      r && (e += r + " ");
    }
  else if (le(t))
    for (const n in t)
      t[n] && (e += n + " ");
  return e.trim();
}
const Lu = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", zu = /* @__PURE__ */ Yn(Lu);
function Nl(t) {
  return !!t || t === "";
}
function Gr(t, ...e) {
  console.warn(`[Vue warn] ${t}`, ...e);
}
let je;
class Bu {
  constructor(e = !1) {
    this.detached = e, this._active = !0, this.effects = [], this.cleanups = [], this.parent = je, !e && je && (this.index = (je.scopes || (je.scopes = [])).push(
      this
    ) - 1);
  }
  get active() {
    return this._active;
  }
  run(e) {
    if (this._active) {
      const n = je;
      try {
        return je = this, e();
      } finally {
        je = n;
      }
    } else
      process.env.NODE_ENV !== "production" && Gr("cannot run an inactive effect scope.");
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    je = this;
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    je = this.parent;
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
function ju(t, e = je) {
  e && e.active && e.effects.push(t);
}
function wl() {
  return je;
}
function Uu(t) {
  je ? je.cleanups.push(t) : process.env.NODE_ENV !== "production" && Gr(
    "onScopeDispose() is called when there is no active effect scope to be associated with."
  );
}
const mr = (t) => {
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
}, qi = /* @__PURE__ */ new WeakMap();
let rr = 0, jt = 1;
const Qi = 30;
let Me;
const rn = Symbol(process.env.NODE_ENV !== "production" ? "iterate" : ""), Ji = Symbol(process.env.NODE_ENV !== "production" ? "Map key iterate" : "");
class ks {
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
      return this.parent = Me, Me = this, Lt = !0, jt = 1 << ++rr, rr <= Qi ? Hu(this) : Do(this), this.fn();
    } finally {
      rr <= Qi && Wu(this), jt = 1 << --rr, Me = this.parent, Lt = n, this.parent = void 0, this.deferStop && this.stop();
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
function yn() {
  Cl.push(Lt), Lt = !1;
}
function xn() {
  const t = Cl.pop();
  Lt = t === void 0 ? !0 : t;
}
function Oe(t, e, n) {
  if (Lt && Me) {
    let r = qi.get(t);
    r || qi.set(t, r = /* @__PURE__ */ new Map());
    let i = r.get(n);
    i || r.set(n, i = mr());
    const s = process.env.NODE_ENV !== "production" ? { effect: Me, target: t, type: e, key: n } : void 0;
    Zi(i, s);
  }
}
function Zi(t, e) {
  let n = !1;
  rr <= Qi ? Dl(t) || (t.n |= jt, n = !Tl(t)) : n = !t.has(Me), n && (t.add(Me), Me.deps.push(t), process.env.NODE_ENV !== "production" && Me.onTrack && Me.onTrack(
    ae(
      {
        effect: Me
      },
      e
    )
  ));
}
function mt(t, e, n, r, i, s) {
  const o = qi.get(t);
  if (!o)
    return;
  let l = [];
  if (e === "clear")
    l = [...o.values()];
  else if (n === "length" && B(t)) {
    const u = Number(r);
    o.forEach((c, f) => {
      (f === "length" || !hi(f) && f >= u) && l.push(c);
    });
  } else
    switch (n !== void 0 && l.push(o.get(n)), e) {
      case "add":
        B(t) ? As(n) && l.push(o.get("length")) : (l.push(o.get(rn)), Rn(t) && l.push(o.get(Ji)));
        break;
      case "delete":
        B(t) || (l.push(o.get(rn)), Rn(t) && l.push(o.get(Ji)));
        break;
      case "set":
        Rn(t) && l.push(o.get(rn));
        break;
    }
  const a = process.env.NODE_ENV !== "production" ? { target: t, type: e, key: n, newValue: r, oldValue: i, oldTarget: s } : void 0;
  if (l.length === 1)
    l[0] && (process.env.NODE_ENV !== "production" ? Sn(l[0], a) : Sn(l[0]));
  else {
    const u = [];
    for (const c of l)
      c && u.push(...c);
    process.env.NODE_ENV !== "production" ? Sn(mr(u), a) : Sn(mr(u));
  }
}
function Sn(t, e) {
  const n = B(t) ? t : [...t];
  for (const r of n)
    r.computed && Co(r, e);
  for (const r of n)
    r.computed || Co(r, e);
}
function Co(t, e) {
  (t !== Me || t.allowRecurse) && (process.env.NODE_ENV !== "production" && t.onTrigger && t.onTrigger(ae({ effect: t }, e)), t.scheduler ? t.scheduler() : t.run());
}
const Yu = /* @__PURE__ */ Yn("__proto__,__v_isRef,__isVue"), Sl = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((t) => t !== "arguments" && t !== "caller").map((t) => Symbol[t]).filter(hi)
), So = /* @__PURE__ */ Ku();
function Ku() {
  const t = {};
  return ["includes", "indexOf", "lastIndexOf"].forEach((e) => {
    t[e] = function(...n) {
      const r = Y(this);
      for (let s = 0, o = this.length; s < o; s++)
        Oe(r, "get", s + "");
      const i = r[e](...n);
      return i === -1 || i === !1 ? r[e](...n.map(Y)) : i;
    };
  }), ["push", "pop", "shift", "unshift", "splice"].forEach((e) => {
    t[e] = function(...n) {
      yn();
      const r = Y(this)[e].apply(this, n);
      return xn(), r;
    };
  }), t;
}
function Xu(t) {
  const e = Y(this);
  return Oe(e, "has", t), e.hasOwnProperty(t);
}
class Pl {
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
    if (n === "__v_raw")
      return r === (i ? s ? Fl : Il : s ? kl : Rl).get(e) || // receiver is not the reactive proxy, but has the same prototype
      // this means the reciever is a user proxy of the reactive proxy
      Object.getPrototypeOf(e) === Object.getPrototypeOf(r) ? e : void 0;
    const o = B(e);
    if (!i) {
      if (o && X(So, n))
        return Reflect.get(So, n, r);
      if (n === "hasOwnProperty")
        return Xu;
    }
    const l = Reflect.get(e, n, r);
    return (hi(n) ? Sl.has(n) : Yu(n)) || (i || Oe(e, "get", n), s) ? l : Ne(l) ? o && As(n) ? l : l.value : le(l) ? i ? $l(l) : Fs(l) : l;
  }
}
class Vl extends Pl {
  constructor(e = !1) {
    super(!1, e);
  }
  set(e, n, r, i) {
    let s = e[n];
    if (!this._shallow) {
      const a = Ut(s);
      if (!ei(r) && !Ut(r) && (s = Y(s), r = Y(r)), !B(e) && Ne(s) && !Ne(r))
        return a ? !1 : (s.value = r, !0);
    }
    const o = B(e) && As(n) ? Number(n) < e.length : X(e, n), l = Reflect.set(e, n, r, i);
    return e === Y(i) && (o ? _n(r, s) && mt(e, "set", n, r, s) : mt(e, "add", n, r)), l;
  }
  deleteProperty(e, n) {
    const r = X(e, n), i = e[n], s = Reflect.deleteProperty(e, n);
    return s && r && mt(e, "delete", n, void 0, i), s;
  }
  has(e, n) {
    const r = Reflect.has(e, n);
    return (!hi(n) || !Sl.has(n)) && Oe(e, "has", n), r;
  }
  ownKeys(e) {
    return Oe(
      e,
      "iterate",
      B(e) ? "length" : rn
    ), Reflect.ownKeys(e);
  }
}
class Ml extends Pl {
  constructor(e = !1) {
    super(!0, e);
  }
  set(e, n) {
    return process.env.NODE_ENV !== "production" && Gr(
      `Set operation on key "${String(n)}" failed: target is readonly.`,
      e
    ), !0;
  }
  deleteProperty(e, n) {
    return process.env.NODE_ENV !== "production" && Gr(
      `Delete operation on key "${String(n)}" failed: target is readonly.`,
      e
    ), !0;
  }
}
const qu = /* @__PURE__ */ new Vl(), Qu = /* @__PURE__ */ new Ml(), Ju = /* @__PURE__ */ new Vl(
  !0
), Zu = /* @__PURE__ */ new Ml(!0), Is = (t) => t, vi = (t) => Reflect.getPrototypeOf(t);
function Rr(t, e, n = !1, r = !1) {
  t = t.__v_raw;
  const i = Y(t), s = Y(e);
  n || (_n(e, s) && Oe(i, "get", e), Oe(i, "get", s));
  const { has: o } = vi(i), l = r ? Is : n ? $s : gr;
  if (o.call(i, e))
    return l(t.get(e));
  if (o.call(i, s))
    return l(t.get(s));
  t !== i && t.get(e);
}
function kr(t, e = !1) {
  const n = this.__v_raw, r = Y(n), i = Y(t);
  return e || (_n(t, i) && Oe(r, "has", t), Oe(r, "has", i)), t === i ? n.has(t) : n.has(t) || n.has(i);
}
function Ir(t, e = !1) {
  return t = t.__v_raw, !e && Oe(Y(t), "iterate", rn), Reflect.get(t, "size", t);
}
function Po(t) {
  t = Y(t);
  const e = Y(this);
  return vi(e).has.call(e, t) || (e.add(t), mt(e, "add", t, t)), this;
}
function Vo(t, e) {
  e = Y(e);
  const n = Y(this), { has: r, get: i } = vi(n);
  let s = r.call(n, t);
  s ? process.env.NODE_ENV !== "production" && Al(n, r, t) : (t = Y(t), s = r.call(n, t));
  const o = i.call(n, t);
  return n.set(t, e), s ? _n(e, o) && mt(n, "set", t, e, o) : mt(n, "add", t, e), this;
}
function Mo(t) {
  const e = Y(this), { has: n, get: r } = vi(e);
  let i = n.call(e, t);
  i ? process.env.NODE_ENV !== "production" && Al(e, n, t) : (t = Y(t), i = n.call(e, t));
  const s = r ? r.call(e, t) : void 0, o = e.delete(t);
  return i && mt(e, "delete", t, void 0, s), o;
}
function Ao() {
  const t = Y(this), e = t.size !== 0, n = process.env.NODE_ENV !== "production" ? Rn(t) ? new Map(t) : new Set(t) : void 0, r = t.clear();
  return e && mt(t, "clear", void 0, void 0, n), r;
}
function Fr(t, e) {
  return function(r, i) {
    const s = this, o = s.__v_raw, l = Y(o), a = e ? Is : t ? $s : gr;
    return !t && Oe(l, "iterate", rn), o.forEach((u, c) => r.call(i, a(u), a(c), s));
  };
}
function $r(t, e, n) {
  return function(...r) {
    const i = this.__v_raw, s = Y(i), o = Rn(s), l = t === "entries" || t === Symbol.iterator && o, a = t === "keys" && o, u = i[t](...r), c = n ? Is : e ? $s : gr;
    return !e && Oe(
      s,
      "iterate",
      a ? Ji : rn
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
        `${mi(t)} operation ${n}failed: target is readonly.`,
        Y(this)
      );
    }
    return t === "delete" ? !1 : t === "clear" ? void 0 : this;
  };
}
function Gu() {
  const t = {
    get(s) {
      return Rr(this, s);
    },
    get size() {
      return Ir(this);
    },
    has: kr,
    add: Po,
    set: Vo,
    delete: Mo,
    clear: Ao,
    forEach: Fr(!1, !1)
  }, e = {
    get(s) {
      return Rr(this, s, !1, !0);
    },
    get size() {
      return Ir(this);
    },
    has: kr,
    add: Po,
    set: Vo,
    delete: Mo,
    clear: Ao,
    forEach: Fr(!1, !0)
  }, n = {
    get(s) {
      return Rr(this, s, !0);
    },
    get size() {
      return Ir(this, !0);
    },
    has(s) {
      return kr.call(this, s, !0);
    },
    add: Mt("add"),
    set: Mt("set"),
    delete: Mt("delete"),
    clear: Mt("clear"),
    forEach: Fr(!0, !1)
  }, r = {
    get(s) {
      return Rr(this, s, !0, !0);
    },
    get size() {
      return Ir(this, !0);
    },
    has(s) {
      return kr.call(this, s, !0);
    },
    add: Mt("add"),
    set: Mt("set"),
    delete: Mt("delete"),
    clear: Mt("clear"),
    forEach: Fr(!0, !0)
  };
  return ["keys", "values", "entries", Symbol.iterator].forEach((s) => {
    t[s] = $r(
      s,
      !1,
      !1
    ), n[s] = $r(
      s,
      !0,
      !1
    ), e[s] = $r(
      s,
      !1,
      !0
    ), r[s] = $r(
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
function yi(t, e) {
  const n = e ? t ? rc : nc : t ? tc : ec;
  return (r, i, s) => i === "__v_isReactive" ? !t : i === "__v_isReadonly" ? t : i === "__v_raw" ? r : Reflect.get(
    X(n, i) && i in r ? n : r,
    i,
    s
  );
}
const ic = {
  get: /* @__PURE__ */ yi(!1, !1)
}, sc = {
  get: /* @__PURE__ */ yi(!1, !0)
}, oc = {
  get: /* @__PURE__ */ yi(!0, !1)
}, lc = {
  get: /* @__PURE__ */ yi(!0, !0)
};
function Al(t, e, n) {
  const r = Y(n);
  if (r !== n && e.call(t, r)) {
    const i = Ms(t);
    console.warn(
      `Reactive ${i} contains both the raw and reactive versions of the same object${i === "Map" ? " as keys" : ""}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`
    );
  }
}
const Rl = /* @__PURE__ */ new WeakMap(), kl = /* @__PURE__ */ new WeakMap(), Il = /* @__PURE__ */ new WeakMap(), Fl = /* @__PURE__ */ new WeakMap();
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
  return Ut(t) ? t : xi(
    t,
    !1,
    qu,
    ic,
    Rl
  );
}
function cc(t) {
  return xi(
    t,
    !1,
    Ju,
    sc,
    kl
  );
}
function $l(t) {
  return xi(
    t,
    !0,
    Qu,
    oc,
    Il
  );
}
function ir(t) {
  return xi(
    t,
    !0,
    Zu,
    lc,
    Fl
  );
}
function xi(t, e, n, r, i) {
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
function ei(t) {
  return !!(t && t.__v_isShallow);
}
function Gi(t) {
  return sn(t) || Ut(t);
}
function Y(t) {
  const e = t && t.__v_raw;
  return e ? Y(e) : t;
}
function Ll(t) {
  return Jr(t, "__v_skip", !0), t;
}
const gr = (t) => le(t) ? Fs(t) : t, $s = (t) => le(t) ? $l(t) : t;
function zl(t) {
  Lt && Me && (t = Y(t), process.env.NODE_ENV !== "production" ? Zi(t.dep || (t.dep = mr()), {
    target: t,
    type: "get",
    key: "value"
  }) : Zi(t.dep || (t.dep = mr())));
}
function Bl(t, e) {
  t = Y(t);
  const n = t.dep;
  n && (process.env.NODE_ENV !== "production" ? Sn(n, {
    target: t,
    type: "set",
    key: "value",
    newValue: e
  }) : Sn(n));
}
function Ne(t) {
  return !!(t && t.__v_isRef === !0);
}
function oe(t) {
  return fc(t, !1);
}
function fc(t, e) {
  return Ne(t) ? t : new dc(t, e);
}
class dc {
  constructor(e, n) {
    this.__v_isShallow = n, this.dep = void 0, this.__v_isRef = !0, this._rawValue = n ? e : Y(e), this._value = n ? e : gr(e);
  }
  get value() {
    return zl(this), this._value;
  }
  set value(e) {
    const n = this.__v_isShallow || ei(e) || Ut(e);
    e = n ? e : Y(e), _n(e, this._rawValue) && (this._rawValue = e, this._value = n ? e : gr(e), Bl(this, e));
  }
}
function jl(t) {
  return Ne(t) ? t.value : t;
}
const hc = {
  get: (t, e, n) => jl(Reflect.get(t, e, n)),
  set: (t, e, n, r) => {
    const i = t[e];
    return Ne(i) && !Ne(n) ? (i.value = n, !0) : Reflect.set(t, e, n, r);
  }
};
function Ul(t) {
  return sn(t) ? t : new Proxy(t, hc);
}
class pc {
  constructor(e, n, r, i) {
    this._setter = n, this.dep = void 0, this.__v_isRef = !0, this.__v_isReadonly = !1, this._dirty = !0, this.effect = new ks(e, () => {
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
  const s = U(t);
  s ? (r = t, i = process.env.NODE_ENV !== "production" ? () => {
    console.warn("Write operation failed: computed value is readonly");
  } : be) : (r = t.get, i = t.set);
  const o = new pc(r, i, s || !i, n);
  return process.env.NODE_ENV !== "production" && e && !n && (o.effect.onTrack = e.onTrack, o.effect.onTrigger = e.onTrigger), o;
}
const on = [];
function jr(t) {
  on.push(t);
}
function Ur() {
  on.pop();
}
function R(t, ...e) {
  if (process.env.NODE_ENV === "production")
    return;
  yn();
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
          ({ vnode: s }) => `at <${Di(n, s.type)}>`
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
  xn();
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
  const n = e > 0 ? `... (${e} recursive calls)` : "", r = t.component ? t.component.parent == null : !1, i = ` at <${Di(
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
  return ge(e) ? (e = JSON.stringify(e), n ? e : [`${t}=${e}`]) : typeof e == "number" || typeof e == "boolean" || e == null ? n ? e : [`${t}=${e}`] : Ne(e) ? (e = Hl(t, Y(e.value), !0), n ? e : [`${t}=Ref<`, e, ">"]) : U(e) ? [`${t}=fn${e.name ? `<${e.name}>` : ""}`] : (e = Y(e), n ? e : [`${t}=`, e]);
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
    bi(s, e, n);
  }
  return i;
}
function at(t, e, n, r) {
  if (U(t)) {
    const s = Ct(t, e, n, r);
    return s && Vs(s) && s.catch((o) => {
      bi(o, e, n);
    }), s;
  }
  const i = [];
  for (let s = 0; s < t.length; s++)
    i.push(at(t[s], e, n, r));
  return i;
}
function bi(t, e, n, r = !0) {
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
    if (n && jr(n), R(`Unhandled error${i ? ` during execution of ${i}` : ""}`), n && Ur(), r)
      throw t;
    console.error(t);
  } else
    console.error(t);
}
let vr = !1, es = !1;
const we = [];
let dt = 0;
const kn = [];
let ft = null, At = 0;
const Wl = /* @__PURE__ */ Promise.resolve();
let zs = null;
const bc = 100;
function Bs(t) {
  const e = zs || Wl;
  return t ? e.then(this ? t.bind(this) : t) : e;
}
function Ec(t) {
  let e = dt + 1, n = we.length;
  for (; e < n; ) {
    const r = e + n >>> 1, i = we[r], s = yr(i);
    s < t || s === t && i.pre ? e = r + 1 : n = r;
  }
  return e;
}
function Ei(t) {
  (!we.length || !we.includes(
    t,
    vr && t.allowRecurse ? dt + 1 : dt
  )) && (t.id == null ? we.push(t) : we.splice(Ec(t.id), 0, t), Yl());
}
function Yl() {
  !vr && !es && (es = !0, zs = Wl.then(ql));
}
function Oc(t) {
  const e = we.indexOf(t);
  e > dt && we.splice(e, 1);
}
function Kl(t) {
  B(t) ? kn.push(...t) : (!ft || !ft.includes(
    t,
    t.allowRecurse ? At + 1 : At
  )) && kn.push(t), Yl();
}
function Ro(t, e, n = vr ? dt + 1 : 0) {
  for (process.env.NODE_ENV !== "production" && (e = e || /* @__PURE__ */ new Map()); n < we.length; n++) {
    const r = we[n];
    if (r && r.pre) {
      if (t && r.id !== t.uid || process.env.NODE_ENV !== "production" && js(e, r))
        continue;
      we.splice(n, 1), n--, r();
    }
  }
}
function Xl(t) {
  if (kn.length) {
    const e = [...new Set(kn)];
    if (kn.length = 0, ft) {
      ft.push(...e);
      return;
    }
    for (ft = e, process.env.NODE_ENV !== "production" && (t = t || /* @__PURE__ */ new Map()), ft.sort((n, r) => yr(n) - yr(r)), At = 0; At < ft.length; At++)
      process.env.NODE_ENV !== "production" && js(t, ft[At]) || ft[At]();
    ft = null, At = 0;
  }
}
const yr = (t) => t.id == null ? 1 / 0 : t.id, Nc = (t, e) => {
  const n = yr(t) - yr(e);
  if (n === 0) {
    if (t.pre && !e.pre)
      return -1;
    if (e.pre && !t.pre)
      return 1;
  }
  return n;
};
function ql(t) {
  es = !1, vr = !0, process.env.NODE_ENV !== "production" && (t = t || /* @__PURE__ */ new Map()), we.sort(Nc);
  const e = process.env.NODE_ENV !== "production" ? (n) => js(t, n) : be;
  try {
    for (dt = 0; dt < we.length; dt++) {
      const n = we[dt];
      if (n && n.active !== !1) {
        if (process.env.NODE_ENV !== "production" && e(n))
          continue;
        Ct(n, null, 14);
      }
    }
  } finally {
    dt = 0, we.length = 0, Xl(t), vr = !1, zs = null, (we.length || kn.length) && ql(t);
  }
}
function js(t, e) {
  if (!t.has(e))
    t.set(e, 1);
  else {
    const n = t.get(e);
    if (n > bc) {
      const r = e.ownerInstance, i = r && Ea(r.type);
      return R(
        `Maximum recursive updates exceeded${i ? ` in component <${i}>` : ""}. This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function.`
      ), !0;
    } else
      t.set(e, n + 1);
  }
}
let ln = !1;
const Cn = /* @__PURE__ */ new Set();
process.env.NODE_ENV !== "production" && (Zr().__VUE_HMR_RUNTIME__ = {
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
    initialDef: ur(e),
    instances: /* @__PURE__ */ new Set()
  }), !0);
}
function ur(t) {
  return Oa(t) ? t.__vccOpts : t;
}
function Dc(t, e) {
  const n = mn.get(t);
  n && (n.initialDef.render = e, [...n.instances].forEach((r) => {
    e && (r.render = e, ur(r.type).render = e), r.renderCache = [], ln = !0, r.update(), ln = !1;
  }));
}
function Cc(t, e) {
  const n = mn.get(t);
  if (!n)
    return;
  e = ur(e), ko(n.initialDef, e);
  const r = [...n.instances];
  for (const i of r) {
    const s = ur(i.type);
    Cn.has(s) || (s !== n.initialDef && ko(s, e), Cn.add(s)), i.appContext.propsCache.delete(i.type), i.appContext.emitsCache.delete(i.type), i.appContext.optionsCache.delete(i.type), i.ceReload ? (Cn.add(s), i.ceReload(e.styles), Cn.delete(s)) : i.parent ? Ei(i.parent.update) : i.appContext.reload ? i.appContext.reload() : typeof window < "u" ? window.location.reload() : console.warn(
      "[HMR] Root or manually mounted instance modified. Full reload required."
    );
  }
  Kl(() => {
    for (const i of r)
      Cn.delete(
        ur(i.type)
      );
  });
}
function ko(t, e) {
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
let ht, sr = [], ts = !1;
function Pr(t, ...e) {
  ht ? ht.emit(t, ...e) : ts || sr.push({ event: t, args: e });
}
function Jl(t, e) {
  var n, r;
  ht = t, ht ? (ht.enabled = !0, sr.forEach(({ event: i, args: s }) => ht.emit(i, ...s)), sr = []) : /* handle late devtools injection - only do this if we are in an actual */ /* browser environment to avoid the timer handle stalling test runner exit */ /* (#4815) */ typeof window < "u" && // some envs mock window but not fully
  window.HTMLElement && // also exclude jsdom
  !((r = (n = window.navigator) == null ? void 0 : n.userAgent) != null && r.includes("jsdom")) ? ((e.__VUE_DEVTOOLS_HOOK_REPLAY__ = e.__VUE_DEVTOOLS_HOOK_REPLAY__ || []).push((s) => {
    Jl(s, e);
  }), setTimeout(() => {
    ht || (e.__VUE_DEVTOOLS_HOOK_REPLAY__ = null, ts = !0, sr = []);
  }, 3e3)) : (ts = !0, sr = []);
}
function Sc(t, e) {
  Pr("app:init", t, e, {
    Fragment: He,
    Text: Vr,
    Comment: tt,
    Static: fr
  });
}
function Pc(t) {
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
), Ac = (t) => {
  ht && typeof ht.cleanupBuffer == "function" && // remove the component if it wasn't buffered
  !ht.cleanupBuffer(t) && Mc(t);
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
const Rc = /* @__PURE__ */ Gl(
  "perf:start"
  /* PERFORMANCE_START */
), kc = /* @__PURE__ */ Gl(
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
  const r = t.vnode.props || ie;
  if (process.env.NODE_ENV !== "production") {
    const {
      emitsOptions: c,
      propsOptions: [f]
    } = t;
    if (c)
      if (!(e in c))
        (!f || !(Zt(e) in f)) && R(
          `Component emitted event "${e}" but it is neither declared in the emits option nor as an "${Zt(e)}" prop.`
        );
      else {
        const d = c[e];
        U(d) && (d(...n) || R(
          `Invalid event arguments: event validation failed for event "${e}".`
        ));
      }
  }
  let i = n;
  const s = e.startsWith("update:"), o = s && e.slice(7);
  if (o && o in r) {
    const c = `${o === "modelValue" ? "model" : o}Modifiers`, { number: f, trim: d } = r[c] || ie;
    d && (i = n.map((_) => ge(_) ? _.trim() : _)), f && (i = n.map(Ru));
  }
  if (process.env.NODE_ENV !== "production" && Ic(t, e, i), process.env.NODE_ENV !== "production") {
    const c = e.toLowerCase();
    c !== e && r[Zt(c)] && R(
      `Event "${c}" is emitted in component ${Di(
        t,
        t.type
      )} but the handler is registered for "${e}". Note that HTML attributes are case-insensitive and you cannot use v-on to listen to camelCase events when using in-DOM templates. You should probably use "${We(e)}" instead of "${e}".`
    );
  }
  let l, a = r[l = Zt(e)] || // also try camelCase event handler (#2249)
  r[l = Zt(Dt(e))];
  !a && s && (a = r[l = Zt(We(e))]), a && at(
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
  if (!U(t)) {
    const a = (u) => {
      const c = ea(u, e, !0);
      c && (l = !0, ae(o, c));
    };
    !n && e.mixins.length && e.mixins.forEach(a), t.extends && a(t.extends), t.mixins && t.mixins.forEach(a);
  }
  return !s && !l ? (le(t) && r.set(t, null), null) : (B(s) ? s.forEach((a) => o[a] = null) : ae(o, s), le(t) && r.set(t, o), o);
}
function Oi(t, e) {
  return !t || !Sr(e) ? !1 : (e = e.slice(2).replace(/Once$/, ""), X(t, e[0].toLowerCase() + e.slice(1)) || X(t, We(e)) || X(t, e));
}
let Ee = null, ta = null;
function ti(t) {
  const e = Ee;
  return Ee = t, ta = t && t.type.__scopeId || null, e;
}
function $c(t, e = Ee, n) {
  if (!e || t._n)
    return t;
  const r = (...i) => {
    r._d && Ko(-1);
    const s = ti(e);
    let o;
    try {
      o = t(...i);
    } finally {
      ti(s), r._d && Ko(1);
    }
    return process.env.NODE_ENV !== "production" && Zl(e), o;
  };
  return r._n = !0, r._c = !0, r._d = !0, r;
}
let ns = !1;
function ni() {
  ns = !0;
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
  const O = ti(t);
  process.env.NODE_ENV !== "production" && (ns = !1);
  try {
    if (n.shapeFlag & 4) {
      const v = i || r, S = process.env.NODE_ENV !== "production" && _.__isScriptSetup ? new Proxy(v, {
        get(M, k, C) {
          return R(
            `Property '${String(
              k
            )}' was accessed via 'this'. Avoid using 'this' in templates.`
          ), Reflect.get(M, k, C);
        }
      }) : v;
      y = ot(
        c.call(
          S,
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
      process.env.NODE_ENV !== "production" && a === s && ni(), y = ot(
        v.length > 1 ? v(
          s,
          process.env.NODE_ENV !== "production" ? {
            get attrs() {
              return ni(), a;
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
    dr.length = 0, bi(v, t, 1), y = gt(tt);
  }
  let b = y, T;
  if (process.env.NODE_ENV !== "production" && y.patchFlag > 0 && y.patchFlag & 2048 && ([b, T] = Lc(y)), E && p !== !1) {
    const v = Object.keys(E), { shapeFlag: S } = b;
    if (v.length) {
      if (S & 7)
        o && v.some(Qr) && (E = Bc(
          E,
          o
        )), b = Ht(b, E);
      else if (process.env.NODE_ENV !== "production" && !ns && b.type !== tt) {
        const M = Object.keys(a), k = [], C = [];
        for (let W = 0, Z = M.length; W < Z; W++) {
          const K = M[W];
          Sr(K) ? Qr(K) || k.push(K[2].toLowerCase() + K.slice(3)) : C.push(K);
        }
        C.length && R(
          `Extraneous non-props attributes (${C.join(", ")}) were passed to component but could not be automatically inherited because component renders fragment or text root nodes.`
        ), k.length && R(
          `Extraneous non-emits event listeners (${k.join(", ")}) were passed to component but could not be automatically inherited because component renders fragment or text root nodes. If the listener is intended to be a component custom event listener only, declare it using the "emits" option.`
        );
      }
    }
  }
  return n.dirs && (process.env.NODE_ENV !== "production" && !Io(b) && R(
    "Runtime directive used on component with non-element root node. The directives will not function as intended."
  ), b = Ht(b), b.dirs = b.dirs ? b.dirs.concat(n.dirs) : n.dirs), n.transition && (process.env.NODE_ENV !== "production" && !Io(b) && R(
    "Component inside <Transition> renders non-element root node that cannot be animated."
  ), b.transition = n.transition), process.env.NODE_ENV !== "production" && T ? T(b) : y = b, ti(O), y;
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
    if (wi(r)) {
      if (r.type !== tt || r.children === "v-if") {
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
    (n === "class" || n === "style" || Sr(n)) && ((e || (e = {}))[n] = t[n]);
  return e;
}, Bc = (t, e) => {
  const n = {};
  for (const r in t)
    (!Qr(r) || !(r.slice(9) in e)) && (n[r] = t[r]);
  return n;
}, Io = (t) => t.shapeFlag & 7 || t.type === tt;
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
        if (o[d] !== r[d] && !Oi(u, d))
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
    if (e[s] !== t[s] && !Oi(n, s))
      return !0;
  }
  return !1;
}
function Uc({ vnode: t, parent: e }, n) {
  for (; e && e.subTree === t; )
    (t = e.vnode).el = n, e = e.parent;
}
const Hc = Symbol.for("v-ndc"), Wc = (t) => t.__isSuspense;
function Yc(t, e) {
  e && e.pendingBranch ? B(t) ? e.effects.push(...t) : e.effects.push(t) : Kl(t);
}
function Kc(t, e) {
  return Hs(
    t,
    null,
    process.env.NODE_ENV !== "production" ? ae({}, e, { flush: "post" }) : { flush: "post" }
  );
}
const Lr = {};
function an(t, e, n) {
  return process.env.NODE_ENV !== "production" && !U(e) && R(
    "`watch(fn, options?)` signature has been moved to a separate API. Use `watchEffect(fn, options?)` instead. `watch` now only supports `watch(source, cb, options?) signature."
  ), Hs(t, e, n);
}
function Hs(t, e, { immediate: n, deep: r, flush: i, onTrack: s, onTrigger: o } = ie) {
  var l;
  process.env.NODE_ENV !== "production" && !e && (n !== void 0 && R(
    'watch() "immediate" option is only respected when using the watch(source, callback, options?) signature.'
  ), r !== void 0 && R(
    'watch() "deep" option is only respected when using the watch(source, callback, options?) signature.'
  ));
  const a = (v) => {
    R(
      "Invalid watch source: ",
      v,
      "A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types."
    );
  }, u = wl() === ((l = ye) == null ? void 0 : l.scope) ? ye : null;
  let c, f = !1, d = !1;
  if (Ne(t) ? (c = () => t.value, f = ei(t)) : sn(t) ? (c = () => t, r = !0) : B(t) ? (d = !0, f = t.some((v) => sn(v) || ei(v)), c = () => t.map((v) => {
    if (Ne(v))
      return v.value;
    if (sn(v))
      return Pn(v);
    if (U(v))
      return Ct(v, u, 2);
    process.env.NODE_ENV !== "production" && a(v);
  })) : U(t) ? e ? c = () => Ct(t, u, 2) : c = () => {
    if (!(u && u.isUnmounted))
      return _ && _(), at(
        t,
        u,
        3,
        [g]
      );
  } : (c = be, process.env.NODE_ENV !== "production" && a(t)), e && r) {
    const v = c;
    c = () => Pn(v());
  }
  let _, g = (v) => {
    _ = b.onStop = () => {
      Ct(v, u, 4), _ = b.onStop = void 0;
    };
  }, p;
  if (br)
    if (g = be, e ? n && at(e, u, 3, [
      c(),
      d ? [] : void 0,
      g
    ]) : c(), i === "sync") {
      const v = ed();
      p = v.__watcherHandles || (v.__watcherHandles = []);
    } else
      return be;
  let y = d ? new Array(t.length).fill(Lr) : Lr;
  const E = () => {
    if (b.active)
      if (e) {
        const v = b.run();
        (r || f || (d ? v.some((S, M) => _n(S, y[M])) : _n(v, y))) && (_ && _(), at(e, u, 3, [
          v,
          // pass undefined as the old value when it's changed for the first time
          y === Lr ? void 0 : d && y[0] === Lr ? [] : y,
          g
        ]), y = v);
      } else
        b.run();
  };
  E.allowRecurse = !!e;
  let O;
  i === "sync" ? O = E : i === "post" ? O = () => ke(E, u && u.suspense) : (E.pre = !0, u && (E.id = u.uid), O = () => Ei(E));
  const b = new ks(c, O);
  process.env.NODE_ENV !== "production" && (b.onTrack = s, b.onTrigger = o), e ? n ? E() : y = b.run() : i === "post" ? ke(
    b.run.bind(b),
    u && u.suspense
  ) : b.run();
  const T = () => {
    b.stop(), u && u.scope && Ps(u.scope.effects, b);
  };
  return p && p.push(T), T;
}
function Xc(t, e, n) {
  const r = this.proxy, i = ge(t) ? t.includes(".") ? ra(r, t) : () => r[t] : t.bind(r, r);
  let s;
  U(e) ? s = e : (s = e.handler, n = e);
  const o = ye;
  Ln(this);
  const l = Hs(i, s.bind(r), n);
  return o ? Ln(o) : cn(), l;
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
  if (e.add(t), Ne(t))
    Pn(t.value, e);
  else if (B(t))
    for (let n = 0; n < t.length; n++)
      Pn(t[n], e);
  else if (Cu(t) || Rn(t))
    t.forEach((n) => {
      Pn(n, e);
    });
  else if (Pu(t))
    for (const n in t)
      Pn(t[n], e);
  return t;
}
function ia(t) {
  Vu(t) && R("Do not use built-in directive ids as custom directive id: " + t);
}
function Xt(t, e, n, r) {
  const i = t.dirs, s = e && e.dirs;
  for (let o = 0; o < i.length; o++) {
    const l = i[o];
    s && (l.oldValue = s[o].value);
    let a = l.dir[r];
    a && (yn(), at(a, n, 8, [
      t.el,
      l,
      t,
      e
    ]), xn());
  }
}
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function bn(t, e) {
  return U(t) ? (
    // #8326: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    ae({ name: t.name }, e, { setup: t })
  ) : t;
}
const cr = (t) => !!t.type.__asyncLoader, Ws = (t) => t.type.__isKeepAlive;
function qc(t, e) {
  sa(t, "a", e);
}
function Qc(t, e) {
  sa(t, "da", e);
}
function sa(t, e, n = ye) {
  const r = t.__wdc || (t.__wdc = () => {
    let i = n;
    for (; i; ) {
      if (i.isDeactivated)
        return;
      i = i.parent;
    }
    return t();
  });
  if (Ni(e, r, n), n) {
    let i = n.parent;
    for (; i && i.parent; )
      Ws(i.parent.vnode) && Jc(r, e, n, i), i = i.parent;
  }
}
function Jc(t, e, n, r) {
  const i = Ni(
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
function Ni(t, e, n = ye, r = !1) {
  if (n) {
    const i = n[t] || (n[t] = []), s = e.__weh || (e.__weh = (...o) => {
      if (n.isUnmounted)
        return;
      yn(), Ln(n);
      const l = at(e, n, t, o);
      return cn(), xn(), l;
    });
    return r ? i.unshift(s) : i.push(s), s;
  } else if (process.env.NODE_ENV !== "production") {
    const i = Zt(Ls[t].replace(/ hook$/, ""));
    R(
      `${i} is called when there is no active component instance to be associated with. Lifecycle injection APIs can only be used during execution of setup(). If you are using async setup(), make sure to register lifecycle hooks before the first await statement.`
    );
  }
}
const Vt = (t) => (e, n = ye) => (
  // post-create lifecycle registrations are noops during SSR (except for serverPrefetch)
  (!br || t === "sp") && Ni(t, (...r) => e(...r), n)
), Zc = Vt("bm"), Kn = Vt("m"), Gc = Vt("bu"), ef = Vt("u"), tf = Vt("bum"), Ys = Vt("um"), nf = Vt("sp"), rf = Vt(
  "rtg"
), sf = Vt(
  "rtc"
);
function of(t, e = ye) {
  Ni("ec", t, e);
}
function Ks(t, e, n = {}, r, i) {
  if (Ee.isCE || Ee.parent && cr(Ee.parent) && Ee.parent.isCE)
    return e !== "default" && (n.name = e), gt("slot", n, r && r());
  let s = t[e];
  process.env.NODE_ENV !== "production" && s && s.length > 1 && (R(
    "SSR-optimized slot function detected in a non-SSR-optimized render function. You need to mark this component with $dynamic-slots in the parent template."
  ), s = () => []), s && s._c && (s._d = !1), En();
  const o = s && oa(s(n)), l = Ff(
    He,
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
  return t.some((e) => wi(e) ? !(e.type === tt || e.type === He && !oa(e.children)) : !0) ? t : null;
}
const rs = (t) => t ? xa(t) ? to(t) || t.proxy : rs(t.parent) : null, un = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ ae(/* @__PURE__ */ Object.create(null), {
    $: (t) => t,
    $el: (t) => t.vnode.el,
    $data: (t) => t.data,
    $props: (t) => process.env.NODE_ENV !== "production" ? ir(t.props) : t.props,
    $attrs: (t) => process.env.NODE_ENV !== "production" ? ir(t.attrs) : t.attrs,
    $slots: (t) => process.env.NODE_ENV !== "production" ? ir(t.slots) : t.slots,
    $refs: (t) => process.env.NODE_ENV !== "production" ? ir(t.refs) : t.refs,
    $parent: (t) => rs(t.parent),
    $root: (t) => rs(t.root),
    $emit: (t) => t.emit,
    $options: (t) => qs(t),
    $forceUpdate: (t) => t.f || (t.f = () => Ei(t.update)),
    $nextTick: (t) => t.n || (t.n = Bs.bind(t.proxy)),
    $watch: (t) => Xc.bind(t)
  })
), Xs = (t) => t === "_" || t === "$", Ii = (t, e) => t !== ie && !t.__isScriptSetup && X(t, e), la = {
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
        if (Ii(r, e))
          return o[e] = 1, r[e];
        if (i !== ie && X(i, e))
          return o[e] = 2, i[e];
        if (
          // only cache other properties when instance has declared (thus stable)
          // props
          (u = t.propsOptions[0]) && X(u, e)
        )
          return o[e] = 3, s[e];
        if (n !== ie && X(n, e))
          return o[e] = 4, n[e];
        is && (o[e] = 0);
      }
    }
    const c = un[e];
    let f, d;
    if (c)
      return e === "$attrs" ? (Oe(t, "get", e), process.env.NODE_ENV !== "production" && ni()) : process.env.NODE_ENV !== "production" && e === "$slots" && Oe(t, "get", e), c(t);
    if (
      // css module (injected by vue-loader)
      (f = l.__cssModules) && (f = f[e])
    )
      return f;
    if (n !== ie && X(n, e))
      return o[e] = 4, n[e];
    if (
      // global properties
      d = a.config.globalProperties, X(d, e)
    )
      return d[e];
    process.env.NODE_ENV !== "production" && Ee && (!ge(e) || // #1091 avoid internal isRef/isVNode checks on component instance leading
    // to infinite warning loop
    e.indexOf("__v") !== 0) && (i !== ie && Xs(e[0]) && X(i, e) ? R(
      `Property ${JSON.stringify(
        e
      )} must be accessed via $data because it starts with a reserved character ("$" or "_") and is not proxied on the render context.`
    ) : t === Ee && R(
      `Property ${JSON.stringify(e)} was accessed during render but is not defined on instance.`
    ));
  },
  set({ _: t }, e, n) {
    const { data: r, setupState: i, ctx: s } = t;
    return Ii(i, e) ? (i[e] = n, !0) : process.env.NODE_ENV !== "production" && i.__isScriptSetup && X(i, e) ? (R(`Cannot mutate <script setup> binding "${e}" from Options API.`), !1) : r !== ie && X(r, e) ? (r[e] = n, !0) : X(t.props, e) ? (process.env.NODE_ENV !== "production" && R(`Attempting to mutate prop "${e}". Props are readonly.`), !1) : e[0] === "$" && e.slice(1) in t ? (process.env.NODE_ENV !== "production" && R(
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
    return !!n[o] || t !== ie && X(t, o) || Ii(e, o) || (l = s[0]) && X(l, o) || X(r, o) || X(un, o) || X(i.config.globalProperties, o);
  },
  defineProperty(t, e, n) {
    return n.get != null ? t._.accessCache[e] = 0 : X(n, "value") && this.set(t, e, n.value, null), Reflect.defineProperty(t, e, n);
  }
};
process.env.NODE_ENV !== "production" && (la.ownKeys = (t) => (R(
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
      set: be
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
      set: be
    });
  });
}
function uf(t) {
  const { ctx: e, setupState: n } = t;
  Object.keys(Y(n)).forEach((r) => {
    if (!n.__isScriptSetup) {
      if (Xs(r[0])) {
        R(
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
        set: be
      });
    }
  });
}
function $o(t) {
  return B(t) ? t.reduce(
    (e, n) => (e[n] = null, e),
    {}
  ) : t;
}
function cf() {
  const t = /* @__PURE__ */ Object.create(null);
  return (e, n) => {
    t[n] ? R(`${e} property "${n}" is already defined in ${t[n]}.`) : t[n] = e;
  };
}
let is = !0;
function ff(t) {
  const e = qs(t), n = t.proxy, r = t.ctx;
  is = !1, e.beforeCreate && Lo(e.beforeCreate, t, "bc");
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
    renderTracked: S,
    renderTriggered: M,
    errorCaptured: k,
    serverPrefetch: C,
    // public API
    expose: W,
    inheritAttrs: Z,
    // assets
    components: K,
    directives: G,
    filters: pe
  } = e, te = process.env.NODE_ENV !== "production" ? cf() : null;
  if (process.env.NODE_ENV !== "production") {
    const [z] = t.propsOptions;
    if (z)
      for (const j in z)
        te("Props", j);
  }
  if (u && df(u, r, te), o)
    for (const z in o) {
      const j = o[z];
      U(j) ? (process.env.NODE_ENV !== "production" ? Object.defineProperty(r, z, {
        value: j.bind(n),
        configurable: !0,
        enumerable: !0,
        writable: !0
      }) : r[z] = j.bind(n), process.env.NODE_ENV !== "production" && te("Methods", z)) : process.env.NODE_ENV !== "production" && R(
        `Method "${z}" has type "${typeof j}" in the component definition. Did you reference the function correctly?`
      );
    }
  if (i) {
    process.env.NODE_ENV !== "production" && !U(i) && R(
      "The data option must be a function. Plain object usage is no longer supported."
    );
    const z = i.call(n, n);
    if (process.env.NODE_ENV !== "production" && Vs(z) && R(
      "data() returned a Promise - note data() cannot be async; If you intend to perform data fetching before component renders, use async setup() + <Suspense>."
    ), !le(z))
      process.env.NODE_ENV !== "production" && R("data() should return an object.");
    else if (t.data = Fs(z), process.env.NODE_ENV !== "production")
      for (const j in z)
        te("Data", j), Xs(j[0]) || Object.defineProperty(r, j, {
          configurable: !0,
          enumerable: !0,
          get: () => z[j],
          set: be
        });
  }
  if (is = !0, s)
    for (const z in s) {
      const j = s[z], Se = U(j) ? j.bind(n, n) : U(j.get) ? j.get.bind(n, n) : be;
      process.env.NODE_ENV !== "production" && Se === be && R(`Computed property "${z}" has no getter.`);
      const xt = !U(j) && U(j.set) ? j.set.bind(n) : process.env.NODE_ENV !== "production" ? () => {
        R(
          `Write operation failed: computed property "${z}" is readonly.`
        );
      } : be, rt = Je({
        get: Se,
        set: xt
      });
      Object.defineProperty(r, z, {
        enumerable: !0,
        configurable: !0,
        get: () => rt.value,
        set: (Re) => rt.value = Re
      }), process.env.NODE_ENV !== "production" && te("Computed", z);
    }
  if (l)
    for (const z in l)
      aa(l[z], r, n, z);
  if (a) {
    const z = U(a) ? a.call(n) : a;
    Reflect.ownKeys(z).forEach((j) => {
      vf(j, z[j]);
    });
  }
  c && Lo(c, t, "c");
  function Q(z, j) {
    B(j) ? j.forEach((Se) => z(Se.bind(n))) : j && z(j.bind(n));
  }
  if (Q(Zc, f), Q(Kn, d), Q(Gc, _), Q(ef, g), Q(qc, p), Q(Qc, y), Q(of, k), Q(sf, S), Q(rf, M), Q(tf, O), Q(Ys, T), Q(nf, C), B(W))
    if (W.length) {
      const z = t.exposed || (t.exposed = {});
      W.forEach((j) => {
        Object.defineProperty(z, j, {
          get: () => n[j],
          set: (Se) => n[j] = Se
        });
      });
    } else
      t.exposed || (t.exposed = {});
  v && t.render === be && (t.render = v), Z != null && (t.inheritAttrs = Z), K && (t.components = K), G && (t.directives = G);
}
function df(t, e, n = be) {
  B(t) && (t = ss(t));
  for (const r in t) {
    const i = t[r];
    let s;
    le(i) ? "default" in i ? s = Hr(
      i.from || r,
      i.default,
      !0
      /* treat default function as factory */
    ) : s = Hr(i.from || r) : s = Hr(i), Ne(s) ? Object.defineProperty(e, r, {
      enumerable: !0,
      configurable: !0,
      get: () => s.value,
      set: (o) => s.value = o
    }) : e[r] = s, process.env.NODE_ENV !== "production" && n("Inject", r);
  }
}
function Lo(t, e, n) {
  at(
    B(t) ? t.map((r) => r.bind(e.proxy)) : t.bind(e.proxy),
    e,
    n
  );
}
function aa(t, e, n, r) {
  const i = r.includes(".") ? ra(n, r) : () => n[r];
  if (ge(t)) {
    const s = e[t];
    U(s) ? an(i, s) : process.env.NODE_ENV !== "production" && R(`Invalid watch handler specified by key "${t}"`, s);
  } else if (U(t))
    an(i, t.bind(n));
  else if (le(t))
    if (B(t))
      t.forEach((s) => aa(s, e, n, r));
    else {
      const s = U(t.handler) ? t.handler.bind(n) : e[t.handler];
      U(s) ? an(i, s, t) : process.env.NODE_ENV !== "production" && R(`Invalid watch handler specified by key "${t.handler}"`, s);
    }
  else
    process.env.NODE_ENV !== "production" && R(`Invalid watch option: "${r}"`, t);
}
function qs(t) {
  const e = t.type, { mixins: n, extends: r } = e, {
    mixins: i,
    optionsCache: s,
    config: { optionMergeStrategies: o }
  } = t.appContext, l = s.get(e);
  let a;
  return l ? a = l : !i.length && !n && !r ? a = e : (a = {}, i.length && i.forEach(
    (u) => ri(a, u, o, !0)
  ), ri(a, e, o)), le(e) && s.set(e, a), a;
}
function ri(t, e, n, r = !1) {
  const { mixins: i, extends: s } = e;
  s && ri(t, s, n, !0), i && i.forEach(
    (o) => ri(t, o, n, !0)
  );
  for (const o in e)
    if (r && o === "expose")
      process.env.NODE_ENV !== "production" && R(
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
  methods: or,
  computed: or,
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
  components: or,
  directives: or,
  // watch
  watch: _f,
  // provide / inject
  provide: zo,
  inject: pf
};
function zo(t, e) {
  return e ? t ? function() {
    return ae(
      U(t) ? t.call(this, this) : t,
      U(e) ? e.call(this, this) : e
    );
  } : e : t;
}
function pf(t, e) {
  return or(ss(t), ss(e));
}
function ss(t) {
  if (B(t)) {
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
function or(t, e) {
  return t ? ae(/* @__PURE__ */ Object.create(null), t, e) : e;
}
function Bo(t, e) {
  return t ? B(t) && B(e) ? [.../* @__PURE__ */ new Set([...t, ...e])] : ae(
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
    U(r) || (r = ae({}, r)), i != null && !le(i) && (process.env.NODE_ENV !== "production" && R("root props passed to app.mount() must be an object."), i = null);
    const s = ua();
    process.env.NODE_ENV !== "production" && Object.defineProperty(s.config, "unwrapInjectedRef", {
      get() {
        return !0;
      },
      set() {
        R(
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
        process.env.NODE_ENV !== "production" && R(
          "app.config cannot be replaced. Modify individual options instead."
        );
      },
      use(u, ...c) {
        return o.has(u) ? process.env.NODE_ENV !== "production" && R("Plugin has already been applied to target app.") : u && U(u.install) ? (o.add(u), u.install(a, ...c)) : U(u) ? (o.add(u), u(a, ...c)) : process.env.NODE_ENV !== "production" && R(
          'A plugin must either be a function or an object with an "install" function.'
        ), a;
      },
      mixin(u) {
        return s.mixins.includes(u) ? process.env.NODE_ENV !== "production" && R(
          "Mixin has already been applied to target app" + (u.name ? `: ${u.name}` : "")
        ) : s.mixins.push(u), a;
      },
      component(u, c) {
        return process.env.NODE_ENV !== "production" && us(u, s.config), c ? (process.env.NODE_ENV !== "production" && s.components[u] && R(`Component "${u}" has already been registered in target app.`), s.components[u] = c, a) : s.components[u];
      },
      directive(u, c) {
        return process.env.NODE_ENV !== "production" && ia(u), c ? (process.env.NODE_ENV !== "production" && s.directives[u] && R(`Directive "${u}" has already been registered in target app.`), s.directives[u] = c, a) : s.directives[u];
      },
      mount(u, c, f) {
        if (l)
          process.env.NODE_ENV !== "production" && R(
            "App has already been mounted.\nIf you want to remount the same app, move your app creation logic into a factory function and create fresh app instances for each mount - e.g. `const createMyApp = () => createApp(App)`"
          );
        else {
          process.env.NODE_ENV !== "production" && u.__vue_app__ && R(
            "There is already an app instance mounted on the host container.\n If you want to mount another app on the same host container, you need to unmount the previous app by calling `app.unmount()` first."
          );
          const d = gt(r, i);
          return d.appContext = s, process.env.NODE_ENV !== "production" && (s.reload = () => {
            t(Ht(d), u, f);
          }), c && e ? e(d, u) : t(d, u, f), l = !0, a._container = u, u.__vue_app__ = a, process.env.NODE_ENV !== "production" && (a._instance = d.component, Sc(a, Jo)), to(d.component) || d.component.proxy;
        }
      },
      unmount() {
        l ? (t(null, a._container), process.env.NODE_ENV !== "production" && (a._instance = null, Pc(a)), delete a._container.__vue_app__) : process.env.NODE_ENV !== "production" && R("Cannot unmount an app that is not mounted.");
      },
      provide(u, c) {
        return process.env.NODE_ENV !== "production" && u in s.provides && R(
          `App already provides property with key "${String(u)}". It will be overwritten with the new value.`
        ), s.provides[u] = c, a;
      },
      runWithContext(u) {
        ii = a;
        try {
          return u();
        } finally {
          ii = null;
        }
      }
    };
    return a;
  };
}
let ii = null;
function vf(t, e) {
  if (!ye)
    process.env.NODE_ENV !== "production" && R("provide() can only be used inside setup().");
  else {
    let n = ye.provides;
    const r = ye.parent && ye.parent.provides;
    r === n && (n = ye.provides = Object.create(r)), n[t] = e;
  }
}
function Hr(t, e, n = !1) {
  const r = ye || Ee;
  if (r || ii) {
    const i = r ? r.parent == null ? r.vnode.appContext && r.vnode.appContext.provides : r.parent.provides : ii._context.provides;
    if (i && t in i)
      return i[t];
    if (arguments.length > 1)
      return n && U(e) ? e.call(r && r.proxy) : e;
    process.env.NODE_ENV !== "production" && R(`injection "${String(t)}" not found.`);
  } else
    process.env.NODE_ENV !== "production" && R("inject() can only be used inside setup() or functional components.");
}
function yf(t, e, n, r = !1) {
  const i = {}, s = {};
  Jr(s, Ti, 1), t.propsDefaults = /* @__PURE__ */ Object.create(null), ca(t, e, i, s);
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
        if (Oi(t.emitsOptions, d))
          continue;
        const _ = e[d];
        if (a)
          if (X(s, d))
            _ !== s[d] && (s[d] = _, u = !0);
          else {
            const g = Dt(d);
            i[g] = os(
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
      ((c = We(f)) === f || !X(e, c))) && (a ? n && // for camelCase
      (n[f] !== void 0 || // for kebab-case
      n[c] !== void 0) && (i[f] = os(
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
  u && mt(t, "set", "$attrs"), process.env.NODE_ENV !== "production" && da(e || {}, i, t);
}
function ca(t, e, n, r) {
  const [i, s] = t.propsOptions;
  let o = !1, l;
  if (e)
    for (let a in e) {
      if (Br(a))
        continue;
      const u = e[a];
      let c;
      i && X(i, c = Dt(a)) ? !s || !s.includes(c) ? n[c] = u : (l || (l = {}))[c] = u : Oi(t.emitsOptions, a) || (!(a in r) || u !== r[a]) && (r[a] = u, o = !0);
    }
  if (s) {
    const a = Y(n), u = l || ie;
    for (let c = 0; c < s.length; c++) {
      const f = s[c];
      n[f] = os(
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
function os(t, e, n, r, i, s) {
  const o = t[n];
  if (o != null) {
    const l = X(o, "default");
    if (l && r === void 0) {
      const a = o.default;
      if (o.type !== Function && !o.skipFactory && U(a)) {
        const { propsDefaults: u } = i;
        n in u ? r = u[n] : (Ln(i), r = u[n] = a.call(
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
    ] && (r === "" || r === We(n)) && (r = !0));
  }
  return r;
}
function fa(t, e, n = !1) {
  const r = e.propsCache, i = r.get(t);
  if (i)
    return i;
  const s = t.props, o = {}, l = [];
  let a = !1;
  if (!U(t)) {
    const c = (f) => {
      a = !0;
      const [d, _] = fa(f, e, !0);
      ae(o, d), _ && l.push(..._);
    };
    !n && e.mixins.length && e.mixins.forEach(c), t.extends && c(t.extends), t.mixins && t.mixins.forEach(c);
  }
  if (!s && !a)
    return le(t) && r.set(t, An), An;
  if (B(s))
    for (let c = 0; c < s.length; c++) {
      process.env.NODE_ENV !== "production" && !ge(s[c]) && R("props must be strings when using array syntax.", s[c]);
      const f = Dt(s[c]);
      jo(f) && (o[f] = ie);
    }
  else if (s) {
    process.env.NODE_ENV !== "production" && !le(s) && R("invalid props options", s);
    for (const c in s) {
      const f = Dt(c);
      if (jo(f)) {
        const d = s[c], _ = o[f] = B(d) || U(d) ? { type: d } : ae({}, d);
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
  return t[0] !== "$" ? !0 : (process.env.NODE_ENV !== "production" && R(`Invalid prop name: "${t}" is a reserved property.`), !1);
}
function ls(t) {
  const e = t && t.toString().match(/^\s*(function|class) (\w+)/);
  return e ? e[2] : t === null ? "null" : "";
}
function Uo(t, e) {
  return ls(t) === ls(e);
}
function Ho(t, e) {
  return B(e) ? e.findIndex((n) => Uo(n, t)) : U(e) && Uo(e, t) ? 0 : -1;
}
function da(t, e, n) {
  const r = Y(e), i = n.propsOptions[0];
  for (const s in i) {
    let o = i[s];
    o != null && Ef(
      s,
      r[s],
      o,
      !X(t, s) && !X(t, We(s))
    );
  }
}
function Ef(t, e, n, r) {
  const { type: i, required: s, validator: o, skipCheck: l } = n;
  if (s && r) {
    R('Missing required prop: "' + t + '"');
    return;
  }
  if (!(e == null && !s)) {
    if (i != null && i !== !0 && !l) {
      let a = !1;
      const u = B(i) ? i : [i], c = [];
      for (let f = 0; f < u.length && !a; f++) {
        const { valid: d, expectedType: _ } = Nf(e, u[f]);
        c.push(_ || ""), a = d;
      }
      if (!a) {
        R(wf(t, e, c));
        return;
      }
    }
    o && !o(e) && R('Invalid prop: custom validator check failed for prop "' + t + '".');
  }
}
const Of = /* @__PURE__ */ Yn(
  "String,Number,Boolean,Function,Symbol,BigInt"
);
function Nf(t, e) {
  let n;
  const r = ls(e);
  if (Of(r)) {
    const i = typeof t;
    n = i === r.toLowerCase(), !n && i === "object" && (n = t instanceof e);
  } else
    r === "Object" ? n = le(t) : r === "Array" ? n = B(t) : r === "null" ? n = t === null : n = t instanceof e;
  return {
    valid: n,
    expectedType: r
  };
}
function wf(t, e, n) {
  if (n.length === 0)
    return `Prop type [] for prop "${t}" won't match anything. Did you mean to use type Array instead?`;
  let r = `Invalid prop: type check failed for prop "${t}". Expected ${n.map(mi).join(" | ")}`;
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
const ha = (t) => t[0] === "_" || t === "$stable", Qs = (t) => B(t) ? t.map(ot) : [ot(t)], Df = (t, e, n) => {
  if (e._n)
    return e;
  const r = $c((...i) => (process.env.NODE_ENV !== "production" && ye && R(
    `Slot "${t}" invoked outside of the render function: this will not track dependencies used in the slot. Invoke the slot function inside the render function instead.`
  ), Qs(e(...i))), n);
  return r._c = !1, r;
}, pa = (t, e, n) => {
  const r = t._ctx;
  for (const i in t) {
    if (ha(i))
      continue;
    const s = t[i];
    if (U(s))
      e[i] = Df(i, s, r);
    else if (s != null) {
      process.env.NODE_ENV !== "production" && R(
        `Non-function value encountered for slot "${i}". Prefer function slots for better performance.`
      );
      const o = Qs(s);
      e[i] = () => o;
    }
  }
}, _a = (t, e) => {
  process.env.NODE_ENV !== "production" && !Ws(t.vnode) && R(
    "Non-function value encountered for default slot. Prefer function slots for better performance."
  );
  const n = Qs(e);
  t.slots.default = () => n;
}, Cf = (t, e) => {
  if (t.vnode.shapeFlag & 32) {
    const n = e._;
    n ? (t.slots = Y(e), Jr(e, "_", n)) : pa(
      e,
      t.slots = {}
    );
  } else
    t.slots = {}, e && _a(t, e);
  Jr(t.slots, Ti, 1);
}, Sf = (t, e, n) => {
  const { vnode: r, slots: i } = t;
  let s = !0, o = ie;
  if (r.shapeFlag & 32) {
    const l = e._;
    l ? process.env.NODE_ENV !== "production" && ln ? (ae(i, e), mt(t, "set", "$slots")) : n && l === 1 ? s = !1 : (ae(i, e), !n && l === 1 && delete i._) : (s = !e.$stable, pa(e, i)), o = e;
  } else
    e && (_a(t, e), o = { default: 1 });
  if (s)
    for (const l in i)
      !ha(l) && o[l] == null && delete i[l];
};
function as(t, e, n, r, i = !1) {
  if (B(t)) {
    t.forEach(
      (d, _) => as(
        d,
        e && (B(e) ? e[_] : e),
        n,
        r,
        i
      )
    );
    return;
  }
  if (cr(r) && !i)
    return;
  const s = r.shapeFlag & 4 ? to(r.component) || r.component.proxy : r.el, o = i ? null : s, { i: l, r: a } = t;
  if (process.env.NODE_ENV !== "production" && !l) {
    R(
      "Missing ref owner context. ref cannot be used on hoisted vnodes. A vnode with ref must be created inside the render function."
    );
    return;
  }
  const u = e && e.r, c = l.refs === ie ? l.refs = {} : l.refs, f = l.setupState;
  if (u != null && u !== a && (ge(u) ? (c[u] = null, X(f, u) && (f[u] = null)) : Ne(u) && (u.value = null)), U(a))
    Ct(a, l, 12, [o, c]);
  else {
    const d = ge(a), _ = Ne(a);
    if (d || _) {
      const g = () => {
        if (t.f) {
          const p = d ? X(f, a) ? f[a] : c[a] : a.value;
          i ? B(p) && Ps(p, s) : B(p) ? p.includes(s) || p.push(s) : d ? (c[a] = [s], X(f, a) && (f[a] = c[a])) : (a.value = [s], t.k && (c[t.k] = a.value));
        } else
          d ? (c[a] = o, X(f, a) && (f[a] = o)) : _ ? (a.value = o, t.k && (c[t.k] = o)) : process.env.NODE_ENV !== "production" && R("Invalid template ref type:", a, `(${typeof a})`);
      };
      o ? (g.id = -1, ke(g, n)) : g();
    } else
      process.env.NODE_ENV !== "production" && R("Invalid template ref type:", a, `(${typeof a})`);
  }
}
let er, kt;
function Ot(t, e) {
  t.appContext.config.performance && si() && kt.mark(`vue-${e}-${t.uid}`), process.env.NODE_ENV !== "production" && Rc(t, e, si() ? kt.now() : Date.now());
}
function Nt(t, e) {
  if (t.appContext.config.performance && si()) {
    const n = `vue-${e}-${t.uid}`, r = n + ":end";
    kt.mark(r), kt.measure(
      `<${Di(t, t.type)}> ${e}`,
      n,
      r
    ), kt.clearMarks(n), kt.clearMarks(r);
  }
  process.env.NODE_ENV !== "production" && kc(t, e, si() ? kt.now() : Date.now());
}
function si() {
  return er !== void 0 || (typeof window < "u" && window.performance ? (er = !0, kt = window.performance) : er = !1), er;
}
function Pf() {
  const t = [];
  if (process.env.NODE_ENV !== "production" && t.length) {
    const e = t.length > 1;
    console.warn(
      `Feature flag${e ? "s" : ""} ${t.join(", ")} ${e ? "are" : "is"} not explicitly defined. You are running the esm-bundler build of Vue, which expects these compile-time feature flags to be globally injected via the bundler config in order to get better tree-shaking in the production bundle.

For more details, see https://link.vuejs.org/feature-flags.`
    );
  }
}
const ke = Yc;
function Vf(t) {
  return Mf(t);
}
function Mf(t, e) {
  Pf();
  const n = Zr();
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
    setScopeId: _ = be,
    insertStaticContent: g
  } = t, p = (h, m, x, N = null, w = null, V = null, I = !1, P = null, A = process.env.NODE_ENV !== "production" && ln ? !1 : !!m.dynamicChildren) => {
    if (h === m)
      return;
    h && !tr(h, m) && (N = Ar(h), it(h, w, V, !0), h = null), m.patchFlag === -2 && (A = !1, m.dynamicChildren = null);
    const { type: D, ref: $, shapeFlag: F } = m;
    switch (D) {
      case Vr:
        y(h, m, x, N);
        break;
      case tt:
        E(h, m, x, N);
        break;
      case fr:
        h == null ? O(m, x, N, I) : process.env.NODE_ENV !== "production" && b(h, m, x, I);
        break;
      case He:
        G(
          h,
          m,
          x,
          N,
          w,
          V,
          I,
          P,
          A
        );
        break;
      default:
        F & 1 ? S(
          h,
          m,
          x,
          N,
          w,
          V,
          I,
          P,
          A
        ) : F & 6 ? pe(
          h,
          m,
          x,
          N,
          w,
          V,
          I,
          P,
          A
        ) : F & 64 || F & 128 ? D.process(
          h,
          m,
          x,
          N,
          w,
          V,
          I,
          P,
          A,
          Nn
        ) : process.env.NODE_ENV !== "production" && R("Invalid VNode type:", D, `(${typeof D})`);
    }
    $ != null && w && as($, h && h.ref, V, m || h, !m);
  }, y = (h, m, x, N) => {
    if (h == null)
      r(
        m.el = l(m.children),
        x,
        N
      );
    else {
      const w = m.el = h.el;
      m.children !== h.children && u(w, m.children);
    }
  }, E = (h, m, x, N) => {
    h == null ? r(
      m.el = a(m.children || ""),
      x,
      N
    ) : m.el = h.el;
  }, O = (h, m, x, N) => {
    [h.el, h.anchor] = g(
      h.children,
      m,
      x,
      N,
      h.el,
      h.anchor
    );
  }, b = (h, m, x, N) => {
    if (m.children !== h.children) {
      const w = d(h.anchor);
      v(h), [m.el, m.anchor] = g(
        m.children,
        x,
        w,
        N
      );
    } else
      m.el = h.el, m.anchor = h.anchor;
  }, T = ({ el: h, anchor: m }, x, N) => {
    let w;
    for (; h && h !== m; )
      w = d(h), r(h, x, N), h = w;
    r(m, x, N);
  }, v = ({ el: h, anchor: m }) => {
    let x;
    for (; h && h !== m; )
      x = d(h), i(h), h = x;
    i(m);
  }, S = (h, m, x, N, w, V, I, P, A) => {
    I = I || m.type === "svg", h == null ? M(
      m,
      x,
      N,
      w,
      V,
      I,
      P,
      A
    ) : W(
      h,
      m,
      w,
      V,
      I,
      P,
      A
    );
  }, M = (h, m, x, N, w, V, I, P) => {
    let A, D;
    const { type: $, props: F, shapeFlag: L, transition: H, dirs: q } = h;
    if (A = h.el = o(
      h.type,
      V,
      F && F.is,
      F
    ), L & 8 ? c(A, h.children) : L & 16 && C(
      h.children,
      A,
      null,
      N,
      w,
      V && $ !== "foreignObject",
      I,
      P
    ), q && Xt(h, null, N, "created"), k(A, h, h.scopeId, I, N), F) {
      for (const ee in F)
        ee !== "value" && !Br(ee) && s(
          A,
          ee,
          null,
          F[ee],
          V,
          h.children,
          N,
          w,
          Et
        );
      "value" in F && s(A, "value", null, F.value), (D = F.onVnodeBeforeMount) && ct(D, N, h);
    }
    process.env.NODE_ENV !== "production" && (Object.defineProperty(A, "__vnode", {
      value: h,
      enumerable: !1
    }), Object.defineProperty(A, "__vueParentComponent", {
      value: N,
      enumerable: !1
    })), q && Xt(h, null, N, "beforeMount");
    const ne = Af(w, H);
    ne && H.beforeEnter(A), r(A, m, x), ((D = F && F.onVnodeMounted) || ne || q) && ke(() => {
      D && ct(D, N, h), ne && H.enter(A), q && Xt(h, null, N, "mounted");
    }, w);
  }, k = (h, m, x, N, w) => {
    if (x && _(h, x), N)
      for (let V = 0; V < N.length; V++)
        _(h, N[V]);
    if (w) {
      let V = w.subTree;
      if (process.env.NODE_ENV !== "production" && V.patchFlag > 0 && V.patchFlag & 2048 && (V = na(V.children) || V), m === V) {
        const I = w.vnode;
        k(
          h,
          I,
          I.scopeId,
          I.slotScopeIds,
          w.parent
        );
      }
    }
  }, C = (h, m, x, N, w, V, I, P, A = 0) => {
    for (let D = A; D < h.length; D++) {
      const $ = h[D] = P ? Rt(h[D]) : ot(h[D]);
      p(
        null,
        $,
        m,
        x,
        N,
        w,
        V,
        I,
        P
      );
    }
  }, W = (h, m, x, N, w, V, I) => {
    const P = m.el = h.el;
    let { patchFlag: A, dynamicChildren: D, dirs: $ } = m;
    A |= h.patchFlag & 16;
    const F = h.props || ie, L = m.props || ie;
    let H;
    x && qt(x, !1), (H = L.onVnodeBeforeUpdate) && ct(H, x, m, h), $ && Xt(m, h, x, "beforeUpdate"), x && qt(x, !0), process.env.NODE_ENV !== "production" && ln && (A = 0, I = !1, D = null);
    const q = w && m.type !== "foreignObject";
    if (D ? (Z(
      h.dynamicChildren,
      D,
      P,
      x,
      N,
      q,
      V
    ), process.env.NODE_ENV !== "production" && Wr(h, m)) : I || Se(
      h,
      m,
      P,
      null,
      x,
      N,
      q,
      V,
      !1
    ), A > 0) {
      if (A & 16)
        K(
          P,
          m,
          F,
          L,
          x,
          N,
          w
        );
      else if (A & 2 && F.class !== L.class && s(P, "class", null, L.class, w), A & 4 && s(P, "style", F.style, L.style, w), A & 8) {
        const ne = m.dynamicProps;
        for (let ee = 0; ee < ne.length; ee++) {
          const _e = ne[ee], st = F[_e], wn = L[_e];
          (wn !== st || _e === "value") && s(
            P,
            _e,
            st,
            wn,
            w,
            h.children,
            x,
            N,
            Et
          );
        }
      }
      A & 1 && h.children !== m.children && c(P, m.children);
    } else
      !I && D == null && K(
        P,
        m,
        F,
        L,
        x,
        N,
        w
      );
    ((H = L.onVnodeUpdated) || $) && ke(() => {
      H && ct(H, x, m, h), $ && Xt(m, h, x, "updated");
    }, N);
  }, Z = (h, m, x, N, w, V, I) => {
    for (let P = 0; P < m.length; P++) {
      const A = h[P], D = m[P], $ = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        A.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (A.type === He || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !tr(A, D) || // - In the case of a component, it could contain anything.
        A.shapeFlag & 70) ? f(A.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          x
        )
      );
      p(
        A,
        D,
        $,
        null,
        N,
        w,
        V,
        I,
        !0
      );
    }
  }, K = (h, m, x, N, w, V, I) => {
    if (x !== N) {
      if (x !== ie)
        for (const P in x)
          !Br(P) && !(P in N) && s(
            h,
            P,
            x[P],
            null,
            I,
            m.children,
            w,
            V,
            Et
          );
      for (const P in N) {
        if (Br(P))
          continue;
        const A = N[P], D = x[P];
        A !== D && P !== "value" && s(
          h,
          P,
          D,
          A,
          I,
          m.children,
          w,
          V,
          Et
        );
      }
      "value" in N && s(h, "value", x.value, N.value);
    }
  }, G = (h, m, x, N, w, V, I, P, A) => {
    const D = m.el = h ? h.el : l(""), $ = m.anchor = h ? h.anchor : l("");
    let { patchFlag: F, dynamicChildren: L, slotScopeIds: H } = m;
    process.env.NODE_ENV !== "production" && // #5523 dev root fragment may inherit directives
    (ln || F & 2048) && (F = 0, A = !1, L = null), H && (P = P ? P.concat(H) : H), h == null ? (r(D, x, N), r($, x, N), C(
      m.children,
      x,
      $,
      w,
      V,
      I,
      P,
      A
    )) : F > 0 && F & 64 && L && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    h.dynamicChildren ? (Z(
      h.dynamicChildren,
      L,
      x,
      w,
      V,
      I,
      P
    ), process.env.NODE_ENV !== "production" ? Wr(h, m) : (
      // #2080 if the stable fragment has a key, it's a <template v-for> that may
      //  get moved around. Make sure all root level vnodes inherit el.
      // #2134 or if it's a component root, it may also get moved around
      // as the component is being moved.
      (m.key != null || w && m === w.subTree) && Wr(
        h,
        m,
        !0
        /* shallow */
      )
    )) : Se(
      h,
      m,
      x,
      $,
      w,
      V,
      I,
      P,
      A
    );
  }, pe = (h, m, x, N, w, V, I, P, A) => {
    m.slotScopeIds = P, h == null ? m.shapeFlag & 512 ? w.ctx.activate(
      m,
      x,
      N,
      I,
      A
    ) : te(
      m,
      x,
      N,
      w,
      V,
      I,
      A
    ) : Q(h, m, A);
  }, te = (h, m, x, N, w, V, I) => {
    const P = h.component = Hf(
      h,
      N,
      w
    );
    if (process.env.NODE_ENV !== "production" && P.type.__hmrId && wc(P), process.env.NODE_ENV !== "production" && (jr(h), Ot(P, "mount")), Ws(h) && (P.ctx.renderer = Nn), process.env.NODE_ENV !== "production" && Ot(P, "init"), Yf(P), process.env.NODE_ENV !== "production" && Nt(P, "init"), P.asyncDep) {
      if (w && w.registerDep(P, z), !h.el) {
        const A = P.subTree = gt(tt);
        E(null, A, m, x);
      }
      return;
    }
    z(
      P,
      h,
      m,
      x,
      w,
      V,
      I
    ), process.env.NODE_ENV !== "production" && (Ur(), Nt(P, "mount"));
  }, Q = (h, m, x) => {
    const N = m.component = h.component;
    if (jc(h, m, x))
      if (N.asyncDep && !N.asyncResolved) {
        process.env.NODE_ENV !== "production" && jr(m), j(N, m, x), process.env.NODE_ENV !== "production" && Ur();
        return;
      } else
        N.next = m, Oc(N.update), N.update();
    else
      m.el = h.el, N.vnode = m;
  }, z = (h, m, x, N, w, V, I) => {
    const P = () => {
      if (h.isMounted) {
        let { next: $, bu: F, u: L, parent: H, vnode: q } = h, ne = $, ee;
        process.env.NODE_ENV !== "production" && jr($ || h.vnode), qt(h, !1), $ ? ($.el = q.el, j(h, $, I)) : $ = q, F && Gn(F), (ee = $.props && $.props.onVnodeBeforeUpdate) && ct(ee, H, $, q), qt(h, !0), process.env.NODE_ENV !== "production" && Ot(h, "render");
        const _e = ki(h);
        process.env.NODE_ENV !== "production" && Nt(h, "render");
        const st = h.subTree;
        h.subTree = _e, process.env.NODE_ENV !== "production" && Ot(h, "patch"), p(
          st,
          _e,
          // parent may have changed if it's in a teleport
          f(st.el),
          // anchor may have changed if it's in a fragment
          Ar(st),
          h,
          w,
          V
        ), process.env.NODE_ENV !== "production" && Nt(h, "patch"), $.el = _e.el, ne === null && Uc(h, _e.el), L && ke(L, w), (ee = $.props && $.props.onVnodeUpdated) && ke(
          () => ct(ee, H, $, q),
          w
        ), process.env.NODE_ENV !== "production" && Zl(h), process.env.NODE_ENV !== "production" && Ur();
      } else {
        let $;
        const { el: F, props: L } = m, { bm: H, m: q, parent: ne } = h, ee = cr(m);
        if (qt(h, !1), H && Gn(H), !ee && ($ = L && L.onVnodeBeforeMount) && ct($, ne, m), qt(h, !0), F && Ai) {
          const _e = () => {
            process.env.NODE_ENV !== "production" && Ot(h, "render"), h.subTree = ki(h), process.env.NODE_ENV !== "production" && Nt(h, "render"), process.env.NODE_ENV !== "production" && Ot(h, "hydrate"), Ai(
              F,
              h.subTree,
              h,
              w,
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
            N,
            h,
            w,
            V
          ), process.env.NODE_ENV !== "production" && Nt(h, "patch"), m.el = _e.el;
        }
        if (q && ke(q, w), !ee && ($ = L && L.onVnodeMounted)) {
          const _e = m;
          ke(
            () => ct($, ne, _e),
            w
          );
        }
        (m.shapeFlag & 256 || ne && cr(ne.vnode) && ne.vnode.shapeFlag & 256) && h.a && ke(h.a, w), h.isMounted = !0, process.env.NODE_ENV !== "production" && Vc(h), m = x = N = null;
      }
    }, A = h.effect = new ks(
      P,
      () => Ei(D),
      h.scope
      // track it in component's effect scope
    ), D = h.update = () => A.run();
    D.id = h.uid, qt(h, !0), process.env.NODE_ENV !== "production" && (A.onTrack = h.rtc ? ($) => Gn(h.rtc, $) : void 0, A.onTrigger = h.rtg ? ($) => Gn(h.rtg, $) : void 0, D.ownerInstance = h), D();
  }, j = (h, m, x) => {
    m.component = h;
    const N = h.vnode.props;
    h.vnode = m, h.next = null, bf(h, m.props, N, x), Sf(h, m.children, x), yn(), Ro(h), xn();
  }, Se = (h, m, x, N, w, V, I, P, A = !1) => {
    const D = h && h.children, $ = h ? h.shapeFlag : 0, F = m.children, { patchFlag: L, shapeFlag: H } = m;
    if (L > 0) {
      if (L & 128) {
        rt(
          D,
          F,
          x,
          N,
          w,
          V,
          I,
          P,
          A
        );
        return;
      } else if (L & 256) {
        xt(
          D,
          F,
          x,
          N,
          w,
          V,
          I,
          P,
          A
        );
        return;
      }
    }
    H & 8 ? ($ & 16 && Et(D, w, V), F !== D && c(x, F)) : $ & 16 ? H & 16 ? rt(
      D,
      F,
      x,
      N,
      w,
      V,
      I,
      P,
      A
    ) : Et(D, w, V, !0) : ($ & 8 && c(x, ""), H & 16 && C(
      F,
      x,
      N,
      w,
      V,
      I,
      P,
      A
    ));
  }, xt = (h, m, x, N, w, V, I, P, A) => {
    h = h || An, m = m || An;
    const D = h.length, $ = m.length, F = Math.min(D, $);
    let L;
    for (L = 0; L < F; L++) {
      const H = m[L] = A ? Rt(m[L]) : ot(m[L]);
      p(
        h[L],
        H,
        x,
        null,
        w,
        V,
        I,
        P,
        A
      );
    }
    D > $ ? Et(
      h,
      w,
      V,
      !0,
      !1,
      F
    ) : C(
      m,
      x,
      N,
      w,
      V,
      I,
      P,
      A,
      F
    );
  }, rt = (h, m, x, N, w, V, I, P, A) => {
    let D = 0;
    const $ = m.length;
    let F = h.length - 1, L = $ - 1;
    for (; D <= F && D <= L; ) {
      const H = h[D], q = m[D] = A ? Rt(m[D]) : ot(m[D]);
      if (tr(H, q))
        p(
          H,
          q,
          x,
          null,
          w,
          V,
          I,
          P,
          A
        );
      else
        break;
      D++;
    }
    for (; D <= F && D <= L; ) {
      const H = h[F], q = m[L] = A ? Rt(m[L]) : ot(m[L]);
      if (tr(H, q))
        p(
          H,
          q,
          x,
          null,
          w,
          V,
          I,
          P,
          A
        );
      else
        break;
      F--, L--;
    }
    if (D > F) {
      if (D <= L) {
        const H = L + 1, q = H < $ ? m[H].el : N;
        for (; D <= L; )
          p(
            null,
            m[D] = A ? Rt(m[D]) : ot(m[D]),
            x,
            q,
            w,
            V,
            I,
            P,
            A
          ), D++;
      }
    } else if (D > L)
      for (; D <= F; )
        it(h[D], w, V, !0), D++;
    else {
      const H = D, q = D, ne = /* @__PURE__ */ new Map();
      for (D = q; D <= L; D++) {
        const Pe = m[D] = A ? Rt(m[D]) : ot(m[D]);
        Pe.key != null && (process.env.NODE_ENV !== "production" && ne.has(Pe.key) && R(
          "Duplicate keys found during update:",
          JSON.stringify(Pe.key),
          "Make sure keys are unique."
        ), ne.set(Pe.key, D));
      }
      let ee, _e = 0;
      const st = L - q + 1;
      let wn = !1, Eo = 0;
      const Zn = new Array(st);
      for (D = 0; D < st; D++)
        Zn[D] = 0;
      for (D = H; D <= F; D++) {
        const Pe = h[D];
        if (_e >= st) {
          it(Pe, w, V, !0);
          continue;
        }
        let ut;
        if (Pe.key != null)
          ut = ne.get(Pe.key);
        else
          for (ee = q; ee <= L; ee++)
            if (Zn[ee - q] === 0 && tr(Pe, m[ee])) {
              ut = ee;
              break;
            }
        ut === void 0 ? it(Pe, w, V, !0) : (Zn[ut - q] = D + 1, ut >= Eo ? Eo = ut : wn = !0, p(
          Pe,
          m[ut],
          x,
          null,
          w,
          V,
          I,
          P,
          A
        ), _e++);
      }
      const Oo = wn ? Rf(Zn) : An;
      for (ee = Oo.length - 1, D = st - 1; D >= 0; D--) {
        const Pe = q + D, ut = m[Pe], No = Pe + 1 < $ ? m[Pe + 1].el : N;
        Zn[D] === 0 ? p(
          null,
          ut,
          x,
          No,
          w,
          V,
          I,
          P,
          A
        ) : wn && (ee < 0 || D !== Oo[ee] ? Re(ut, x, No, 2) : ee--);
      }
    }
  }, Re = (h, m, x, N, w = null) => {
    const { el: V, type: I, transition: P, children: A, shapeFlag: D } = h;
    if (D & 6) {
      Re(h.component.subTree, m, x, N);
      return;
    }
    if (D & 128) {
      h.suspense.move(m, x, N);
      return;
    }
    if (D & 64) {
      I.move(h, m, x, Nn);
      return;
    }
    if (I === He) {
      r(V, m, x);
      for (let F = 0; F < A.length; F++)
        Re(A[F], m, x, N);
      r(h.anchor, m, x);
      return;
    }
    if (I === fr) {
      T(h, m, x);
      return;
    }
    if (N !== 2 && D & 1 && P)
      if (N === 0)
        P.beforeEnter(V), r(V, m, x), ke(() => P.enter(V), w);
      else {
        const { leave: F, delayLeave: L, afterLeave: H } = P, q = () => r(V, m, x), ne = () => {
          F(V, () => {
            q(), H && H();
          });
        };
        L ? L(V, q, ne) : ne();
      }
    else
      r(V, m, x);
  }, it = (h, m, x, N = !1, w = !1) => {
    const {
      type: V,
      props: I,
      ref: P,
      children: A,
      dynamicChildren: D,
      shapeFlag: $,
      patchFlag: F,
      dirs: L
    } = h;
    if (P != null && as(P, null, x, h, !0), $ & 256) {
      m.ctx.deactivate(h);
      return;
    }
    const H = $ & 1 && L, q = !cr(h);
    let ne;
    if (q && (ne = I && I.onVnodeBeforeUnmount) && ct(ne, m, h), $ & 6)
      Tu(h.component, x, N);
    else {
      if ($ & 128) {
        h.suspense.unmount(x, N);
        return;
      }
      H && Xt(h, null, m, "beforeUnmount"), $ & 64 ? h.type.remove(
        h,
        m,
        x,
        w,
        Nn,
        N
      ) : D && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (V !== He || F > 0 && F & 64) ? Et(
        D,
        m,
        x,
        !1,
        !0
      ) : (V === He && F & 384 || !w && $ & 16) && Et(A, m, x), N && Be(h);
    }
    (q && (ne = I && I.onVnodeUnmounted) || H) && ke(() => {
      ne && ct(ne, m, h), H && Xt(h, null, m, "unmounted");
    }, x);
  }, Be = (h) => {
    const { type: m, el: x, anchor: N, transition: w } = h;
    if (m === He) {
      process.env.NODE_ENV !== "production" && h.patchFlag > 0 && h.patchFlag & 2048 && w && !w.persisted ? h.children.forEach((I) => {
        I.type === tt ? i(I.el) : Be(I);
      }) : bt(x, N);
      return;
    }
    if (m === fr) {
      v(h);
      return;
    }
    const V = () => {
      i(x), w && !w.persisted && w.afterLeave && w.afterLeave();
    };
    if (h.shapeFlag & 1 && w && !w.persisted) {
      const { leave: I, delayLeave: P } = w, A = () => I(x, V);
      P ? P(h.el, V, A) : A();
    } else
      V();
  }, bt = (h, m) => {
    let x;
    for (; h !== m; )
      x = d(h), i(h), h = x;
    i(m);
  }, Tu = (h, m, x) => {
    process.env.NODE_ENV !== "production" && h.type.__hmrId && Tc(h);
    const { bum: N, scope: w, update: V, subTree: I, um: P } = h;
    N && Gn(N), w.stop(), V && (V.active = !1, it(I, h, m, x)), P && ke(P, m), ke(() => {
      h.isUnmounted = !0;
    }, m), m && m.pendingBranch && !m.isUnmounted && h.asyncDep && !h.asyncResolved && h.suspenseId === m.pendingId && (m.deps--, m.deps === 0 && m.resolve()), process.env.NODE_ENV !== "production" && Ac(h);
  }, Et = (h, m, x, N = !1, w = !1, V = 0) => {
    for (let I = V; I < h.length; I++)
      it(h[I], m, x, N, w);
  }, Ar = (h) => h.shapeFlag & 6 ? Ar(h.component.subTree) : h.shapeFlag & 128 ? h.suspense.next() : d(h.anchor || h.el), bo = (h, m, x) => {
    h == null ? m._vnode && it(m._vnode, null, null, !0) : p(m._vnode || null, h, m, null, null, null, x), Ro(), Xl(), m._vnode = h;
  }, Nn = {
    p,
    um: it,
    m: Re,
    r: Be,
    mt: te,
    mc: C,
    pc: Se,
    pbc: Z,
    n: Ar,
    o: t
  };
  let Mi, Ai;
  return e && ([Mi, Ai] = e(
    Nn
  )), {
    render: bo,
    hydrate: Mi,
    createApp: gf(bo, Mi)
  };
}
function qt({ effect: t, update: e }, n) {
  t.allowRecurse = e.allowRecurse = n;
}
function Af(t, e) {
  return (!t || t && !t.pendingBranch) && e && !e.persisted;
}
function Wr(t, e, n = !1) {
  const r = t.children, i = e.children;
  if (B(r) && B(i))
    for (let s = 0; s < r.length; s++) {
      const o = r[s];
      let l = i[s];
      l.shapeFlag & 1 && !l.dynamicChildren && ((l.patchFlag <= 0 || l.patchFlag === 32) && (l = i[s] = Rt(i[s]), l.el = o.el), n || Wr(o, l)), l.type === Vr && (l.el = o.el), process.env.NODE_ENV !== "production" && l.type === tt && !l.el && (l.el = o.el);
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
const kf = (t) => t.__isTeleport, He = Symbol.for("v-fgt"), Vr = Symbol.for("v-txt"), tt = Symbol.for("v-cmt"), fr = Symbol.for("v-stc"), dr = [];
let lt = null;
function En(t = !1) {
  dr.push(lt = t ? null : []);
}
function If() {
  dr.pop(), lt = dr[dr.length - 1] || null;
}
let xr = 1;
function Ko(t) {
  xr += t;
}
function ma(t) {
  return t.dynamicChildren = xr > 0 ? lt || An : null, If(), xr > 0 && lt && lt.push(t), t;
}
function Xn(t, e, n, r, i, s) {
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
function Ff(t, e, n, r, i) {
  return ma(
    gt(
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
function wi(t) {
  return t ? t.__v_isVNode === !0 : !1;
}
function tr(t, e) {
  return process.env.NODE_ENV !== "production" && e.shapeFlag & 6 && Cn.has(e.type) ? (t.shapeFlag &= -257, e.shapeFlag &= -513, !1) : t.type === e.type && t.key === e.key;
}
const $f = (...t) => va(
  ...t
), Ti = "__vInternal", ga = ({ key: t }) => t ?? null, Yr = ({
  ref: t,
  ref_key: e,
  ref_for: n
}) => (typeof t == "number" && (t = "" + t), t != null ? ge(t) || Ne(t) || U(t) ? { i: Ee, r: t, k: e, f: !!n } : t : null);
function Js(t, e = null, n = null, r = 0, i = null, s = t === He ? 0 : 1, o = !1, l = !1) {
  const a = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: t,
    props: e,
    key: e && ga(e),
    ref: e && Yr(e),
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
    ctx: Ee
  };
  return l ? (Zs(a, n), s & 128 && t.normalize(a)) : n && (a.shapeFlag |= ge(n) ? 8 : 16), process.env.NODE_ENV !== "production" && a.key !== a.key && R("VNode created with invalid key (NaN). VNode type:", a.type), xr > 0 && // avoid a block node from tracking itself
  !o && // has current parent block
  lt && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (a.patchFlag > 0 || s & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  a.patchFlag !== 32 && lt.push(a), a;
}
const gt = process.env.NODE_ENV !== "production" ? $f : va;
function va(t, e = null, n = null, r = 0, i = null, s = !1) {
  if ((!t || t === Hc) && (process.env.NODE_ENV !== "production" && !t && R(`Invalid vnode type when creating vnode: ${t}.`), t = tt), wi(t)) {
    const l = Ht(
      t,
      e,
      !0
      /* mergeRef: true */
    );
    return n && Zs(l, n), xr > 0 && !s && lt && (l.shapeFlag & 6 ? lt[lt.indexOf(t)] = l : lt.push(l)), l.patchFlag |= -2, l;
  }
  if (Oa(t) && (t = t.__vccOpts), e) {
    e = Lf(e);
    let { class: l, style: a } = e;
    l && !ge(l) && (e.class = Rs(l)), le(a) && (Gi(a) && !B(a) && (a = ae({}, a)), e.style = gi(a));
  }
  const o = ge(t) ? 1 : Wc(t) ? 128 : kf(t) ? 64 : le(t) ? 4 : U(t) ? 2 : 0;
  return process.env.NODE_ENV !== "production" && o & 4 && Gi(t) && (t = Y(t), R(
    "Vue received a Component that was made a reactive object. This can lead to unnecessary performance overhead and should be avoided by marking the component with `markRaw` or using `shallowRef` instead of `ref`.",
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
function Lf(t) {
  return t ? Gi(t) || Ti in t ? ae({}, t) : t : null;
}
function Ht(t, e, n = !1) {
  const { props: r, ref: i, patchFlag: s, children: o } = t, l = e ? Bf(r || {}, e) : r;
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
      n && i ? B(i) ? i.concat(Yr(e)) : [i, Yr(e)] : Yr(e)
    ) : i,
    scopeId: t.scopeId,
    slotScopeIds: t.slotScopeIds,
    children: process.env.NODE_ENV !== "production" && s === -1 && B(o) ? o.map(ya) : o,
    target: t.target,
    targetAnchor: t.targetAnchor,
    staticCount: t.staticCount,
    shapeFlag: t.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: e && t.type !== He ? s === -1 ? 16 : s | 16 : s,
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
  return B(t.children) && (e.children = t.children.map(ya)), e;
}
function zf(t = " ", e = 0) {
  return gt(Vr, null, t, e);
}
function ot(t) {
  return t == null || typeof t == "boolean" ? gt(tt) : B(t) ? gt(
    He,
    null,
    // #3666, avoid reference pollution when reusing vnode
    t.slice()
  ) : typeof t == "object" ? Rt(t) : gt(Vr, null, String(t));
}
function Rt(t) {
  return t.el === null && t.patchFlag !== -1 || t.memo ? t : Ht(t);
}
function Zs(t, e) {
  let n = 0;
  const { shapeFlag: r } = t;
  if (e == null)
    e = null;
  else if (B(e))
    n = 16;
  else if (typeof e == "object")
    if (r & 65) {
      const i = e.default;
      i && (i._c && (i._d = !1), Zs(t, i()), i._c && (i._d = !0));
      return;
    } else {
      n = 32;
      const i = e._;
      !i && !(Ti in e) ? e._ctx = Ee : i === 3 && Ee && (Ee.slots._ === 1 ? e._ = 1 : (e._ = 2, t.patchFlag |= 1024));
    }
  else
    U(e) ? (e = { default: e, _ctx: Ee }, n = 32) : (e = String(e), r & 64 ? (n = 16, e = [zf(e)]) : n = 8);
  t.children = e, t.shapeFlag |= n;
}
function Bf(...t) {
  const e = {};
  for (let n = 0; n < t.length; n++) {
    const r = t[n];
    for (const i in r)
      if (i === "class")
        e.class !== r.class && (e.class = Rs([e.class, r.class]));
      else if (i === "style")
        e.style = gi([e.style, r.style]);
      else if (Sr(i)) {
        const s = e[i], o = r[i];
        o && s !== o && !(B(s) && s.includes(o)) && (e[i] = s ? [].concat(s, o) : o);
      } else
        i !== "" && (e[i] = r[i]);
  }
  return e;
}
function ct(t, e, n, r = null) {
  at(t, e, 7, [
    n,
    r
  ]);
}
const jf = ua();
let Uf = 0;
function Hf(t, e, n) {
  const r = t.type, i = (e ? e.appContext : t.appContext) || jf, s = {
    uid: Uf++,
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
    propsDefaults: ie,
    // inheritAttrs
    inheritAttrs: r.inheritAttrs,
    // state
    ctx: ie,
    data: ie,
    props: ie,
    attrs: ie,
    slots: ie,
    refs: ie,
    setupState: ie,
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
let ye = null;
const Gs = () => ye || Ee;
let eo, Tn, Xo = "__VUE_INSTANCE_SETTERS__";
(Tn = Zr()[Xo]) || (Tn = Zr()[Xo] = []), Tn.push((t) => ye = t), eo = (t) => {
  Tn.length > 1 ? Tn.forEach((e) => e(t)) : Tn[0](t);
};
const Ln = (t) => {
  eo(t), t.scope.on();
}, cn = () => {
  ye && ye.scope.off(), eo(null);
}, Wf = /* @__PURE__ */ Yn("slot,component");
function us(t, e) {
  const n = e.isNativeTag || Ol;
  (Wf(t) || n(t)) && R(
    "Do not use built-in or reserved HTML elements as component id: " + t
  );
}
function xa(t) {
  return t.vnode.shapeFlag & 4;
}
let br = !1;
function Yf(t, e = !1) {
  br = e;
  const { props: n, children: r } = t.vnode, i = xa(t);
  yf(t, n, i, e), Cf(t, r);
  const s = i ? Kf(t, e) : void 0;
  return br = !1, s;
}
function Kf(t, e) {
  var n;
  const r = t.type;
  if (process.env.NODE_ENV !== "production") {
    if (r.name && us(r.name, t.appContext.config), r.components) {
      const s = Object.keys(r.components);
      for (let o = 0; o < s.length; o++)
        us(s[o], t.appContext.config);
    }
    if (r.directives) {
      const s = Object.keys(r.directives);
      for (let o = 0; o < s.length; o++)
        ia(s[o]);
    }
    r.compilerOptions && Xf() && R(
      '"compilerOptions" is only supported when using a build of Vue that includes the runtime compiler. Since you are using a runtime-only build, the options should be passed via your build tool config instead.'
    );
  }
  t.accessCache = /* @__PURE__ */ Object.create(null), t.proxy = Ll(new Proxy(t.ctx, la)), process.env.NODE_ENV !== "production" && af(t);
  const { setup: i } = r;
  if (i) {
    const s = t.setupContext = i.length > 1 ? Qf(t) : null;
    Ln(t), yn();
    const o = Ct(
      i,
      t,
      0,
      [process.env.NODE_ENV !== "production" ? ir(t.props) : t.props, s]
    );
    if (xn(), cn(), Vs(o)) {
      if (o.then(cn, cn), e)
        return o.then((l) => {
          qo(t, l, e);
        }).catch((l) => {
          bi(l, t, 0);
        });
      if (t.asyncDep = o, process.env.NODE_ENV !== "production" && !t.suspense) {
        const l = (n = r.name) != null ? n : "Anonymous";
        R(
          `Component <${l}>: setup function returned a promise, but no <Suspense> boundary was found in the parent component tree. A component with async setup() must be nested in a <Suspense> in order to be rendered.`
        );
      }
    } else
      qo(t, o, e);
  } else
    ba(t, e);
}
function qo(t, e, n) {
  U(e) ? t.type.__ssrInlineRender ? t.ssrRender = e : t.render = e : le(e) ? (process.env.NODE_ENV !== "production" && wi(e) && R(
    "setup() should not return VNodes directly - return a render function instead."
  ), process.env.NODE_ENV !== "production" && (t.devtoolsRawSetupState = e), t.setupState = Ul(e), process.env.NODE_ENV !== "production" && uf(t)) : process.env.NODE_ENV !== "production" && e !== void 0 && R(
    `setup() should return an object. Received: ${e === null ? "null" : typeof e}`
  ), ba(t, n);
}
let cs;
const Xf = () => !cs;
function ba(t, e, n) {
  const r = t.type;
  if (!t.render) {
    if (!e && cs && !r.render) {
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
        r.render = cs(i, u), process.env.NODE_ENV !== "production" && Nt(t, "compile");
      }
    }
    t.render = r.render || be;
  }
  {
    Ln(t), yn();
    try {
      ff(t);
    } finally {
      xn(), cn();
    }
  }
  process.env.NODE_ENV !== "production" && !r.render && t.render === be && !e && (r.template ? R(
    'Component provided template option but runtime compilation is not supported in this build of Vue. Configure your bundler to alias "vue" to "vue/dist/vue.esm-bundler.js".'
    /* should not happen */
  ) : R("Component is missing template or render function."));
}
function Qo(t) {
  return t.attrsProxy || (t.attrsProxy = new Proxy(
    t.attrs,
    process.env.NODE_ENV !== "production" ? {
      get(e, n) {
        return ni(), Oe(t, "get", "$attrs"), e[n];
      },
      set() {
        return R("setupContext.attrs is readonly."), !1;
      },
      deleteProperty() {
        return R("setupContext.attrs is readonly."), !1;
      }
    } : {
      get(e, n) {
        return Oe(t, "get", "$attrs"), e[n];
      }
    }
  ));
}
function qf(t) {
  return t.slotsProxy || (t.slotsProxy = new Proxy(t.slots, {
    get(e, n) {
      return Oe(t, "get", "$slots"), e[n];
    }
  }));
}
function Qf(t) {
  const e = (n) => {
    if (process.env.NODE_ENV !== "production" && (t.exposed && R("expose() should be called only once per setup()."), n != null)) {
      let r = typeof n;
      r === "object" && (B(n) ? r = "array" : Ne(n) && (r = "ref")), r !== "object" && R(
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
      return qf(t);
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
const Jf = /(?:^|[-_])(\w)/g, Zf = (t) => t.replace(Jf, (e) => e.toUpperCase()).replace(/[-_]/g, "");
function Ea(t, e = !0) {
  return U(t) ? t.displayName || t.name : t.name || e && t.__name;
}
function Di(t, e, n = !1) {
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
  return r ? Zf(r) : n ? "App" : "Anonymous";
}
function Oa(t) {
  return U(t) && "__vccOpts" in t;
}
const Je = (t, e) => _c(t, e, br), Gf = Symbol.for("v-scx"), ed = () => {
  {
    const t = Hr(Gf);
    return t || process.env.NODE_ENV !== "production" && R(
      "Server rendering context not provided. Make sure to only call useSSRContext() conditionally in the server build."
    ), t;
  }
};
function Fi(t) {
  return !!(t && t.__v_isShallow);
}
function td() {
  if (process.env.NODE_ENV === "production" || typeof window > "u")
    return;
  const t = { style: "color:#3ba776" }, e = { style: "color:#1677ff" }, n = { style: "color:#f5222d" }, r = { style: "color:#eb2f96" }, i = {
    header(f) {
      return le(f) ? f.__isVue ? ["div", t, "VueInstance"] : Ne(f) ? [
        "div",
        {},
        ["span", t, c(f)],
        "<",
        l(f.value),
        ">"
      ] : sn(f) ? [
        "div",
        {},
        ["span", t, Fi(f) ? "ShallowReactive" : "Reactive"],
        "<",
        l(f),
        `>${Ut(f) ? " (readonly)" : ""}`
      ] : Ut(f) ? [
        "div",
        {},
        ["span", t, Fi(f) ? "ShallowReadonly" : "Readonly"],
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
    f.type.props && f.props && d.push(o("props", Y(f.props))), f.setupState !== ie && d.push(o("setup", f.setupState)), f.data !== ie && d.push(o("data", Y(f.data)));
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
    if (U(_))
      return;
    const g = {};
    for (const p in f.ctx)
      u(_, p, d) && (g[p] = f.ctx[p]);
    return g;
  }
  function u(f, d, _) {
    const g = f[_];
    if (B(g) && g.includes(d) || le(g) && d in g || f.extends && u(f.extends, d, _) || f.mixins && f.mixins.some((p) => u(p, d, _)))
      return !0;
  }
  function c(f) {
    return Fi(f) ? "ShallowRef" : f.effect ? "ComputedRef" : "Ref";
  }
  window.devtoolsFormatters ? window.devtoolsFormatters.push(i) : window.devtoolsFormatters = [i];
}
const Jo = "3.3.13", nd = "http://www.w3.org/2000/svg", en = typeof document < "u" ? document : null, Zo = en && /* @__PURE__ */ en.createElement("template"), rd = {
  insert: (t, e, n) => {
    e.insertBefore(t, n || null);
  },
  remove: (t) => {
    const e = t.parentNode;
    e && e.removeChild(t);
  },
  createElement: (t, e, n, r) => {
    const i = e ? en.createElementNS(nd, t) : en.createElement(t, n ? { is: n } : void 0);
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
}, id = Symbol("_vtc");
function sd(t, e, n) {
  const r = t[id];
  r && (e = (e ? [e, ...r] : [...r]).join(" ")), e == null ? t.removeAttribute("class") : n ? t.setAttribute("class", e) : t.className = e;
}
const od = Symbol("_vod"), Na = Symbol(process.env.NODE_ENV !== "production" ? "CSS_VAR_TEXT" : "");
function qn(t) {
  const e = Gs();
  if (!e) {
    process.env.NODE_ENV !== "production" && R("useCssVars is called without current active component instance.");
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
  Kc(r), Kn(() => {
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
  else if (t.type === He)
    t.children.forEach((n) => fs(n, e));
  else if (t.type === fr) {
    let { el: n, anchor: r } = t;
    for (; n && (ds(n, e), n !== r); )
      n = n.nextSibling;
  }
}
function ds(t, e) {
  if (t.nodeType === 1) {
    const n = t.style;
    let r = "";
    for (const i in e)
      n.setProperty(`--${i}`, e[i]), r += `--${i}: ${e[i]};`;
    n[Na] = r;
  }
}
function ld(t, e, n) {
  const r = t.style, i = ge(n);
  if (n && !i) {
    if (e && !ge(e))
      for (const s in e)
        n[s] == null && hs(r, s, "");
    for (const s in n)
      hs(r, s, n[s]);
  } else {
    const s = r.display;
    if (i) {
      if (e !== n) {
        const o = r[Na];
        o && (n += ";" + o), r.cssText = n;
      }
    } else
      e && t.removeAttribute("style");
    od in t && (r.display = s);
  }
}
const ad = /[^\\];\s*$/, Go = /\s*!important$/;
function hs(t, e, n) {
  if (B(n))
    n.forEach((r) => hs(t, e, r));
  else if (n == null && (n = ""), process.env.NODE_ENV !== "production" && ad.test(n) && R(
    `Unexpected semicolon at the end of '${e}' style value: '${n}'`
  ), e.startsWith("--"))
    t.setProperty(e, n);
  else {
    const r = ud(t, e);
    Go.test(n) ? t.setProperty(
      We(r),
      n.replace(Go, ""),
      "important"
    ) : t[r] = n;
  }
}
const el = ["Webkit", "Moz", "ms"], $i = {};
function ud(t, e) {
  const n = $i[e];
  if (n)
    return n;
  let r = Dt(e);
  if (r !== "filter" && r in t)
    return $i[e] = r;
  r = mi(r);
  for (let i = 0; i < el.length; i++) {
    const s = el[i] + r;
    if (s in t)
      return $i[e] = s;
  }
  return e;
}
const tl = "http://www.w3.org/1999/xlink";
function cd(t, e, n, r, i) {
  if (r && e.startsWith("xlink:"))
    n == null ? t.removeAttributeNS(tl, e.slice(6, e.length)) : t.setAttributeNS(tl, e, n);
  else {
    const s = zu(e);
    n == null || s && !Nl(n) ? t.removeAttribute(e) : t.setAttribute(e, s ? "" : n);
  }
}
function fd(t, e, n, r, i, s, o) {
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
    process.env.NODE_ENV !== "production" && !a && R(
      `Failed setting prop "${e}" on <${l.toLowerCase()}>: value ${n} is invalid.`,
      u
    );
  }
  a && t.removeAttribute(e);
}
function dd(t, e, n, r) {
  t.addEventListener(e, n, r);
}
function hd(t, e, n, r) {
  t.removeEventListener(e, n, r);
}
const nl = Symbol("_vei");
function pd(t, e, n, r, i = null) {
  const s = t[nl] || (t[nl] = {}), o = s[e];
  if (r && o)
    o.value = r;
  else {
    const [l, a] = _d(e);
    if (r) {
      const u = s[e] = vd(r, i);
      dd(t, l, u, a);
    } else
      o && (hd(t, l, o, a), s[e] = void 0);
  }
}
const rl = /(?:Once|Passive|Capture)$/;
function _d(t) {
  let e;
  if (rl.test(t)) {
    e = {};
    let r;
    for (; r = t.match(rl); )
      t = t.slice(0, t.length - r[0].length), e[r[0].toLowerCase()] = !0;
  }
  return [t[2] === ":" ? t.slice(3) : We(t.slice(2)), e];
}
let Li = 0;
const md = /* @__PURE__ */ Promise.resolve(), gd = () => Li || (md.then(() => Li = 0), Li = Date.now());
function vd(t, e) {
  const n = (r) => {
    if (!r._vts)
      r._vts = Date.now();
    else if (r._vts <= n.attached)
      return;
    at(
      yd(r, n.value),
      e,
      5,
      [r]
    );
  };
  return n.value = t, n.attached = gd(), n;
}
function yd(t, e) {
  if (B(e)) {
    const n = t.stopImmediatePropagation;
    return t.stopImmediatePropagation = () => {
      n.call(t), t._stopped = !0;
    }, e.map((r) => (i) => !i._stopped && r && r(i));
  } else
    return e;
}
const il = (t) => t.charCodeAt(0) === 111 && t.charCodeAt(1) === 110 && // lowercase letter
t.charCodeAt(2) > 96 && t.charCodeAt(2) < 123, xd = (t, e, n, r, i = !1, s, o, l, a) => {
  e === "class" ? sd(t, r, i) : e === "style" ? ld(t, n, r) : Sr(e) ? Qr(e) || pd(t, e, n, r, o) : (e[0] === "." ? (e = e.slice(1), !0) : e[0] === "^" ? (e = e.slice(1), !1) : bd(t, e, r, i)) ? fd(
    t,
    e,
    r,
    s,
    o,
    l,
    a
  ) : (e === "true-value" ? t._trueValue = r : e === "false-value" && (t._falseValue = r), cd(t, e, r, i));
};
function bd(t, e, n, r) {
  if (r)
    return !!(e === "innerHTML" || e === "textContent" || e in t && il(e) && U(n));
  if (e === "spellcheck" || e === "draggable" || e === "translate" || e === "form" || e === "list" && t.tagName === "INPUT" || e === "type" && t.tagName === "TEXTAREA")
    return !1;
  if (e === "width" || e === "height") {
    const i = t.tagName;
    if (i === "IMG" || i === "VIDEO" || i === "CANVAS" || i === "SOURCE")
      return !1;
  }
  return il(e) && ge(n) ? !1 : e in t;
}
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function Qn(t, e) {
  const n = /* @__PURE__ */ bn(t);
  class r extends no {
    constructor(s) {
      super(n, s, e);
    }
  }
  return r.def = n, r;
}
const Ed = typeof HTMLElement < "u" ? HTMLElement : class {
};
class no extends Ed {
  constructor(e, n = {}, r) {
    super(), this._def = e, this._props = n, this._instance = null, this._connected = !1, this._resolved = !1, this._numberProps = null, this._ob = null, this.shadowRoot && r ? r(this._createVNode(), this.shadowRoot) : (process.env.NODE_ENV !== "production" && this.shadowRoot && R(
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
      if (s && !B(s))
        for (const a in s) {
          const u = s[a];
          (u === Number || u && u.type === Number) && (a in this._props && (this._props[a] = wo(this._props[a])), (l || (l = /* @__PURE__ */ Object.create(null)))[Dt(a)] = !0);
        }
      this._numberProps = l, i && this._resolveProps(r), this._applyStyles(o), this._update();
    }, n = this._def.__asyncLoader;
    n ? n().then((r) => e(r, !0)) : e(this._def);
  }
  _resolveProps(e) {
    const { props: n } = e, r = B(n) ? n : Object.keys(n || {});
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
    n !== this._props[e] && (this._props[e] = n, i && this._instance && this._update(), r && (n === !0 ? this.setAttribute(We(e), "") : typeof n == "string" || typeof n == "number" ? this.setAttribute(We(e), n + "") : n || this.removeAttribute(We(e))));
  }
  _update() {
    ol(this._createVNode(), this.shadowRoot);
  }
  _createVNode() {
    const e = gt(this._def, ae({}, this._props));
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
        r(s, o), We(s) !== s && r(We(s), o);
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
const Od = /* @__PURE__ */ ae({ patchProp: xd }, rd);
let sl;
function Nd() {
  return sl || (sl = Vf(Od));
}
const ol = (...t) => {
  Nd().render(...t);
};
function wd() {
  td();
}
process.env.NODE_ENV !== "production" && wd();
const Td = { class: "text-flash" }, Dd = /* @__PURE__ */ bn({
  __name: "TextFlash",
  props: {
    lineColor: { default: "white", type: String },
    lineHeight: { default: "1px", type: String },
    hoverTextColor: { default: "currentColor", type: String }
  },
  setup(t) {
    return qn((e) => ({
      "2c672104": e.lineColor,
      "57bb546c": e.lineHeight,
      "264d960b": e.hoverTextColor
    })), (e, n) => (En(), Xn("div", Td, [
      Ks(e.$slots, "default")
    ]));
  }
}), Cd = '.text-flash{--text-flash-line-color: var(--2c672104);--text-flash-line-height: var(--57bb546c);--text-flash-line-offset: .6px;--text-flash-easing: cubic-bezier(.19, 1, .22, 1);--text-flash-hover-text-color: var(--264d960b);position:relative;display:inline-flex;transition:.5s}.text-flash:before,.text-flash:after{position:absolute;content:"";left:0;bottom:calc((var(--text-flash-line-height) + var(--text-flash-line-offset)) * -1);display:block;width:100%;height:var(--text-flash-line-height);background:var(--text-flash-line-color);transition:1.1s var(--text-flash-easing)}.text-flash:before{transform:scaleX(0);transform-origin:left}.text-flash:after{transform-origin:right;transition-delay:.25s}.text-flash:hover{color:var(--text-flash-hover-text-color)}.text-flash:hover:before{transform:scaleX(1);transition-delay:.25s}.text-flash:hover:after{transform:scaleX(0);transition-delay:0s}', Jn = (t, e) => {
  const n = t.__vccOpts || t;
  for (const [r, i] of e)
    n[r] = i;
  return n;
}, Sd = /* @__PURE__ */ Jn(Dd, [["styles", [Cd]]]), Pd = /* @__PURE__ */ Qn(Sd);
function Vd(t = "text-flash") {
  customElements.define(t, Pd);
}
function wa(t) {
  return wl() ? (Uu(t), !0) : !1;
}
function Ta(t) {
  return typeof t == "function" ? t() : jl(t);
}
const Md = typeof window < "u" && typeof document < "u";
typeof WorkerGlobalScope < "u" && globalThis instanceof WorkerGlobalScope;
const Ad = Object.prototype.toString, Rd = (t) => Ad.call(t) === "[object Object]", kd = () => {
};
function Id(t) {
  return t || Gs();
}
function Fd(t, e = !0, n) {
  const r = Id(n);
  r ? Kn(t, r) : e ? t() : Bs(t);
}
function zn(t) {
  var e;
  const n = Ta(t);
  return (e = n == null ? void 0 : n.$el) != null ? e : n;
}
const Ci = Md ? window : void 0;
function tn(...t) {
  let e, n, r, i;
  if (typeof t[0] == "string" || Array.isArray(t[0]) ? ([n, r, i] = t, e = Ci) : [e, n, r, i] = t, !e)
    return kd;
  Array.isArray(n) || (n = [n]), Array.isArray(r) || (r = [r]);
  const s = [], o = () => {
    s.forEach((c) => c()), s.length = 0;
  }, l = (c, f, d, _) => (c.addEventListener(f, d, _), () => c.removeEventListener(f, d, _)), a = an(
    () => [zn(e), Ta(i)],
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
  return wa(u), u;
}
function $d() {
  const t = oe(!1);
  return Gs() && Kn(() => {
    t.value = !0;
  }), t;
}
function Ld(t) {
  const e = $d();
  return Je(() => (e.value, !!t()));
}
function zd(t, e, n = {}) {
  const { window: r = Ci, ...i } = n;
  let s;
  const o = Ld(() => r && "ResizeObserver" in r), l = () => {
    s && (s.disconnect(), s = void 0);
  }, a = Je(() => Array.isArray(t) ? t.map((f) => zn(f)) : [zn(t)]), u = an(
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
  return wa(c), {
    isSupported: o,
    stop: c
  };
}
function Bd(t, e = {}) {
  const {
    reset: n = !0,
    windowResize: r = !0,
    windowScroll: i = !0,
    immediate: s = !0
  } = e, o = oe(0), l = oe(0), a = oe(0), u = oe(0), c = oe(0), f = oe(0), d = oe(0), _ = oe(0);
  function g() {
    const p = zn(t);
    if (!p) {
      n && (o.value = 0, l.value = 0, a.value = 0, u.value = 0, c.value = 0, f.value = 0, d.value = 0, _.value = 0);
      return;
    }
    const y = p.getBoundingClientRect();
    o.value = y.height, l.value = y.bottom, a.value = y.left, u.value = y.right, c.value = y.top, f.value = y.width, d.value = y.x, _.value = y.y;
  }
  return zd(t, g), an(() => zn(t), (p) => !p && g()), i && tn("scroll", g, { capture: !0, passive: !0 }), r && tn("resize", g, { passive: !0 }), Fd(() => {
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
const jd = {
  page: (t) => [t.pageX, t.pageY],
  client: (t) => [t.clientX, t.clientY],
  screen: (t) => [t.screenX, t.screenY],
  movement: (t) => t instanceof Touch ? null : [t.movementX, t.movementY]
};
function Ud(t = {}) {
  const {
    type: e = "page",
    touch: n = !0,
    resetOnTouchEnds: r = !1,
    initialValue: i = { x: 0, y: 0 },
    window: s = Ci,
    target: o = s,
    scroll: l = !0,
    eventFilter: a
  } = t;
  let u = null;
  const c = oe(i.x), f = oe(i.y), d = oe(null), _ = typeof e == "function" ? e : jd[e], g = (v) => {
    const S = _(v);
    u = v, S && ([c.value, f.value] = S, d.value = "mouse");
  }, p = (v) => {
    if (v.touches.length > 0) {
      const S = _(v.touches[0]);
      S && ([c.value, f.value] = S, d.value = "touch");
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
function Hd(t, e = {}) {
  const {
    handleOutside: n = !0,
    window: r = Ci
  } = e, i = e.type || "page", { x: s, y: o, sourceType: l } = Ud(e), a = oe(t ?? (r == null ? void 0 : r.document.body)), u = oe(0), c = oe(0), f = oe(0), d = oe(0), _ = oe(0), g = oe(0), p = oe(!0);
  let y = () => {
  };
  return r && (y = an(
    [a, s, o],
    () => {
      const E = zn(a);
      if (!E)
        return;
      const {
        left: O,
        top: b,
        width: T,
        height: v
      } = E.getBoundingClientRect();
      f.value = O + (i === "page" ? r.pageXOffset : 0), d.value = b + (i === "page" ? r.pageYOffset : 0), _.value = v, g.value = T;
      const S = s.value - f.value, M = o.value - d.value;
      p.value = T === 0 || v === 0 || S < 0 || M < 0 || S > T || M > v, (n || !p.value) && (u.value = S, c.value = M);
    },
    { immediate: !0 }
  ), tn(document, "mouseleave", () => {
    p.value = !0;
  })), {
    x: s,
    y: o,
    sourceType: l,
    elementX: u,
    elementY: c,
    elementPositionX: f,
    elementPositionY: d,
    elementHeight: _,
    elementWidth: g,
    isOutside: p,
    stop: y
  };
}
const Wd = /* @__PURE__ */ bn({
  __name: "MagnetMouse",
  props: {
    threshold: { default: 100, type: Number },
    transitionDuration: { default: 0.3, type: Number },
    strength: { default: 0.45, type: Number }
  },
  setup(t) {
    qn((O) => ({
      "5d55d048": n.value
    }));
    const e = t, n = Je(() => `${e.transitionDuration}s`), r = oe(null), { x: i, y: s } = Hd(r), { left: o, top: l, width: a, height: u } = Bd(r), c = Je(() => o.value + a.value / 2), f = Je(() => l.value + u.value / 2), d = Je(() => c.value - i.value), _ = Je(() => f.value - s.value), g = Je(() => Math.hypot(d.value, _.value)), p = Je(() => g.value < e.threshold), y = Je(() => -e.strength * Math.floor(d.value)), E = Je(() => -e.strength * Math.floor(_.value));
    return (O, b) => (En(), Xn("div", {
      class: "magnet-mouse",
      ref_key: "target",
      ref: r,
      style: gi({
        "--magnet-mouse-x": `${p.value ? y.value : 0}px`,
        "--magnet-mouse-y": `${p.value ? E.value : 0}px`
      })
    }, [
      Ks(O.$slots, "default")
    ], 4));
  }
}), Yd = ".magnet-mouse{--magnet-mouse-x: 0;--magnet-mouse-y: 0;--magnet-mouse-transition-duration: var(--5d55d048);display:inline-flex;transform:translate(var(--magnet-mouse-x),var(--magnet-mouse-y));transition:var(--magnet-mouse-transition-duration)}", Kd = /* @__PURE__ */ Jn(Wd, [["styles", [Yd]]]), Xd = /* @__PURE__ */ Qn(Kd);
function qd(t = "magnet-mouse") {
  customElements.define(t, Xd);
}
const Qd = /* @__PURE__ */ bn({
  __name: "TextBlink",
  props: {
    text: { type: String },
    textColor: { default: "white", type: String },
    textSize: { default: "1rem", type: String },
    textWeight: { default: "normal", type: String },
    textFont: { default: "", type: String },
    textLeading: { default: "normal", type: String },
    textStyle: { default: "normal", type: String },
    textWhiteSpace: { default: "normal", type: String }
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
    const e = t, n = oe(null);
    return Kn(() => {
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
    }), (r, i) => (En(), Xn("div", {
      class: "text-blink",
      ref_key: "parent",
      ref: n
    }, null, 512));
  }
}), Jd = ".text-blink{--text-blink-color: var(--00c7d7e0);--text-blink-size: var(--c6299c98);--text-blink-weight: var(--1578f36b);--text-blink-font: var(--c63543fc);--text-blink-leading: var(--534ed873);--text-blink-style: var(--0080025e);--text-blink-white-space: var(--656e65d0);display:flex}.text-blink span{position:relative;overflow:hidden;transition:.6s;color:var(--text-blink-color);font-size:var(--text-blink-size);font-weight:var(--text-blink-weight);font-family:var(--text-blink-font);line-height:var(--text-blink-leading);font-style:var(--text-blink-style);white-space:var(--text-blink-white-space)}.text-blink span .out{display:inline-flex}.text-blink span .in{position:absolute;left:0;opacity:0;transform:translate(100%)}.text-blink:hover span .out{opacity:0;transform:translate(-100%)}.text-blink:hover span .in{opacity:1;transform:translate(0)}", Zd = /* @__PURE__ */ Jn(Qd, [["styles", [Jd]]]), Gd = /* @__PURE__ */ Qn(Zd);
function eh(t = "text-blink") {
  customElements.define(t, Gd);
}
function wt(t) {
  if (t === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return t;
}
function Da(t, e) {
  t.prototype = Object.create(e.prototype), t.prototype.constructor = t, t.__proto__ = e;
}
/*!
 * GSAP 3.12.4
 * https://gsap.com
 *
 * @license Copyright 2008-2023, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/
var Xe = {
  autoSleep: 120,
  force3D: "auto",
  nullTargetWarn: 1,
  units: {
    lineHeight: ""
  }
}, Bn = {
  duration: 0.5,
  overwrite: !1,
  delay: 0
}, ro, De, fe, Ge = 1e8, se = 1 / Ge, ps = Math.PI * 2, th = ps / 4, nh = 0, Ca = Math.sqrt, rh = Math.cos, ih = Math.sin, xe = function(e) {
  return typeof e == "string";
}, de = function(e) {
  return typeof e == "function";
}, St = function(e) {
  return typeof e == "number";
}, io = function(e) {
  return typeof e > "u";
}, yt = function(e) {
  return typeof e == "object";
}, Ie = function(e) {
  return e !== !1;
}, so = function() {
  return typeof window < "u";
}, zr = function(e) {
  return de(e) || xe(e);
}, Sa = typeof ArrayBuffer == "function" && ArrayBuffer.isView || function() {
}, Ce = Array.isArray, _s = /(?:-?\.?\d|\.)+/gi, Pa = /[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g, Vn = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g, zi = /[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi, Va = /[+-]=-?[.\d]+/, Ma = /[^,'"\[\]\s]+/gi, sh = /^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i, ue, Ze, ms, oo, qe = {}, oi = {}, Aa, Ra = function(e) {
  return (oi = gn(e, qe)) && ze;
}, lo = function(e, n) {
  return console.warn("Invalid property", e, "set to", n, "Missing plugin? gsap.registerPlugin()");
}, Er = function(e, n) {
  return !n && console.warn(e);
}, ka = function(e, n) {
  return e && (qe[e] = n) && oi && (oi[e] = n) || qe;
}, Or = function() {
  return 0;
}, oh = {
  suppressEvents: !0,
  isStart: !0,
  kill: !1
}, Kr = {
  suppressEvents: !0,
  kill: !1
}, lh = {
  suppressEvents: !0
}, ao = {}, zt = [], gs = {}, Ia, Ue = {}, Bi = {}, ll = 30, Xr = [], uo = "", co = function(e) {
  var n = e[0], r, i;
  if (yt(n) || de(n) || (e = [e]), !(r = (n._gsap || {}).harness)) {
    for (i = Xr.length; i-- && !Xr[i].targetTest(n); )
      ;
    r = Xr[i];
  }
  for (i = e.length; i--; )
    e[i] && (e[i]._gsap || (e[i]._gsap = new ou(e[i], r))) || e.splice(i, 1);
  return e;
}, fn = function(e) {
  return e._gsap || co(et(e))[0]._gsap;
}, Fa = function(e, n, r) {
  return (r = e[n]) && de(r) ? e[n]() : io(r) && e.getAttribute && e.getAttribute(n) || r;
}, Fe = function(e, n) {
  return (e = e.split(",")).forEach(n) || e;
}, he = function(e) {
  return Math.round(e * 1e5) / 1e5 || 0;
}, ve = function(e) {
  return Math.round(e * 1e7) / 1e7 || 0;
}, In = function(e, n) {
  var r = n.charAt(0), i = parseFloat(n.substr(2));
  return e = parseFloat(e), r === "+" ? e + i : r === "-" ? e - i : r === "*" ? e * i : e / i;
}, ah = function(e, n) {
  for (var r = n.length, i = 0; e.indexOf(n[i]) < 0 && ++i < r; )
    ;
  return i < r;
}, li = function() {
  var e = zt.length, n = zt.slice(0), r, i;
  for (gs = {}, zt.length = 0, r = 0; r < e; r++)
    i = n[r], i && i._lazy && (i.render(i._lazy[0], i._lazy[1], !0)._lazy = 0);
}, $a = function(e, n, r, i) {
  zt.length && !De && li(), e.render(n, r, i || De && n < 0 && (e._initted || e._startAt)), zt.length && !De && li();
}, La = function(e) {
  var n = parseFloat(e);
  return (n || n === 0) && (e + "").match(Ma).length < 2 ? n : xe(e) ? e.trim() : e;
}, za = function(e) {
  return e;
}, nt = function(e, n) {
  for (var r in n)
    r in e || (e[r] = n[r]);
  return e;
}, uh = function(e) {
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
    r !== "__proto__" && r !== "constructor" && r !== "prototype" && (e[r] = yt(n[r]) ? t(e[r] || (e[r] = {}), n[r]) : n[r]);
  return e;
}, ai = function(e, n) {
  var r = {}, i;
  for (i in e)
    i in n || (r[i] = e[i]);
  return r;
}, hr = function(e) {
  var n = e.parent || ue, r = e.keyframes ? uh(Ce(e.keyframes)) : nt;
  if (Ie(e.inherit))
    for (; n; )
      r(e, n.vars.defaults), n = n.parent || n._dp;
  return e;
}, ch = function(e, n) {
  for (var r = e.length, i = r === n.length; i && r-- && e[r] === n[r]; )
    ;
  return r < 0;
}, Ba = function(e, n, r, i, s) {
  r === void 0 && (r = "_first"), i === void 0 && (i = "_last");
  var o = e[i], l;
  if (s)
    for (l = n[s]; o && o[s] > l; )
      o = o._prev;
  return o ? (n._next = o._next, o._next = n) : (n._next = e[r], e[r] = n), n._next ? n._next._prev = n : e[i] = n, n._prev = o, n.parent = n._dp = e, n;
}, Si = function(e, n, r, i) {
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
}, fh = function(e) {
  for (var n = e.parent; n && n.parent; )
    n._dirty = 1, n.totalDuration(), n = n.parent;
  return e;
}, vs = function(e, n, r, i) {
  return e._startAt && (De ? e._startAt.revert(Kr) : e.vars.immediateRender && !e.vars.autoRevert || e._startAt.render(n, !0, i));
}, dh = function t(e) {
  return !e || e._ts && t(e.parent);
}, ul = function(e) {
  return e._repeat ? jn(e._tTime, e = e.duration() + e._rDelay) * e : 0;
}, jn = function(e, n) {
  var r = Math.floor(e /= n);
  return e && r === e ? r - 1 : r;
}, ui = function(e, n) {
  return (e - n._start) * n._ts + (n._ts >= 0 ? 0 : n._dirty ? n.totalDuration() : n._tDur);
}, Pi = function(e) {
  return e._end = ve(e._start + (e._tDur / Math.abs(e._ts || e._rts || se) || 0));
}, Vi = function(e, n) {
  var r = e._dp;
  return r && r.smoothChildTiming && e._ts && (e._start = ve(r._time - (e._ts > 0 ? n / e._ts : ((e._dirty ? e.totalDuration() : e._tDur) - n) / -e._ts)), Pi(e), r._dirty || dn(r, e)), e;
}, ja = function(e, n) {
  var r;
  if ((n._time || !n._dur && n._initted || n._start < e._time && (n._dur || !n.add)) && (r = ui(e.rawTime(), n), (!n._dur || Mr(0, n.totalDuration(), r) - n._tTime > se) && n.render(r, !0)), dn(e, n)._dp && e._initted && e._time >= e._dur && e._ts) {
    if (e._dur < e.duration())
      for (r = e; r._dp; )
        r.rawTime() >= 0 && r.totalTime(r._tTime), r = r._dp;
    e._zTime = -se;
  }
}, pt = function(e, n, r, i) {
  return n.parent && Wt(n), n._start = ve((St(r) ? r : r || e !== ue ? Qe(e, r, n) : e._time) + n._delay), n._end = ve(n._start + (n.totalDuration() / Math.abs(n.timeScale()) || 0)), Ba(e, n, "_first", "_last", e._sort ? "_start" : 0), ys(n) || (e._recent = n), i || ja(e, n), e._ts < 0 && Vi(e, e._tTime), e;
}, Ua = function(e, n) {
  return (qe.ScrollTrigger || lo("scrollTrigger", n)) && qe.ScrollTrigger.create(n, e);
}, Ha = function(e, n, r, i, s) {
  if (ho(e, n, s), !e._initted)
    return 1;
  if (!r && e._pt && !De && (e._dur && e.vars.lazy !== !1 || !e._dur && e.vars.lazy) && Ia !== Ye.frame)
    return zt.push(e), e._lazy = [s, i], 1;
}, hh = function t(e) {
  var n = e.parent;
  return n && n._ts && n._initted && !n._lock && (n.rawTime() < 0 || t(n));
}, ys = function(e) {
  var n = e.data;
  return n === "isFromStart" || n === "isStart";
}, ph = function(e, n, r, i) {
  var s = e.ratio, o = n < 0 || !n && (!e._start && hh(e) && !(!e._initted && ys(e)) || (e._ts < 0 || e._dp._ts < 0) && !ys(e)) ? 0 : 1, l = e._rDelay, a = 0, u, c, f;
  if (l && e._repeat && (a = Mr(0, e._tDur, n), c = jn(a, l), e._yoyo && c & 1 && (o = 1 - o), c !== jn(e._tTime, l) && (s = 1 - o, e.vars.repeatRefresh && e._initted && e.invalidate())), o !== s || De || i || e._zTime === se || !n && e._zTime) {
    if (!e._initted && Ha(e, n, i, r, a))
      return;
    for (f = e._zTime, e._zTime = n || (r ? se : 0), r || (r = n && !f), e.ratio = o, e._from && (o = 1 - o), e._time = 0, e._tTime = a, u = e._pt; u; )
      u.r(o, u.d), u = u._next;
    n < 0 && vs(e, n, r, !0), e._onUpdate && !r && Ke(e, "onUpdate"), a && e._repeat && !r && e.parent && Ke(e, "onRepeat"), (n >= e._tDur || n < 0) && e.ratio === o && (o && Wt(e, 1), !r && !De && (Ke(e, o ? "onComplete" : "onReverseComplete", !0), e._prom && e._prom()));
  } else
    e._zTime || (e._zTime = n);
}, _h = function(e, n, r) {
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
}, Un = function(e, n, r, i) {
  var s = e._repeat, o = ve(n) || 0, l = e._tTime / e._tDur;
  return l && !i && (e._time *= o / e._dur), e._dur = o, e._tDur = s ? s < 0 ? 1e10 : ve(o * (s + 1) + e._rDelay * s) : o, l > 0 && !i && Vi(e, e._tTime = e._tDur * l), e.parent && Pi(e), r || dn(e.parent, e), e;
}, cl = function(e) {
  return e instanceof Ae ? dn(e) : Un(e, e._dur);
}, mh = {
  _start: 0,
  endTime: Or,
  totalDuration: Or
}, Qe = function t(e, n, r) {
  var i = e.labels, s = e._recent || mh, o = e.duration() >= Ge ? s.endTime(!1) : e._dur, l, a, u;
  return xe(n) && (isNaN(n) || n in i) ? (a = n.charAt(0), u = n.substr(-1) === "%", l = n.indexOf("="), a === "<" || a === ">" ? (l >= 0 && (n = n.replace(/=/, "")), (a === "<" ? s._start : s.endTime(s._repeat >= 0)) + (parseFloat(n.substr(1)) || 0) * (u ? (l < 0 ? s : r).totalDuration() / 100 : 1)) : l < 0 ? (n in i || (i[n] = o), i[n]) : (a = parseFloat(n.charAt(l - 1) + n.substr(l + 1)), u && r && (a = a / 100 * (Ce(r) ? r[0] : r).totalDuration()), l > 1 ? t(e, n.substr(0, l - 1), r) + a : o + a)) : n == null ? o : +n;
}, pr = function(e, n, r) {
  var i = St(n[1]), s = (i ? 2 : 1) + (e < 2 ? 0 : 1), o = n[s], l, a;
  if (i && (o.duration = n[1]), o.parent = r, e) {
    for (l = o, a = r; a && !("immediateRender" in l); )
      l = a.vars.defaults || {}, a = Ie(a.vars.inherit) && a.parent;
    o.immediateRender = Ie(l.immediateRender), e < 2 ? o.runBackwards = 1 : o.startAt = n[s - 1];
  }
  return new me(n[0], o, n[s + 1]);
}, Kt = function(e, n) {
  return e || e === 0 ? n(e) : n;
}, Mr = function(e, n, r) {
  return r < e ? e : r > n ? n : r;
}, Te = function(e, n) {
  return !xe(e) || !(n = sh.exec(e)) ? "" : n[1];
}, gh = function(e, n, r) {
  return Kt(r, function(i) {
    return Mr(e, n, i);
  });
}, xs = [].slice, Wa = function(e, n) {
  return e && yt(e) && "length" in e && (!n && !e.length || e.length - 1 in e && yt(e[0])) && !e.nodeType && e !== Ze;
}, vh = function(e, n, r) {
  return r === void 0 && (r = []), e.forEach(function(i) {
    var s;
    return xe(i) && !n || Wa(i, 1) ? (s = r).push.apply(s, et(i)) : r.push(i);
  }) || r;
}, et = function(e, n, r) {
  return fe && !n && fe.selector ? fe.selector(e) : xe(e) && !r && (ms || !Hn()) ? xs.call((n || oo).querySelectorAll(e), 0) : Ce(e) ? vh(e, r) : Wa(e) ? xs.call(e, 0) : e ? [e] : [];
}, bs = function(e) {
  return e = et(e)[0] || Er("Invalid scope") || {}, function(n) {
    var r = e.current || e.nativeElement || e;
    return et(n, r.querySelectorAll ? r : r === e ? Er("Invalid scope") || oo.createElement("div") : e);
  };
}, Ya = function(e) {
  return e.sort(function() {
    return 0.5 - Math.random();
  });
}, Ka = function(e) {
  if (de(e))
    return e;
  var n = yt(e) ? e : {
    each: e
  }, r = hn(n.ease), i = n.from || 0, s = parseFloat(n.base) || 0, o = {}, l = i > 0 && i < 1, a = isNaN(i) || l, u = n.axis, c = i, f = i;
  return xe(i) ? c = f = {
    center: 0.5,
    edges: 0.5,
    end: 1
  }[i] || 0 : !l && a && (c = i[0], f = i[1]), function(d, _, g) {
    var p = (g || n).length, y = o[p], E, O, b, T, v, S, M, k, C;
    if (!y) {
      if (C = n.grid === "auto" ? 0 : (n.grid || [1, Ge])[1], !C) {
        for (M = -Ge; M < (M = g[C++].getBoundingClientRect().left) && C < p; )
          ;
        C < p && C--;
      }
      for (y = o[p] = [], E = a ? Math.min(C, p) * c - 0.5 : i % C, O = C === Ge ? 0 : a ? p * f / C - 0.5 : i / C | 0, M = 0, k = Ge, S = 0; S < p; S++)
        b = S % C - E, T = O - (S / C | 0), y[S] = v = u ? Math.abs(u === "y" ? T : b) : Ca(b * b + T * T), v > M && (M = v), v < k && (k = v);
      i === "random" && Ya(y), y.max = M - k, y.min = k, y.v = p = (parseFloat(n.amount) || parseFloat(n.each) * (C > p ? p - 1 : u ? u === "y" ? p / C : C : Math.max(C, p / C)) || 0) * (i === "edges" ? -1 : 1), y.b = p < 0 ? s - p : s, y.u = Te(n.amount || n.each) || 0, r = r && p < 0 ? ru(r) : r;
    }
    return p = (y[d] - y.min) / y.max || 0, ve(y.b + (r ? r(p) : p) * y.v) + y.u;
  };
}, Es = function(e) {
  var n = Math.pow(10, ((e + "").split(".")[1] || "").length);
  return function(r) {
    var i = ve(Math.round(parseFloat(r) / e) * e * n);
    return (i - i % 1) / n + (St(r) ? 0 : Te(r));
  };
}, Xa = function(e, n) {
  var r = Ce(e), i, s;
  return !r && yt(e) && (i = r = e.radius || Ge, e.values ? (e = et(e.values), (s = !St(e[0])) && (i *= i)) : e = Es(e.increment)), Kt(n, r ? de(e) ? function(o) {
    return s = e(o), Math.abs(s - o) <= i ? s : o;
  } : function(o) {
    for (var l = parseFloat(s ? o.x : o), a = parseFloat(s ? o.y : 0), u = Ge, c = 0, f = e.length, d, _; f--; )
      s ? (d = e[f].x - l, _ = e[f].y - a, d = d * d + _ * _) : d = Math.abs(e[f] - l), d < u && (u = d, c = f);
    return c = !i || u <= i ? e[c] : o, s || c === o || St(o) ? c : c + Te(o);
  } : Es(e));
}, qa = function(e, n, r, i) {
  return Kt(Ce(e) ? !n : r === !0 ? !!(r = 0) : !i, function() {
    return Ce(e) ? e[~~(Math.random() * e.length)] : (r = r || 1e-5) && (i = r < 1 ? Math.pow(10, (r + "").length - 2) : 1) && Math.floor(Math.round((e - r / 2 + Math.random() * (n - e + r * 0.99)) / r) * r * i) / i;
  });
}, yh = function() {
  for (var e = arguments.length, n = new Array(e), r = 0; r < e; r++)
    n[r] = arguments[r];
  return function(i) {
    return n.reduce(function(s, o) {
      return o(s);
    }, i);
  };
}, xh = function(e, n) {
  return function(r) {
    return e(parseFloat(r)) + (n || Te(r));
  };
}, bh = function(e, n, r) {
  return Ja(e, n, 0, 1, r);
}, Qa = function(e, n, r) {
  return Kt(r, function(i) {
    return e[~~n(i)];
  });
}, Eh = function t(e, n, r) {
  var i = n - e;
  return Ce(e) ? Qa(e, t(0, e.length), n) : Kt(r, function(s) {
    return (i + (s - e) % i) % i + e;
  });
}, Oh = function t(e, n, r) {
  var i = n - e, s = i * 2;
  return Ce(e) ? Qa(e, t(0, e.length - 1), n) : Kt(r, function(o) {
    return o = (s + (o - e) % s) % s || 0, e + (o > i ? s - o : o);
  });
}, Nr = function(e) {
  for (var n = 0, r = "", i, s, o, l; ~(i = e.indexOf("random(", n)); )
    o = e.indexOf(")", i), l = e.charAt(i + 7) === "[", s = e.substr(i + 7, o - i - 7).match(l ? Ma : _s), r += e.substr(n, i - n) + qa(l ? s : +s[0], l ? 0 : +s[1], +s[2] || 1e-5), n = o + 1;
  return r + e.substr(n, e.length - n);
}, Ja = function(e, n, r, i, s) {
  var o = n - e, l = i - r;
  return Kt(s, function(a) {
    return r + ((a - e) / o * l || 0);
  });
}, Nh = function t(e, n, r, i) {
  var s = isNaN(e + n) ? 0 : function(_) {
    return (1 - _) * e + _ * n;
  };
  if (!s) {
    var o = xe(e), l = {}, a, u, c, f, d;
    if (r === !0 && (i = 1) && (r = null), o)
      e = {
        p: e
      }, n = {
        p: n
      };
    else if (Ce(e) && !Ce(n)) {
      for (c = [], f = e.length, d = f - 2, u = 1; u < f; u++)
        c.push(t(e[u - 1], e[u]));
      f--, s = function(g) {
        g *= f;
        var p = Math.min(d, ~~g);
        return c[p](g - p);
      }, r = n;
    } else
      i || (e = gn(Ce(e) ? [] : {}, e));
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
  var i = e.labels, s = Ge, o, l, a;
  for (o in i)
    l = i[o] - n, l < 0 == !!r && l && s > (l = Math.abs(l)) && (a = o, s = l);
  return a;
}, Ke = function(e, n, r) {
  var i = e.vars, s = i[n], o = fe, l = e._ctx, a, u, c;
  if (s)
    return a = i[n + "Params"], u = i.callbackScope || e, r && zt.length && li(), l && (fe = l), c = a ? s.apply(u, a) : s.call(u), fe = o, c;
}, lr = function(e) {
  return Wt(e), e.scrollTrigger && e.scrollTrigger.kill(!!De), e.progress() < 1 && Ke(e, "onInterrupt"), e;
}, Mn, Za = [], Ga = function(e) {
  if (so() && e) {
    e = !e.name && e.default || e;
    var n = e.name, r = de(e), i = n && !r && e.init ? function() {
      this._props = [];
    } : e, s = {
      init: Or,
      render: mo,
      add: fo,
      kill: zh,
      modifier: Lh,
      rawVars: 0
    }, o = {
      targetTest: 0,
      get: 0,
      getSetter: _o,
      aliases: {},
      register: 0
    };
    if (Hn(), e !== i) {
      if (Ue[n])
        return;
      nt(i, nt(ai(e, s), o)), gn(i.prototype, gn(s, ai(e, o))), Ue[i.prop = n] = i, e.targetTest && (Xr.push(i), ao[n] = 1), n = (n === "css" ? "CSS" : n.charAt(0).toUpperCase() + n.substr(1)) + "Plugin";
    }
    ka(n, i), e.register && e.register(ze, i, $e);
  } else
    e && Za.push(e);
}, re = 255, ar = {
  aqua: [0, re, re],
  lime: [0, re, 0],
  silver: [192, 192, 192],
  black: [0, 0, 0],
  maroon: [128, 0, 0],
  teal: [0, 128, 128],
  blue: [0, 0, re],
  navy: [0, 0, 128],
  white: [re, re, re],
  olive: [128, 128, 0],
  yellow: [re, re, 0],
  orange: [re, 165, 0],
  gray: [128, 128, 128],
  purple: [128, 0, 128],
  green: [0, 128, 0],
  red: [re, 0, 0],
  pink: [re, 192, 203],
  cyan: [0, re, re],
  transparent: [re, re, re, 0]
}, ji = function(e, n, r) {
  return e += e < 0 ? 1 : e > 1 ? -1 : 0, (e * 6 < 1 ? n + (r - n) * e * 6 : e < 0.5 ? r : e * 3 < 2 ? n + (r - n) * (2 / 3 - e) * 6 : n) * re + 0.5 | 0;
}, eu = function(e, n, r) {
  var i = e ? St(e) ? [e >> 16, e >> 8 & re, e & re] : 0 : ar.black, s, o, l, a, u, c, f, d, _, g;
  if (!i) {
    if (e.substr(-1) === "," && (e = e.substr(0, e.length - 1)), ar[e])
      i = ar[e];
    else if (e.charAt(0) === "#") {
      if (e.length < 6 && (s = e.charAt(1), o = e.charAt(2), l = e.charAt(3), e = "#" + s + s + o + o + l + l + (e.length === 5 ? e.charAt(4) + e.charAt(4) : "")), e.length === 9)
        return i = parseInt(e.substr(1, 6), 16), [i >> 16, i >> 8 & re, i & re, parseInt(e.substr(7), 16) / 255];
      e = parseInt(e.substr(1), 16), i = [e >> 16, e >> 8 & re, e & re];
    } else if (e.substr(0, 3) === "hsl") {
      if (i = g = e.match(_s), !n)
        a = +i[0] % 360 / 360, u = +i[1] / 100, c = +i[2] / 100, o = c <= 0.5 ? c * (u + 1) : c + u - c * u, s = c * 2 - o, i.length > 3 && (i[3] *= 1), i[0] = ji(a + 1 / 3, s, o), i[1] = ji(a, s, o), i[2] = ji(a - 1 / 3, s, o);
      else if (~e.indexOf("="))
        return i = e.match(Pa), r && i.length < 4 && (i[3] = 1), i;
    } else
      i = e.match(_s) || ar.transparent;
    i = i.map(Number);
  }
  return n && !g && (s = i[0] / re, o = i[1] / re, l = i[2] / re, f = Math.max(s, o, l), d = Math.min(s, o, l), c = (f + d) / 2, f === d ? a = u = 0 : (_ = f - d, u = c > 0.5 ? _ / (2 - f - d) : _ / (f + d), a = f === s ? (o - l) / _ + (o < l ? 6 : 0) : f === o ? (l - s) / _ + 2 : (s - o) / _ + 4, a *= 60), i[0] = ~~(a + 0.5), i[1] = ~~(u * 100 + 0.5), i[2] = ~~(c * 100 + 0.5)), r && i.length < 4 && (i[3] = 1), i;
}, tu = function(e) {
  var n = [], r = [], i = -1;
  return e.split(Bt).forEach(function(s) {
    var o = s.match(Vn) || [];
    n.push.apply(n, o), r.push(i += o.length + 1);
  }), n.c = r, n;
}, dl = function(e, n, r) {
  var i = "", s = (e + i).match(Bt), o = n ? "hsla(" : "rgba(", l = 0, a, u, c, f;
  if (!s)
    return e;
  if (s = s.map(function(d) {
    return (d = eu(d, n, 1)) && o + (n ? d[0] + "," + d[1] + "%," + d[2] + "%," + d[3] : d.join(",")) + ")";
  }), r && (c = tu(e), a = r.c, a.join(i) !== c.c.join(i)))
    for (u = e.replace(Bt, "1").split(Vn), f = u.length - 1; l < f; l++)
      i += u[l] + (~a.indexOf(l) ? s.shift() || o + "0,0,0,0)" : (c.length ? c : s.length ? s : r).shift());
  if (!u)
    for (u = e.split(Bt), f = u.length - 1; l < f; l++)
      i += u[l] + s[l];
  return i + u[f];
}, Bt = function() {
  var t = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b", e;
  for (e in ar)
    t += "|" + e + "\\b";
  return new RegExp(t + ")", "gi");
}(), wh = /hsl[a]?\(/, nu = function(e) {
  var n = e.join(" "), r;
  if (Bt.lastIndex = 0, Bt.test(n))
    return r = wh.test(n), e[1] = dl(e[1], r), e[0] = dl(e[0], r, tu(e[1])), !0;
}, wr, Ye = function() {
  var t = Date.now, e = 500, n = 33, r = t(), i = r, s = 1e3 / 240, o = s, l = [], a, u, c, f, d, _, g = function p(y) {
    var E = t() - i, O = y === !0, b, T, v, S;
    if (E > e && (r += E - n), i += E, v = i - r, b = v - o, (b > 0 || O) && (S = ++f.frame, d = v - f.time * 1e3, f.time = v = v / 1e3, o += b + (b >= s ? 4 : s - b), T = 1), O || (a = u(p)), T)
      for (_ = 0; _ < l.length; _++)
        l[_](v, d, S, y);
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
      Aa && (!ms && so() && (Ze = ms = window, oo = Ze.document || {}, qe.gsap = ze, (Ze.gsapVersions || (Ze.gsapVersions = [])).push(ze.version), Ra(oi || Ze.GreenSockGlobals || !Ze.gsap && Ze || {}), c = Ze.requestAnimationFrame, Za.forEach(Ga)), a && f.sleep(), u = c || function(y) {
        return setTimeout(y, o - f.time * 1e3 + 1 | 0);
      }, wr = 1, g(2));
    },
    sleep: function() {
      (c ? Ze.cancelAnimationFrame : clearTimeout)(a), wr = 0, u = Or;
    },
    lagSmoothing: function(y, E) {
      e = y || 1 / 0, n = Math.min(E || 33, e);
    },
    fps: function(y) {
      s = 1e3 / (y || 240), o = f.time * 1e3 + s;
    },
    add: function(y, E, O) {
      var b = E ? function(T, v, S, M) {
        y(T, v, S, M), f.remove(b);
      } : y;
      return f.remove(y), l[O ? "unshift" : "push"](b), Hn(), b;
    },
    remove: function(y, E) {
      ~(E = l.indexOf(y)) && l.splice(E, 1) && _ >= E && _--;
    },
    _listeners: l
  }, f;
}(), Hn = function() {
  return !wr && Ye.wake();
}, J = {}, Th = /^[\d.\-M][\d.\-,\s]/, Dh = /["']/g, Ch = function(e) {
  for (var n = {}, r = e.substr(1, e.length - 3).split(":"), i = r[0], s = 1, o = r.length, l, a, u; s < o; s++)
    a = r[s], l = s !== o - 1 ? a.lastIndexOf(",") : a.length, u = a.substr(0, l), n[i] = isNaN(u) ? u.replace(Dh, "").trim() : +u, i = a.substr(l + 1).trim();
  return n;
}, Sh = function(e) {
  var n = e.indexOf("(") + 1, r = e.indexOf(")"), i = e.indexOf("(", n);
  return e.substring(n, ~i && i < r ? e.indexOf(")", r + 1) : r);
}, Ph = function(e) {
  var n = (e + "").split("("), r = J[n[0]];
  return r && n.length > 1 && r.config ? r.config.apply(null, ~e.indexOf("{") ? [Ch(n[1])] : Sh(e).split(",").map(La)) : J._CE && Th.test(e) ? J._CE("", e) : r;
}, ru = function(e) {
  return function(n) {
    return 1 - e(1 - n);
  };
}, iu = function t(e, n) {
  for (var r = e._first, i; r; )
    r instanceof Ae ? t(r, n) : r.vars.yoyoEase && (!r._yoyo || !r._repeat) && r._yoyo !== n && (r.timeline ? t(r.timeline, n) : (i = r._ease, r._ease = r._yEase, r._yEase = i, r._yoyo = n)), r = r._next;
}, hn = function(e, n) {
  return e && (de(e) ? e : J[e] || Ph(e)) || n;
}, On = function(e, n, r, i) {
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
    J[l] = qe[l] = s, J[o = l.toLowerCase()] = r;
    for (var a in s)
      J[o + (a === "easeIn" ? ".in" : a === "easeOut" ? ".out" : ".inOut")] = J[l + "." + a] = s[a];
  }), s;
}, su = function(e) {
  return function(n) {
    return n < 0.5 ? (1 - e(1 - n * 2)) / 2 : 0.5 + e((n - 0.5) * 2) / 2;
  };
}, Ui = function t(e, n, r) {
  var i = n >= 1 ? n : 1, s = (r || (e ? 0.3 : 0.45)) / (n < 1 ? n : 1), o = s / ps * (Math.asin(1 / i) || 0), l = function(c) {
    return c === 1 ? 1 : i * Math.pow(2, -10 * c) * ih((c - o) * s) + 1;
  }, a = e === "out" ? l : e === "in" ? function(u) {
    return 1 - l(1 - u);
  } : su(l);
  return s = ps / s, a.config = function(u, c) {
    return t(e, u, c);
  }, a;
}, Hi = function t(e, n) {
  n === void 0 && (n = 1.70158);
  var r = function(o) {
    return o ? --o * o * ((n + 1) * o + n) + 1 : 0;
  }, i = e === "out" ? r : e === "in" ? function(s) {
    return 1 - r(1 - s);
  } : su(r);
  return i.config = function(s) {
    return t(e, s);
  }, i;
};
Fe("Linear,Quad,Cubic,Quart,Quint,Strong", function(t, e) {
  var n = e < 5 ? e + 1 : e;
  On(t + ",Power" + (n - 1), e ? function(r) {
    return Math.pow(r, n);
  } : function(r) {
    return r;
  }, function(r) {
    return 1 - Math.pow(1 - r, n);
  }, function(r) {
    return r < 0.5 ? Math.pow(r * 2, n) / 2 : 1 - Math.pow((1 - r) * 2, n) / 2;
  });
});
J.Linear.easeNone = J.none = J.Linear.easeIn;
On("Elastic", Ui("in"), Ui("out"), Ui());
(function(t, e) {
  var n = 1 / e, r = 2 * n, i = 2.5 * n, s = function(l) {
    return l < n ? t * l * l : l < r ? t * Math.pow(l - 1.5 / e, 2) + 0.75 : l < i ? t * (l -= 2.25 / e) * l + 0.9375 : t * Math.pow(l - 2.625 / e, 2) + 0.984375;
  };
  On("Bounce", function(o) {
    return 1 - s(1 - o);
  }, s);
})(7.5625, 2.75);
On("Expo", function(t) {
  return t ? Math.pow(2, 10 * (t - 1)) : 0;
});
On("Circ", function(t) {
  return -(Ca(1 - t * t) - 1);
});
On("Sine", function(t) {
  return t === 1 ? 1 : -rh(t * th) + 1;
});
On("Back", Hi("in"), Hi("out"), Hi());
J.SteppedEase = J.steps = qe.SteppedEase = {
  config: function(e, n) {
    e === void 0 && (e = 1);
    var r = 1 / e, i = e + (n ? 0 : 1), s = n ? 1 : 0, o = 1 - se;
    return function(l) {
      return ((i * Mr(0, o, l) | 0) + s) * r;
    };
  }
};
Bn.ease = J["quad.out"];
Fe("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt", function(t) {
  return uo += t + "," + t + "Params,";
});
var ou = function(e, n) {
  this.id = nh++, e._gsap = this, this.target = e, this.harness = n, this.get = n ? n.get : Fa, this.set = n ? n.getSetter : _o;
}, Tr = /* @__PURE__ */ function() {
  function t(n) {
    this.vars = n, this._delay = +n.delay || 0, (this._repeat = n.repeat === 1 / 0 ? -2 : n.repeat || 0) && (this._rDelay = n.repeatDelay || 0, this._yoyo = !!n.yoyo || !!n.yoyoEase), this._ts = 1, Un(this, +n.duration, 1, 1), this.data = n.data, fe && (this._ctx = fe, fe.data.push(this)), wr || Ye.wake();
  }
  var e = t.prototype;
  return e.delay = function(r) {
    return r || r === 0 ? (this.parent && this.parent.smoothChildTiming && this.startTime(this._start + r - this._delay), this._delay = r, this) : this._delay;
  }, e.duration = function(r) {
    return arguments.length ? this.totalDuration(this._repeat > 0 ? r + (r + this._rDelay) * this._repeat : r) : this.totalDuration() && this._dur;
  }, e.totalDuration = function(r) {
    return arguments.length ? (this._dirty = 0, Un(this, this._repeat < 0 ? r : (r - this._repeat * this._rDelay) / (this._repeat + 1))) : this._tDur;
  }, e.totalTime = function(r, i) {
    if (Hn(), !arguments.length)
      return this._tTime;
    var s = this._dp;
    if (s && s.smoothChildTiming && this._ts) {
      for (Vi(this, r), !s._dp || s.parent || ja(s, this); s && s.parent; )
        s.parent._time !== s._start + (s._ts >= 0 ? s._tTime / s._ts : (s.totalDuration() - s._tTime) / -s._ts) && s.totalTime(s._tTime, !0), s = s.parent;
      !this.parent && this._dp.autoRemoveChildren && (this._ts > 0 && r < this._tDur || this._ts < 0 && r > 0 || !this._tDur && !r) && pt(this._dp, this, this._start - this._delay);
    }
    return (this._tTime !== r || !this._dur && !i || this._initted && Math.abs(this._zTime) === se || !r && !this._initted && (this.add || this._ptLookup)) && (this._ts || (this._pTime = r), $a(this, r, i)), this;
  }, e.time = function(r, i) {
    return arguments.length ? this.totalTime(Math.min(this.totalDuration(), r + ul(this)) % (this._dur + this._rDelay) || (r ? this._dur : 0), i) : this._time;
  }, e.totalProgress = function(r, i) {
    return arguments.length ? this.totalTime(this.totalDuration() * r, i) : this.totalDuration() ? Math.min(1, this._tTime / this._tDur) : this.rawTime() > 0 ? 1 : 0;
  }, e.progress = function(r, i) {
    return arguments.length ? this.totalTime(this.duration() * (this._yoyo && !(this.iteration() & 1) ? 1 - r : r) + ul(this), i) : this.duration() ? Math.min(1, this._time / this._dur) : this.rawTime() > 0 ? 1 : 0;
  }, e.iteration = function(r, i) {
    var s = this.duration() + this._rDelay;
    return arguments.length ? this.totalTime(this._time + (r - 1) * s, i) : this._repeat ? jn(this._tTime, s) + 1 : 1;
  }, e.timeScale = function(r, i) {
    if (!arguments.length)
      return this._rts === -se ? 0 : this._rts;
    if (this._rts === r)
      return this;
    var s = this.parent && this._ts ? ui(this.parent._time, this) : this._tTime;
    return this._rts = +r || 0, this._ts = this._ps || r === -se ? 0 : this._rts, this.totalTime(Mr(-Math.abs(this._delay), this._tDur, s), i !== !1), Pi(this), fh(this);
  }, e.paused = function(r) {
    return arguments.length ? (this._ps !== r && (this._ps = r, r ? (this._pTime = this._tTime || Math.max(-this._delay, this.rawTime()), this._ts = this._act = 0) : (Hn(), this._ts = this._rts, this.totalTime(this.parent && !this.parent.smoothChildTiming ? this.rawTime() : this._tTime || this._pTime, this.progress() === 1 && Math.abs(this._zTime) !== se && (this._tTime -= se)))), this) : this._ps;
  }, e.startTime = function(r) {
    if (arguments.length) {
      this._start = r;
      var i = this.parent || this._dp;
      return i && (i._sort || !this.parent) && pt(i, this, r - this._delay), this;
    }
    return this._start;
  }, e.endTime = function(r) {
    return this._start + (Ie(r) ? this.totalDuration() : this.duration()) / Math.abs(this._ts || 1);
  }, e.rawTime = function(r) {
    var i = this.parent || this._dp;
    return i ? r && (!this._ts || this._repeat && this._time && this.totalProgress() < 1) ? this._tTime % (this._dur + this._rDelay) : this._ts ? ui(i.rawTime(r), this) : this._tTime : this._tTime;
  }, e.revert = function(r) {
    r === void 0 && (r = lh);
    var i = De;
    return De = r, (this._initted || this._startAt) && (this.timeline && this.timeline.revert(r), this.totalTime(-0.01, r.suppressEvents)), this.data !== "nested" && r.kill !== !1 && this.kill(), De = i, this;
  }, e.globalTime = function(r) {
    for (var i = this, s = arguments.length ? r : i.rawTime(); i; )
      s = i._start + s / (Math.abs(i._ts) || 1), i = i._dp;
    return !this.parent && this._sat ? this._sat.globalTime(r) : s;
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
    return this.totalTime(Qe(this, r), Ie(i));
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
    return arguments.length ? (!!r !== this.reversed() && this.timeScale(-this._rts || (r ? -se : 0)), this) : this._rts < 0;
  }, e.invalidate = function() {
    return this._initted = this._act = 0, this._zTime = -se, this;
  }, e.isActive = function() {
    var r = this.parent || this._dp, i = this._start, s;
    return !!(!r || this._ts && this._initted && r.isActive() && (s = r.rawTime(!0)) >= i && s < this.endTime(!0) - se);
  }, e.eventCallback = function(r, i, s) {
    var o = this.vars;
    return arguments.length > 1 ? (i ? (o[r] = i, s && (o[r + "Params"] = s), r === "onUpdate" && (this._onUpdate = i)) : delete o[r], this) : o[r];
  }, e.then = function(r) {
    var i = this;
    return new Promise(function(s) {
      var o = de(r) ? r : za, l = function() {
        var u = i.then;
        i.then = null, de(o) && (o = o(i)) && (o.then || o === i) && (i.then = u), s(o), i.then = u;
      };
      i._initted && i.totalProgress() === 1 && i._ts >= 0 || !i._tTime && i._ts < 0 ? l() : i._prom = l;
    });
  }, e.kill = function() {
    lr(this);
  }, t;
}();
nt(Tr.prototype, {
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
  _zTime: -se,
  _prom: 0,
  _ps: !1,
  _rts: 1
});
var Ae = /* @__PURE__ */ function(t) {
  Da(e, t);
  function e(r, i) {
    var s;
    return r === void 0 && (r = {}), s = t.call(this, r) || this, s.labels = {}, s.smoothChildTiming = !!r.smoothChildTiming, s.autoRemoveChildren = !!r.autoRemoveChildren, s._sort = Ie(r.sortChildren), ue && pt(r.parent || ue, wt(s), i), r.reversed && s.reverse(), r.paused && s.paused(!0), r.scrollTrigger && Ua(wt(s), r.scrollTrigger), s;
  }
  var n = e.prototype;
  return n.to = function(i, s, o) {
    return pr(0, arguments, this), this;
  }, n.from = function(i, s, o) {
    return pr(1, arguments, this), this;
  }, n.fromTo = function(i, s, o, l) {
    return pr(2, arguments, this), this;
  }, n.set = function(i, s, o) {
    return s.duration = 0, s.parent = this, hr(s).repeatDelay || (s.repeat = 0), s.immediateRender = !!s.immediateRender, new me(i, s, Qe(this, o), 1), this;
  }, n.call = function(i, s, o) {
    return pt(this, me.delayedCall(0, i, s), o);
  }, n.staggerTo = function(i, s, o, l, a, u, c) {
    return o.duration = s, o.stagger = o.stagger || l, o.onComplete = u, o.onCompleteParams = c, o.parent = this, new me(i, o, Qe(this, a)), this;
  }, n.staggerFrom = function(i, s, o, l, a, u, c) {
    return o.runBackwards = 1, hr(o).immediateRender = Ie(o.immediateRender), this.staggerTo(i, s, o, l, a, u, c);
  }, n.staggerFromTo = function(i, s, o, l, a, u, c, f) {
    return l.startAt = o, hr(l).immediateRender = Ie(l.immediateRender), this.staggerTo(i, s, l, a, u, c, f);
  }, n.render = function(i, s, o) {
    var l = this._time, a = this._dirty ? this.totalDuration() : this._tDur, u = this._dur, c = i <= 0 ? 0 : ve(i), f = this._zTime < 0 != i < 0 && (this._initted || !u), d, _, g, p, y, E, O, b, T, v, S, M;
    if (this !== ue && c > a && i >= 0 && (c = a), c !== this._tTime || o || f) {
      if (l !== this._time && u && (c += this._time - l, i += this._time - l), d = c, T = this._start, b = this._ts, E = !b, f && (u || (l = this._zTime), (i || !s) && (this._zTime = i)), this._repeat) {
        if (S = this._yoyo, y = u + this._rDelay, this._repeat < -1 && i < 0)
          return this.totalTime(y * 100 + i, s, o);
        if (d = ve(c % y), c === a ? (p = this._repeat, d = u) : (p = ~~(c / y), p && p === c / y && (d = u, p--), d > u && (d = u)), v = jn(this._tTime, y), !l && this._tTime && v !== p && this._tTime - v * y - this._dur <= 0 && (v = p), S && p & 1 && (d = u - d, M = 1), p !== v && !this._lock) {
          var k = S && v & 1, C = k === (S && p & 1);
          if (p < v && (k = !k), l = k ? 0 : c % u ? u : c, this._lock = 1, this.render(l || (M ? 0 : ve(p * y)), s, !u)._lock = 0, this._tTime = c, !s && this.parent && Ke(this, "onRepeat"), this.vars.repeatRefresh && !M && (this.invalidate()._lock = 1), l && l !== this._time || E !== !this._ts || this.vars.onRepeat && !this.parent && !this._act)
            return this;
          if (u = this._dur, a = this._tDur, C && (this._lock = 2, l = k ? u : -1e-4, this.render(l, !0), this.vars.repeatRefresh && !M && this.invalidate()), this._lock = 0, !this._ts && !E)
            return this;
          iu(this, M);
        }
      }
      if (this._hasPause && !this._forcing && this._lock < 2 && (O = _h(this, ve(l), ve(d)), O && (c -= d - (d = O._start))), this._tTime = c, this._time = d, this._act = !b, this._initted || (this._onUpdate = this.vars.onUpdate, this._initted = 1, this._zTime = i, l = 0), !l && d && !s && !p && (Ke(this, "onStart"), this._tTime !== c))
        return this;
      if (d >= l && i >= 0)
        for (_ = this._first; _; ) {
          if (g = _._next, (_._act || d >= _._start) && _._ts && O !== _) {
            if (_.parent !== this)
              return this.render(i, s, o);
            if (_.render(_._ts > 0 ? (d - _._start) * _._ts : (_._dirty ? _.totalDuration() : _._tDur) + (d - _._start) * _._ts, s, o), d !== this._time || !this._ts && !E) {
              O = 0, g && (c += this._zTime = -se);
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
            if (_.render(_._ts > 0 ? (W - _._start) * _._ts : (_._dirty ? _.totalDuration() : _._tDur) + (W - _._start) * _._ts, s, o || De && (_._initted || _._startAt)), d !== this._time || !this._ts && !E) {
              O = 0, g && (c += this._zTime = W ? -se : se);
              break;
            }
          }
          _ = g;
        }
      }
      if (O && !s && (this.pause(), O.render(d >= l ? 0 : -se)._zTime = d >= l ? 1 : -1, this._ts))
        return this._start = T, Pi(this), this.render(i, s, o);
      this._onUpdate && !s && Ke(this, "onUpdate", !0), (c === a && this._tTime >= this.totalDuration() || !c && l) && (T === this._start || Math.abs(b) !== Math.abs(this._ts)) && (this._lock || ((i || !u) && (c === a && this._ts > 0 || !c && this._ts < 0) && Wt(this, 1), !s && !(i < 0 && !l) && (c || l || !a) && (Ke(this, c === a && i >= 0 ? "onComplete" : "onReverseComplete", !0), this._prom && !(c < a && this.timeScale() > 0) && this._prom())));
    }
    return this;
  }, n.add = function(i, s) {
    var o = this;
    if (St(s) || (s = Qe(this, s, i)), !(i instanceof Tr)) {
      if (Ce(i))
        return i.forEach(function(l) {
          return o.add(l, s);
        }), this;
      if (xe(i))
        return this.addLabel(i, s);
      if (de(i))
        i = me.delayedCall(0, i);
      else
        return this;
    }
    return this !== i ? pt(this, i, s) : this;
  }, n.getChildren = function(i, s, o, l) {
    i === void 0 && (i = !0), s === void 0 && (s = !0), o === void 0 && (o = !0), l === void 0 && (l = -Ge);
    for (var a = [], u = this._first; u; )
      u._start >= l && (u instanceof me ? s && a.push(u) : (o && a.push(u), i && a.push.apply(a, u.getChildren(!0, s, o)))), u = u._next;
    return a;
  }, n.getById = function(i) {
    for (var s = this.getChildren(1, 1, 1), o = s.length; o--; )
      if (s[o].vars.id === i)
        return s[o];
  }, n.remove = function(i) {
    return xe(i) ? this.removeLabel(i) : de(i) ? this.killTweensOf(i) : (Si(this, i), i === this._recent && (this._recent = this._last), dn(this));
  }, n.totalTime = function(i, s) {
    return arguments.length ? (this._forcing = 1, !this._dp && this._ts && (this._start = ve(Ye.time - (this._ts > 0 ? i / this._ts : (this.totalDuration() - i) / -this._ts))), t.prototype.totalTime.call(this, i, s), this._forcing = 0, this) : this._tTime;
  }, n.addLabel = function(i, s) {
    return this.labels[i] = Qe(this, s), this;
  }, n.removeLabel = function(i) {
    return delete this.labels[i], this;
  }, n.addPause = function(i, s, o) {
    var l = me.delayedCall(0, s || Or, o);
    return l.data = "isPause", this._hasPause = 1, pt(this, l, Qe(this, i));
  }, n.removePause = function(i) {
    var s = this._first;
    for (i = Qe(this, i); s; )
      s._start === i && s.data === "isPause" && Wt(s), s = s._next;
  }, n.killTweensOf = function(i, s, o) {
    for (var l = this.getTweensOf(i, o), a = l.length; a--; )
      It !== l[a] && l[a].kill(i, s);
    return this;
  }, n.getTweensOf = function(i, s) {
    for (var o = [], l = et(i), a = this._first, u = St(s), c; a; )
      a instanceof me ? ah(a._targets, l) && (u ? (!It || a._initted && a._ts) && a.globalTime(0) <= s && a.globalTime(a.totalDuration()) > s : !s || a.isActive()) && o.push(a) : (c = a.getTweensOf(l, s)).length && o.push.apply(o, c), a = a._next;
    return o;
  }, n.tweenTo = function(i, s) {
    s = s || {};
    var o = this, l = Qe(o, i), a = s, u = a.startAt, c = a.onStart, f = a.onStartParams, d = a.immediateRender, _, g = me.to(o, nt({
      ease: s.ease || "none",
      lazy: !1,
      immediateRender: !1,
      time: l,
      overwrite: "auto",
      duration: s.duration || Math.abs((l - (u && "time" in u ? u.time : o._time)) / o.timeScale()) || se,
      onStart: function() {
        if (o.pause(), !_) {
          var y = s.duration || Math.abs((l - (u && "time" in u ? u.time : o._time)) / o.timeScale());
          g._dur !== y && Un(g, y, 0, 1).render(g._time, !0, !0), _ = 1;
        }
        c && c.apply(g, f || []);
      }
    }, s));
    return d ? g.render(0) : g;
  }, n.tweenFromTo = function(i, s, o) {
    return this.tweenTo(s, nt({
      startAt: {
        time: Qe(this, i)
      }
    }, o));
  }, n.recent = function() {
    return this._recent;
  }, n.nextLabel = function(i) {
    return i === void 0 && (i = this._time), fl(this, Qe(this, i));
  }, n.previousLabel = function(i) {
    return i === void 0 && (i = this._time), fl(this, Qe(this, i), 1);
  }, n.currentLabel = function(i) {
    return arguments.length ? this.seek(i, !0) : this.previousLabel(this._time + se);
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
    var s = 0, o = this, l = o._last, a = Ge, u, c, f;
    if (arguments.length)
      return o.timeScale((o._repeat < 0 ? o.duration() : o.totalDuration()) / (o.reversed() ? -i : i));
    if (o._dirty) {
      for (f = o.parent; l; )
        u = l._prev, l._dirty && l.totalDuration(), c = l._start, c > a && o._sort && l._ts && !o._lock ? (o._lock = 1, pt(o, l, c - l._delay, 1)._lock = 0) : a = c, c < 0 && l._ts && (s -= c, (!f && !o._dp || f && f.smoothChildTiming) && (o._start += c / o._ts, o._time -= c, o._tTime -= c), o.shiftChildren(-c, !1, -1 / 0), a = 0), l._end > s && l._ts && (s = l._end), l = u;
      Un(o, o === ue && o._time > s ? o._time : s, 1, 1), o._dirty = 0;
    }
    return o._tDur;
  }, e.updateRoot = function(i) {
    if (ue._ts && ($a(ue, ui(i, ue)), Ia = Ye.frame), Ye.frame >= ll) {
      ll += Xe.autoSleep || 120;
      var s = ue._first;
      if ((!s || !s._ts) && Xe.autoSleep && Ye._listeners.length < 2) {
        for (; s && !s._ts; )
          s = s._next;
        s || Ye.sleep();
      }
    }
  }, e;
}(Tr);
nt(Ae.prototype, {
  _lock: 0,
  _hasPause: 0,
  _forcing: 0
});
var Vh = function(e, n, r, i, s, o, l) {
  var a = new $e(this._pt, e, n, 0, 1, du, null, s), u = 0, c = 0, f, d, _, g, p, y, E, O;
  for (a.b = r, a.e = i, r += "", i += "", (E = ~i.indexOf("random(")) && (i = Nr(i)), o && (O = [r, i], o(O, e, n), r = O[0], i = O[1]), d = r.match(zi) || []; f = zi.exec(i); )
    g = f[0], p = i.substring(u, f.index), _ ? _ = (_ + 1) % 5 : p.substr(-5) === "rgba(" && (_ = 1), g !== d[c++] && (y = parseFloat(d[c - 1]) || 0, a._pt = {
      _next: a._pt,
      p: p || c === 1 ? p : ",",
      //note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.
      s: y,
      c: g.charAt(1) === "=" ? In(y, g) - y : parseFloat(g) - y,
      m: _ && _ < 4 ? Math.round : 0
    }, u = zi.lastIndex);
  return a.c = u < i.length ? i.substring(u, i.length) : "", a.fp = l, (Va.test(i) || E) && (a.e = 0), this._pt = a, a;
}, fo = function(e, n, r, i, s, o, l, a, u, c) {
  de(i) && (i = i(s || 0, e, o));
  var f = e[n], d = r !== "get" ? r : de(f) ? u ? e[n.indexOf("set") || !de(e["get" + n.substr(3)]) ? n : "get" + n.substr(3)](u) : e[n]() : f, _ = de(f) ? u ? Ih : cu : po, g;
  if (xe(i) && (~i.indexOf("random(") && (i = Nr(i)), i.charAt(1) === "=" && (g = In(d, i) + (Te(d) || 0), (g || g === 0) && (i = g))), !c || d !== i || Os)
    return !isNaN(d * i) && i !== "" ? (g = new $e(this._pt, e, n, +d || 0, i - (d || 0), typeof f == "boolean" ? $h : fu, 0, _), u && (g.fp = u), l && g.modifier(l, this, e), this._pt = g) : (!f && !(n in e) && lo(n, i), Vh.call(this, e, n, d, i, _, a || Xe.stringFilter, u));
}, Mh = function(e, n, r, i, s) {
  if (de(e) && (e = _r(e, s, n, r, i)), !yt(e) || e.style && e.nodeType || Ce(e) || Sa(e))
    return xe(e) ? _r(e, s, n, r, i) : e;
  var o = {}, l;
  for (l in e)
    o[l] = _r(e[l], s, n, r, i);
  return o;
}, lu = function(e, n, r, i, s, o) {
  var l, a, u, c;
  if (Ue[e] && (l = new Ue[e]()).init(s, l.rawVars ? n[e] : Mh(n[e], i, s, o, r), r, i, o) !== !1 && (r._pt = a = new $e(r._pt, s, e, 0, 1, l.render, l, 0, l.priority), r !== Mn))
    for (u = r._ptLookup[r._targets.indexOf(s)], c = l._props.length; c--; )
      u[l._props[c]] = a;
  return l;
}, It, Os, ho = function t(e, n, r) {
  var i = e.vars, s = i.ease, o = i.startAt, l = i.immediateRender, a = i.lazy, u = i.onUpdate, c = i.runBackwards, f = i.yoyoEase, d = i.keyframes, _ = i.autoRevert, g = e._dur, p = e._startAt, y = e._targets, E = e.parent, O = E && E.data === "nested" ? E.vars.targets : y, b = e._overwrite === "auto" && !ro, T = e.timeline, v, S, M, k, C, W, Z, K, G, pe, te, Q, z;
  if (T && (!d || !s) && (s = "none"), e._ease = hn(s, Bn.ease), e._yEase = f ? ru(hn(f === !0 ? s : f, Bn.ease)) : 0, f && e._yoyo && !e._repeat && (f = e._yEase, e._yEase = e._ease, e._ease = f), e._from = !T && !!i.runBackwards, !T || d && !i.stagger) {
    if (K = y[0] ? fn(y[0]).harness : 0, Q = K && i[K.prop], v = ai(i, ao), p && (p._zTime < 0 && p.progress(1), n < 0 && c && l && !_ ? p.render(-1, !0) : p.revert(c && g ? Kr : oh), p._lazy = 0), o) {
      if (Wt(e._startAt = me.set(y, nt({
        data: "isStart",
        overwrite: !1,
        parent: E,
        immediateRender: !0,
        lazy: !p && Ie(a),
        startAt: null,
        delay: 0,
        onUpdate: u && function() {
          return Ke(e, "onUpdate");
        },
        stagger: 0
      }, o))), e._startAt._dp = 0, e._startAt._sat = e, n < 0 && (De || !l && !_) && e._startAt.revert(Kr), l && g && n <= 0 && r <= 0) {
        n && (e._zTime = n);
        return;
      }
    } else if (c && g && !p) {
      if (n && (l = !1), M = nt({
        overwrite: !1,
        data: "isFromStart",
        //we tag the tween with as "isFromStart" so that if [inside a plugin] we need to only do something at the very END of a tween, we have a way of identifying this tween as merely the one that's setting the beginning values for a "from()" tween. For example, clearProps in CSSPlugin should only get applied at the very END of a tween and without this tag, from(...{height:100, clearProps:"height", delay:1}) would wipe the height at the beginning of the tween and after 1 second, it'd kick back in.
        lazy: l && !p && Ie(a),
        immediateRender: l,
        //zero-duration tweens render immediately by default, but if we're not specifically instructed to render this tween immediately, we should skip this and merely _init() to record the starting values (rendering them immediately would push them to completion which is wasteful in that case - we'd have to render(-1) immediately after)
        stagger: 0,
        parent: E
        //ensures that nested tweens that had a stagger are handled properly, like gsap.from(".class", {y: gsap.utils.wrap([-100,100]), stagger: 0.5})
      }, v), Q && (M[K.prop] = Q), Wt(e._startAt = me.set(y, M)), e._startAt._dp = 0, e._startAt._sat = e, n < 0 && (De ? e._startAt.revert(Kr) : e._startAt.render(-1, !0)), e._zTime = n, !l)
        t(e._startAt, se, se);
      else if (!n)
        return;
    }
    for (e._pt = e._ptCache = 0, a = g && Ie(a) || a && !g, S = 0; S < y.length; S++) {
      if (C = y[S], Z = C._gsap || co(y)[S]._gsap, e._ptLookup[S] = pe = {}, gs[Z.id] && zt.length && li(), te = O === y ? S : O.indexOf(C), K && (G = new K()).init(C, Q || v, e, te, O) !== !1 && (e._pt = k = new $e(e._pt, C, G.name, 0, 1, G.render, G, 0, G.priority), G._props.forEach(function(j) {
        pe[j] = k;
      }), G.priority && (W = 1)), !K || Q)
        for (M in v)
          Ue[M] && (G = lu(M, v, e, te, C, O)) ? G.priority && (W = 1) : pe[M] = k = fo.call(e, C, M, "get", v[M], te, O, 0, i.stringFilter);
      e._op && e._op[S] && e.kill(C, e._op[S]), b && e._pt && (It = e, ue.killTweensOf(C, pe, e.globalTime(n)), z = !e.parent, It = 0), e._pt && a && (gs[Z.id] = 1);
    }
    W && hu(e), e._onInit && e._onInit(e);
  }
  e._onUpdate = u, e._initted = (!e._op || e._pt) && !z, d && n <= 0 && T.render(Ge, !0, !0);
}, Ah = function(e, n, r, i, s, o, l, a) {
  var u = (e._pt && e._ptCache || (e._ptCache = {}))[n], c, f, d, _;
  if (!u)
    for (u = e._ptCache[n] = [], d = e._ptLookup, _ = e._targets.length; _--; ) {
      if (c = d[_][n], c && c.d && c.d._pt)
        for (c = c.d._pt; c && c.p !== n && c.fp !== n; )
          c = c._next;
      if (!c)
        return Os = 1, e.vars[n] = "+=0", ho(e, l), Os = 0, a ? Er(n + " not eligible for reset") : 1;
      u.push(c);
    }
  for (_ = u.length; _--; )
    f = u[_], c = f._pt || f, c.s = (i || i === 0) && !s ? i : c.s + (i || 0) + o * c.c, c.c = r - c.s, f.e && (f.e = he(r) + Te(f.e)), f.b && (f.b = c.s + Te(f.b));
}, Rh = function(e, n) {
  var r = e[0] ? fn(e[0]).harness : 0, i = r && r.aliases, s, o, l, a;
  if (!i)
    return n;
  s = gn({}, n);
  for (o in i)
    if (o in s)
      for (a = i[o].split(","), l = a.length; l--; )
        s[a[l]] = s[o];
  return s;
}, kh = function(e, n, r, i) {
  var s = n.ease || i || "power1.inOut", o, l;
  if (Ce(n))
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
}, _r = function(e, n, r, i, s) {
  return de(e) ? e.call(n, r, i, s) : xe(e) && ~e.indexOf("random(") ? Nr(e) : e;
}, au = uo + "repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert", uu = {};
Fe(au + ",id,stagger,delay,duration,paused,scrollTrigger", function(t) {
  return uu[t] = 1;
});
var me = /* @__PURE__ */ function(t) {
  Da(e, t);
  function e(r, i, s, o) {
    var l;
    typeof i == "number" && (s.duration = i, i = s, s = null), l = t.call(this, o ? i : hr(i)) || this;
    var a = l.vars, u = a.duration, c = a.delay, f = a.immediateRender, d = a.stagger, _ = a.overwrite, g = a.keyframes, p = a.defaults, y = a.scrollTrigger, E = a.yoyoEase, O = i.parent || ue, b = (Ce(r) || Sa(r) ? St(r[0]) : "length" in i) ? [r] : et(r), T, v, S, M, k, C, W, Z;
    if (l._targets = b.length ? co(b) : Er("GSAP target " + r + " not found. https://gsap.com", !Xe.nullTargetWarn) || [], l._ptLookup = [], l._overwrite = _, g || d || zr(u) || zr(c)) {
      if (i = l.vars, T = l.timeline = new Ae({
        data: "nested",
        defaults: p || {},
        targets: O && O.data === "nested" ? O.vars.targets : b
      }), T.kill(), T.parent = T._dp = wt(l), T._start = 0, d || zr(u) || zr(c)) {
        if (M = b.length, W = d && Ka(d), yt(d))
          for (k in d)
            ~au.indexOf(k) && (Z || (Z = {}), Z[k] = d[k]);
        for (v = 0; v < M; v++)
          S = ai(i, uu), S.stagger = 0, E && (S.yoyoEase = E), Z && gn(S, Z), C = b[v], S.duration = +_r(u, wt(l), v, C, b), S.delay = (+_r(c, wt(l), v, C, b) || 0) - l._delay, !d && M === 1 && S.delay && (l._delay = c = S.delay, l._start += c, S.delay = 0), T.to(C, S, W ? W(v, C, b) : 0), T._ease = J.none;
        T.duration() ? u = c = 0 : l.timeline = 0;
      } else if (g) {
        hr(nt(T.vars.defaults, {
          ease: "none"
        })), T._ease = hn(g.ease || i.ease || "none");
        var K = 0, G, pe, te;
        if (Ce(g))
          g.forEach(function(Q) {
            return T.to(b, Q, ">");
          }), T.duration();
        else {
          S = {};
          for (k in g)
            k === "ease" || k === "easeEach" || kh(k, g[k], S, g.easeEach);
          for (k in S)
            for (G = S[k].sort(function(Q, z) {
              return Q.t - z.t;
            }), K = 0, v = 0; v < G.length; v++)
              pe = G[v], te = {
                ease: pe.e,
                duration: (pe.t - (v ? G[v - 1].t : 0)) / 100 * u
              }, te[k] = pe.v, T.to(b, te, K), K += te.duration;
          T.duration() < u && T.to({}, {
            duration: u - T.duration()
          });
        }
      }
      u || l.duration(u = T.duration());
    } else
      l.timeline = 0;
    return _ === !0 && !ro && (It = wt(l), ue.killTweensOf(b), It = 0), pt(O, wt(l), s), i.reversed && l.reverse(), i.paused && l.paused(!0), (f || !u && !g && l._start === ve(O._time) && Ie(f) && dh(wt(l)) && O.data !== "nested") && (l._tTime = -se, l.render(Math.max(0, -c) || 0)), y && Ua(wt(l), y), l;
  }
  var n = e.prototype;
  return n.render = function(i, s, o) {
    var l = this._time, a = this._tDur, u = this._dur, c = i < 0, f = i > a - se && !c ? a : i < se ? 0 : i, d, _, g, p, y, E, O, b, T;
    if (!u)
      ph(this, i, s, o);
    else if (f !== this._tTime || !i || o || !this._initted && this._tTime || this._startAt && this._zTime < 0 !== c) {
      if (d = f, b = this.timeline, this._repeat) {
        if (p = u + this._rDelay, this._repeat < -1 && c)
          return this.totalTime(p * 100 + i, s, o);
        if (d = ve(f % p), f === a ? (g = this._repeat, d = u) : (g = ~~(f / p), g && g === ve(f / p) && (d = u, g--), d > u && (d = u)), E = this._yoyo && g & 1, E && (T = this._yEase, d = u - d), y = jn(this._tTime, p), d === l && !o && this._initted && g === y)
          return this._tTime = f, this;
        g !== y && (b && this._yEase && iu(b, E), this.vars.repeatRefresh && !E && !this._lock && this._time !== u && this._initted && (this._lock = o = 1, this.render(ve(p * g), !0).invalidate()._lock = 0));
      }
      if (!this._initted) {
        if (Ha(this, c ? i : d, o, s, f))
          return this._tTime = 0, this;
        if (l !== this._time && !(o && this.vars.repeatRefresh && g !== y))
          return this;
        if (u !== this._dur)
          return this.render(i, s, o);
      }
      if (this._tTime = f, this._time = d, !this._act && this._ts && (this._act = 1, this._lazy = 0), this.ratio = O = (T || this._ease)(d / u), this._from && (this.ratio = O = 1 - O), d && !l && !s && !g && (Ke(this, "onStart"), this._tTime !== f))
        return this;
      for (_ = this._pt; _; )
        _.r(O, _.d), _ = _._next;
      b && b.render(i < 0 ? i : !d && E ? -se : b._dur * b._ease(d / this._dur), s, o) || this._startAt && (this._zTime = i), this._onUpdate && !s && (c && vs(this, i, s, o), Ke(this, "onUpdate")), this._repeat && g !== y && this.vars.onRepeat && !s && this.parent && Ke(this, "onRepeat"), (f === this._tDur || !f) && this._tTime === f && (c && !this._onUpdate && vs(this, i, !0, !0), (i || !u) && (f === this._tDur && this._ts > 0 || !f && this._ts < 0) && Wt(this, 1), !s && !(c && !l) && (f || l || E) && (Ke(this, f === a ? "onComplete" : "onReverseComplete", !0), this._prom && !(f < a && this.timeScale() > 0) && this._prom()));
    }
    return this;
  }, n.targets = function() {
    return this._targets;
  }, n.invalidate = function(i) {
    return (!i || !this.vars.runBackwards) && (this._startAt = 0), this._pt = this._op = this._onUpdate = this._lazy = this.ratio = 0, this._ptLookup = [], this.timeline && this.timeline.invalidate(i), t.prototype.invalidate.call(this, i);
  }, n.resetTo = function(i, s, o, l, a) {
    wr || Ye.wake(), this._ts || this.play();
    var u = Math.min(this._dur, (this._dp._time - this._start) * this._ts), c;
    return this._initted || ho(this, u), c = this._ease(u / this._dur), Ah(this, i, s, o, l, c, u, a) ? this.resetTo(i, s, o, l, 1) : (Vi(this, 0), this.parent || Ba(this._dp, this, "_first", "_last", this._dp._sort ? "_start" : 0), this.render(0));
  }, n.kill = function(i, s) {
    if (s === void 0 && (s = "all"), !i && (!s || s === "all"))
      return this._lazy = this._pt = 0, this.parent ? lr(this) : this;
    if (this.timeline) {
      var o = this.timeline.totalDuration();
      return this.timeline.killTweensOf(i, s, It && It.vars.overwrite !== !0)._first || lr(this), this.parent && o !== this.timeline.totalDuration() && Un(this, this._dur * this.timeline._tDur / o, 0, 1), this;
    }
    var l = this._targets, a = i ? et(i) : l, u = this._ptLookup, c = this._pt, f, d, _, g, p, y, E;
    if ((!s || s === "all") && ch(l, a))
      return s === "all" && (this._pt = 0), lr(this);
    for (f = this._op = this._op || [], s !== "all" && (xe(s) && (p = {}, Fe(s, function(O) {
      return p[O] = 1;
    }), s = p), s = Rh(l, s)), E = l.length; E--; )
      if (~a.indexOf(l[E])) {
        d = u[E], s === "all" ? (f[E] = s, g = d, _ = {}) : (_ = f[E] = f[E] || {}, g = s);
        for (p in g)
          y = d && d[p], y && ((!("kill" in y.d) || y.d.kill(p) === !0) && Si(this, y, "_pt"), delete d[p]), _ !== "all" && (_[p] = 1);
      }
    return this._initted && !this._pt && c && lr(this), this;
  }, e.to = function(i, s) {
    return new e(i, s, arguments[2]);
  }, e.from = function(i, s) {
    return pr(1, arguments);
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
    return pr(2, arguments);
  }, e.set = function(i, s) {
    return s.duration = 0, s.repeatDelay || (s.repeat = 0), new e(i, s);
  }, e.killTweensOf = function(i, s, o) {
    return ue.killTweensOf(i, s, o);
  }, e;
}(Tr);
nt(me.prototype, {
  _targets: [],
  _lazy: 0,
  _startAt: 0,
  _op: 0,
  _onInit: 0
});
Fe("staggerTo,staggerFrom,staggerFromTo", function(t) {
  me[t] = function() {
    var e = new Ae(), n = xs.call(arguments, 0);
    return n.splice(t === "staggerFromTo" ? 5 : 4, 0, 0), e[t].apply(e, n);
  };
});
var po = function(e, n, r) {
  return e[n] = r;
}, cu = function(e, n, r) {
  return e[n](r);
}, Ih = function(e, n, r, i) {
  return e[n](i.fp, r);
}, Fh = function(e, n, r) {
  return e.setAttribute(n, r);
}, _o = function(e, n) {
  return de(e[n]) ? cu : io(e[n]) && e.setAttribute ? Fh : po;
}, fu = function(e, n) {
  return n.set(n.t, n.p, Math.round((n.s + n.c * e) * 1e6) / 1e6, n);
}, $h = function(e, n) {
  return n.set(n.t, n.p, !!(n.s + n.c * e), n);
}, du = function(e, n) {
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
}, Lh = function(e, n, r, i) {
  for (var s = this._pt, o; s; )
    o = s._next, s.p === i && s.modifier(e, n, r), s = o;
}, zh = function(e) {
  for (var n = this._pt, r, i; n; )
    i = n._next, n.p === e && !n.op || n.op === e ? Si(this, n, "_pt") : n.dep || (r = 1), n = i;
  return !r;
}, Bh = function(e, n, r, i) {
  i.mSet(e, n, i.m.call(i.tween, r, i.mt), i);
}, hu = function(e) {
  for (var n = e._pt, r, i, s, o; n; ) {
    for (r = n._next, i = s; i && i.pr > n.pr; )
      i = i._next;
    (n._prev = i ? i._prev : o) ? n._prev._next = n : s = n, (n._next = i) ? i._prev = n : o = n, n = r;
  }
  e._pt = s;
}, $e = /* @__PURE__ */ function() {
  function t(n, r, i, s, o, l, a, u, c) {
    this.t = r, this.s = s, this.c = o, this.p = i, this.r = l || fu, this.d = a || this, this.set = u || po, this.pr = c || 0, this._next = n, n && (n._prev = this);
  }
  var e = t.prototype;
  return e.modifier = function(r, i, s) {
    this.mSet = this.mSet || this.set, this.set = Bh, this.m = r, this.mt = s, this.tween = i;
  }, t;
}();
Fe(uo + "parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger", function(t) {
  return ao[t] = 1;
});
qe.TweenMax = qe.TweenLite = me;
qe.TimelineLite = qe.TimelineMax = Ae;
ue = new Ae({
  sortChildren: !1,
  defaults: Bn,
  autoRemoveChildren: !0,
  id: "root",
  smoothChildTiming: !0
});
Xe.stringFilter = nu;
var pn = [], qr = {}, jh = [], hl = 0, Uh = 0, Wi = function(e) {
  return (qr[e] || jh).map(function(n) {
    return n();
  });
}, Ns = function() {
  var e = Date.now(), n = [];
  e - hl > 2 && (Wi("matchMediaInit"), pn.forEach(function(r) {
    var i = r.queries, s = r.conditions, o, l, a, u;
    for (l in i)
      o = Ze.matchMedia(i[l]).matches, o && (a = 1), o !== s[l] && (s[l] = o, u = 1);
    u && (r.revert(), a && n.push(r));
  }), Wi("matchMediaRevert"), n.forEach(function(r) {
    return r.onMatch(r, function(i) {
      return r.add(null, i);
    });
  }), hl = e, Wi("matchMedia"));
}, pu = /* @__PURE__ */ function() {
  function t(n, r) {
    this.selector = r && bs(r), this.data = [], this._r = [], this.isReverted = !1, this.id = Uh++, n && this.add(n);
  }
  var e = t.prototype;
  return e.add = function(r, i, s) {
    de(r) && (s = i, i = r, r = de);
    var o = this, l = function() {
      var u = fe, c = o.selector, f;
      return u && u !== o && u.data.push(o), s && (o.selector = bs(s)), fe = o, f = i.apply(o, arguments), de(f) && o._r.push(f), fe = u, o.selector = c, o.isReverted = !1, f;
    };
    return o.last = l, r === de ? l(o, function(a) {
      return o.add(null, a);
    }) : r ? o[r] = l : l;
  }, e.ignore = function(r) {
    var i = fe;
    fe = null, r(this), fe = i;
  }, e.getTweens = function() {
    var r = [];
    return this.data.forEach(function(i) {
      return i instanceof t ? r.push.apply(r, i.getTweens()) : i instanceof me && !(i.parent && i.parent.data === "nested") && r.push(i);
    }), r;
  }, e.clear = function() {
    this._r.length = this.data.length = 0;
  }, e.kill = function(r, i) {
    var s = this;
    if (r ? function() {
      for (var l = s.getTweens(), a = s.data.length, u; a--; )
        u = s.data[a], u.data === "isFlip" && (u.revert(), u.getChildren(!0, !0, !1).forEach(function(c) {
          return l.splice(l.indexOf(c), 1);
        }));
      for (l.map(function(c) {
        return {
          g: c._dur || c._delay || c._sat && !c._sat.vars.immediateRender ? c.globalTime(0) : -1 / 0,
          t: c
        };
      }).sort(function(c, f) {
        return f.g - c.g || -1 / 0;
      }).forEach(function(c) {
        return c.t.revert(r);
      }), a = s.data.length; a--; )
        u = s.data[a], u instanceof Ae ? u.data !== "nested" && (u.scrollTrigger && u.scrollTrigger.revert(), u.kill()) : !(u instanceof me) && u.revert && u.revert(r);
      s._r.forEach(function(c) {
        return c(r, s);
      }), s.isReverted = !0;
    }() : this.data.forEach(function(l) {
      return l.kill && l.kill();
    }), this.clear(), i)
      for (var o = pn.length; o--; )
        pn[o].id === this.id && pn.splice(o, 1);
  }, e.revert = function(r) {
    this.kill(r || {});
  }, t;
}(), Hh = /* @__PURE__ */ function() {
  function t(n) {
    this.contexts = [], this.scope = n;
  }
  var e = t.prototype;
  return e.add = function(r, i, s) {
    yt(r) || (r = {
      matches: r
    });
    var o = new pu(0, s || this.scope), l = o.conditions = {}, a, u, c;
    fe && !o.selector && (o.selector = fe.selector), this.contexts.push(o), i = o.add("onMatch", i), o.queries = r;
    for (u in r)
      u === "all" ? c = 1 : (a = Ze.matchMedia(r[u]), a && (pn.indexOf(o) < 0 && pn.push(o), (l[u] = a.matches) && (c = 1), a.addListener ? a.addListener(Ns) : a.addEventListener("change", Ns)));
    return c && i(o, function(f) {
      return o.add(null, f);
    }), this;
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
      return Ga(i);
    });
  },
  timeline: function(e) {
    return new Ae(e);
  },
  getTweensOf: function(e, n) {
    return ue.getTweensOf(e, n);
  },
  getProperty: function(e, n, r, i) {
    xe(e) && (e = et(e)[0]);
    var s = fn(e || {}).get, o = r ? za : La;
    return r === "native" && (r = ""), e && (n ? o((Ue[n] && Ue[n].get || s)(e, n, r, i)) : function(l, a, u) {
      return o((Ue[l] && Ue[l].get || s)(e, l, a, u));
    });
  },
  quickSetter: function(e, n, r) {
    if (e = et(e), e.length > 1) {
      var i = e.map(function(c) {
        return ze.quickSetter(c, n, r);
      }), s = i.length;
      return function(c) {
        for (var f = s; f--; )
          i[f](c);
      };
    }
    e = e[0] || {};
    var o = Ue[n], l = fn(e), a = l.harness && (l.harness.aliases || {})[n] || n, u = o ? function(c) {
      var f = new o();
      Mn._pt = 0, f.init(e, r ? c + r : c, Mn, 0, [e]), f.render(1, f), Mn._pt && mo(1, Mn);
    } : l.set(e, a);
    return o ? u : function(c) {
      return u(e, a, r ? c + r : c, l, 1);
    };
  },
  quickTo: function(e, n, r) {
    var i, s = ze.to(e, gn((i = {}, i[n] = "+=0.1", i.paused = !0, i), r || {})), o = function(a, u, c) {
      return s.resetTo(n, a, u, c);
    };
    return o.tween = s, o;
  },
  isTweening: function(e) {
    return ue.getTweensOf(e, !0).length > 0;
  },
  defaults: function(e) {
    return e && e.ease && (e.ease = hn(e.ease, Bn.ease)), al(Bn, e || {});
  },
  config: function(e) {
    return al(Xe, e || {});
  },
  registerEffect: function(e) {
    var n = e.name, r = e.effect, i = e.plugins, s = e.defaults, o = e.extendTimeline;
    (i || "").split(",").forEach(function(l) {
      return l && !Ue[l] && !qe[l] && Er(n + " effect requires " + l + " plugin.");
    }), Bi[n] = function(l, a, u) {
      return r(et(l), nt(a || {}, s), u);
    }, o && (Ae.prototype[n] = function(l, a, u) {
      return this.add(Bi[n](l, yt(a) ? a : (u = a) && {}, this), u);
    });
  },
  registerEase: function(e, n) {
    J[e] = hn(n);
  },
  parseEase: function(e, n) {
    return arguments.length ? hn(e, n) : J;
  },
  getById: function(e) {
    return ue.getById(e);
  },
  exportRoot: function(e, n) {
    e === void 0 && (e = {});
    var r = new Ae(e), i, s;
    for (r.smoothChildTiming = Ie(e.smoothChildTiming), ue.remove(r), r._dp = 0, r._time = r._tTime = ue._time, i = ue._first; i; )
      s = i._next, (n || !(!i._dur && i instanceof me && i.vars.onComplete === i._targets[0])) && pt(r, i, i._start - i._delay), i = s;
    return pt(ue, r, 0), r;
  },
  context: function(e, n) {
    return e ? new pu(e, n) : fe;
  },
  matchMedia: function(e) {
    return new Hh(e);
  },
  matchMediaRefresh: function() {
    return pn.forEach(function(e) {
      var n = e.conditions, r, i;
      for (i in n)
        n[i] && (n[i] = !1, r = 1);
      r && e.revert();
    }) || Ns();
  },
  addEventListener: function(e, n) {
    var r = qr[e] || (qr[e] = []);
    ~r.indexOf(n) || r.push(n);
  },
  removeEventListener: function(e, n) {
    var r = qr[e], i = r && r.indexOf(n);
    i >= 0 && r.splice(i, 1);
  },
  utils: {
    wrap: Eh,
    wrapYoyo: Oh,
    distribute: Ka,
    random: qa,
    snap: Xa,
    normalize: bh,
    getUnit: Te,
    clamp: gh,
    splitColor: eu,
    toArray: et,
    selector: bs,
    mapRange: Ja,
    pipe: yh,
    unitize: xh,
    interpolate: Nh,
    shuffle: Ya
  },
  install: Ra,
  effects: Bi,
  ticker: Ye,
  updateRoot: Ae.updateRoot,
  plugins: Ue,
  globalTimeline: ue,
  core: {
    PropTween: $e,
    globals: ka,
    Tween: me,
    Timeline: Ae,
    Animation: Tr,
    getCache: fn,
    _removeLinkedListItem: Si,
    reverting: function() {
      return De;
    },
    context: function(e) {
      return e && fe && (fe.data.push(e), e._ctx = fe), fe;
    },
    suppressOverwrites: function(e) {
      return ro = e;
    }
  }
};
Fe("to,from,fromTo,delayedCall,set,killTweensOf", function(t) {
  return ci[t] = me[t];
});
Ye.add(Ae.updateRoot);
Mn = ci.to({}, {
  duration: 0
});
var Wh = function(e, n) {
  for (var r = e._pt; r && r.p !== n && r.op !== n && r.fp !== n; )
    r = r._next;
  return r;
}, Yh = function(e, n) {
  var r = e._targets, i, s, o;
  for (i in n)
    for (s = r.length; s--; )
      o = e._ptLookup[s][i], o && (o = o.d) && (o._pt && (o = Wh(o, i)), o && o.modifier && o.modifier(n[i], e, r[s], i));
}, Yi = function(e, n) {
  return {
    name: e,
    rawVars: 1,
    //don't pre-process function-based values or "random()" strings.
    init: function(i, s, o) {
      o._onInit = function(l) {
        var a, u;
        if (xe(s) && (a = {}, Fe(s, function(c) {
          return a[c] = 1;
        }), s = a), n) {
          a = {};
          for (u in s)
            a[u] = n(s[u]);
          s = a;
        }
        Yh(l, s);
      };
    }
  };
}, ze = ci.registerPlugin({
  name: "attr",
  init: function(e, n, r, i, s) {
    var o, l, a;
    this.tween = r;
    for (o in n)
      a = e.getAttribute(o) || "", l = this.add(e, "setAttribute", (a || 0) + "", n[o], i, s, 0, 0, o), l.op = o, l.b = a, this._props.push(o);
  },
  render: function(e, n) {
    for (var r = n._pt; r; )
      De ? r.set(r.t, r.p, r.b, r) : r.r(e, r.d), r = r._next;
  }
}, {
  name: "endArray",
  init: function(e, n) {
    for (var r = n.length; r--; )
      this.add(e, r, e[r] || 0, n[r], 0, 0, 0, 0, 0, 1);
  }
}, Yi("roundProps", Es), Yi("modifiers"), Yi("snap", Xa)) || ci;
me.version = Ae.version = ze.version = "3.12.4";
Aa = 1;
so() && Hn();
J.Power0;
J.Power1;
J.Power2;
J.Power3;
J.Power4;
J.Linear;
J.Quad;
J.Cubic;
J.Quart;
J.Quint;
J.Strong;
J.Elastic;
J.Back;
J.SteppedEase;
J.Bounce;
J.Sine;
J.Expo;
J.Circ;
/*!
 * CSSPlugin 3.12.4
 * https://gsap.com
 *
 * Copyright 2008-2023, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/
var pl, Ft, Fn, go, nn, _l, vo, Kh = function() {
  return typeof window < "u";
}, Pt = {}, Gt = 180 / Math.PI, $n = Math.PI / 180, Dn = Math.atan2, ml = 1e8, yo = /([A-Z])/g, Xh = /(left|right|width|margin|padding|x)/i, qh = /[\s,\(]\S/, _t = {
  autoAlpha: "opacity,visibility",
  scale: "scaleX,scaleY",
  alpha: "opacity"
}, ws = function(e, n) {
  return n.set(n.t, n.p, Math.round((n.s + n.c * e) * 1e4) / 1e4 + n.u, n);
}, Qh = function(e, n) {
  return n.set(n.t, n.p, e === 1 ? n.e : Math.round((n.s + n.c * e) * 1e4) / 1e4 + n.u, n);
}, Jh = function(e, n) {
  return n.set(n.t, n.p, e ? Math.round((n.s + n.c * e) * 1e4) / 1e4 + n.u : n.b, n);
}, Zh = function(e, n) {
  var r = n.s + n.c * e;
  n.set(n.t, n.p, ~~(r + (r < 0 ? -0.5 : 0.5)) + n.u, n);
}, _u = function(e, n) {
  return n.set(n.t, n.p, e ? n.e : n.b, n);
}, mu = function(e, n) {
  return n.set(n.t, n.p, e !== 1 ? n.b : n.e, n);
}, Gh = function(e, n, r) {
  return e.style[n] = r;
}, ep = function(e, n, r) {
  return e.style.setProperty(n, r);
}, tp = function(e, n, r) {
  return e._gsap[n] = r;
}, np = function(e, n, r) {
  return e._gsap.scaleX = e._gsap.scaleY = r;
}, rp = function(e, n, r, i, s) {
  var o = e._gsap;
  o.scaleX = o.scaleY = r, o.renderTransform(s, o);
}, ip = function(e, n, r, i, s) {
  var o = e._gsap;
  o[n] = r, o.renderTransform(s, o);
}, ce = "transform", Le = ce + "Origin", sp = function t(e, n) {
  var r = this, i = this.target, s = i.style, o = i._gsap;
  if (e in Pt && s) {
    if (this.tfm = this.tfm || {}, e !== "transform")
      e = _t[e] || e, ~e.indexOf(",") ? e.split(",").forEach(function(l) {
        return r.tfm[l] = Tt(i, l);
      }) : this.tfm[e] = o.x ? o[e] : Tt(i, e), e === Le && (this.tfm.zOrigin = o.zOrigin);
    else
      return _t.transform.split(",").forEach(function(l) {
        return t.call(r, l, n);
      });
    if (this.props.indexOf(ce) >= 0)
      return;
    o.svg && (this.svgo = i.getAttribute("data-svg-origin"), this.props.push(Le, n, "")), e = ce;
  }
  (s || n) && this.props.push(e, n, s[e]);
}, gu = function(e) {
  e.translate && (e.removeProperty("translate"), e.removeProperty("scale"), e.removeProperty("rotate"));
}, op = function() {
  var e = this.props, n = this.target, r = n.style, i = n._gsap, s, o;
  for (s = 0; s < e.length; s += 3)
    e[s + 1] ? n[e[s]] = e[s + 2] : e[s + 2] ? r[e[s]] = e[s + 2] : r.removeProperty(e[s].substr(0, 2) === "--" ? e[s] : e[s].replace(yo, "-$1").toLowerCase());
  if (this.tfm) {
    for (o in this.tfm)
      i[o] = this.tfm[o];
    i.svg && (i.renderTransform(), n.setAttribute("data-svg-origin", this.svgo || "")), s = vo(), (!s || !s.isStart) && !r[ce] && (gu(r), i.zOrigin && r[Le] && (r[Le] += " " + i.zOrigin + "px", i.zOrigin = 0, i.renderTransform()), i.uncache = 1);
  }
}, vu = function(e, n) {
  var r = {
    target: e,
    props: [],
    revert: op,
    save: sp
  };
  return e._gsap || ze.core.getCache(e), n && n.split(",").forEach(function(i) {
    return r.save(i);
  }), r;
}, yu, Ts = function(e, n) {
  var r = Ft.createElementNS ? Ft.createElementNS((n || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"), e) : Ft.createElement(e);
  return r && r.style ? r : Ft.createElement(e);
}, vt = function t(e, n, r) {
  var i = getComputedStyle(e);
  return i[n] || i.getPropertyValue(n.replace(yo, "-$1").toLowerCase()) || i.getPropertyValue(n) || !r && t(e, Wn(n) || n, 1) || "";
}, gl = "O,Moz,ms,Ms,Webkit".split(","), Wn = function(e, n, r) {
  var i = n || nn, s = i.style, o = 5;
  if (e in s && !r)
    return e;
  for (e = e.charAt(0).toUpperCase() + e.substr(1); o-- && !(gl[o] + e in s); )
    ;
  return o < 0 ? null : (o === 3 ? "ms" : o >= 0 ? gl[o] : "") + e;
}, Ds = function() {
  Kh() && window.document && (pl = window, Ft = pl.document, Fn = Ft.documentElement, nn = Ts("div") || {
    style: {}
  }, Ts("div"), ce = Wn(ce), Le = ce + "Origin", nn.style.cssText = "border-width:0;line-height:0;position:absolute;padding:0", yu = !!Wn("perspective"), vo = ze.core.reverting, go = 1);
}, Ki = function t(e) {
  var n = Ts("svg", this.ownerSVGElement && this.ownerSVGElement.getAttribute("xmlns") || "http://www.w3.org/2000/svg"), r = this.parentNode, i = this.nextSibling, s = this.style.cssText, o;
  if (Fn.appendChild(n), n.appendChild(this), this.style.display = "block", e)
    try {
      o = this.getBBox(), this._gsapBBox = this.getBBox, this.getBBox = t;
    } catch {
    }
  else
    this._gsapBBox && (o = this._gsapBBox());
  return r && (i ? r.insertBefore(this, i) : r.appendChild(this)), Fn.removeChild(n), this.style.cssText = s, o;
}, vl = function(e, n) {
  for (var r = n.length; r--; )
    if (e.hasAttribute(n[r]))
      return e.getAttribute(n[r]);
}, xu = function(e) {
  var n;
  try {
    n = e.getBBox();
  } catch {
    n = Ki.call(e, !0);
  }
  return n && (n.width || n.height) || e.getBBox === Ki || (n = Ki.call(e, !0)), n && !n.width && !n.x && !n.y ? {
    x: +vl(e, ["x", "cx", "x1"]) || 0,
    y: +vl(e, ["y", "cy", "y1"]) || 0,
    width: 0,
    height: 0
  } : n;
}, bu = function(e) {
  return !!(e.getCTM && (!e.parentNode || e.ownerSVGElement) && xu(e));
}, vn = function(e, n) {
  if (n) {
    var r = e.style, i;
    n in Pt && n !== Le && (n = ce), r.removeProperty ? (i = n.substr(0, 2), (i === "ms" || n.substr(0, 6) === "webkit") && (n = "-" + n), r.removeProperty(i === "--" ? n : n.replace(yo, "-$1").toLowerCase())) : r.removeAttribute(n);
  }
}, $t = function(e, n, r, i, s, o) {
  var l = new $e(e._pt, n, r, 0, 1, o ? mu : _u);
  return e._pt = l, l.b = i, l.e = s, e._props.push(r), l;
}, yl = {
  deg: 1,
  rad: 1,
  turn: 1
}, lp = {
  grid: 1,
  flex: 1
}, Yt = function t(e, n, r, i) {
  var s = parseFloat(r) || 0, o = (r + "").trim().substr((s + "").length) || "px", l = nn.style, a = Xh.test(n), u = e.tagName.toLowerCase() === "svg", c = (u ? "client" : "offset") + (a ? "Width" : "Height"), f = 100, d = i === "px", _ = i === "%", g, p, y, E;
  if (i === o || !s || yl[i] || yl[o])
    return s;
  if (o !== "px" && !d && (s = t(e, n, r, "px")), E = e.getCTM && bu(e), (_ || o === "%") && (Pt[n] || ~n.indexOf("adius")))
    return g = E ? e.getBBox()[a ? "width" : "height"] : e[c], he(_ ? s / g * f : s / 100 * g);
  if (l[a ? "width" : "height"] = f + (d ? o : i), p = ~n.indexOf("adius") || i === "em" && e.appendChild && !u ? e : e.parentNode, E && (p = (e.ownerSVGElement || {}).parentNode), (!p || p === Ft || !p.appendChild) && (p = Ft.body), y = p._gsap, y && _ && y.width && a && y.time === Ye.time && !y.uncache)
    return he(s / y.width * f);
  if (_ && (n === "height" || n === "width")) {
    var O = e.style[n];
    e.style[n] = f + i, g = e[c], O ? e.style[n] = O : vn(e, n);
  } else
    (_ || o === "%") && !lp[vt(p, "display")] && (l.position = vt(e, "position")), p === e && (l.position = "static"), p.appendChild(nn), g = nn[c], p.removeChild(nn), l.position = "absolute";
  return a && _ && (y = fn(p), y.time = Ye.time, y.width = p[c]), he(d ? g * s / f : g && s ? f / g * s : 0);
}, Tt = function(e, n, r, i) {
  var s;
  return go || Ds(), n in _t && n !== "transform" && (n = _t[n], ~n.indexOf(",") && (n = n.split(",")[0])), Pt[n] && n !== "transform" ? (s = Cr(e, i), s = n !== "transformOrigin" ? s[n] : s.svg ? s.origin : di(vt(e, Le)) + " " + s.zOrigin + "px") : (s = e.style[n], (!s || s === "auto" || i || ~(s + "").indexOf("calc(")) && (s = fi[n] && fi[n](e, n, r) || vt(e, n) || Fa(e, n) || (n === "opacity" ? 1 : 0))), r && !~(s + "").trim().indexOf(" ") ? Yt(e, n, s, r) + r : s;
}, ap = function(e, n, r, i) {
  if (!r || r === "none") {
    var s = Wn(n, e, 1), o = s && vt(e, s, 1);
    o && o !== r ? (n = s, r = o) : n === "borderColor" && (r = vt(e, "borderTopColor"));
  }
  var l = new $e(this._pt, e.style, n, 0, 1, du), a = 0, u = 0, c, f, d, _, g, p, y, E, O, b, T, v;
  if (l.b = r, l.e = i, r += "", i += "", i === "auto" && (p = e.style[n], e.style[n] = i, i = vt(e, n) || i, p ? e.style[n] = p : vn(e, n)), c = [r, i], nu(c), r = c[0], i = c[1], d = r.match(Vn) || [], v = i.match(Vn) || [], v.length) {
    for (; f = Vn.exec(i); )
      y = f[0], O = i.substring(a, f.index), g ? g = (g + 1) % 5 : (O.substr(-5) === "rgba(" || O.substr(-5) === "hsla(") && (g = 1), y !== (p = d[u++] || "") && (_ = parseFloat(p) || 0, T = p.substr((_ + "").length), y.charAt(1) === "=" && (y = In(_, y) + T), E = parseFloat(y), b = y.substr((E + "").length), a = Vn.lastIndex - b.length, b || (b = b || Xe.units[n] || T, a === i.length && (i += b, l.e += b)), T !== b && (_ = Yt(e, n, p, b) || 0), l._pt = {
        _next: l._pt,
        p: O || u === 1 ? O : ",",
        //note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.
        s: _,
        c: E - _,
        m: g && g < 4 || n === "zIndex" ? Math.round : 0
      });
    l.c = a < i.length ? i.substring(a, i.length) : "";
  } else
    l.r = n === "display" && i === "none" ? mu : _u;
  return Va.test(i) && (l.e = 0), this._pt = l, l;
}, xl = {
  top: "0%",
  bottom: "100%",
  left: "0%",
  right: "100%",
  center: "50%"
}, up = function(e) {
  var n = e.split(" "), r = n[0], i = n[1] || "50%";
  return (r === "top" || r === "bottom" || i === "left" || i === "right") && (e = r, r = i, i = e), n[0] = xl[r] || r, n[1] = xl[i] || i, n.join(" ");
}, cp = function(e, n) {
  if (n.tween && n.tween._time === n.tween._dur) {
    var r = n.t, i = r.style, s = n.u, o = r._gsap, l, a, u;
    if (s === "all" || s === !0)
      i.cssText = "", a = 1;
    else
      for (s = s.split(","), u = s.length; --u > -1; )
        l = s[u], Pt[l] && (a = 1, l = l === "transformOrigin" ? Le : ce), vn(r, l);
    a && (vn(r, ce), o && (o.svg && r.removeAttribute("transform"), Cr(r, 1), o.uncache = 1, gu(i)));
  }
}, fi = {
  clearProps: function(e, n, r, i, s) {
    if (s.data !== "isFromStart") {
      var o = e._pt = new $e(e._pt, n, r, 0, 0, cp);
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
  	if (style.cssText !== cssText) { //only apply if things change. Otherwise, in cases like a background-image that's pulled dynamically, it could cause a refresh. See https://gsap.com/forums/topic/20368-possible-gsap-bug-switching-classnames-in-chrome/.
  		style.cssText = cssText; //we recorded cssText before we swapped classes and ran _getAllStyles() because in cases when a className tween is overwritten, we remove all the related tweening properties from that class change (otherwise class-specific stuff can't override properties we've directly set on the target's style object due to specificity).
  	}
  	_parseTransform(target, true); //to clear the caching of transforms
  	data.css = new gsap.plugins.css();
  	data.css.init(target, changingVars, tween);
  	plugin._props.push(...data.css._props);
  	return 1;
  }
  */
}, Dr = [1, 0, 0, 1, 0, 0], Eu = {}, Ou = function(e) {
  return e === "matrix(1, 0, 0, 1, 0, 0)" || e === "none" || !e;
}, bl = function(e) {
  var n = vt(e, ce);
  return Ou(n) ? Dr : n.substr(7).match(Pa).map(he);
}, xo = function(e, n) {
  var r = e._gsap || fn(e), i = e.style, s = bl(e), o, l, a, u;
  return r.svg && e.getAttribute("transform") ? (a = e.transform.baseVal.consolidate().matrix, s = [a.a, a.b, a.c, a.d, a.e, a.f], s.join(",") === "1,0,0,1,0,0" ? Dr : s) : (s === Dr && !e.offsetParent && e !== Fn && !r.svg && (a = i.display, i.display = "block", o = e.parentNode, (!o || !e.offsetParent) && (u = 1, l = e.nextElementSibling, Fn.appendChild(e)), s = bl(e), a ? i.display = a : vn(e, "display"), u && (l ? o.insertBefore(e, l) : o ? o.appendChild(e) : Fn.removeChild(e))), n && s.length > 6 ? [s[0], s[1], s[4], s[5], s[12], s[13]] : s);
}, Cs = function(e, n, r, i, s, o) {
  var l = e._gsap, a = s || xo(e, !0), u = l.xOrigin || 0, c = l.yOrigin || 0, f = l.xOffset || 0, d = l.yOffset || 0, _ = a[0], g = a[1], p = a[2], y = a[3], E = a[4], O = a[5], b = n.split(" "), T = parseFloat(b[0]) || 0, v = parseFloat(b[1]) || 0, S, M, k, C;
  r ? a !== Dr && (M = _ * y - g * p) && (k = T * (y / M) + v * (-p / M) + (p * O - y * E) / M, C = T * (-g / M) + v * (_ / M) - (_ * O - g * E) / M, T = k, v = C) : (S = xu(e), T = S.x + (~b[0].indexOf("%") ? T / 100 * S.width : T), v = S.y + (~(b[1] || b[0]).indexOf("%") ? v / 100 * S.height : v)), i || i !== !1 && l.smooth ? (E = T - u, O = v - c, l.xOffset = f + (E * _ + O * p) - E, l.yOffset = d + (E * g + O * y) - O) : l.xOffset = l.yOffset = 0, l.xOrigin = T, l.yOrigin = v, l.smooth = !!i, l.origin = n, l.originIsAbsolute = !!r, e.style[Le] = "0px 0px", o && ($t(o, l, "xOrigin", u, T), $t(o, l, "yOrigin", c, v), $t(o, l, "xOffset", f, l.xOffset), $t(o, l, "yOffset", d, l.yOffset)), e.setAttribute("data-svg-origin", T + " " + v);
}, Cr = function(e, n) {
  var r = e._gsap || new ou(e);
  if ("x" in r && !n && !r.uncache)
    return r;
  var i = e.style, s = r.scaleX < 0, o = "px", l = "deg", a = getComputedStyle(e), u = vt(e, Le) || "0", c, f, d, _, g, p, y, E, O, b, T, v, S, M, k, C, W, Z, K, G, pe, te, Q, z, j, Se, xt, rt, Re, it, Be, bt;
  return c = f = d = p = y = E = O = b = T = 0, _ = g = 1, r.svg = !!(e.getCTM && bu(e)), a.translate && ((a.translate !== "none" || a.scale !== "none" || a.rotate !== "none") && (i[ce] = (a.translate !== "none" ? "translate3d(" + (a.translate + " 0 0").split(" ").slice(0, 3).join(", ") + ") " : "") + (a.rotate !== "none" ? "rotate(" + a.rotate + ") " : "") + (a.scale !== "none" ? "scale(" + a.scale.split(" ").join(",") + ") " : "") + (a[ce] !== "none" ? a[ce] : "")), i.scale = i.rotate = i.translate = "none"), M = xo(e, r.svg), r.svg && (r.uncache ? (j = e.getBBox(), u = r.xOrigin - j.x + "px " + (r.yOrigin - j.y) + "px", z = "") : z = !n && e.getAttribute("data-svg-origin"), Cs(e, z || u, !!z || r.originIsAbsolute, r.smooth !== !1, M)), v = r.xOrigin || 0, S = r.yOrigin || 0, M !== Dr && (Z = M[0], K = M[1], G = M[2], pe = M[3], c = te = M[4], f = Q = M[5], M.length === 6 ? (_ = Math.sqrt(Z * Z + K * K), g = Math.sqrt(pe * pe + G * G), p = Z || K ? Dn(K, Z) * Gt : 0, O = G || pe ? Dn(G, pe) * Gt + p : 0, O && (g *= Math.abs(Math.cos(O * $n))), r.svg && (c -= v - (v * Z + S * G), f -= S - (v * K + S * pe))) : (bt = M[6], it = M[7], xt = M[8], rt = M[9], Re = M[10], Be = M[11], c = M[12], f = M[13], d = M[14], k = Dn(bt, Re), y = k * Gt, k && (C = Math.cos(-k), W = Math.sin(-k), z = te * C + xt * W, j = Q * C + rt * W, Se = bt * C + Re * W, xt = te * -W + xt * C, rt = Q * -W + rt * C, Re = bt * -W + Re * C, Be = it * -W + Be * C, te = z, Q = j, bt = Se), k = Dn(-G, Re), E = k * Gt, k && (C = Math.cos(-k), W = Math.sin(-k), z = Z * C - xt * W, j = K * C - rt * W, Se = G * C - Re * W, Be = pe * W + Be * C, Z = z, K = j, G = Se), k = Dn(K, Z), p = k * Gt, k && (C = Math.cos(k), W = Math.sin(k), z = Z * C + K * W, j = te * C + Q * W, K = K * C - Z * W, Q = Q * C - te * W, Z = z, te = j), y && Math.abs(y) + Math.abs(p) > 359.9 && (y = p = 0, E = 180 - E), _ = he(Math.sqrt(Z * Z + K * K + G * G)), g = he(Math.sqrt(Q * Q + bt * bt)), k = Dn(te, Q), O = Math.abs(k) > 2e-4 ? k * Gt : 0, T = Be ? 1 / (Be < 0 ? -Be : Be) : 0), r.svg && (z = e.getAttribute("transform"), r.forceCSS = e.setAttribute("transform", "") || !Ou(vt(e, ce)), z && e.setAttribute("transform", z))), Math.abs(O) > 90 && Math.abs(O) < 270 && (s ? (_ *= -1, O += p <= 0 ? 180 : -180, p += p <= 0 ? 180 : -180) : (g *= -1, O += O <= 0 ? 180 : -180)), n = n || r.uncache, r.x = c - ((r.xPercent = c && (!n && r.xPercent || (Math.round(e.offsetWidth / 2) === Math.round(-c) ? -50 : 0))) ? e.offsetWidth * r.xPercent / 100 : 0) + o, r.y = f - ((r.yPercent = f && (!n && r.yPercent || (Math.round(e.offsetHeight / 2) === Math.round(-f) ? -50 : 0))) ? e.offsetHeight * r.yPercent / 100 : 0) + o, r.z = d + o, r.scaleX = he(_), r.scaleY = he(g), r.rotation = he(p) + l, r.rotationX = he(y) + l, r.rotationY = he(E) + l, r.skewX = O + l, r.skewY = b + l, r.transformPerspective = T + o, (r.zOrigin = parseFloat(u.split(" ")[2]) || !n && r.zOrigin || 0) && (i[Le] = di(u)), r.xOffset = r.yOffset = 0, r.force3D = Xe.force3D, r.renderTransform = r.svg ? dp : yu ? Nu : fp, r.uncache = 0, r;
}, di = function(e) {
  return (e = e.split(" "))[0] + " " + e[1];
}, Xi = function(e, n, r) {
  var i = Te(n);
  return he(parseFloat(n) + parseFloat(Yt(e, "x", r + "px", i))) + i;
}, fp = function(e, n) {
  n.z = "0px", n.rotationY = n.rotationX = "0deg", n.force3D = 0, Nu(e, n);
}, Qt = "0deg", nr = "0px", Jt = ") ", Nu = function(e, n) {
  var r = n || this, i = r.xPercent, s = r.yPercent, o = r.x, l = r.y, a = r.z, u = r.rotation, c = r.rotationY, f = r.rotationX, d = r.skewX, _ = r.skewY, g = r.scaleX, p = r.scaleY, y = r.transformPerspective, E = r.force3D, O = r.target, b = r.zOrigin, T = "", v = E === "auto" && e && e !== 1 || E === !0;
  if (b && (f !== Qt || c !== Qt)) {
    var S = parseFloat(c) * $n, M = Math.sin(S), k = Math.cos(S), C;
    S = parseFloat(f) * $n, C = Math.cos(S), o = Xi(O, o, M * C * -b), l = Xi(O, l, -Math.sin(S) * -b), a = Xi(O, a, k * C * -b + b);
  }
  y !== nr && (T += "perspective(" + y + Jt), (i || s) && (T += "translate(" + i + "%, " + s + "%) "), (v || o !== nr || l !== nr || a !== nr) && (T += a !== nr || v ? "translate3d(" + o + ", " + l + ", " + a + ") " : "translate(" + o + ", " + l + Jt), u !== Qt && (T += "rotate(" + u + Jt), c !== Qt && (T += "rotateY(" + c + Jt), f !== Qt && (T += "rotateX(" + f + Jt), (d !== Qt || _ !== Qt) && (T += "skew(" + d + ", " + _ + Jt), (g !== 1 || p !== 1) && (T += "scale(" + g + ", " + p + Jt), O.style[ce] = T || "translate(0, 0)";
}, dp = function(e, n) {
  var r = n || this, i = r.xPercent, s = r.yPercent, o = r.x, l = r.y, a = r.rotation, u = r.skewX, c = r.skewY, f = r.scaleX, d = r.scaleY, _ = r.target, g = r.xOrigin, p = r.yOrigin, y = r.xOffset, E = r.yOffset, O = r.forceCSS, b = parseFloat(o), T = parseFloat(l), v, S, M, k, C;
  a = parseFloat(a), u = parseFloat(u), c = parseFloat(c), c && (c = parseFloat(c), u += c, a += c), a || u ? (a *= $n, u *= $n, v = Math.cos(a) * f, S = Math.sin(a) * f, M = Math.sin(a - u) * -d, k = Math.cos(a - u) * d, u && (c *= $n, C = Math.tan(u - c), C = Math.sqrt(1 + C * C), M *= C, k *= C, c && (C = Math.tan(c), C = Math.sqrt(1 + C * C), v *= C, S *= C)), v = he(v), S = he(S), M = he(M), k = he(k)) : (v = f, k = d, S = M = 0), (b && !~(o + "").indexOf("px") || T && !~(l + "").indexOf("px")) && (b = Yt(_, "x", o, "px"), T = Yt(_, "y", l, "px")), (g || p || y || E) && (b = he(b + g - (g * v + p * M) + y), T = he(T + p - (g * S + p * k) + E)), (i || s) && (C = _.getBBox(), b = he(b + i / 100 * C.width), T = he(T + s / 100 * C.height)), C = "matrix(" + v + "," + S + "," + M + "," + k + "," + b + "," + T + ")", _.setAttribute("transform", C), O && (_.style[ce] = C);
}, hp = function(e, n, r, i, s) {
  var o = 360, l = xe(s), a = parseFloat(s) * (l && ~s.indexOf("rad") ? Gt : 1), u = a - i, c = i + u + "deg", f, d;
  return l && (f = s.split("_")[1], f === "short" && (u %= o, u !== u % (o / 2) && (u += u < 0 ? o : -o)), f === "cw" && u < 0 ? u = (u + o * ml) % o - ~~(u / o) * o : f === "ccw" && u > 0 && (u = (u - o * ml) % o - ~~(u / o) * o)), e._pt = d = new $e(e._pt, n, r, i, u, Qh), d.e = c, d.u = "deg", e._props.push(r), d;
}, El = function(e, n) {
  for (var r in n)
    e[r] = n[r];
  return e;
}, pp = function(e, n, r) {
  var i = El({}, r._gsap), s = "perspective,force3D,transformOrigin,svgOrigin", o = r.style, l, a, u, c, f, d, _, g;
  i.svg ? (u = r.getAttribute("transform"), r.setAttribute("transform", ""), o[ce] = n, l = Cr(r, 1), vn(r, ce), r.setAttribute("transform", u)) : (u = getComputedStyle(r)[ce], o[ce] = n, l = Cr(r, 1), o[ce] = u);
  for (a in Pt)
    u = i[a], c = l[a], u !== c && s.indexOf(a) < 0 && (_ = Te(u), g = Te(c), f = _ !== g ? Yt(r, a, u, g) : parseFloat(u), d = parseFloat(c), e._pt = new $e(e._pt, l, a, f, d - f, ws), e._pt.u = g || 0, e._props.push(a));
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
var wu = {
  name: "css",
  register: Ds,
  targetTest: function(e) {
    return e.style && e.nodeType;
  },
  init: function(e, n, r, i, s) {
    var o = this._props, l = e.style, a = r.vars.startAt, u, c, f, d, _, g, p, y, E, O, b, T, v, S, M, k;
    go || Ds(), this.styles = this.styles || vu(e), k = this.styles.props, this.tween = r;
    for (p in n)
      if (p !== "autoRound" && (c = n[p], !(Ue[p] && lu(p, n, r, i, e, s)))) {
        if (_ = typeof c, g = fi[p], _ === "function" && (c = c.call(r, i, e, s), _ = typeof c), _ === "string" && ~c.indexOf("random(") && (c = Nr(c)), g)
          g(this, e, p, c, r) && (M = 1);
        else if (p.substr(0, 2) === "--")
          u = (getComputedStyle(e).getPropertyValue(p) + "").trim(), c += "", Bt.lastIndex = 0, Bt.test(u) || (y = Te(u), E = Te(c)), E ? y !== E && (u = Yt(e, p, u, E) + E) : y && (c += y), this.add(l, "setProperty", u, c, i, s, 0, 0, p), o.push(p), k.push(p, 0, l[p]);
        else if (_ !== "undefined") {
          if (a && p in a ? (u = typeof a[p] == "function" ? a[p].call(r, i, e, s) : a[p], xe(u) && ~u.indexOf("random(") && (u = Nr(u)), Te(u + "") || u === "auto" || (u += Xe.units[p] || Te(Tt(e, p)) || ""), (u + "").charAt(1) === "=" && (u = Tt(e, p))) : u = Tt(e, p), d = parseFloat(u), O = _ === "string" && c.charAt(1) === "=" && c.substr(0, 2), O && (c = c.substr(2)), f = parseFloat(c), p in _t && (p === "autoAlpha" && (d === 1 && Tt(e, "visibility") === "hidden" && f && (d = 0), k.push("visibility", 0, l.visibility), $t(this, l, "visibility", d ? "inherit" : "hidden", f ? "inherit" : "hidden", !f)), p !== "scale" && p !== "transform" && (p = _t[p], ~p.indexOf(",") && (p = p.split(",")[0]))), b = p in Pt, b) {
            if (this.styles.save(p), T || (v = e._gsap, v.renderTransform && !n.parseTransform || Cr(e, n.parseTransform), S = n.smoothOrigin !== !1 && v.smooth, T = this._pt = new $e(this._pt, l, ce, 0, 1, v.renderTransform, v, 0, -1), T.dep = 1), p === "scale")
              this._pt = new $e(this._pt, v, "scaleY", v.scaleY, (O ? In(v.scaleY, O + f) : f) - v.scaleY || 0, ws), this._pt.u = 0, o.push("scaleY", p), p += "X";
            else if (p === "transformOrigin") {
              k.push(Le, 0, l[Le]), c = up(c), v.svg ? Cs(e, c, 0, S, 0, this) : (E = parseFloat(c.split(" ")[2]) || 0, E !== v.zOrigin && $t(this, v, "zOrigin", v.zOrigin, E), $t(this, l, p, di(u), di(c)));
              continue;
            } else if (p === "svgOrigin") {
              Cs(e, c, 1, S, 0, this);
              continue;
            } else if (p in Eu) {
              hp(this, v, p, d, O ? In(d, O + c) : c);
              continue;
            } else if (p === "smoothOrigin") {
              $t(this, v, "smooth", v.smooth, c);
              continue;
            } else if (p === "force3D") {
              v[p] = c;
              continue;
            } else if (p === "transform") {
              pp(this, c, e);
              continue;
            }
          } else
            p in l || (p = Wn(p) || p);
          if (b || (f || f === 0) && (d || d === 0) && !qh.test(c) && p in l)
            y = (u + "").substr((d + "").length), f || (f = 0), E = Te(c) || (p in Xe.units ? Xe.units[p] : y), y !== E && (d = Yt(e, p, u, E)), this._pt = new $e(this._pt, b ? v : l, p, d, (O ? In(d, O + f) : f) - d, !b && (E === "px" || p === "zIndex") && n.autoRound !== !1 ? Zh : ws), this._pt.u = E || 0, y !== E && E !== "%" && (this._pt.b = u, this._pt.r = Jh);
          else if (p in l)
            ap.call(this, e, p, u, O ? O + c : c);
          else if (p in e)
            this.add(e, p, u || e[p], O ? O + c : c, i, s);
          else if (p !== "parseTransform") {
            lo(p, c);
            continue;
          }
          b || (p in l ? k.push(p, 0, l[p]) : k.push(p, 1, u || e[p])), o.push(p);
        }
      }
    M && hu(this);
  },
  render: function(e, n) {
    if (n.tween._time || !vo())
      for (var r = n._pt; r; )
        r.r(e, r.d), r = r._next;
    else
      n.styles.revert();
  },
  get: Tt,
  aliases: _t,
  getSetter: function(e, n, r) {
    var i = _t[n];
    return i && i.indexOf(",") < 0 && (n = i), n in Pt && n !== Le && (e._gsap.x || Tt(e, "x")) ? r && _l === r ? n === "scale" ? np : tp : (_l = r || {}) && (n === "scale" ? rp : ip) : e.style && !io(e.style[n]) ? Gh : ~n.indexOf("-") ? ep : _o(e, n);
  },
  core: {
    _removeProperty: vn,
    _getMatrix: xo
  }
};
ze.utils.checkPrefix = Wn;
ze.core.getStyleSaver = vu;
(function(t, e, n, r) {
  var i = Fe(t + "," + e + "," + n, function(s) {
    Pt[s] = 1;
  });
  Fe(e, function(s) {
    Xe.units[s] = "deg", Eu[s] = 1;
  }), _t[i[13]] = t + "," + e, Fe(r, function(s) {
    var o = s.split(":");
    _t[o[1]] = i[o[0]];
  });
})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent", "rotation,rotationX,rotationY,skewX,skewY", "transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective", "0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");
Fe("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective", function(t) {
  Xe.units[t] = "px";
});
ze.registerPlugin(wu);
var Ss = ze.registerPlugin(wu) || ze;
Ss.core.Tween;
const _p = ["fill"], mp = /* @__PURE__ */ bn({
  __name: "CurveMask",
  props: {
    zIndex: { default: 5, type: Number },
    maskColor: { default: "black", type: String }
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
    const r = n, i = oe(!1), s = oe(null), o = oe(null);
    return e({
      open: () => {
        if (i.value)
          return;
        i.value = !0, Ss.timeline({
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
        i.value = !0, Ss.timeline({
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
    }), (u, c) => (En(), Xn("svg", {
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
    ], 8, _p));
  }
}), gp = ".curve-mask{position:absolute;z-index:var(--09e7e913);top:0;left:0;width:100%;height:100%;pointer-events:none}", vp = /* @__PURE__ */ Jn(mp, [["styles", [gp]]]), yp = /* @__PURE__ */ Qn(vp);
function xp(t = "curve-mask") {
  customElements.define(t, yp);
}
const bp = { class: "text-underline" }, Ep = /* @__PURE__ */ bn({
  __name: "TextUnderline",
  props: {
    lineColor: { default: "white", type: String },
    lineHeight: { default: "3px", type: String },
    hoverTextColor: { default: "currentColor", type: String }
  },
  setup(t) {
    return qn((e) => ({
      "197a2a41": e.lineColor,
      "1dc4f209": e.lineHeight,
      "6ce51d28": e.hoverTextColor
    })), (e, n) => (En(), Xn("div", bp, [
      Ks(e.$slots, "default")
    ]));
  }
}), Op = '.text-underline{--text-underline-line-color: var(--197a2a41);--text-underline-line-height: var(--1dc4f209);--text-underline-hover-text-color: var(--6ce51d28);position:relative;display:inline-flex;transition:.5s}.text-underline:after{position:absolute;content:"";top:100%;left:0;width:100%;height:var(--text-underline-line-height);background:var(--text-underline-line-color);transform:scaleX(0);transform-origin:right;transition:transform .5s}.text-underline:hover{color:var(--text-underline-hover-text-color)}.text-underline:hover:after{transform:scaleX(1);transform-origin:left}', Np = /* @__PURE__ */ Jn(Ep, [["styles", [Op]]]), wp = /* @__PURE__ */ Qn(Np);
function Tp(t = "text-underline") {
  customElements.define(t, wp);
}
const Dp = /* @__PURE__ */ bn({
  __name: "TextFloat",
  props: {
    text: { type: String },
    textColor: { default: "white", type: String },
    textSize: { default: "1rem", type: String },
    textWeight: { default: "normal", type: String },
    textFont: { default: "", type: String },
    textLeading: { default: "normal", type: String },
    textStyle: { default: "normal", type: String },
    textWhiteSpace: { default: "normal", type: String },
    stagger: { default: 0, type: Number }
  },
  setup(t) {
    qn((r) => ({
      "5a98d278": r.textColor,
      "4cadf368": r.textSize,
      "1a140203": r.textWeight,
      "4cb99acc": r.textFont,
      "3bd4c64a": r.textLeading,
      "5b7cc0c6": r.textStyle,
      72306868: r.textWhiteSpace,
      "7db84722": r.stagger
    }));
    const e = t, n = oe(null);
    return Kn(() => {
      const r = e.text;
      if (n.value && r) {
        let i = r.split("");
        n.value.textContent = "", i.forEach((s, o) => {
          var a;
          let l = document.createElement("span");
          l.textContent = s, l.style.setProperty("--i", `${o}`), l.dataset.text = s, (a = n.value) == null || a.append(l);
        });
      }
    }), (r, i) => (En(), Xn("div", {
      class: "text-float",
      ref_key: "parent",
      ref: n
    }, null, 512));
  }
}), Cp = ".text-float{--text-float-color: var(--5a98d278);--text-float-size: var(--4cadf368);--text-float-weight: var(--1a140203);--text-float-font: var(--4cb99acc);--text-float-leading: var(--3bd4c64a);--text-float-style: var(--5b7cc0c6);--text-float-white-space: var(--72306868);--text-float-stagger: var(--7db84722);display:flex;overflow:hidden}.text-float span{position:relative;transition:.3s;color:var(--text-float-color);font-size:var(--text-float-size);font-weight:var(--text-float-weight);font-family:var(--text-float-font);line-height:var(--text-float-leading);font-style:var(--text-float-style);white-space:var(--text-float-white-space);transition-delay:calc(var(--i) * var(--text-float-stagger) * .05 * 1s)}.text-float span:before{position:absolute;content:attr(data-text);transform:translateY(130%)}.text-float:hover span{transform:translateY(-130%)}", Sp = /* @__PURE__ */ Jn(Dp, [["styles", [Cp]]]), Pp = /* @__PURE__ */ Qn(Sp);
function Vp(t = "text-float") {
  customElements.define(t, Pp);
}
function Mp() {
  Vd(), qd(), eh(), xp(), Tp(), Vp();
}
export {
  Mp as register
};
