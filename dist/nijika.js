/**
* @vue/shared v3.4.37
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function Yn(t, e) {
  const n = new Set(t.split(","));
  return (r) => n.has(r);
}
const ie = process.env.NODE_ENV !== "production" ? Object.freeze({}) : {}, kn = process.env.NODE_ENV !== "production" ? Object.freeze([]) : [], pe = () => {
}, Fu = () => !1, Nr = (t) => t.charCodeAt(0) === 111 && t.charCodeAt(1) === 110 && // uppercase letter
(t.charCodeAt(2) > 122 || t.charCodeAt(2) < 97), Qr = (t) => t.startsWith("onUpdate:"), de = Object.assign, Ds = (t, e) => {
  const n = t.indexOf(e);
  n > -1 && t.splice(n, 1);
}, $u = Object.prototype.hasOwnProperty, q = (t, e) => $u.call(t, e), B = Array.isArray, An = (t) => di(t) === "[object Map]", Lu = (t) => di(t) === "[object Set]", U = (t) => typeof t == "function", me = (t) => typeof t == "string", Kn = (t) => typeof t == "symbol", le = (t) => t !== null && typeof t == "object", Cs = (t) => (le(t) || U(t)) && U(t.then) && U(t.catch), zu = Object.prototype.toString, di = (t) => zu.call(t), Vs = (t) => di(t).slice(8, -1), Bu = (t) => di(t) === "[object Object]", Ps = (t) => me(t) && t !== "NaN" && t[0] !== "-" && "" + parseInt(t, 10) === t, or = /* @__PURE__ */ Yn(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), ju = /* @__PURE__ */ Yn(
  "bind,cloak,else-if,else,for,html,if,model,on,once,pre,show,slot,text,memo"
), hi = (t) => {
  const e = /* @__PURE__ */ Object.create(null);
  return (n) => e[n] || (e[n] = t(n));
}, Uu = /-(\w)/g, et = hi((t) => t.replace(Uu, (e, n) => n ? n.toUpperCase() : "")), Hu = /\B([A-Z])/g, Re = hi(
  (t) => t.replace(Hu, "-$1").toLowerCase()
), pi = hi((t) => t.charAt(0).toUpperCase() + t.slice(1)), sn = hi((t) => t ? `on${pi(t)}` : ""), Kt = (t, e) => !Object.is(t, e), Jn = (t, ...e) => {
  for (let n = 0; n < t.length; n++)
    t[n](...e);
}, Jr = (t, e, n, r = !1) => {
  Object.defineProperty(t, e, {
    configurable: !0,
    enumerable: !1,
    writable: r,
    value: n
  });
}, Wu = (t) => {
  const e = parseFloat(t);
  return isNaN(e) ? t : e;
}, Co = (t) => {
  const e = me(t) ? Number(t) : NaN;
  return isNaN(e) ? t : e;
};
let Vo;
const Ms = () => Vo || (Vo = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function _i(t) {
  if (B(t)) {
    const e = {};
    for (let n = 0; n < t.length; n++) {
      const r = t[n], i = me(r) ? qu(r) : _i(r);
      if (i)
        for (const s in i)
          e[s] = i[s];
    }
    return e;
  } else if (me(t) || le(t))
    return t;
}
const Yu = /;(?![^(]*\))/g, Ku = /:([^]+)/, Xu = /\/\*[^]*?\*\//g;
function qu(t) {
  const e = {};
  return t.replace(Xu, "").split(Yu).forEach((n) => {
    if (n) {
      const r = n.split(Ku);
      r.length > 1 && (e[r[0].trim()] = r[1].trim());
    }
  }), e;
}
function ks(t) {
  let e = "";
  if (me(t))
    e = t;
  else if (B(t))
    for (let n = 0; n < t.length; n++) {
      const r = ks(t[n]);
      r && (e += r + " ");
    }
  else if (le(t))
    for (const n in t)
      t[n] && (e += n + " ");
  return e.trim();
}
const Gu = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", Qu = /* @__PURE__ */ Yn(Gu);
function Cl(t) {
  return !!t || t === "";
}
/**
* @vue/reactivity v3.4.37
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function Ct(t, ...e) {
  console.warn(`[Vue warn] ${t}`, ...e);
}
let je;
class Ju {
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
    } else process.env.NODE_ENV !== "production" && Ct("cannot run an inactive effect scope.");
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
function Zu(t, e = je) {
  e && e.active && e.effects.push(t);
}
function Vl() {
  return je;
}
function ec(t) {
  je ? je.cleanups.push(t) : process.env.NODE_ENV !== "production" && Ct(
    "onScopeDispose() is called when there is no active effect scope to be associated with."
  );
}
let fn;
class As {
  constructor(e, n, r, i) {
    this.fn = e, this.trigger = n, this.scheduler = r, this.active = !0, this.deps = [], this._dirtyLevel = 4, this._trackId = 0, this._runnings = 0, this._shouldSchedule = !1, this._depsLength = 0, Zu(this, i);
  }
  get dirty() {
    if (this._dirtyLevel === 2 || this._dirtyLevel === 3) {
      this._dirtyLevel = 1, kt();
      for (let e = 0; e < this._depsLength; e++) {
        const n = this.deps[e];
        if (n.computed && (tc(n.computed), this._dirtyLevel >= 4))
          break;
      }
      this._dirtyLevel === 1 && (this._dirtyLevel = 0), At();
    }
    return this._dirtyLevel >= 4;
  }
  set dirty(e) {
    this._dirtyLevel = e ? 4 : 0;
  }
  run() {
    if (this._dirtyLevel = 0, !this.active)
      return this.fn();
    let e = Ut, n = fn;
    try {
      return Ut = !0, fn = this, this._runnings++, Po(this), this.fn();
    } finally {
      Mo(this), this._runnings--, fn = n, Ut = e;
    }
  }
  stop() {
    this.active && (Po(this), Mo(this), this.onStop && this.onStop(), this.active = !1);
  }
}
function tc(t) {
  return t.value;
}
function Po(t) {
  t._trackId++, t._depsLength = 0;
}
function Mo(t) {
  if (t.deps.length > t._depsLength) {
    for (let e = t._depsLength; e < t.deps.length; e++)
      Pl(t.deps[e], t);
    t.deps.length = t._depsLength;
  }
}
function Pl(t, e) {
  const n = t.get(e);
  n !== void 0 && e._trackId !== n && (t.delete(e), t.size === 0 && t.cleanup());
}
let Ut = !0, Ki = 0;
const Ml = [];
function kt() {
  Ml.push(Ut), Ut = !1;
}
function At() {
  const t = Ml.pop();
  Ut = t === void 0 ? !0 : t;
}
function Rs() {
  Ki++;
}
function Is() {
  for (Ki--; !Ki && Xi.length; )
    Xi.shift()();
}
function kl(t, e, n) {
  var r;
  if (e.get(t) !== t._trackId) {
    e.set(t, t._trackId);
    const i = t.deps[t._depsLength];
    i !== e ? (i && Pl(i, t), t.deps[t._depsLength++] = e) : t._depsLength++, process.env.NODE_ENV !== "production" && ((r = t.onTrack) == null || r.call(t, de({ effect: t }, n)));
  }
}
const Xi = [];
function Al(t, e, n) {
  var r;
  Rs();
  for (const i of t.keys()) {
    let s;
    i._dirtyLevel < e && (s ?? (s = t.get(i) === i._trackId)) && (i._shouldSchedule || (i._shouldSchedule = i._dirtyLevel === 0), i._dirtyLevel = e), i._shouldSchedule && (s ?? (s = t.get(i) === i._trackId)) && (process.env.NODE_ENV !== "production" && ((r = i.onTrigger) == null || r.call(i, de({ effect: i }, n))), i.trigger(), (!i._runnings || i.allowRecurse) && i._dirtyLevel !== 2 && (i._shouldSchedule = !1, i.scheduler && Xi.push(i.scheduler)));
  }
  Is();
}
const Rl = (t, e) => {
  const n = /* @__PURE__ */ new Map();
  return n.cleanup = t, n.computed = e, n;
}, qi = /* @__PURE__ */ new WeakMap(), dn = Symbol(process.env.NODE_ENV !== "production" ? "iterate" : ""), Gi = Symbol(process.env.NODE_ENV !== "production" ? "Map key iterate" : "");
function Oe(t, e, n) {
  if (Ut && fn) {
    let r = qi.get(t);
    r || qi.set(t, r = /* @__PURE__ */ new Map());
    let i = r.get(n);
    i || r.set(n, i = Rl(() => r.delete(n))), kl(
      fn,
      i,
      process.env.NODE_ENV !== "production" ? {
        target: t,
        type: e,
        key: n
      } : void 0
    );
  }
}
function gt(t, e, n, r, i, s) {
  const o = qi.get(t);
  if (!o)
    return;
  let l = [];
  if (e === "clear")
    l = [...o.values()];
  else if (n === "length" && B(t)) {
    const a = Number(r);
    o.forEach((u, c) => {
      (c === "length" || !Kn(c) && c >= a) && l.push(u);
    });
  } else
    switch (n !== void 0 && l.push(o.get(n)), e) {
      case "add":
        B(t) ? Ps(n) && l.push(o.get("length")) : (l.push(o.get(dn)), An(t) && l.push(o.get(Gi)));
        break;
      case "delete":
        B(t) || (l.push(o.get(dn)), An(t) && l.push(o.get(Gi)));
        break;
      case "set":
        An(t) && l.push(o.get(dn));
        break;
    }
  Rs();
  for (const a of l)
    a && Al(
      a,
      4,
      process.env.NODE_ENV !== "production" ? {
        target: t,
        type: e,
        key: n,
        newValue: r,
        oldValue: i,
        oldTarget: s
      } : void 0
    );
  Is();
}
const nc = /* @__PURE__ */ Yn("__proto__,__v_isRef,__isVue"), Il = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((t) => t !== "arguments" && t !== "caller").map((t) => Symbol[t]).filter(Kn)
), ko = /* @__PURE__ */ rc();
function rc() {
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
      kt(), Rs();
      const r = Y(this)[e].apply(this, n);
      return Is(), At(), r;
    };
  }), t;
}
function ic(t) {
  Kn(t) || (t = String(t));
  const e = Y(this);
  return Oe(e, "has", t), e.hasOwnProperty(t);
}
class Fl {
  constructor(e = !1, n = !1) {
    this._isReadonly = e, this._isShallow = n;
  }
  get(e, n, r) {
    const i = this._isReadonly, s = this._isShallow;
    if (n === "__v_isReactive")
      return !i;
    if (n === "__v_isReadonly")
      return i;
    if (n === "__v_isShallow")
      return s;
    if (n === "__v_raw")
      return r === (i ? s ? Hl : Ul : s ? jl : Bl).get(e) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(e) === Object.getPrototypeOf(r) ? e : void 0;
    const o = B(e);
    if (!i) {
      if (o && q(ko, n))
        return Reflect.get(ko, n, r);
      if (n === "hasOwnProperty")
        return ic;
    }
    const l = Reflect.get(e, n, r);
    return (Kn(n) ? Il.has(n) : nc(n)) || (i || Oe(e, "get", n), s) ? l : Ne(l) ? o && Ps(n) ? l : l.value : le(l) ? i ? Wl(l) : $s(l) : l;
  }
}
class $l extends Fl {
  constructor(e = !1) {
    super(!1, e);
  }
  set(e, n, r, i) {
    let s = e[n];
    if (!this._isShallow) {
      const a = Vt(s);
      if (!St(r) && !Vt(r) && (s = Y(s), r = Y(r)), !B(e) && Ne(s) && !Ne(r))
        return a ? !1 : (s.value = r, !0);
    }
    const o = B(e) && Ps(n) ? Number(n) < e.length : q(e, n), l = Reflect.set(e, n, r, i);
    return e === Y(i) && (o ? Kt(r, s) && gt(e, "set", n, r, s) : gt(e, "add", n, r)), l;
  }
  deleteProperty(e, n) {
    const r = q(e, n), i = e[n], s = Reflect.deleteProperty(e, n);
    return s && r && gt(e, "delete", n, void 0, i), s;
  }
  has(e, n) {
    const r = Reflect.has(e, n);
    return (!Kn(n) || !Il.has(n)) && Oe(e, "has", n), r;
  }
  ownKeys(e) {
    return Oe(
      e,
      "iterate",
      B(e) ? "length" : dn
    ), Reflect.ownKeys(e);
  }
}
class Ll extends Fl {
  constructor(e = !1) {
    super(!0, e);
  }
  set(e, n) {
    return process.env.NODE_ENV !== "production" && Ct(
      `Set operation on key "${String(n)}" failed: target is readonly.`,
      e
    ), !0;
  }
  deleteProperty(e, n) {
    return process.env.NODE_ENV !== "production" && Ct(
      `Delete operation on key "${String(n)}" failed: target is readonly.`,
      e
    ), !0;
  }
}
const sc = /* @__PURE__ */ new $l(), oc = /* @__PURE__ */ new Ll(), lc = /* @__PURE__ */ new $l(
  !0
), ac = /* @__PURE__ */ new Ll(!0), Fs = (t) => t, gi = (t) => Reflect.getPrototypeOf(t);
function kr(t, e, n = !1, r = !1) {
  t = t.__v_raw;
  const i = Y(t), s = Y(e);
  n || (Kt(e, s) && Oe(i, "get", e), Oe(i, "get", s));
  const { has: o } = gi(i), l = r ? Fs : n ? Ls : hr;
  if (o.call(i, e))
    return l(t.get(e));
  if (o.call(i, s))
    return l(t.get(s));
  t !== i && t.get(e);
}
function Ar(t, e = !1) {
  const n = this.__v_raw, r = Y(n), i = Y(t);
  return e || (Kt(t, i) && Oe(r, "has", t), Oe(r, "has", i)), t === i ? n.has(t) : n.has(t) || n.has(i);
}
function Rr(t, e = !1) {
  return t = t.__v_raw, !e && Oe(Y(t), "iterate", dn), Reflect.get(t, "size", t);
}
function Ao(t, e = !1) {
  !e && !St(t) && !Vt(t) && (t = Y(t));
  const n = Y(this);
  return gi(n).has.call(n, t) || (n.add(t), gt(n, "add", t, t)), this;
}
function Ro(t, e, n = !1) {
  !n && !St(e) && !Vt(e) && (e = Y(e));
  const r = Y(this), { has: i, get: s } = gi(r);
  let o = i.call(r, t);
  o ? process.env.NODE_ENV !== "production" && zl(r, i, t) : (t = Y(t), o = i.call(r, t));
  const l = s.call(r, t);
  return r.set(t, e), o ? Kt(e, l) && gt(r, "set", t, e, l) : gt(r, "add", t, e), this;
}
function Io(t) {
  const e = Y(this), { has: n, get: r } = gi(e);
  let i = n.call(e, t);
  i ? process.env.NODE_ENV !== "production" && zl(e, n, t) : (t = Y(t), i = n.call(e, t));
  const s = r ? r.call(e, t) : void 0, o = e.delete(t);
  return i && gt(e, "delete", t, void 0, s), o;
}
function Fo() {
  const t = Y(this), e = t.size !== 0, n = process.env.NODE_ENV !== "production" ? An(t) ? new Map(t) : new Set(t) : void 0, r = t.clear();
  return e && gt(t, "clear", void 0, void 0, n), r;
}
function Ir(t, e) {
  return function(r, i) {
    const s = this, o = s.__v_raw, l = Y(o), a = e ? Fs : t ? Ls : hr;
    return !t && Oe(l, "iterate", dn), o.forEach((u, c) => r.call(i, a(u), a(c), s));
  };
}
function Fr(t, e, n) {
  return function(...r) {
    const i = this.__v_raw, s = Y(i), o = An(s), l = t === "entries" || t === Symbol.iterator && o, a = t === "keys" && o, u = i[t](...r), c = n ? Fs : e ? Ls : hr;
    return !e && Oe(
      s,
      "iterate",
      a ? Gi : dn
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
function It(t) {
  return function(...e) {
    if (process.env.NODE_ENV !== "production") {
      const n = e[0] ? `on key "${e[0]}" ` : "";
      Ct(
        `${pi(t)} operation ${n}failed: target is readonly.`,
        Y(this)
      );
    }
    return t === "delete" ? !1 : t === "clear" ? void 0 : this;
  };
}
function uc() {
  const t = {
    get(s) {
      return kr(this, s);
    },
    get size() {
      return Rr(this);
    },
    has: Ar,
    add: Ao,
    set: Ro,
    delete: Io,
    clear: Fo,
    forEach: Ir(!1, !1)
  }, e = {
    get(s) {
      return kr(this, s, !1, !0);
    },
    get size() {
      return Rr(this);
    },
    has: Ar,
    add(s) {
      return Ao.call(this, s, !0);
    },
    set(s, o) {
      return Ro.call(this, s, o, !0);
    },
    delete: Io,
    clear: Fo,
    forEach: Ir(!1, !0)
  }, n = {
    get(s) {
      return kr(this, s, !0);
    },
    get size() {
      return Rr(this, !0);
    },
    has(s) {
      return Ar.call(this, s, !0);
    },
    add: It("add"),
    set: It("set"),
    delete: It("delete"),
    clear: It("clear"),
    forEach: Ir(!0, !1)
  }, r = {
    get(s) {
      return kr(this, s, !0, !0);
    },
    get size() {
      return Rr(this, !0);
    },
    has(s) {
      return Ar.call(this, s, !0);
    },
    add: It("add"),
    set: It("set"),
    delete: It("delete"),
    clear: It("clear"),
    forEach: Ir(!0, !0)
  };
  return [
    "keys",
    "values",
    "entries",
    Symbol.iterator
  ].forEach((s) => {
    t[s] = Fr(s, !1, !1), n[s] = Fr(s, !0, !1), e[s] = Fr(s, !1, !0), r[s] = Fr(
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
  cc,
  fc,
  dc,
  hc
] = /* @__PURE__ */ uc();
function mi(t, e) {
  const n = e ? t ? hc : dc : t ? fc : cc;
  return (r, i, s) => i === "__v_isReactive" ? !t : i === "__v_isReadonly" ? t : i === "__v_raw" ? r : Reflect.get(
    q(n, i) && i in r ? n : r,
    i,
    s
  );
}
const pc = {
  get: /* @__PURE__ */ mi(!1, !1)
}, _c = {
  get: /* @__PURE__ */ mi(!1, !0)
}, gc = {
  get: /* @__PURE__ */ mi(!0, !1)
}, mc = {
  get: /* @__PURE__ */ mi(!0, !0)
};
function zl(t, e, n) {
  const r = Y(n);
  if (r !== n && e.call(t, r)) {
    const i = Vs(t);
    Ct(
      `Reactive ${i} contains both the raw and reactive versions of the same object${i === "Map" ? " as keys" : ""}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`
    );
  }
}
const Bl = /* @__PURE__ */ new WeakMap(), jl = /* @__PURE__ */ new WeakMap(), Ul = /* @__PURE__ */ new WeakMap(), Hl = /* @__PURE__ */ new WeakMap();
function vc(t) {
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
function yc(t) {
  return t.__v_skip || !Object.isExtensible(t) ? 0 : vc(Vs(t));
}
function $s(t) {
  return Vt(t) ? t : vi(
    t,
    !1,
    sc,
    pc,
    Bl
  );
}
function bc(t) {
  return vi(
    t,
    !1,
    lc,
    _c,
    jl
  );
}
function Wl(t) {
  return vi(
    t,
    !0,
    oc,
    gc,
    Ul
  );
}
function pt(t) {
  return vi(
    t,
    !0,
    ac,
    mc,
    Hl
  );
}
function vi(t, e, n, r, i) {
  if (!le(t))
    return process.env.NODE_ENV !== "production" && Ct(
      `value cannot be made ${e ? "readonly" : "reactive"}: ${String(
        t
      )}`
    ), t;
  if (t.__v_raw && !(e && t.__v_isReactive))
    return t;
  const s = i.get(t);
  if (s)
    return s;
  const o = yc(t);
  if (o === 0)
    return t;
  const l = new Proxy(
    t,
    o === 2 ? r : n
  );
  return i.set(t, l), l;
}
function Rn(t) {
  return Vt(t) ? Rn(t.__v_raw) : !!(t && t.__v_isReactive);
}
function Vt(t) {
  return !!(t && t.__v_isReadonly);
}
function St(t) {
  return !!(t && t.__v_isShallow);
}
function Qi(t) {
  return t ? !!t.__v_raw : !1;
}
function Y(t) {
  const e = t && t.__v_raw;
  return e ? Y(e) : t;
}
function xc(t) {
  return Object.isExtensible(t) && Jr(t, "__v_skip", !0), t;
}
const hr = (t) => le(t) ? $s(t) : t, Ls = (t) => le(t) ? Wl(t) : t, Ec = "Computed is still dirty after getter evaluation, likely because a computed is mutating its own dependency in its getter. State mutations in computed getters should be avoided.  Check the docs for more details: https://vuejs.org/guide/essentials/computed.html#getters-should-be-side-effect-free";
class Yl {
  constructor(e, n, r, i) {
    this.getter = e, this._setter = n, this.dep = void 0, this.__v_isRef = !0, this.__v_isReadonly = !1, this.effect = new As(
      () => e(this._value),
      () => zr(
        this,
        this.effect._dirtyLevel === 2 ? 2 : 3
      )
    ), this.effect.computed = this, this.effect.active = this._cacheable = !i, this.__v_isReadonly = r;
  }
  get value() {
    const e = Y(this);
    return (!e._cacheable || e.effect.dirty) && Kt(e._value, e._value = e.effect.run()) && zr(e, 4), Kl(e), e.effect._dirtyLevel >= 2 && (process.env.NODE_ENV !== "production" && this._warnRecursive && Ct(Ec, `

getter: `, this.getter), zr(e, 2)), e._value;
  }
  set value(e) {
    this._setter(e);
  }
  // #region polyfill _dirty for backward compatibility third party code for Vue <= 3.3.x
  get _dirty() {
    return this.effect.dirty;
  }
  set _dirty(e) {
    this.effect.dirty = e;
  }
  // #endregion
}
function Oc(t, e, n = !1) {
  let r, i;
  const s = U(t);
  s ? (r = t, i = process.env.NODE_ENV !== "production" ? () => {
    Ct("Write operation failed: computed value is readonly");
  } : pe) : (r = t.get, i = t.set);
  const o = new Yl(r, i, s || !i, n);
  return process.env.NODE_ENV !== "production" && e && !n && (o.effect.onTrack = e.onTrack, o.effect.onTrigger = e.onTrigger), o;
}
function Kl(t) {
  var e;
  Ut && fn && (t = Y(t), kl(
    fn,
    (e = t.dep) != null ? e : t.dep = Rl(
      () => t.dep = void 0,
      t instanceof Yl ? t : void 0
    ),
    process.env.NODE_ENV !== "production" ? {
      target: t,
      type: "get",
      key: "value"
    } : void 0
  ));
}
function zr(t, e = 4, n, r) {
  t = Y(t);
  const i = t.dep;
  i && Al(
    i,
    e,
    process.env.NODE_ENV !== "production" ? {
      target: t,
      type: "set",
      key: "value",
      newValue: n,
      oldValue: r
    } : void 0
  );
}
function Ne(t) {
  return !!(t && t.__v_isRef === !0);
}
function se(t) {
  return Nc(t, !1);
}
function Nc(t, e) {
  return Ne(t) ? t : new wc(t, e);
}
class wc {
  constructor(e, n) {
    this.__v_isShallow = n, this.dep = void 0, this.__v_isRef = !0, this._rawValue = n ? e : Y(e), this._value = n ? e : hr(e);
  }
  get value() {
    return Kl(this), this._value;
  }
  set value(e) {
    const n = this.__v_isShallow || St(e) || Vt(e);
    if (e = n ? e : Y(e), Kt(e, this._rawValue)) {
      const r = this._rawValue;
      this._rawValue = e, this._value = n ? e : hr(e), zr(this, 4, e, r);
    }
  }
}
function Xl(t) {
  return Ne(t) ? t.value : t;
}
const Tc = {
  get: (t, e, n) => Xl(Reflect.get(t, e, n)),
  set: (t, e, n, r) => {
    const i = t[e];
    return Ne(i) && !Ne(n) ? (i.value = n, !0) : Reflect.set(t, e, n, r);
  }
};
function ql(t) {
  return Rn(t) ? t : new Proxy(t, Tc);
}
/**
* @vue/runtime-core v3.4.37
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
const hn = [];
function Br(t) {
  hn.push(t);
}
function jr() {
  hn.pop();
}
let Pi = !1;
function R(t, ...e) {
  if (Pi) return;
  Pi = !0, kt();
  const n = hn.length ? hn[hn.length - 1].component : null, r = n && n.appContext.config.warnHandler, i = Sc();
  if (r)
    Dt(
      r,
      n,
      11,
      [
        // eslint-disable-next-line no-restricted-syntax
        t + e.map((s) => {
          var o, l;
          return (l = (o = s.toString) == null ? void 0 : o.call(s)) != null ? l : JSON.stringify(s);
        }).join(""),
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
`, ...Dc(i)), console.warn(...s);
  }
  At(), Pi = !1;
}
function Sc() {
  let t = hn[hn.length - 1];
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
function Dc(t) {
  const e = [];
  return t.forEach((n, r) => {
    e.push(...r === 0 ? [] : [`
`], ...Cc(n));
  }), e;
}
function Cc({ vnode: t, recurseCount: e }) {
  const n = e > 0 ? `... (${e} recursive calls)` : "", r = t.component ? t.component.parent == null : !1, i = ` at <${Ti(
    t.component,
    t.type,
    r
  )}`, s = ">" + n;
  return t.props ? [i, ...Vc(t.props), s] : [i + s];
}
function Vc(t) {
  const e = [], n = Object.keys(t);
  return n.slice(0, 3).forEach((r) => {
    e.push(...Gl(r, t[r]));
  }), n.length > 3 && e.push(" ..."), e;
}
function Gl(t, e, n) {
  return me(e) ? (e = JSON.stringify(e), n ? e : [`${t}=${e}`]) : typeof e == "number" || typeof e == "boolean" || e == null ? n ? e : [`${t}=${e}`] : Ne(e) ? (e = Gl(t, Y(e.value), !0), n ? e : [`${t}=Ref<`, e, ">"]) : U(e) ? [`${t}=fn${e.name ? `<${e.name}>` : ""}`] : (e = Y(e), n ? e : [`${t}=`, e]);
}
const zs = {
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
  14: "scheduler flush",
  15: "component update"
};
function Dt(t, e, n, r) {
  try {
    return r ? t(...r) : t();
  } catch (i) {
    wr(i, e, n);
  }
}
function at(t, e, n, r) {
  if (U(t)) {
    const i = Dt(t, e, n, r);
    return i && Cs(i) && i.catch((s) => {
      wr(s, e, n);
    }), i;
  }
  if (B(t)) {
    const i = [];
    for (let s = 0; s < t.length; s++)
      i.push(at(t[s], e, n, r));
    return i;
  } else process.env.NODE_ENV !== "production" && R(
    `Invalid value type passed to callWithAsyncErrorHandling(): ${typeof t}`
  );
}
function wr(t, e, n, r = !0) {
  const i = e ? e.vnode : null;
  if (e) {
    let s = e.parent;
    const o = e.proxy, l = process.env.NODE_ENV !== "production" ? zs[n] : `https://vuejs.org/error-reference/#runtime-${n}`;
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
      kt(), Dt(
        a,
        null,
        10,
        [t, o, l]
      ), At();
      return;
    }
  }
  Pc(t, n, i, r);
}
function Pc(t, e, n, r = !0) {
  if (process.env.NODE_ENV !== "production") {
    const i = zs[e];
    if (n && Br(n), R(`Unhandled error${i ? ` during execution of ${i}` : ""}`), n && jr(), r)
      throw t;
    console.error(t);
  } else
    console.error(t);
}
let pr = !1, Ji = !1;
const we = [];
let dt = 0;
const In = [];
let Ft = null, ln = 0;
const Ql = /* @__PURE__ */ Promise.resolve();
let Bs = null;
const Mc = 100;
function js(t) {
  const e = Bs || Ql;
  return t ? e.then(this ? t.bind(this) : t) : e;
}
function kc(t) {
  let e = dt + 1, n = we.length;
  for (; e < n; ) {
    const r = e + n >>> 1, i = we[r], s = _r(i);
    s < t || s === t && i.pre ? e = r + 1 : n = r;
  }
  return e;
}
function yi(t) {
  (!we.length || !we.includes(
    t,
    pr && t.allowRecurse ? dt + 1 : dt
  )) && (t.id == null ? we.push(t) : we.splice(kc(t.id), 0, t), Jl());
}
function Jl() {
  !pr && !Ji && (Ji = !0, Bs = Ql.then(ta));
}
function Ac(t) {
  const e = we.indexOf(t);
  e > dt && we.splice(e, 1);
}
function Zl(t) {
  B(t) ? In.push(...t) : (!Ft || !Ft.includes(
    t,
    t.allowRecurse ? ln + 1 : ln
  )) && In.push(t), Jl();
}
function $o(t, e, n = pr ? dt + 1 : 0) {
  for (process.env.NODE_ENV !== "production" && (e = e || /* @__PURE__ */ new Map()); n < we.length; n++) {
    const r = we[n];
    if (r && r.pre) {
      if (t && r.id !== t.uid || process.env.NODE_ENV !== "production" && Us(e, r))
        continue;
      we.splice(n, 1), n--, r();
    }
  }
}
function ea(t) {
  if (In.length) {
    const e = [...new Set(In)].sort(
      (n, r) => _r(n) - _r(r)
    );
    if (In.length = 0, Ft) {
      Ft.push(...e);
      return;
    }
    for (Ft = e, process.env.NODE_ENV !== "production" && (t = t || /* @__PURE__ */ new Map()), ln = 0; ln < Ft.length; ln++) {
      const n = Ft[ln];
      process.env.NODE_ENV !== "production" && Us(t, n) || n.active !== !1 && n();
    }
    Ft = null, ln = 0;
  }
}
const _r = (t) => t.id == null ? 1 / 0 : t.id, Rc = (t, e) => {
  const n = _r(t) - _r(e);
  if (n === 0) {
    if (t.pre && !e.pre) return -1;
    if (e.pre && !t.pre) return 1;
  }
  return n;
};
function ta(t) {
  Ji = !1, pr = !0, process.env.NODE_ENV !== "production" && (t = t || /* @__PURE__ */ new Map()), we.sort(Rc);
  const e = process.env.NODE_ENV !== "production" ? (n) => Us(t, n) : pe;
  try {
    for (dt = 0; dt < we.length; dt++) {
      const n = we[dt];
      if (n && n.active !== !1) {
        if (process.env.NODE_ENV !== "production" && e(n))
          continue;
        Dt(
          n,
          n.i,
          n.i ? 15 : 14
        );
      }
    }
  } finally {
    dt = 0, we.length = 0, ea(t), pr = !1, Bs = null, (we.length || In.length) && ta(t);
  }
}
function Us(t, e) {
  if (!t.has(e))
    t.set(e, 1);
  else {
    const n = t.get(e);
    if (n > Mc) {
      const r = e.i, i = r && ka(r.type);
      return wr(
        `Maximum recursive updates exceeded${i ? ` in component <${i}>` : ""}. This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function.`,
        null,
        10
      ), !0;
    } else
      t.set(e, n + 1);
  }
}
let pn = !1;
const Ur = /* @__PURE__ */ new Map();
process.env.NODE_ENV !== "production" && (Ms().__VUE_HMR_RUNTIME__ = {
  createRecord: Mi(na),
  rerender: Mi($c),
  reload: Mi(Lc)
});
const bn = /* @__PURE__ */ new Map();
function Ic(t) {
  const e = t.type.__hmrId;
  let n = bn.get(e);
  n || (na(e, t.type), n = bn.get(e)), n.instances.add(t);
}
function Fc(t) {
  bn.get(t.type.__hmrId).instances.delete(t);
}
function na(t, e) {
  return bn.has(t) ? !1 : (bn.set(t, {
    initialDef: Zr(e),
    instances: /* @__PURE__ */ new Set()
  }), !0);
}
function Zr(t) {
  return Aa(t) ? t.__vccOpts : t;
}
function $c(t, e) {
  const n = bn.get(t);
  n && (n.initialDef.render = e, [...n.instances].forEach((r) => {
    e && (r.render = e, Zr(r.type).render = e), r.renderCache = [], pn = !0, r.effect.dirty = !0, r.update(), pn = !1;
  }));
}
function Lc(t, e) {
  const n = bn.get(t);
  if (!n) return;
  e = Zr(e), Lo(n.initialDef, e);
  const r = [...n.instances];
  for (let i = 0; i < r.length; i++) {
    const s = r[i], o = Zr(s.type);
    let l = Ur.get(o);
    l || (o !== n.initialDef && Lo(o, e), Ur.set(o, l = /* @__PURE__ */ new Set())), l.add(s), s.appContext.propsCache.delete(s.type), s.appContext.emitsCache.delete(s.type), s.appContext.optionsCache.delete(s.type), s.ceReload ? (l.add(s), s.ceReload(e.styles), l.delete(s)) : s.parent ? (s.parent.effect.dirty = !0, yi(() => {
      s.parent.update(), l.delete(s);
    })) : s.appContext.reload ? s.appContext.reload() : typeof window < "u" ? window.location.reload() : console.warn(
      "[HMR] Root or manually mounted instance modified. Full reload required."
    );
  }
  Zl(() => {
    Ur.clear();
  });
}
function Lo(t, e) {
  de(t, e);
  for (const n in t)
    n !== "__file" && !(n in e) && delete t[n];
}
function Mi(t) {
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
let lt, nr = [], Zi = !1;
function Tr(t, ...e) {
  lt ? lt.emit(t, ...e) : Zi || nr.push({ event: t, args: e });
}
function Hs(t, e) {
  var n, r;
  lt = t, lt ? (lt.enabled = !0, nr.forEach(({ event: i, args: s }) => lt.emit(i, ...s)), nr = []) : /* handle late devtools injection - only do this if we are in an actual */ /* browser environment to avoid the timer handle stalling test runner exit */ /* (#4815) */ typeof window < "u" && // some envs mock window but not fully
  window.HTMLElement && // also exclude jsdom
  // eslint-disable-next-line no-restricted-syntax
  !((r = (n = window.navigator) == null ? void 0 : n.userAgent) != null && r.includes("jsdom")) ? ((e.__VUE_DEVTOOLS_HOOK_REPLAY__ = e.__VUE_DEVTOOLS_HOOK_REPLAY__ || []).push((s) => {
    Hs(s, e);
  }), setTimeout(() => {
    lt || (e.__VUE_DEVTOOLS_HOOK_REPLAY__ = null, Zi = !0, nr = []);
  }, 3e3)) : (Zi = !0, nr = []);
}
function zc(t, e) {
  Tr("app:init", t, e, {
    Fragment: We,
    Text: Sr,
    Comment: tt,
    Static: ar
  });
}
function Bc(t) {
  Tr("app:unmount", t);
}
const jc = /* @__PURE__ */ Ws(
  "component:added"
  /* COMPONENT_ADDED */
), ra = /* @__PURE__ */ Ws(
  "component:updated"
  /* COMPONENT_UPDATED */
), Uc = /* @__PURE__ */ Ws(
  "component:removed"
  /* COMPONENT_REMOVED */
), Hc = (t) => {
  lt && typeof lt.cleanupBuffer == "function" && // remove the component if it wasn't buffered
  !lt.cleanupBuffer(t) && Uc(t);
};
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function Ws(t) {
  return (e) => {
    Tr(
      t,
      e.appContext.app,
      e.uid,
      e.parent ? e.parent.uid : void 0,
      e
    );
  };
}
const Wc = /* @__PURE__ */ ia(
  "perf:start"
  /* PERFORMANCE_START */
), Yc = /* @__PURE__ */ ia(
  "perf:end"
  /* PERFORMANCE_END */
);
function ia(t) {
  return (e, n, r) => {
    Tr(t, e.appContext.app, e.uid, e, n, r);
  };
}
function Kc(t, e, n) {
  Tr(
    "component:emit",
    t.appContext.app,
    t,
    e,
    n
  );
}
let Ee = null, sa = null;
function ei(t) {
  const e = Ee;
  return Ee = t, sa = t && t.type.__scopeId || null, e;
}
function Xc(t, e = Ee, n) {
  if (!e || t._n)
    return t;
  const r = (...i) => {
    r._d && Go(-1);
    const s = ei(e);
    let o;
    try {
      o = t(...i);
    } finally {
      ei(s), r._d && Go(1);
    }
    return process.env.NODE_ENV !== "production" && ra(e), o;
  };
  return r._n = !0, r._c = !0, r._d = !0, r;
}
function oa(t) {
  ju(t) && R("Do not use built-in directive ids as custom directive id: " + t);
}
function en(t, e, n, r) {
  const i = t.dirs, s = e && e.dirs;
  for (let o = 0; o < i.length; o++) {
    const l = i[o];
    s && (l.oldValue = s[o].value);
    let a = l.dir[r];
    a && (kt(), at(a, n, 8, [
      t.el,
      l,
      t,
      e
    ]), At());
  }
}
function la(t, e) {
  t.shapeFlag & 6 && t.component ? la(t.component.subTree, e) : t.shapeFlag & 128 ? (t.ssContent.transition = e.clone(t.ssContent), t.ssFallback.transition = e.clone(t.ssFallback)) : t.transition = e;
}
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function Qt(t, e) {
  return U(t) ? (
    // #8326: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    de({ name: t.name }, e, { setup: t })
  ) : t;
}
const lr = (t) => !!t.type.__asyncLoader, Ys = (t) => t.type.__isKeepAlive;
function qc(t, e) {
  aa(t, "a", e);
}
function Gc(t, e) {
  aa(t, "da", e);
}
function aa(t, e, n = be) {
  const r = t.__wdc || (t.__wdc = () => {
    let i = n;
    for (; i; ) {
      if (i.isDeactivated)
        return;
      i = i.parent;
    }
    return t();
  });
  if (bi(e, r, n), n) {
    let i = n.parent;
    for (; i && i.parent; )
      Ys(i.parent.vnode) && Qc(r, e, n, i), i = i.parent;
  }
}
function Qc(t, e, n, r) {
  const i = bi(
    e,
    t,
    r,
    !0
    /* prepend */
  );
  Ks(() => {
    Ds(r[e], i);
  }, n);
}
function bi(t, e, n = be, r = !1) {
  if (n) {
    const i = n[t] || (n[t] = []), s = e.__weh || (e.__weh = (...o) => {
      kt();
      const l = Dr(n), a = at(e, n, t, o);
      return l(), At(), a;
    });
    return r ? i.unshift(s) : i.push(s), s;
  } else if (process.env.NODE_ENV !== "production") {
    const i = sn(zs[t].replace(/ hook$/, ""));
    R(
      `${i} is called when there is no active component instance to be associated with. Lifecycle injection APIs can only be used during execution of setup(). If you are using async setup(), make sure to register lifecycle hooks before the first await statement.`
    );
  }
}
const Rt = (t) => (e, n = be) => {
  (!wi || t === "sp") && bi(t, (...r) => e(...r), n);
}, ua = Rt("bm"), Xn = Rt("m"), Jc = Rt("bu"), Zc = Rt("u"), ef = Rt("bum"), Ks = Rt("um"), tf = Rt("sp"), nf = Rt(
  "rtg"
), rf = Rt(
  "rtc"
);
function sf(t, e = be) {
  bi("ec", t, e);
}
const of = Symbol.for("v-ndc");
function xi(t, e, n = {}, r, i) {
  if (Ee.isCE || Ee.parent && lr(Ee.parent) && Ee.parent.isCE)
    return mt("slot", n, r);
  let s = t[e];
  process.env.NODE_ENV !== "production" && s && s.length > 1 && (R(
    "SSR-optimized slot function detected in a non-SSR-optimized render function. You need to mark this component with $dynamic-slots in the parent template."
  ), s = () => []), s && s._c && (s._d = !1), Jt();
  const o = s && ca(s(n)), l = Jf(
    We,
    {
      key: (n.key || // slot content array of a dynamic conditional slot may have a branch
      // key attached in the `createSlots` helper, respect that
      o && o.key || `_${e}`) + // #7256 force differentiate fallback content from actual content
      (!o && r ? "_fb" : "")
    },
    o || [],
    o && t._ === 1 ? 64 : -2
  );
  return l.scopeId && (l.slotScopeIds = [l.scopeId + "-s"]), s && s._c && (s._d = !0), l;
}
function ca(t) {
  return t.some((e) => Oi(e) ? !(e.type === tt || e.type === We && !ca(e.children)) : !0) ? t : null;
}
const es = (t) => t ? Pa(t) ? to(t) : es(t.parent) : null, _n = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ de(/* @__PURE__ */ Object.create(null), {
    $: (t) => t,
    $el: (t) => t.vnode.el,
    $data: (t) => t.data,
    $props: (t) => process.env.NODE_ENV !== "production" ? pt(t.props) : t.props,
    $attrs: (t) => process.env.NODE_ENV !== "production" ? pt(t.attrs) : t.attrs,
    $slots: (t) => process.env.NODE_ENV !== "production" ? pt(t.slots) : t.slots,
    $refs: (t) => process.env.NODE_ENV !== "production" ? pt(t.refs) : t.refs,
    $parent: (t) => es(t.parent),
    $root: (t) => es(t.root),
    $emit: (t) => t.emit,
    $options: (t) => qs(t),
    $forceUpdate: (t) => t.f || (t.f = () => {
      t.effect.dirty = !0, yi(t.update);
    }),
    $nextTick: (t) => t.n || (t.n = js.bind(t.proxy)),
    $watch: (t) => jf.bind(t)
  })
), Xs = (t) => t === "_" || t === "$", ki = (t, e) => t !== ie && !t.__isScriptSetup && q(t, e), fa = {
  get({ _: t }, e) {
    if (e === "__v_skip")
      return !0;
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
        if (ki(r, e))
          return o[e] = 1, r[e];
        if (i !== ie && q(i, e))
          return o[e] = 2, i[e];
        if (
          // only cache other properties when instance has declared (thus stable)
          // props
          (u = t.propsOptions[0]) && q(u, e)
        )
          return o[e] = 3, s[e];
        if (n !== ie && q(n, e))
          return o[e] = 4, n[e];
        ts && (o[e] = 0);
      }
    }
    const c = _n[e];
    let f, d;
    if (c)
      return e === "$attrs" ? (Oe(t.attrs, "get", ""), process.env.NODE_ENV !== "production" && ri()) : process.env.NODE_ENV !== "production" && e === "$slots" && Oe(t, "get", e), c(t);
    if (
      // css module (injected by vue-loader)
      (f = l.__cssModules) && (f = f[e])
    )
      return f;
    if (n !== ie && q(n, e))
      return o[e] = 4, n[e];
    if (
      // global properties
      d = a.config.globalProperties, q(d, e)
    )
      return d[e];
    process.env.NODE_ENV !== "production" && Ee && (!me(e) || // #1091 avoid internal isRef/isVNode checks on component instance leading
    // to infinite warning loop
    e.indexOf("__v") !== 0) && (i !== ie && Xs(e[0]) && q(i, e) ? R(
      `Property ${JSON.stringify(
        e
      )} must be accessed via $data because it starts with a reserved character ("$" or "_") and is not proxied on the render context.`
    ) : t === Ee && R(
      `Property ${JSON.stringify(e)} was accessed during render but is not defined on instance.`
    ));
  },
  set({ _: t }, e, n) {
    const { data: r, setupState: i, ctx: s } = t;
    return ki(i, e) ? (i[e] = n, !0) : process.env.NODE_ENV !== "production" && i.__isScriptSetup && q(i, e) ? (R(`Cannot mutate <script setup> binding "${e}" from Options API.`), !1) : r !== ie && q(r, e) ? (r[e] = n, !0) : q(t.props, e) ? (process.env.NODE_ENV !== "production" && R(`Attempting to mutate prop "${e}". Props are readonly.`), !1) : e[0] === "$" && e.slice(1) in t ? (process.env.NODE_ENV !== "production" && R(
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
    return !!n[o] || t !== ie && q(t, o) || ki(e, o) || (l = s[0]) && q(l, o) || q(r, o) || q(_n, o) || q(i.config.globalProperties, o);
  },
  defineProperty(t, e, n) {
    return n.get != null ? t._.accessCache[e] = 0 : q(n, "value") && this.set(t, e, n.value, null), Reflect.defineProperty(t, e, n);
  }
};
process.env.NODE_ENV !== "production" && (fa.ownKeys = (t) => (R(
  "Avoid app logic that relies on enumerating keys on a component instance. The keys will be empty in production mode to avoid performance overhead."
), Reflect.ownKeys(t)));
function lf(t) {
  const e = {};
  return Object.defineProperty(e, "_", {
    configurable: !0,
    enumerable: !1,
    get: () => t
  }), Object.keys(_n).forEach((n) => {
    Object.defineProperty(e, n, {
      configurable: !0,
      enumerable: !1,
      get: () => _n[n](t),
      // intercepted by the proxy so no need for implementation,
      // but needed to prevent set errors
      set: pe
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
      set: pe
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
        set: pe
      });
    }
  });
}
function zo(t) {
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
let ts = !0;
function ff(t) {
  const e = qs(t), n = t.proxy, r = t.ctx;
  ts = !1, e.beforeCreate && Bo(e.beforeCreate, t, "bc");
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
    updated: m,
    activated: h,
    deactivated: v,
    beforeDestroy: x,
    beforeUnmount: E,
    destroyed: O,
    unmounted: w,
    render: y,
    renderTracked: P,
    renderTriggered: N,
    errorCaptured: k,
    serverPrefetch: D,
    // public API
    expose: W,
    inheritAttrs: J,
    // assets
    components: K,
    directives: Z,
    filters: _e
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
    if (process.env.NODE_ENV !== "production" && Cs(z) && R(
      "data() returned a Promise - note data() cannot be async; If you intend to perform data fetching before component renders, use async setup() + <Suspense>."
    ), !le(z))
      process.env.NODE_ENV !== "production" && R("data() should return an object.");
    else if (t.data = $s(z), process.env.NODE_ENV !== "production")
      for (const j in z)
        te("Data", j), Xs(j[0]) || Object.defineProperty(r, j, {
          configurable: !0,
          enumerable: !0,
          get: () => z[j],
          set: pe
        });
  }
  if (ts = !0, s)
    for (const z in s) {
      const j = s[z], Ce = U(j) ? j.bind(n, n) : U(j.get) ? j.get.bind(n, n) : pe;
      process.env.NODE_ENV !== "production" && Ce === pe && R(`Computed property "${z}" has no getter.`);
      const bt = !U(j) && U(j.set) ? j.set.bind(n) : process.env.NODE_ENV !== "production" ? () => {
        R(
          `Write operation failed: computed property "${z}" is readonly.`
        );
      } : pe, rt = Ue({
        get: Ce,
        set: bt
      });
      Object.defineProperty(r, z, {
        enumerable: !0,
        configurable: !0,
        get: () => rt.value,
        set: (ke) => rt.value = ke
      }), process.env.NODE_ENV !== "production" && te("Computed", z);
    }
  if (l)
    for (const z in l)
      da(l[z], r, n, z);
  if (a) {
    const z = U(a) ? a.call(n) : a;
    Reflect.ownKeys(z).forEach((j) => {
      vf(j, z[j]);
    });
  }
  c && Bo(c, t, "c");
  function G(z, j) {
    B(j) ? j.forEach((Ce) => z(Ce.bind(n))) : j && z(j.bind(n));
  }
  if (G(ua, f), G(Xn, d), G(Jc, _), G(Zc, m), G(qc, h), G(Gc, v), G(sf, k), G(rf, P), G(nf, N), G(ef, E), G(Ks, w), G(tf, D), B(W))
    if (W.length) {
      const z = t.exposed || (t.exposed = {});
      W.forEach((j) => {
        Object.defineProperty(z, j, {
          get: () => n[j],
          set: (Ce) => n[j] = Ce
        });
      });
    } else t.exposed || (t.exposed = {});
  y && t.render === pe && (t.render = y), J != null && (t.inheritAttrs = J), K && (t.components = K), Z && (t.directives = Z);
}
function df(t, e, n = pe) {
  B(t) && (t = ns(t));
  for (const r in t) {
    const i = t[r];
    let s;
    le(i) ? "default" in i ? s = Hr(
      i.from || r,
      i.default,
      !0
    ) : s = Hr(i.from || r) : s = Hr(i), Ne(s) ? Object.defineProperty(e, r, {
      enumerable: !0,
      configurable: !0,
      get: () => s.value,
      set: (o) => s.value = o
    }) : e[r] = s, process.env.NODE_ENV !== "production" && n("Inject", r);
  }
}
function Bo(t, e, n) {
  at(
    B(t) ? t.map((r) => r.bind(e.proxy)) : t.bind(e.proxy),
    e,
    n
  );
}
function da(t, e, n, r) {
  const i = r.includes(".") ? Na(n, r) : () => n[r];
  if (me(t)) {
    const s = e[t];
    U(s) ? Ht(i, s) : process.env.NODE_ENV !== "production" && R(`Invalid watch handler specified by key "${t}"`, s);
  } else if (U(t))
    Ht(i, t.bind(n));
  else if (le(t))
    if (B(t))
      t.forEach((s) => da(s, e, n, r));
    else {
      const s = U(t.handler) ? t.handler.bind(n) : e[t.handler];
      U(s) ? Ht(i, s, t) : process.env.NODE_ENV !== "production" && R(`Invalid watch handler specified by key "${t.handler}"`, s);
    }
  else process.env.NODE_ENV !== "production" && R(`Invalid watch option: "${r}"`, t);
}
function qs(t) {
  const e = t.type, { mixins: n, extends: r } = e, {
    mixins: i,
    optionsCache: s,
    config: { optionMergeStrategies: o }
  } = t.appContext, l = s.get(e);
  let a;
  return l ? a = l : !i.length && !n && !r ? a = e : (a = {}, i.length && i.forEach(
    (u) => ti(a, u, o, !0)
  ), ti(a, e, o)), le(e) && s.set(e, a), a;
}
function ti(t, e, n, r = !1) {
  const { mixins: i, extends: s } = e;
  s && ti(t, s, n, !0), i && i.forEach(
    (o) => ti(t, o, n, !0)
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
  data: jo,
  props: Uo,
  emits: Uo,
  // objects
  methods: rr,
  computed: rr,
  // lifecycle
  beforeCreate: Pe,
  created: Pe,
  beforeMount: Pe,
  mounted: Pe,
  beforeUpdate: Pe,
  updated: Pe,
  beforeDestroy: Pe,
  beforeUnmount: Pe,
  destroyed: Pe,
  unmounted: Pe,
  activated: Pe,
  deactivated: Pe,
  errorCaptured: Pe,
  serverPrefetch: Pe,
  // assets
  components: rr,
  directives: rr,
  // watch
  watch: _f,
  // provide / inject
  provide: jo,
  inject: pf
};
function jo(t, e) {
  return e ? t ? function() {
    return de(
      U(t) ? t.call(this, this) : t,
      U(e) ? e.call(this, this) : e
    );
  } : e : t;
}
function pf(t, e) {
  return rr(ns(t), ns(e));
}
function ns(t) {
  if (B(t)) {
    const e = {};
    for (let n = 0; n < t.length; n++)
      e[t[n]] = t[n];
    return e;
  }
  return t;
}
function Pe(t, e) {
  return t ? [...new Set([].concat(t, e))] : e;
}
function rr(t, e) {
  return t ? de(/* @__PURE__ */ Object.create(null), t, e) : e;
}
function Uo(t, e) {
  return t ? B(t) && B(e) ? [.../* @__PURE__ */ new Set([...t, ...e])] : de(
    /* @__PURE__ */ Object.create(null),
    zo(t),
    zo(e ?? {})
  ) : e;
}
function _f(t, e) {
  if (!t) return e;
  if (!e) return t;
  const n = de(/* @__PURE__ */ Object.create(null), t);
  for (const r in e)
    n[r] = Pe(t[r], e[r]);
  return n;
}
function ha() {
  return {
    app: null,
    config: {
      isNativeTag: Fu,
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
let gf = 0;
function mf(t, e) {
  return function(r, i = null) {
    U(r) || (r = de({}, r)), i != null && !le(i) && (process.env.NODE_ENV !== "production" && R("root props passed to app.mount() must be an object."), i = null);
    const s = ha(), o = /* @__PURE__ */ new WeakSet();
    let l = !1;
    const a = s.app = {
      _uid: gf++,
      _component: r,
      _props: i,
      _container: null,
      _context: s,
      _instance: null,
      version: el,
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
        return process.env.NODE_ENV !== "production" && as(u, s.config), c ? (process.env.NODE_ENV !== "production" && s.components[u] && R(`Component "${u}" has already been registered in target app.`), s.components[u] = c, a) : s.components[u];
      },
      directive(u, c) {
        return process.env.NODE_ENV !== "production" && oa(u), c ? (process.env.NODE_ENV !== "production" && s.directives[u] && R(`Directive "${u}" has already been registered in target app.`), s.directives[u] = c, a) : s.directives[u];
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
          const d = mt(r, i);
          return d.appContext = s, f === !0 ? f = "svg" : f === !1 && (f = void 0), process.env.NODE_ENV !== "production" && (s.reload = () => {
            t(
              Xt(d),
              u,
              f
            );
          }), c && e ? e(d, u) : t(d, u, f), l = !0, a._container = u, u.__vue_app__ = a, process.env.NODE_ENV !== "production" && (a._instance = d.component, zc(a, el)), to(d.component);
        }
      },
      unmount() {
        l ? (t(null, a._container), process.env.NODE_ENV !== "production" && (a._instance = null, Bc(a)), delete a._container.__vue_app__) : process.env.NODE_ENV !== "production" && R("Cannot unmount an app that is not mounted.");
      },
      provide(u, c) {
        return process.env.NODE_ENV !== "production" && u in s.provides && R(
          `App already provides property with key "${String(u)}". It will be overwritten with the new value.`
        ), s.provides[u] = c, a;
      },
      runWithContext(u) {
        const c = Fn;
        Fn = a;
        try {
          return u();
        } finally {
          Fn = c;
        }
      }
    };
    return a;
  };
}
let Fn = null;
function vf(t, e) {
  if (!be)
    process.env.NODE_ENV !== "production" && R("provide() can only be used inside setup().");
  else {
    let n = be.provides;
    const r = be.parent && be.parent.provides;
    r === n && (n = be.provides = Object.create(r)), n[t] = e;
  }
}
function Hr(t, e, n = !1) {
  const r = be || Ee;
  if (r || Fn) {
    const i = Fn ? Fn._context.provides : r ? r.parent == null ? r.vnode.appContext && r.vnode.appContext.provides : r.parent.provides : void 0;
    if (i && t in i)
      return i[t];
    if (arguments.length > 1)
      return n && U(e) ? e.call(r && r.proxy) : e;
    process.env.NODE_ENV !== "production" && R(`injection "${String(t)}" not found.`);
  } else process.env.NODE_ENV !== "production" && R("inject() can only be used inside setup() or functional components.");
}
const pa = {}, _a = () => Object.create(pa), ga = (t) => Object.getPrototypeOf(t) === pa;
function yf(t, e, n, r = !1) {
  const i = {}, s = _a();
  t.propsDefaults = /* @__PURE__ */ Object.create(null), ma(t, e, i, s);
  for (const o in t.propsOptions[0])
    o in i || (i[o] = void 0);
  process.env.NODE_ENV !== "production" && ya(e || {}, i, t), n ? t.props = r ? i : bc(i) : t.type.props ? t.props = i : t.props = s, t.attrs = s;
}
function bf(t) {
  for (; t; ) {
    if (t.type.__hmrId) return !0;
    t = t.parent;
  }
}
function xf(t, e, n, r) {
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
    !(process.env.NODE_ENV !== "production" && bf(t)) && (r || o > 0) && !(o & 16)
  ) {
    if (o & 8) {
      const c = t.vnode.dynamicProps;
      for (let f = 0; f < c.length; f++) {
        let d = c[f];
        if (Ei(t.emitsOptions, d))
          continue;
        const _ = e[d];
        if (a)
          if (q(s, d))
            _ !== s[d] && (s[d] = _, u = !0);
          else {
            const m = et(d);
            i[m] = rs(
              a,
              l,
              m,
              _,
              t,
              !1
            );
          }
        else
          _ !== s[d] && (s[d] = _, u = !0);
      }
    }
  } else {
    ma(t, e, i, s) && (u = !0);
    let c;
    for (const f in l)
      (!e || // for camelCase
      !q(e, f) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((c = Re(f)) === f || !q(e, c))) && (a ? n && // for camelCase
      (n[f] !== void 0 || // for kebab-case
      n[c] !== void 0) && (i[f] = rs(
        a,
        l,
        f,
        void 0,
        t,
        !0
      )) : delete i[f]);
    if (s !== l)
      for (const f in s)
        (!e || !q(e, f)) && (delete s[f], u = !0);
  }
  u && gt(t.attrs, "set", ""), process.env.NODE_ENV !== "production" && ya(e || {}, i, t);
}
function ma(t, e, n, r) {
  const [i, s] = t.propsOptions;
  let o = !1, l;
  if (e)
    for (let a in e) {
      if (or(a))
        continue;
      const u = e[a];
      let c;
      i && q(i, c = et(a)) ? !s || !s.includes(c) ? n[c] = u : (l || (l = {}))[c] = u : Ei(t.emitsOptions, a) || (!(a in r) || u !== r[a]) && (r[a] = u, o = !0);
    }
  if (s) {
    const a = Y(n), u = l || ie;
    for (let c = 0; c < s.length; c++) {
      const f = s[c];
      n[f] = rs(
        i,
        a,
        f,
        u[f],
        t,
        !q(u, f)
      );
    }
  }
  return o;
}
function rs(t, e, n, r, i, s) {
  const o = t[n];
  if (o != null) {
    const l = q(o, "default");
    if (l && r === void 0) {
      const a = o.default;
      if (o.type !== Function && !o.skipFactory && U(a)) {
        const { propsDefaults: u } = i;
        if (n in u)
          r = u[n];
        else {
          const c = Dr(i);
          r = u[n] = a.call(
            null,
            e
          ), c();
        }
      } else
        r = a;
    }
    o[
      0
      /* shouldCast */
    ] && (s && !l ? r = !1 : o[
      1
      /* shouldCastTrue */
    ] && (r === "" || r === Re(n)) && (r = !0));
  }
  return r;
}
const Ef = /* @__PURE__ */ new WeakMap();
function va(t, e, n = !1) {
  const r = n ? Ef : e.propsCache, i = r.get(t);
  if (i)
    return i;
  const s = t.props, o = {}, l = [];
  let a = !1;
  if (!U(t)) {
    const c = (f) => {
      a = !0;
      const [d, _] = va(f, e, !0);
      de(o, d), _ && l.push(..._);
    };
    !n && e.mixins.length && e.mixins.forEach(c), t.extends && c(t.extends), t.mixins && t.mixins.forEach(c);
  }
  if (!s && !a)
    return le(t) && r.set(t, kn), kn;
  if (B(s))
    for (let c = 0; c < s.length; c++) {
      process.env.NODE_ENV !== "production" && !me(s[c]) && R("props must be strings when using array syntax.", s[c]);
      const f = et(s[c]);
      Ho(f) && (o[f] = ie);
    }
  else if (s) {
    process.env.NODE_ENV !== "production" && !le(s) && R("invalid props options", s);
    for (const c in s) {
      const f = et(c);
      if (Ho(f)) {
        const d = s[c], _ = o[f] = B(d) || U(d) ? { type: d } : de({}, d), m = _.type;
        let h = !1, v = !0;
        if (B(m))
          for (let x = 0; x < m.length; ++x) {
            const E = m[x], O = U(E) && E.name;
            if (O === "Boolean") {
              h = !0;
              break;
            } else O === "String" && (v = !1);
          }
        else
          h = U(m) && m.name === "Boolean";
        _[
          0
          /* shouldCast */
        ] = h, _[
          1
          /* shouldCastTrue */
        ] = v, (h || q(_, "default")) && l.push(f);
      }
    }
  }
  const u = [o, l];
  return le(t) && r.set(t, u), u;
}
function Ho(t) {
  return t[0] !== "$" && !or(t) ? !0 : (process.env.NODE_ENV !== "production" && R(`Invalid prop name: "${t}" is a reserved property.`), !1);
}
function Of(t) {
  return t === null ? "null" : typeof t == "function" ? t.name || "" : typeof t == "object" && t.constructor && t.constructor.name || "";
}
function ya(t, e, n) {
  const r = Y(e), i = n.propsOptions[0];
  for (const s in i) {
    let o = i[s];
    o != null && Nf(
      s,
      r[s],
      o,
      process.env.NODE_ENV !== "production" ? pt(r) : r,
      !q(t, s) && !q(t, Re(s))
    );
  }
}
function Nf(t, e, n, r, i) {
  const { type: s, required: o, validator: l, skipCheck: a } = n;
  if (o && i) {
    R('Missing required prop: "' + t + '"');
    return;
  }
  if (!(e == null && !o)) {
    if (s != null && s !== !0 && !a) {
      let u = !1;
      const c = B(s) ? s : [s], f = [];
      for (let d = 0; d < c.length && !u; d++) {
        const { valid: _, expectedType: m } = Tf(e, c[d]);
        f.push(m || ""), u = _;
      }
      if (!u) {
        R(Sf(t, e, f));
        return;
      }
    }
    l && !l(e, r) && R('Invalid prop: custom validator check failed for prop "' + t + '".');
  }
}
const wf = /* @__PURE__ */ Yn(
  "String,Number,Boolean,Function,Symbol,BigInt"
);
function Tf(t, e) {
  let n;
  const r = Of(e);
  if (wf(r)) {
    const i = typeof t;
    n = i === r.toLowerCase(), !n && i === "object" && (n = t instanceof e);
  } else r === "Object" ? n = le(t) : r === "Array" ? n = B(t) : r === "null" ? n = t === null : n = t instanceof e;
  return {
    valid: n,
    expectedType: r
  };
}
function Sf(t, e, n) {
  if (n.length === 0)
    return `Prop type [] for prop "${t}" won't match anything. Did you mean to use type Array instead?`;
  let r = `Invalid prop: type check failed for prop "${t}". Expected ${n.map(pi).join(" | ")}`;
  const i = n[0], s = Vs(e), o = Wo(e, i), l = Wo(e, s);
  return n.length === 1 && Yo(i) && !Df(i, s) && (r += ` with value ${o}`), r += `, got ${s} `, Yo(s) && (r += `with value ${l}.`), r;
}
function Wo(t, e) {
  return e === "String" ? `"${t}"` : e === "Number" ? `${Number(t)}` : `${t}`;
}
function Yo(t) {
  return ["string", "number", "boolean"].some((n) => t.toLowerCase() === n);
}
function Df(...t) {
  return t.some((e) => e.toLowerCase() === "boolean");
}
const ba = (t) => t[0] === "_" || t === "$stable", Gs = (t) => B(t) ? t.map(ot) : [ot(t)], Cf = (t, e, n) => {
  if (e._n)
    return e;
  const r = Xc((...i) => (process.env.NODE_ENV !== "production" && be && (!n || n.root === be.root) && R(
    `Slot "${t}" invoked outside of the render function: this will not track dependencies used in the slot. Invoke the slot function inside the render function instead.`
  ), Gs(e(...i))), n);
  return r._c = !1, r;
}, xa = (t, e, n) => {
  const r = t._ctx;
  for (const i in t) {
    if (ba(i)) continue;
    const s = t[i];
    if (U(s))
      e[i] = Cf(i, s, r);
    else if (s != null) {
      process.env.NODE_ENV !== "production" && R(
        `Non-function value encountered for slot "${i}". Prefer function slots for better performance.`
      );
      const o = Gs(s);
      e[i] = () => o;
    }
  }
}, Ea = (t, e) => {
  process.env.NODE_ENV !== "production" && !Ys(t.vnode) && R(
    "Non-function value encountered for default slot. Prefer function slots for better performance."
  );
  const n = Gs(e);
  t.slots.default = () => n;
}, is = (t, e, n) => {
  for (const r in e)
    (n || r !== "_") && (t[r] = e[r]);
}, Vf = (t, e, n) => {
  const r = t.slots = _a();
  if (t.vnode.shapeFlag & 32) {
    const i = e._;
    i ? (is(r, e, n), n && Jr(r, "_", i, !0)) : xa(e, r);
  } else e && Ea(t, e);
}, Pf = (t, e, n) => {
  const { vnode: r, slots: i } = t;
  let s = !0, o = ie;
  if (r.shapeFlag & 32) {
    const l = e._;
    l ? process.env.NODE_ENV !== "production" && pn ? (is(i, e, n), gt(t, "set", "$slots")) : n && l === 1 ? s = !1 : is(i, e, n) : (s = !e.$stable, xa(e, i)), o = e;
  } else e && (Ea(t, e), o = { default: 1 });
  if (s)
    for (const l in i)
      !ba(l) && o[l] == null && delete i[l];
};
function ss(t, e, n, r, i = !1) {
  if (B(t)) {
    t.forEach(
      (d, _) => ss(
        d,
        e && (B(e) ? e[_] : e),
        n,
        r,
        i
      )
    );
    return;
  }
  if (lr(r) && !i)
    return;
  const s = r.shapeFlag & 4 ? to(r.component) : r.el, o = i ? null : s, { i: l, r: a } = t;
  if (process.env.NODE_ENV !== "production" && !l) {
    R(
      "Missing ref owner context. ref cannot be used on hoisted vnodes. A vnode with ref must be created inside the render function."
    );
    return;
  }
  const u = e && e.r, c = l.refs === ie ? l.refs = {} : l.refs, f = l.setupState;
  if (u != null && u !== a && (me(u) ? (c[u] = null, q(f, u) && (f[u] = null)) : Ne(u) && (u.value = null)), U(a))
    Dt(a, l, 12, [o, c]);
  else {
    const d = me(a), _ = Ne(a);
    if (d || _) {
      const m = () => {
        if (t.f) {
          const h = d ? q(f, a) ? f[a] : c[a] : a.value;
          i ? B(h) && Ds(h, s) : B(h) ? h.includes(s) || h.push(s) : d ? (c[a] = [s], q(f, a) && (f[a] = c[a])) : (a.value = [s], t.k && (c[t.k] = a.value));
        } else d ? (c[a] = o, q(f, a) && (f[a] = o)) : _ ? (a.value = o, t.k && (c[t.k] = o)) : process.env.NODE_ENV !== "production" && R("Invalid template ref type:", a, `(${typeof a})`);
      };
      o ? (m.id = -1, Ae(m, n)) : m();
    } else process.env.NODE_ENV !== "production" && R("Invalid template ref type:", a, `(${typeof a})`);
  }
}
const Mf = Symbol("_vte"), kf = (t) => t.__isTeleport;
let Zn, Lt;
function Et(t, e) {
  t.appContext.config.performance && ni() && Lt.mark(`vue-${e}-${t.uid}`), process.env.NODE_ENV !== "production" && Wc(t, e, ni() ? Lt.now() : Date.now());
}
function Ot(t, e) {
  if (t.appContext.config.performance && ni()) {
    const n = `vue-${e}-${t.uid}`, r = n + ":end";
    Lt.mark(r), Lt.measure(
      `<${Ti(t, t.type)}> ${e}`,
      n,
      r
    ), Lt.clearMarks(n), Lt.clearMarks(r);
  }
  process.env.NODE_ENV !== "production" && Yc(t, e, ni() ? Lt.now() : Date.now());
}
function ni() {
  return Zn !== void 0 || (typeof window < "u" && window.performance ? (Zn = !0, Lt = window.performance) : Zn = !1), Zn;
}
function Af() {
  const t = [];
  if (process.env.NODE_ENV !== "production" && t.length) {
    const e = t.length > 1;
    console.warn(
      `Feature flag${e ? "s" : ""} ${t.join(", ")} ${e ? "are" : "is"} not explicitly defined. You are running the esm-bundler build of Vue, which expects these compile-time feature flags to be globally injected via the bundler config in order to get better tree-shaking in the production bundle.

For more details, see https://link.vuejs.org/feature-flags.`
    );
  }
}
const Ae = Gf;
function Rf(t) {
  return If(t);
}
function If(t, e) {
  Af();
  const n = Ms();
  n.__VUE__ = !0, process.env.NODE_ENV !== "production" && Hs(n.__VUE_DEVTOOLS_GLOBAL_HOOK__, n);
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
    setScopeId: _ = pe,
    insertStaticContent: m
  } = t, h = (p, g, b, C = null, T = null, V = null, I = void 0, M = null, A = process.env.NODE_ENV !== "production" && pn ? !1 : !!g.dynamicChildren) => {
    if (p === g)
      return;
    p && !er(p, g) && (C = Mr(p), it(p, T, V, !0), p = null), g.patchFlag === -2 && (A = !1, g.dynamicChildren = null);
    const { type: S, ref: F, shapeFlag: L } = g;
    switch (S) {
      case Sr:
        v(p, g, b, C);
        break;
      case tt:
        x(p, g, b, C);
        break;
      case ar:
        p == null ? E(g, b, C, I) : process.env.NODE_ENV !== "production" && O(p, g, b, I);
        break;
      case We:
        Z(
          p,
          g,
          b,
          C,
          T,
          V,
          I,
          M,
          A
        );
        break;
      default:
        L & 1 ? P(
          p,
          g,
          b,
          C,
          T,
          V,
          I,
          M,
          A
        ) : L & 6 ? _e(
          p,
          g,
          b,
          C,
          T,
          V,
          I,
          M,
          A
        ) : L & 64 || L & 128 ? S.process(
          p,
          g,
          b,
          C,
          T,
          V,
          I,
          M,
          A,
          Gn
        ) : process.env.NODE_ENV !== "production" && R("Invalid VNode type:", S, `(${typeof S})`);
    }
    F != null && T && ss(F, p && p.ref, V, g || p, !g);
  }, v = (p, g, b, C) => {
    if (p == null)
      r(
        g.el = l(g.children),
        b,
        C
      );
    else {
      const T = g.el = p.el;
      g.children !== p.children && u(T, g.children);
    }
  }, x = (p, g, b, C) => {
    p == null ? r(
      g.el = a(g.children || ""),
      b,
      C
    ) : g.el = p.el;
  }, E = (p, g, b, C) => {
    [p.el, p.anchor] = m(
      p.children,
      g,
      b,
      C,
      p.el,
      p.anchor
    );
  }, O = (p, g, b, C) => {
    if (g.children !== p.children) {
      const T = d(p.anchor);
      y(p), [g.el, g.anchor] = m(
        g.children,
        b,
        T,
        C
      );
    } else
      g.el = p.el, g.anchor = p.anchor;
  }, w = ({ el: p, anchor: g }, b, C) => {
    let T;
    for (; p && p !== g; )
      T = d(p), r(p, b, C), p = T;
    r(g, b, C);
  }, y = ({ el: p, anchor: g }) => {
    let b;
    for (; p && p !== g; )
      b = d(p), i(p), p = b;
    i(g);
  }, P = (p, g, b, C, T, V, I, M, A) => {
    g.type === "svg" ? I = "svg" : g.type === "math" && (I = "mathml"), p == null ? N(
      g,
      b,
      C,
      T,
      V,
      I,
      M,
      A
    ) : W(
      p,
      g,
      T,
      V,
      I,
      M,
      A
    );
  }, N = (p, g, b, C, T, V, I, M) => {
    let A, S;
    const { props: F, shapeFlag: L, transition: $, dirs: H } = p;
    if (A = p.el = o(
      p.type,
      V,
      F && F.is,
      F
    ), L & 8 ? c(A, p.children) : L & 16 && D(
      p.children,
      A,
      null,
      C,
      T,
      Ai(p, V),
      I,
      M
    ), H && en(p, null, C, "created"), k(A, p, p.scopeId, I, C), F) {
      for (const re in F)
        re !== "value" && !or(re) && s(A, re, null, F[re], V, C);
      "value" in F && s(A, "value", null, F.value, V), (S = F.onVnodeBeforeMount) && ct(S, C, p);
    }
    process.env.NODE_ENV !== "production" && (Jr(A, "__vnode", p, !0), Jr(A, "__vueParentComponent", C, !0)), H && en(p, null, C, "beforeMount");
    const X = Ff(T, $);
    X && $.beforeEnter(A), r(A, g, b), ((S = F && F.onVnodeMounted) || X || H) && Ae(() => {
      S && ct(S, C, p), X && $.enter(A), H && en(p, null, C, "mounted");
    }, T);
  }, k = (p, g, b, C, T) => {
    if (b && _(p, b), C)
      for (let V = 0; V < C.length; V++)
        _(p, C[V]);
    if (T) {
      let V = T.subTree;
      if (process.env.NODE_ENV !== "production" && V.patchFlag > 0 && V.patchFlag & 2048 && (V = Js(V.children) || V), g === V) {
        const I = T.vnode;
        k(
          p,
          I,
          I.scopeId,
          I.slotScopeIds,
          T.parent
        );
      }
    }
  }, D = (p, g, b, C, T, V, I, M, A = 0) => {
    for (let S = A; S < p.length; S++) {
      const F = p[S] = M ? $t(p[S]) : ot(p[S]);
      h(
        null,
        F,
        g,
        b,
        C,
        T,
        V,
        I,
        M
      );
    }
  }, W = (p, g, b, C, T, V, I) => {
    const M = g.el = p.el;
    process.env.NODE_ENV !== "production" && (M.__vnode = g);
    let { patchFlag: A, dynamicChildren: S, dirs: F } = g;
    A |= p.patchFlag & 16;
    const L = p.props || ie, $ = g.props || ie;
    let H;
    if (b && tn(b, !1), (H = $.onVnodeBeforeUpdate) && ct(H, b, g, p), F && en(g, p, b, "beforeUpdate"), b && tn(b, !0), process.env.NODE_ENV !== "production" && pn && (A = 0, I = !1, S = null), (L.innerHTML && $.innerHTML == null || L.textContent && $.textContent == null) && c(M, ""), S ? (J(
      p.dynamicChildren,
      S,
      M,
      b,
      C,
      Ai(g, T),
      V
    ), process.env.NODE_ENV !== "production" && Wr(p, g)) : I || Ce(
      p,
      g,
      M,
      null,
      b,
      C,
      Ai(g, T),
      V,
      !1
    ), A > 0) {
      if (A & 16)
        K(M, L, $, b, T);
      else if (A & 2 && L.class !== $.class && s(M, "class", null, $.class, T), A & 4 && s(M, "style", L.style, $.style, T), A & 8) {
        const X = g.dynamicProps;
        for (let re = 0; re < X.length; re++) {
          const ee = X[re], ve = L[ee], st = $[ee];
          (st !== ve || ee === "value") && s(M, ee, ve, st, T, b);
        }
      }
      A & 1 && p.children !== g.children && c(M, g.children);
    } else !I && S == null && K(M, L, $, b, T);
    ((H = $.onVnodeUpdated) || F) && Ae(() => {
      H && ct(H, b, g, p), F && en(g, p, b, "updated");
    }, C);
  }, J = (p, g, b, C, T, V, I) => {
    for (let M = 0; M < g.length; M++) {
      const A = p[M], S = g[M], F = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        A.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (A.type === We || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !er(A, S) || // - In the case of a component, it could contain anything.
        A.shapeFlag & 70) ? f(A.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          b
        )
      );
      h(
        A,
        S,
        F,
        null,
        C,
        T,
        V,
        I,
        !0
      );
    }
  }, K = (p, g, b, C, T) => {
    if (g !== b) {
      if (g !== ie)
        for (const V in g)
          !or(V) && !(V in b) && s(
            p,
            V,
            g[V],
            null,
            T,
            C
          );
      for (const V in b) {
        if (or(V)) continue;
        const I = b[V], M = g[V];
        I !== M && V !== "value" && s(p, V, M, I, T, C);
      }
      "value" in b && s(p, "value", g.value, b.value, T);
    }
  }, Z = (p, g, b, C, T, V, I, M, A) => {
    const S = g.el = p ? p.el : l(""), F = g.anchor = p ? p.anchor : l("");
    let { patchFlag: L, dynamicChildren: $, slotScopeIds: H } = g;
    process.env.NODE_ENV !== "production" && // #5523 dev root fragment may inherit directives
    (pn || L & 2048) && (L = 0, A = !1, $ = null), H && (M = M ? M.concat(H) : H), p == null ? (r(S, b, C), r(F, b, C), D(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      g.children || [],
      b,
      F,
      T,
      V,
      I,
      M,
      A
    )) : L > 0 && L & 64 && $ && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    p.dynamicChildren ? (J(
      p.dynamicChildren,
      $,
      b,
      T,
      V,
      I,
      M
    ), process.env.NODE_ENV !== "production" ? Wr(p, g) : (
      // #2080 if the stable fragment has a key, it's a <template v-for> that may
      //  get moved around. Make sure all root level vnodes inherit el.
      // #2134 or if it's a component root, it may also get moved around
      // as the component is being moved.
      (g.key != null || T && g === T.subTree) && Wr(
        p,
        g,
        !0
        /* shallow */
      )
    )) : Ce(
      p,
      g,
      b,
      F,
      T,
      V,
      I,
      M,
      A
    );
  }, _e = (p, g, b, C, T, V, I, M, A) => {
    g.slotScopeIds = M, p == null ? g.shapeFlag & 512 ? T.ctx.activate(
      g,
      b,
      C,
      I,
      A
    ) : te(
      g,
      b,
      C,
      T,
      V,
      I,
      A
    ) : G(p, g, A);
  }, te = (p, g, b, C, T, V, I) => {
    const M = p.component = sd(
      p,
      C,
      T
    );
    if (process.env.NODE_ENV !== "production" && M.type.__hmrId && Ic(M), process.env.NODE_ENV !== "production" && (Br(p), Et(M, "mount")), Ys(p) && (M.ctx.renderer = Gn), process.env.NODE_ENV !== "production" && Et(M, "init"), ld(M, !1, I), process.env.NODE_ENV !== "production" && Ot(M, "init"), M.asyncDep) {
      if (T && T.registerDep(M, z, I), !p.el) {
        const A = M.subTree = mt(tt);
        x(null, A, g, b);
      }
    } else
      z(
        M,
        p,
        g,
        b,
        T,
        V,
        I
      );
    process.env.NODE_ENV !== "production" && (jr(), Ot(M, "mount"));
  }, G = (p, g, b) => {
    const C = g.component = p.component;
    if (Kf(p, g, b))
      if (C.asyncDep && !C.asyncResolved) {
        process.env.NODE_ENV !== "production" && Br(g), j(C, g, b), process.env.NODE_ENV !== "production" && jr();
        return;
      } else
        C.next = g, Ac(C.update), C.effect.dirty = !0, C.update();
    else
      g.el = p.el, C.vnode = g;
  }, z = (p, g, b, C, T, V, I) => {
    const M = () => {
      if (p.isMounted) {
        let { next: F, bu: L, u: $, parent: H, vnode: X } = p;
        {
          const Cn = Oa(p);
          if (Cn) {
            F && (F.el = X.el, j(p, F, I)), Cn.asyncDep.then(() => {
              p.isUnmounted || M();
            });
            return;
          }
        }
        let re = F, ee;
        process.env.NODE_ENV !== "production" && Br(F || p.vnode), tn(p, !1), F ? (F.el = X.el, j(p, F, I)) : F = X, L && Jn(L), (ee = F.props && F.props.onVnodeBeforeUpdate) && ct(ee, H, F, X), tn(p, !0), process.env.NODE_ENV !== "production" && Et(p, "render");
        const ve = Ri(p);
        process.env.NODE_ENV !== "production" && Ot(p, "render");
        const st = p.subTree;
        p.subTree = ve, process.env.NODE_ENV !== "production" && Et(p, "patch"), h(
          st,
          ve,
          // parent may have changed if it's in a teleport
          f(st.el),
          // anchor may have changed if it's in a fragment
          Mr(st),
          p,
          T,
          V
        ), process.env.NODE_ENV !== "production" && Ot(p, "patch"), F.el = ve.el, re === null && Xf(p, ve.el), $ && Ae($, T), (ee = F.props && F.props.onVnodeUpdated) && Ae(
          () => ct(ee, H, F, X),
          T
        ), process.env.NODE_ENV !== "production" && ra(p), process.env.NODE_ENV !== "production" && jr();
      } else {
        let F;
        const { el: L, props: $ } = g, { bm: H, m: X, parent: re } = p, ee = lr(g);
        if (tn(p, !1), H && Jn(H), !ee && (F = $ && $.onVnodeBeforeMount) && ct(F, re, g), tn(p, !0), L && wo) {
          const ve = () => {
            process.env.NODE_ENV !== "production" && Et(p, "render"), p.subTree = Ri(p), process.env.NODE_ENV !== "production" && Ot(p, "render"), process.env.NODE_ENV !== "production" && Et(p, "hydrate"), wo(
              L,
              p.subTree,
              p,
              T,
              null
            ), process.env.NODE_ENV !== "production" && Ot(p, "hydrate");
          };
          ee ? g.type.__asyncLoader().then(
            // note: we are moving the render call into an async callback,
            // which means it won't track dependencies - but it's ok because
            // a server-rendered async wrapper is already in resolved state
            // and it will never need to change.
            () => !p.isUnmounted && ve()
          ) : ve();
        } else {
          process.env.NODE_ENV !== "production" && Et(p, "render");
          const ve = p.subTree = Ri(p);
          process.env.NODE_ENV !== "production" && Ot(p, "render"), process.env.NODE_ENV !== "production" && Et(p, "patch"), h(
            null,
            ve,
            b,
            C,
            p,
            T,
            V
          ), process.env.NODE_ENV !== "production" && Ot(p, "patch"), g.el = ve.el;
        }
        if (X && Ae(X, T), !ee && (F = $ && $.onVnodeMounted)) {
          const ve = g;
          Ae(
            () => ct(F, re, ve),
            T
          );
        }
        (g.shapeFlag & 256 || re && lr(re.vnode) && re.vnode.shapeFlag & 256) && p.a && Ae(p.a, T), p.isMounted = !0, process.env.NODE_ENV !== "production" && jc(p), g = b = C = null;
      }
    }, A = p.effect = new As(
      M,
      pe,
      () => yi(S),
      p.scope
      // track it in component's effect scope
    ), S = p.update = () => {
      A.dirty && A.run();
    };
    S.i = p, S.id = p.uid, tn(p, !0), process.env.NODE_ENV !== "production" && (A.onTrack = p.rtc ? (F) => Jn(p.rtc, F) : void 0, A.onTrigger = p.rtg ? (F) => Jn(p.rtg, F) : void 0), S();
  }, j = (p, g, b) => {
    g.component = p;
    const C = p.vnode.props;
    p.vnode = g, p.next = null, xf(p, g.props, C, b), Pf(p, g.children, b), kt(), $o(p), At();
  }, Ce = (p, g, b, C, T, V, I, M, A = !1) => {
    const S = p && p.children, F = p ? p.shapeFlag : 0, L = g.children, { patchFlag: $, shapeFlag: H } = g;
    if ($ > 0) {
      if ($ & 128) {
        rt(
          S,
          L,
          b,
          C,
          T,
          V,
          I,
          M,
          A
        );
        return;
      } else if ($ & 256) {
        bt(
          S,
          L,
          b,
          C,
          T,
          V,
          I,
          M,
          A
        );
        return;
      }
    }
    H & 8 ? (F & 16 && qn(S, T, V), L !== S && c(b, L)) : F & 16 ? H & 16 ? rt(
      S,
      L,
      b,
      C,
      T,
      V,
      I,
      M,
      A
    ) : qn(S, T, V, !0) : (F & 8 && c(b, ""), H & 16 && D(
      L,
      b,
      C,
      T,
      V,
      I,
      M,
      A
    ));
  }, bt = (p, g, b, C, T, V, I, M, A) => {
    p = p || kn, g = g || kn;
    const S = p.length, F = g.length, L = Math.min(S, F);
    let $;
    for ($ = 0; $ < L; $++) {
      const H = g[$] = A ? $t(g[$]) : ot(g[$]);
      h(
        p[$],
        H,
        b,
        null,
        T,
        V,
        I,
        M,
        A
      );
    }
    S > F ? qn(
      p,
      T,
      V,
      !0,
      !1,
      L
    ) : D(
      g,
      b,
      C,
      T,
      V,
      I,
      M,
      A,
      L
    );
  }, rt = (p, g, b, C, T, V, I, M, A) => {
    let S = 0;
    const F = g.length;
    let L = p.length - 1, $ = F - 1;
    for (; S <= L && S <= $; ) {
      const H = p[S], X = g[S] = A ? $t(g[S]) : ot(g[S]);
      if (er(H, X))
        h(
          H,
          X,
          b,
          null,
          T,
          V,
          I,
          M,
          A
        );
      else
        break;
      S++;
    }
    for (; S <= L && S <= $; ) {
      const H = p[L], X = g[$] = A ? $t(g[$]) : ot(g[$]);
      if (er(H, X))
        h(
          H,
          X,
          b,
          null,
          T,
          V,
          I,
          M,
          A
        );
      else
        break;
      L--, $--;
    }
    if (S > L) {
      if (S <= $) {
        const H = $ + 1, X = H < F ? g[H].el : C;
        for (; S <= $; )
          h(
            null,
            g[S] = A ? $t(g[S]) : ot(g[S]),
            b,
            X,
            T,
            V,
            I,
            M,
            A
          ), S++;
      }
    } else if (S > $)
      for (; S <= L; )
        it(p[S], T, V, !0), S++;
    else {
      const H = S, X = S, re = /* @__PURE__ */ new Map();
      for (S = X; S <= $; S++) {
        const Ve = g[S] = A ? $t(g[S]) : ot(g[S]);
        Ve.key != null && (process.env.NODE_ENV !== "production" && re.has(Ve.key) && R(
          "Duplicate keys found during update:",
          JSON.stringify(Ve.key),
          "Make sure keys are unique."
        ), re.set(Ve.key, S));
      }
      let ee, ve = 0;
      const st = $ - X + 1;
      let Cn = !1, To = 0;
      const Qn = new Array(st);
      for (S = 0; S < st; S++) Qn[S] = 0;
      for (S = H; S <= L; S++) {
        const Ve = p[S];
        if (ve >= st) {
          it(Ve, T, V, !0);
          continue;
        }
        let ut;
        if (Ve.key != null)
          ut = re.get(Ve.key);
        else
          for (ee = X; ee <= $; ee++)
            if (Qn[ee - X] === 0 && er(Ve, g[ee])) {
              ut = ee;
              break;
            }
        ut === void 0 ? it(Ve, T, V, !0) : (Qn[ut - X] = S + 1, ut >= To ? To = ut : Cn = !0, h(
          Ve,
          g[ut],
          b,
          null,
          T,
          V,
          I,
          M,
          A
        ), ve++);
      }
      const So = Cn ? $f(Qn) : kn;
      for (ee = So.length - 1, S = st - 1; S >= 0; S--) {
        const Ve = X + S, ut = g[Ve], Do = Ve + 1 < F ? g[Ve + 1].el : C;
        Qn[S] === 0 ? h(
          null,
          ut,
          b,
          Do,
          T,
          V,
          I,
          M,
          A
        ) : Cn && (ee < 0 || S !== So[ee] ? ke(ut, b, Do, 2) : ee--);
      }
    }
  }, ke = (p, g, b, C, T = null) => {
    const { el: V, type: I, transition: M, children: A, shapeFlag: S } = p;
    if (S & 6) {
      ke(p.component.subTree, g, b, C);
      return;
    }
    if (S & 128) {
      p.suspense.move(g, b, C);
      return;
    }
    if (S & 64) {
      I.move(p, g, b, Gn);
      return;
    }
    if (I === We) {
      r(V, g, b);
      for (let L = 0; L < A.length; L++)
        ke(A[L], g, b, C);
      r(p.anchor, g, b);
      return;
    }
    if (I === ar) {
      w(p, g, b);
      return;
    }
    if (C !== 2 && S & 1 && M)
      if (C === 0)
        M.beforeEnter(V), r(V, g, b), Ae(() => M.enter(V), T);
      else {
        const { leave: L, delayLeave: $, afterLeave: H } = M, X = () => r(V, g, b), re = () => {
          L(V, () => {
            X(), H && H();
          });
        };
        $ ? $(V, X, re) : re();
      }
    else
      r(V, g, b);
  }, it = (p, g, b, C = !1, T = !1) => {
    const {
      type: V,
      props: I,
      ref: M,
      children: A,
      dynamicChildren: S,
      shapeFlag: F,
      patchFlag: L,
      dirs: $,
      cacheIndex: H
    } = p;
    if (L === -2 && (T = !1), M != null && ss(M, null, b, p, !0), H != null && (g.renderCache[H] = void 0), F & 256) {
      g.ctx.deactivate(p);
      return;
    }
    const X = F & 1 && $, re = !lr(p);
    let ee;
    if (re && (ee = I && I.onVnodeBeforeUnmount) && ct(ee, g, p), F & 6)
      Iu(p.component, b, C);
    else {
      if (F & 128) {
        p.suspense.unmount(b, C);
        return;
      }
      X && en(p, null, g, "beforeUnmount"), F & 64 ? p.type.remove(
        p,
        g,
        b,
        Gn,
        C
      ) : S && // #5154
      // when v-once is used inside a block, setBlockTracking(-1) marks the
      // parent block with hasOnce: true
      // so that it doesn't take the fast path during unmount - otherwise
      // components nested in v-once are never unmounted.
      !S.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (V !== We || L > 0 && L & 64) ? qn(
        S,
        g,
        b,
        !1,
        !0
      ) : (V === We && L & 384 || !T && F & 16) && qn(A, g, b), C && Be(p);
    }
    (re && (ee = I && I.onVnodeUnmounted) || X) && Ae(() => {
      ee && ct(ee, g, p), X && en(p, null, g, "unmounted");
    }, b);
  }, Be = (p) => {
    const { type: g, el: b, anchor: C, transition: T } = p;
    if (g === We) {
      process.env.NODE_ENV !== "production" && p.patchFlag > 0 && p.patchFlag & 2048 && T && !T.persisted ? p.children.forEach((I) => {
        I.type === tt ? i(I.el) : Be(I);
      }) : xt(b, C);
      return;
    }
    if (g === ar) {
      y(p);
      return;
    }
    const V = () => {
      i(b), T && !T.persisted && T.afterLeave && T.afterLeave();
    };
    if (p.shapeFlag & 1 && T && !T.persisted) {
      const { leave: I, delayLeave: M } = T, A = () => I(b, V);
      M ? M(p.el, V, A) : A();
    } else
      V();
  }, xt = (p, g) => {
    let b;
    for (; p !== g; )
      b = d(p), i(p), p = b;
    i(g);
  }, Iu = (p, g, b) => {
    process.env.NODE_ENV !== "production" && p.type.__hmrId && Fc(p);
    const { bum: C, scope: T, update: V, subTree: I, um: M, m: A, a: S } = p;
    Ko(A), Ko(S), C && Jn(C), T.stop(), V && (V.active = !1, it(I, p, g, b)), M && Ae(M, g), Ae(() => {
      p.isUnmounted = !0;
    }, g), g && g.pendingBranch && !g.isUnmounted && p.asyncDep && !p.asyncResolved && p.suspenseId === g.pendingId && (g.deps--, g.deps === 0 && g.resolve()), process.env.NODE_ENV !== "production" && Hc(p);
  }, qn = (p, g, b, C = !1, T = !1, V = 0) => {
    for (let I = V; I < p.length; I++)
      it(p[I], g, b, C, T);
  }, Mr = (p) => {
    if (p.shapeFlag & 6)
      return Mr(p.component.subTree);
    if (p.shapeFlag & 128)
      return p.suspense.next();
    const g = d(p.anchor || p.el), b = g && g[Mf];
    return b ? d(b) : g;
  };
  let Vi = !1;
  const Oo = (p, g, b) => {
    p == null ? g._vnode && it(g._vnode, null, null, !0) : h(
      g._vnode || null,
      p,
      g,
      null,
      null,
      null,
      b
    ), g._vnode = p, Vi || (Vi = !0, $o(), ea(), Vi = !1);
  }, Gn = {
    p: h,
    um: it,
    m: ke,
    r: Be,
    mt: te,
    mc: D,
    pc: Ce,
    pbc: J,
    n: Mr,
    o: t
  };
  let No, wo;
  return {
    render: Oo,
    hydrate: No,
    createApp: mf(Oo, No)
  };
}
function Ai({ type: t, props: e }, n) {
  return n === "svg" && t === "foreignObject" || n === "mathml" && t === "annotation-xml" && e && e.encoding && e.encoding.includes("html") ? void 0 : n;
}
function tn({ effect: t, update: e }, n) {
  t.allowRecurse = e.allowRecurse = n;
}
function Ff(t, e) {
  return (!t || t && !t.pendingBranch) && e && !e.persisted;
}
function Wr(t, e, n = !1) {
  const r = t.children, i = e.children;
  if (B(r) && B(i))
    for (let s = 0; s < r.length; s++) {
      const o = r[s];
      let l = i[s];
      l.shapeFlag & 1 && !l.dynamicChildren && ((l.patchFlag <= 0 || l.patchFlag === 32) && (l = i[s] = $t(i[s]), l.el = o.el), !n && l.patchFlag !== -2 && Wr(o, l)), l.type === Sr && (l.el = o.el), process.env.NODE_ENV !== "production" && l.type === tt && !l.el && (l.el = o.el);
    }
}
function $f(t) {
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
function Oa(t) {
  const e = t.subTree.component;
  if (e)
    return e.asyncDep && !e.asyncResolved ? e : Oa(e);
}
function Ko(t) {
  if (t)
    for (let e = 0; e < t.length; e++) t[e].active = !1;
}
const Lf = Symbol.for("v-scx"), zf = () => {
  {
    const t = Hr(Lf);
    return t || process.env.NODE_ENV !== "production" && R(
      "Server rendering context not provided. Make sure to only call useSSRContext() conditionally in the server build."
    ), t;
  }
};
function Bf(t, e) {
  return Qs(
    t,
    null,
    process.env.NODE_ENV !== "production" ? de({}, e, { flush: "post" }) : { flush: "post" }
  );
}
const $r = {};
function Ht(t, e, n) {
  return process.env.NODE_ENV !== "production" && !U(e) && R(
    "`watch(fn, options?)` signature has been moved to a separate API. Use `watchEffect(fn, options?)` instead. `watch` now only supports `watch(source, cb, options?) signature."
  ), Qs(t, e, n);
}
function Qs(t, e, {
  immediate: n,
  deep: r,
  flush: i,
  once: s,
  onTrack: o,
  onTrigger: l
} = ie) {
  if (e && s) {
    const N = e;
    e = (...k) => {
      N(...k), P();
    };
  }
  process.env.NODE_ENV !== "production" && r !== void 0 && typeof r == "number" && R(
    'watch() "deep" option with number value will be used as watch depth in future versions. Please use a boolean instead to avoid potential breakage.'
  ), process.env.NODE_ENV !== "production" && !e && (n !== void 0 && R(
    'watch() "immediate" option is only respected when using the watch(source, callback, options?) signature.'
  ), r !== void 0 && R(
    'watch() "deep" option is only respected when using the watch(source, callback, options?) signature.'
  ), s !== void 0 && R(
    'watch() "once" option is only respected when using the watch(source, callback, options?) signature.'
  ));
  const a = (N) => {
    R(
      "Invalid watch source: ",
      N,
      "A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types."
    );
  }, u = be, c = (N) => r === !0 ? N : (
    // for deep: false, only traverse root-level properties
    an(N, r === !1 ? 1 : void 0)
  );
  let f, d = !1, _ = !1;
  if (Ne(t) ? (f = () => t.value, d = St(t)) : Rn(t) ? (f = () => c(t), d = !0) : B(t) ? (_ = !0, d = t.some((N) => Rn(N) || St(N)), f = () => t.map((N) => {
    if (Ne(N))
      return N.value;
    if (Rn(N))
      return c(N);
    if (U(N))
      return Dt(N, u, 2);
    process.env.NODE_ENV !== "production" && a(N);
  })) : U(t) ? e ? f = () => Dt(t, u, 2) : f = () => (m && m(), at(
    t,
    u,
    3,
    [h]
  )) : (f = pe, process.env.NODE_ENV !== "production" && a(t)), e && r) {
    const N = f;
    f = () => an(N());
  }
  let m, h = (N) => {
    m = w.onStop = () => {
      Dt(N, u, 4), m = w.onStop = void 0;
    };
  }, v;
  if (wi)
    if (h = pe, e ? n && at(e, u, 3, [
      f(),
      _ ? [] : void 0,
      h
    ]) : f(), i === "sync") {
      const N = zf();
      v = N.__watcherHandles || (N.__watcherHandles = []);
    } else
      return pe;
  let x = _ ? new Array(t.length).fill($r) : $r;
  const E = () => {
    if (!(!w.active || !w.dirty))
      if (e) {
        const N = w.run();
        (r || d || (_ ? N.some((k, D) => Kt(k, x[D])) : Kt(N, x))) && (m && m(), at(e, u, 3, [
          N,
          // pass undefined as the old value when it's changed for the first time
          x === $r ? void 0 : _ && x[0] === $r ? [] : x,
          h
        ]), x = N);
      } else
        w.run();
  };
  E.allowRecurse = !!e;
  let O;
  i === "sync" ? O = E : i === "post" ? O = () => Ae(E, u && u.suspense) : (E.pre = !0, u && (E.id = u.uid), O = () => yi(E));
  const w = new As(f, pe, O), y = Vl(), P = () => {
    w.stop(), y && Ds(y.effects, w);
  };
  return process.env.NODE_ENV !== "production" && (w.onTrack = o, w.onTrigger = l), e ? n ? E() : x = w.run() : i === "post" ? Ae(
    w.run.bind(w),
    u && u.suspense
  ) : w.run(), v && v.push(P), P;
}
function jf(t, e, n) {
  const r = this.proxy, i = me(t) ? t.includes(".") ? Na(r, t) : () => r[t] : t.bind(r, r);
  let s;
  U(e) ? s = e : (s = e.handler, n = e);
  const o = Dr(this), l = Qs(i, s.bind(r), n);
  return o(), l;
}
function Na(t, e) {
  const n = e.split(".");
  return () => {
    let r = t;
    for (let i = 0; i < n.length && r; i++)
      r = r[n[i]];
    return r;
  };
}
function an(t, e = 1 / 0, n) {
  if (e <= 0 || !le(t) || t.__v_skip || (n = n || /* @__PURE__ */ new Set(), n.has(t)))
    return t;
  if (n.add(t), e--, Ne(t))
    an(t.value, e, n);
  else if (B(t))
    for (let r = 0; r < t.length; r++)
      an(t[r], e, n);
  else if (Lu(t) || An(t))
    t.forEach((r) => {
      an(r, e, n);
    });
  else if (Bu(t)) {
    for (const r in t)
      an(t[r], e, n);
    for (const r of Object.getOwnPropertySymbols(t))
      Object.prototype.propertyIsEnumerable.call(t, r) && an(t[r], e, n);
  }
  return t;
}
const Uf = (t, e) => e === "modelValue" || e === "model-value" ? t.modelModifiers : t[`${e}Modifiers`] || t[`${et(e)}Modifiers`] || t[`${Re(e)}Modifiers`];
function Hf(t, e, ...n) {
  if (t.isUnmounted) return;
  const r = t.vnode.props || ie;
  if (process.env.NODE_ENV !== "production") {
    const {
      emitsOptions: c,
      propsOptions: [f]
    } = t;
    if (c)
      if (!(e in c))
        (!f || !(sn(et(e)) in f)) && R(
          `Component emitted event "${e}" but it is neither declared in the emits option nor as an "${sn(et(e))}" prop.`
        );
      else {
        const d = c[e];
        U(d) && (d(...n) || R(
          `Invalid event arguments: event validation failed for event "${e}".`
        ));
      }
  }
  let i = n;
  const s = e.startsWith("update:"), o = s && Uf(r, e.slice(7));
  if (o && (o.trim && (i = n.map((c) => me(c) ? c.trim() : c)), o.number && (i = n.map(Wu))), process.env.NODE_ENV !== "production" && Kc(t, e, i), process.env.NODE_ENV !== "production") {
    const c = e.toLowerCase();
    c !== e && r[sn(c)] && R(
      `Event "${c}" is emitted in component ${Ti(
        t,
        t.type
      )} but the handler is registered for "${e}". Note that HTML attributes are case-insensitive and you cannot use v-on to listen to camelCase events when using in-DOM templates. You should probably use "${Re(
        e
      )}" instead of "${e}".`
    );
  }
  let l, a = r[l = sn(e)] || // also try camelCase event handler (#2249)
  r[l = sn(et(e))];
  !a && s && (a = r[l = sn(Re(e))]), a && at(
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
function wa(t, e, n = !1) {
  const r = e.emitsCache, i = r.get(t);
  if (i !== void 0)
    return i;
  const s = t.emits;
  let o = {}, l = !1;
  if (!U(t)) {
    const a = (u) => {
      const c = wa(u, e, !0);
      c && (l = !0, de(o, c));
    };
    !n && e.mixins.length && e.mixins.forEach(a), t.extends && a(t.extends), t.mixins && t.mixins.forEach(a);
  }
  return !s && !l ? (le(t) && r.set(t, null), null) : (B(s) ? s.forEach((a) => o[a] = null) : de(o, s), le(t) && r.set(t, o), o);
}
function Ei(t, e) {
  return !t || !Nr(e) ? !1 : (e = e.slice(2).replace(/Once$/, ""), q(t, e[0].toLowerCase() + e.slice(1)) || q(t, Re(e)) || q(t, e));
}
let os = !1;
function ri() {
  os = !0;
}
function Ri(t) {
  const {
    type: e,
    vnode: n,
    proxy: r,
    withProxy: i,
    propsOptions: [s],
    slots: o,
    attrs: l,
    emit: a,
    render: u,
    renderCache: c,
    props: f,
    data: d,
    setupState: _,
    ctx: m,
    inheritAttrs: h
  } = t, v = ei(t);
  let x, E;
  process.env.NODE_ENV !== "production" && (os = !1);
  try {
    if (n.shapeFlag & 4) {
      const y = i || r, P = process.env.NODE_ENV !== "production" && _.__isScriptSetup ? new Proxy(y, {
        get(N, k, D) {
          return R(
            `Property '${String(
              k
            )}' was accessed via 'this'. Avoid using 'this' in templates.`
          ), Reflect.get(N, k, D);
        }
      }) : y;
      x = ot(
        u.call(
          P,
          y,
          c,
          process.env.NODE_ENV !== "production" ? pt(f) : f,
          _,
          d,
          m
        )
      ), E = l;
    } else {
      const y = e;
      process.env.NODE_ENV !== "production" && l === f && ri(), x = ot(
        y.length > 1 ? y(
          process.env.NODE_ENV !== "production" ? pt(f) : f,
          process.env.NODE_ENV !== "production" ? {
            get attrs() {
              return ri(), pt(l);
            },
            slots: o,
            emit: a
          } : { attrs: l, slots: o, emit: a }
        ) : y(
          process.env.NODE_ENV !== "production" ? pt(f) : f,
          null
        )
      ), E = e.props ? l : Wf(l);
    }
  } catch (y) {
    ur.length = 0, wr(y, t, 1), x = mt(tt);
  }
  let O = x, w;
  if (process.env.NODE_ENV !== "production" && x.patchFlag > 0 && x.patchFlag & 2048 && ([O, w] = Ta(x)), E && h !== !1) {
    const y = Object.keys(E), { shapeFlag: P } = O;
    if (y.length) {
      if (P & 7)
        s && y.some(Qr) && (E = Yf(
          E,
          s
        )), O = Xt(O, E, !1, !0);
      else if (process.env.NODE_ENV !== "production" && !os && O.type !== tt) {
        const N = Object.keys(l), k = [], D = [];
        for (let W = 0, J = N.length; W < J; W++) {
          const K = N[W];
          Nr(K) ? Qr(K) || k.push(K[2].toLowerCase() + K.slice(3)) : D.push(K);
        }
        D.length && R(
          `Extraneous non-props attributes (${D.join(", ")}) were passed to component but could not be automatically inherited because component renders fragment or text root nodes.`
        ), k.length && R(
          `Extraneous non-emits event listeners (${k.join(", ")}) were passed to component but could not be automatically inherited because component renders fragment or text root nodes. If the listener is intended to be a component custom event listener only, declare it using the "emits" option.`
        );
      }
    }
  }
  return n.dirs && (process.env.NODE_ENV !== "production" && !Xo(O) && R(
    "Runtime directive used on component with non-element root node. The directives will not function as intended."
  ), O = Xt(O, null, !1, !0), O.dirs = O.dirs ? O.dirs.concat(n.dirs) : n.dirs), n.transition && (process.env.NODE_ENV !== "production" && !Xo(O) && R(
    "Component inside <Transition> renders non-element root node that cannot be animated."
  ), O.transition = n.transition), process.env.NODE_ENV !== "production" && w ? w(O) : x = O, ei(v), x;
}
const Ta = (t) => {
  const e = t.children, n = t.dynamicChildren, r = Js(e, !1);
  if (r) {
    if (process.env.NODE_ENV !== "production" && r.patchFlag > 0 && r.patchFlag & 2048)
      return Ta(r);
  } else return [t, void 0];
  const i = e.indexOf(r), s = n ? n.indexOf(r) : -1, o = (l) => {
    e[i] = l, n && (s > -1 ? n[s] = l : l.patchFlag > 0 && (t.dynamicChildren = [...n, l]));
  };
  return [ot(r), o];
};
function Js(t, e = !0) {
  let n;
  for (let r = 0; r < t.length; r++) {
    const i = t[r];
    if (Oi(i)) {
      if (i.type !== tt || i.children === "v-if") {
        if (n)
          return;
        if (n = i, process.env.NODE_ENV !== "production" && e && n.patchFlag > 0 && n.patchFlag & 2048)
          return Js(n.children);
      }
    } else
      return;
  }
  return n;
}
const Wf = (t) => {
  let e;
  for (const n in t)
    (n === "class" || n === "style" || Nr(n)) && ((e || (e = {}))[n] = t[n]);
  return e;
}, Yf = (t, e) => {
  const n = {};
  for (const r in t)
    (!Qr(r) || !(r.slice(9) in e)) && (n[r] = t[r]);
  return n;
}, Xo = (t) => t.shapeFlag & 7 || t.type === tt;
function Kf(t, e, n) {
  const { props: r, children: i, component: s } = t, { props: o, children: l, patchFlag: a } = e, u = s.emitsOptions;
  if (process.env.NODE_ENV !== "production" && (i || l) && pn || e.dirs || e.transition)
    return !0;
  if (n && a >= 0) {
    if (a & 1024)
      return !0;
    if (a & 16)
      return r ? qo(r, o, u) : !!o;
    if (a & 8) {
      const c = e.dynamicProps;
      for (let f = 0; f < c.length; f++) {
        const d = c[f];
        if (o[d] !== r[d] && !Ei(u, d))
          return !0;
      }
    }
  } else
    return (i || l) && (!l || !l.$stable) ? !0 : r === o ? !1 : r ? o ? qo(r, o, u) : !0 : !!o;
  return !1;
}
function qo(t, e, n) {
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
function Xf({ vnode: t, parent: e }, n) {
  for (; e; ) {
    const r = e.subTree;
    if (r.suspense && r.suspense.activeBranch === t && (r.el = t.el), r === t)
      (t = e.vnode).el = n, e = e.parent;
    else
      break;
  }
}
const qf = (t) => t.__isSuspense;
function Gf(t, e) {
  e && e.pendingBranch ? B(t) ? e.effects.push(...t) : e.effects.push(t) : Zl(t);
}
const We = Symbol.for("v-fgt"), Sr = Symbol.for("v-txt"), tt = Symbol.for("v-cmt"), ar = Symbol.for("v-stc"), ur = [];
let Ke = null;
function Jt(t = !1) {
  ur.push(Ke = t ? null : []);
}
function Qf() {
  ur.pop(), Ke = ur[ur.length - 1] || null;
}
let gr = 1;
function Go(t) {
  gr += t, t < 0 && Ke && (Ke.hasOnce = !0);
}
function Sa(t) {
  return t.dynamicChildren = gr > 0 ? Ke || kn : null, Qf(), gr > 0 && Ke && Ke.push(t), t;
}
function Nn(t, e, n, r, i, s) {
  return Sa(
    Zs(
      t,
      e,
      n,
      r,
      i,
      s,
      !0
    )
  );
}
function Jf(t, e, n, r, i) {
  return Sa(
    mt(
      t,
      e,
      n,
      r,
      i,
      !0
    )
  );
}
function Oi(t) {
  return t ? t.__v_isVNode === !0 : !1;
}
function er(t, e) {
  if (process.env.NODE_ENV !== "production" && e.shapeFlag & 6 && t.component) {
    const n = Ur.get(e.type);
    if (n && n.has(t.component))
      return t.shapeFlag &= -257, e.shapeFlag &= -513, !1;
  }
  return t.type === e.type && t.key === e.key;
}
const Zf = (...t) => Ca(
  ...t
), Da = ({ key: t }) => t ?? null, Yr = ({
  ref: t,
  ref_key: e,
  ref_for: n
}) => (typeof t == "number" && (t = "" + t), t != null ? me(t) || Ne(t) || U(t) ? { i: Ee, r: t, k: e, f: !!n } : t : null);
function Zs(t, e = null, n = null, r = 0, i = null, s = t === We ? 0 : 1, o = !1, l = !1) {
  const a = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: t,
    props: e,
    key: e && Da(e),
    ref: e && Yr(e),
    scopeId: sa,
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
    targetStart: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: s,
    patchFlag: r,
    dynamicProps: i,
    dynamicChildren: null,
    appContext: null,
    ctx: Ee
  };
  return l ? (eo(a, n), s & 128 && t.normalize(a)) : n && (a.shapeFlag |= me(n) ? 8 : 16), process.env.NODE_ENV !== "production" && a.key !== a.key && R("VNode created with invalid key (NaN). VNode type:", a.type), gr > 0 && // avoid a block node from tracking itself
  !o && // has current parent block
  Ke && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (a.patchFlag > 0 || s & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  a.patchFlag !== 32 && Ke.push(a), a;
}
const mt = process.env.NODE_ENV !== "production" ? Zf : Ca;
function Ca(t, e = null, n = null, r = 0, i = null, s = !1) {
  if ((!t || t === of) && (process.env.NODE_ENV !== "production" && !t && R(`Invalid vnode type when creating vnode: ${t}.`), t = tt), Oi(t)) {
    const l = Xt(
      t,
      e,
      !0
      /* mergeRef: true */
    );
    return n && eo(l, n), gr > 0 && !s && Ke && (l.shapeFlag & 6 ? Ke[Ke.indexOf(t)] = l : Ke.push(l)), l.patchFlag = -2, l;
  }
  if (Aa(t) && (t = t.__vccOpts), e) {
    e = ed(e);
    let { class: l, style: a } = e;
    l && !me(l) && (e.class = ks(l)), le(a) && (Qi(a) && !B(a) && (a = de({}, a)), e.style = _i(a));
  }
  const o = me(t) ? 1 : qf(t) ? 128 : kf(t) ? 64 : le(t) ? 4 : U(t) ? 2 : 0;
  return process.env.NODE_ENV !== "production" && o & 4 && Qi(t) && (t = Y(t), R(
    "Vue received a Component that was made a reactive object. This can lead to unnecessary performance overhead and should be avoided by marking the component with `markRaw` or using `shallowRef` instead of `ref`.",
    `
Component that was made reactive: `,
    t
  )), Zs(
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
function ed(t) {
  return t ? Qi(t) || ga(t) ? de({}, t) : t : null;
}
function Xt(t, e, n = !1, r = !1) {
  const { props: i, ref: s, patchFlag: o, children: l, transition: a } = t, u = e ? nd(i || {}, e) : i, c = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: t.type,
    props: u,
    key: u && Da(u),
    ref: e && e.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && s ? B(s) ? s.concat(Yr(e)) : [s, Yr(e)] : Yr(e)
    ) : s,
    scopeId: t.scopeId,
    slotScopeIds: t.slotScopeIds,
    children: process.env.NODE_ENV !== "production" && o === -1 && B(l) ? l.map(Va) : l,
    target: t.target,
    targetStart: t.targetStart,
    targetAnchor: t.targetAnchor,
    staticCount: t.staticCount,
    shapeFlag: t.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: e && t.type !== We ? o === -1 ? 16 : o | 16 : o,
    dynamicProps: t.dynamicProps,
    dynamicChildren: t.dynamicChildren,
    appContext: t.appContext,
    dirs: t.dirs,
    transition: a,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: t.component,
    suspense: t.suspense,
    ssContent: t.ssContent && Xt(t.ssContent),
    ssFallback: t.ssFallback && Xt(t.ssFallback),
    el: t.el,
    anchor: t.anchor,
    ctx: t.ctx,
    ce: t.ce
  };
  return a && r && la(
    c,
    a.clone(c)
  ), c;
}
function Va(t) {
  const e = Xt(t);
  return B(t.children) && (e.children = t.children.map(Va)), e;
}
function td(t = " ", e = 0) {
  return mt(Sr, null, t, e);
}
function ot(t) {
  return t == null || typeof t == "boolean" ? mt(tt) : B(t) ? mt(
    We,
    null,
    // #3666, avoid reference pollution when reusing vnode
    t.slice()
  ) : typeof t == "object" ? $t(t) : mt(Sr, null, String(t));
}
function $t(t) {
  return t.el === null && t.patchFlag !== -1 || t.memo ? t : Xt(t);
}
function eo(t, e) {
  let n = 0;
  const { shapeFlag: r } = t;
  if (e == null)
    e = null;
  else if (B(e))
    n = 16;
  else if (typeof e == "object")
    if (r & 65) {
      const i = e.default;
      i && (i._c && (i._d = !1), eo(t, i()), i._c && (i._d = !0));
      return;
    } else {
      n = 32;
      const i = e._;
      !i && !ga(e) ? e._ctx = Ee : i === 3 && Ee && (Ee.slots._ === 1 ? e._ = 1 : (e._ = 2, t.patchFlag |= 1024));
    }
  else U(e) ? (e = { default: e, _ctx: Ee }, n = 32) : (e = String(e), r & 64 ? (n = 16, e = [td(e)]) : n = 8);
  t.children = e, t.shapeFlag |= n;
}
function nd(...t) {
  const e = {};
  for (let n = 0; n < t.length; n++) {
    const r = t[n];
    for (const i in r)
      if (i === "class")
        e.class !== r.class && (e.class = ks([e.class, r.class]));
      else if (i === "style")
        e.style = _i([e.style, r.style]);
      else if (Nr(i)) {
        const s = e[i], o = r[i];
        o && s !== o && !(B(s) && s.includes(o)) && (e[i] = s ? [].concat(s, o) : o);
      } else i !== "" && (e[i] = r[i]);
  }
  return e;
}
function ct(t, e, n, r = null) {
  at(t, e, 7, [
    n,
    r
  ]);
}
const rd = ha();
let id = 0;
function sd(t, e, n) {
  const r = t.type, i = (e ? e.appContext : t.appContext) || rd, s = {
    uid: id++,
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
    scope: new Ju(
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
    propsOptions: va(r, i),
    emitsOptions: wa(r, i),
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
  return process.env.NODE_ENV !== "production" ? s.ctx = lf(s) : s.ctx = { _: s }, s.root = e ? e.root : s, s.emit = Hf.bind(null, s), t.ce && t.ce(s), s;
}
let be = null;
const Ni = () => be || Ee;
let ii, ls;
{
  const t = Ms(), e = (n, r) => {
    let i;
    return (i = t[n]) || (i = t[n] = []), i.push(r), (s) => {
      i.length > 1 ? i.forEach((o) => o(s)) : i[0](s);
    };
  };
  ii = e(
    "__VUE_INSTANCE_SETTERS__",
    (n) => be = n
  ), ls = e(
    "__VUE_SSR_SETTERS__",
    (n) => wi = n
  );
}
const Dr = (t) => {
  const e = be;
  return ii(t), t.scope.on(), () => {
    t.scope.off(), ii(e);
  };
}, Qo = () => {
  be && be.scope.off(), ii(null);
}, od = /* @__PURE__ */ Yn("slot,component");
function as(t, { isNativeTag: e }) {
  (od(t) || e(t)) && R(
    "Do not use built-in or reserved HTML elements as component id: " + t
  );
}
function Pa(t) {
  return t.vnode.shapeFlag & 4;
}
let wi = !1;
function ld(t, e = !1, n = !1) {
  e && ls(e);
  const { props: r, children: i } = t.vnode, s = Pa(t);
  yf(t, r, s, e), Vf(t, i, n);
  const o = s ? ad(t, e) : void 0;
  return e && ls(!1), o;
}
function ad(t, e) {
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
        oa(s[o]);
    }
    r.compilerOptions && ud() && R(
      '"compilerOptions" is only supported when using a build of Vue that includes the runtime compiler. Since you are using a runtime-only build, the options should be passed via your build tool config instead.'
    );
  }
  t.accessCache = /* @__PURE__ */ Object.create(null), t.proxy = new Proxy(t.ctx, fa), process.env.NODE_ENV !== "production" && af(t);
  const { setup: i } = r;
  if (i) {
    const s = t.setupContext = i.length > 1 ? fd(t) : null, o = Dr(t);
    kt();
    const l = Dt(
      i,
      t,
      0,
      [
        process.env.NODE_ENV !== "production" ? pt(t.props) : t.props,
        s
      ]
    );
    if (At(), o(), Cs(l)) {
      if (l.then(Qo, Qo), e)
        return l.then((a) => {
          Jo(t, a, e);
        }).catch((a) => {
          wr(a, t, 0);
        });
      if (t.asyncDep = l, process.env.NODE_ENV !== "production" && !t.suspense) {
        const a = (n = r.name) != null ? n : "Anonymous";
        R(
          `Component <${a}>: setup function returned a promise, but no <Suspense> boundary was found in the parent component tree. A component with async setup() must be nested in a <Suspense> in order to be rendered.`
        );
      }
    } else
      Jo(t, l, e);
  } else
    Ma(t, e);
}
function Jo(t, e, n) {
  U(e) ? t.type.__ssrInlineRender ? t.ssrRender = e : t.render = e : le(e) ? (process.env.NODE_ENV !== "production" && Oi(e) && R(
    "setup() should not return VNodes directly - return a render function instead."
  ), process.env.NODE_ENV !== "production" && (t.devtoolsRawSetupState = e), t.setupState = ql(e), process.env.NODE_ENV !== "production" && uf(t)) : process.env.NODE_ENV !== "production" && e !== void 0 && R(
    `setup() should return an object. Received: ${e === null ? "null" : typeof e}`
  ), Ma(t, n);
}
let us;
const ud = () => !us;
function Ma(t, e, n) {
  const r = t.type;
  if (!t.render) {
    if (!e && us && !r.render) {
      const i = r.template || qs(t).template;
      if (i) {
        process.env.NODE_ENV !== "production" && Et(t, "compile");
        const { isCustomElement: s, compilerOptions: o } = t.appContext.config, { delimiters: l, compilerOptions: a } = r, u = de(
          de(
            {
              isCustomElement: s,
              delimiters: l
            },
            o
          ),
          a
        );
        r.render = us(i, u), process.env.NODE_ENV !== "production" && Ot(t, "compile");
      }
    }
    t.render = r.render || pe;
  }
  {
    const i = Dr(t);
    kt();
    try {
      ff(t);
    } finally {
      At(), i();
    }
  }
  process.env.NODE_ENV !== "production" && !r.render && t.render === pe && !e && (r.template ? R(
    'Component provided template option but runtime compilation is not supported in this build of Vue. Configure your bundler to alias "vue" to "vue/dist/vue.esm-bundler.js".'
  ) : R("Component is missing template or render function: ", r));
}
const Zo = process.env.NODE_ENV !== "production" ? {
  get(t, e) {
    return ri(), Oe(t, "get", ""), t[e];
  },
  set() {
    return R("setupContext.attrs is readonly."), !1;
  },
  deleteProperty() {
    return R("setupContext.attrs is readonly."), !1;
  }
} : {
  get(t, e) {
    return Oe(t, "get", ""), t[e];
  }
};
function cd(t) {
  return new Proxy(t.slots, {
    get(e, n) {
      return Oe(t, "get", "$slots"), e[n];
    }
  });
}
function fd(t) {
  const e = (n) => {
    if (process.env.NODE_ENV !== "production" && (t.exposed && R("expose() should be called only once per setup()."), n != null)) {
      let r = typeof n;
      r === "object" && (B(n) ? r = "array" : Ne(n) && (r = "ref")), r !== "object" && R(
        `expose() should be passed a plain object, received ${r}.`
      );
    }
    t.exposed = n || {};
  };
  if (process.env.NODE_ENV !== "production") {
    let n, r;
    return Object.freeze({
      get attrs() {
        return n || (n = new Proxy(t.attrs, Zo));
      },
      get slots() {
        return r || (r = cd(t));
      },
      get emit() {
        return (i, ...s) => t.emit(i, ...s);
      },
      expose: e
    });
  } else
    return {
      attrs: new Proxy(t.attrs, Zo),
      slots: t.slots,
      emit: t.emit,
      expose: e
    };
}
function to(t) {
  return t.exposed ? t.exposeProxy || (t.exposeProxy = new Proxy(ql(xc(t.exposed)), {
    get(e, n) {
      if (n in e)
        return e[n];
      if (n in _n)
        return _n[n](t);
    },
    has(e, n) {
      return n in e || n in _n;
    }
  })) : t.proxy;
}
const dd = /(?:^|[-_])(\w)/g, hd = (t) => t.replace(dd, (e) => e.toUpperCase()).replace(/[-_]/g, "");
function ka(t, e = !0) {
  return U(t) ? t.displayName || t.name : t.name || e && t.__name;
}
function Ti(t, e, n = !1) {
  let r = ka(e);
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
  return r ? hd(r) : n ? "App" : "Anonymous";
}
function Aa(t) {
  return U(t) && "__vccOpts" in t;
}
const Ue = (t, e) => {
  const n = Oc(t, e, wi);
  if (process.env.NODE_ENV !== "production") {
    const r = Ni();
    r && r.appContext.config.warnRecursiveComputed && (n._warnRecursive = !0);
  }
  return n;
};
function pd() {
  if (process.env.NODE_ENV === "production" || typeof window > "u")
    return;
  const t = { style: "color:#3ba776" }, e = { style: "color:#1677ff" }, n = { style: "color:#f5222d" }, r = { style: "color:#eb2f96" }, i = {
    __vue_custom_formatter: !0,
    header(f) {
      return le(f) ? f.__isVue ? ["div", t, "VueInstance"] : Ne(f) ? [
        "div",
        {},
        ["span", t, c(f)],
        "<",
        l(f.value),
        ">"
      ] : Rn(f) ? [
        "div",
        {},
        ["span", t, St(f) ? "ShallowReactive" : "Reactive"],
        "<",
        l(f),
        `>${Vt(f) ? " (readonly)" : ""}`
      ] : Vt(f) ? [
        "div",
        {},
        ["span", t, St(f) ? "ShallowReadonly" : "Readonly"],
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
    const m = a(f, "inject");
    return m && d.push(o("injected", m)), d.push([
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
    return d = de({}, d), Object.keys(d).length ? [
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
    const m = {};
    for (const h in f.ctx)
      u(_, h, d) && (m[h] = f.ctx[h]);
    return m;
  }
  function u(f, d, _) {
    const m = f[_];
    if (B(m) && m.includes(d) || le(m) && d in m || f.extends && u(f.extends, d, _) || f.mixins && f.mixins.some((h) => u(h, d, _)))
      return !0;
  }
  function c(f) {
    return St(f) ? "ShallowRef" : f.effect ? "ComputedRef" : "Ref";
  }
  window.devtoolsFormatters ? window.devtoolsFormatters.push(i) : window.devtoolsFormatters = [i];
}
const el = "3.4.37", Cr = process.env.NODE_ENV !== "production" ? R : pe;
process.env.NODE_ENV;
process.env.NODE_ENV;
/**
* @vue/runtime-dom v3.4.37
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
const _d = "http://www.w3.org/2000/svg", gd = "http://www.w3.org/1998/Math/MathML", Nt = typeof document < "u" ? document : null, tl = Nt && /* @__PURE__ */ Nt.createElement("template"), md = {
  insert: (t, e, n) => {
    e.insertBefore(t, n || null);
  },
  remove: (t) => {
    const e = t.parentNode;
    e && e.removeChild(t);
  },
  createElement: (t, e, n, r) => {
    const i = e === "svg" ? Nt.createElementNS(_d, t) : e === "mathml" ? Nt.createElementNS(gd, t) : n ? Nt.createElement(t, { is: n }) : Nt.createElement(t);
    return t === "select" && r && r.multiple != null && i.setAttribute("multiple", r.multiple), i;
  },
  createText: (t) => Nt.createTextNode(t),
  createComment: (t) => Nt.createComment(t),
  setText: (t, e) => {
    t.nodeValue = e;
  },
  setElementText: (t, e) => {
    t.textContent = e;
  },
  parentNode: (t) => t.parentNode,
  nextSibling: (t) => t.nextSibling,
  querySelector: (t) => Nt.querySelector(t),
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
      tl.innerHTML = r === "svg" ? `<svg>${t}</svg>` : r === "mathml" ? `<math>${t}</math>` : t;
      const l = tl.content;
      if (r === "svg" || r === "mathml") {
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
}, vd = Symbol("_vtc");
function yd(t, e, n) {
  const r = t[vd];
  r && (e = (e ? [e, ...r] : [...r]).join(" ")), e == null ? t.removeAttribute("class") : n ? t.setAttribute("class", e) : t.className = e;
}
const nl = Symbol("_vod"), bd = Symbol("_vsh");
process.env.NODE_ENV;
const Ra = Symbol(process.env.NODE_ENV !== "production" ? "CSS_VAR_TEXT" : "");
function wn(t) {
  const e = Ni();
  if (!e) {
    process.env.NODE_ENV !== "production" && Cr("useCssVars is called without current active component instance.");
    return;
  }
  const n = e.ut = (i = t(e.proxy)) => {
    Array.from(
      document.querySelectorAll(`[data-v-owner="${e.uid}"]`)
    ).forEach((s) => fs(s, i));
  };
  process.env.NODE_ENV !== "production" && (e.getCssVars = () => t(e.proxy));
  const r = () => {
    const i = t(e.proxy);
    cs(e.subTree, i), n(i);
  };
  ua(() => {
    Bf(r);
  }), Xn(() => {
    const i = new MutationObserver(r);
    i.observe(e.subTree.el.parentNode, { childList: !0 }), Ks(() => i.disconnect());
  });
}
function cs(t, e) {
  if (t.shapeFlag & 128) {
    const n = t.suspense;
    t = n.activeBranch, n.pendingBranch && !n.isHydrating && n.effects.push(() => {
      cs(n.activeBranch, e);
    });
  }
  for (; t.component; )
    t = t.component.subTree;
  if (t.shapeFlag & 1 && t.el)
    fs(t.el, e);
  else if (t.type === We)
    t.children.forEach((n) => cs(n, e));
  else if (t.type === ar) {
    let { el: n, anchor: r } = t;
    for (; n && (fs(n, e), n !== r); )
      n = n.nextSibling;
  }
}
function fs(t, e) {
  if (t.nodeType === 1) {
    const n = t.style;
    let r = "";
    for (const i in e)
      n.setProperty(`--${i}`, e[i]), r += `--${i}: ${e[i]};`;
    n[Ra] = r;
  }
}
const xd = /(^|;)\s*display\s*:/;
function Ed(t, e, n) {
  const r = t.style, i = me(n);
  let s = !1;
  if (n && !i) {
    if (e)
      if (me(e))
        for (const o of e.split(";")) {
          const l = o.slice(0, o.indexOf(":")).trim();
          n[l] == null && Kr(r, l, "");
        }
      else
        for (const o in e)
          n[o] == null && Kr(r, o, "");
    for (const o in n)
      o === "display" && (s = !0), Kr(r, o, n[o]);
  } else if (i) {
    if (e !== n) {
      const o = r[Ra];
      o && (n += ";" + o), r.cssText = n, s = xd.test(n);
    }
  } else e && t.removeAttribute("style");
  nl in t && (t[nl] = s ? r.display : "", t[bd] && (r.display = "none"));
}
const Od = /[^\\];\s*$/, rl = /\s*!important$/;
function Kr(t, e, n) {
  if (B(n))
    n.forEach((r) => Kr(t, e, r));
  else if (n == null && (n = ""), process.env.NODE_ENV !== "production" && Od.test(n) && Cr(
    `Unexpected semicolon at the end of '${e}' style value: '${n}'`
  ), e.startsWith("--"))
    t.setProperty(e, n);
  else {
    const r = Nd(t, e);
    rl.test(n) ? t.setProperty(
      Re(r),
      n.replace(rl, ""),
      "important"
    ) : t[r] = n;
  }
}
const il = ["Webkit", "Moz", "ms"], Ii = {};
function Nd(t, e) {
  const n = Ii[e];
  if (n)
    return n;
  let r = et(e);
  if (r !== "filter" && r in t)
    return Ii[e] = r;
  r = pi(r);
  for (let i = 0; i < il.length; i++) {
    const s = il[i] + r;
    if (s in t)
      return Ii[e] = s;
  }
  return e;
}
const sl = "http://www.w3.org/1999/xlink";
function ol(t, e, n, r, i, s = Qu(e)) {
  r && e.startsWith("xlink:") ? n == null ? t.removeAttributeNS(sl, e.slice(6, e.length)) : t.setAttributeNS(sl, e, n) : n == null || s && !Cl(n) ? t.removeAttribute(e) : t.setAttribute(
    e,
    s ? "" : Kn(n) ? String(n) : n
  );
}
function wd(t, e, n, r) {
  if (e === "innerHTML" || e === "textContent") {
    if (n == null) return;
    t[e] = n;
    return;
  }
  const i = t.tagName;
  if (e === "value" && i !== "PROGRESS" && // custom elements may use _value internally
  !i.includes("-")) {
    const o = i === "OPTION" ? t.getAttribute("value") || "" : t.value, l = n == null ? "" : String(n);
    (o !== l || !("_value" in t)) && (t.value = l), n == null && t.removeAttribute(e), t._value = n;
    return;
  }
  let s = !1;
  if (n === "" || n == null) {
    const o = typeof t[e];
    o === "boolean" ? n = Cl(n) : n == null && o === "string" ? (n = "", s = !0) : o === "number" && (n = 0, s = !0);
  }
  try {
    t[e] = n;
  } catch (o) {
    process.env.NODE_ENV !== "production" && !s && Cr(
      `Failed setting prop "${e}" on <${i.toLowerCase()}>: value ${n} is invalid.`,
      o
    );
  }
  s && t.removeAttribute(e);
}
function Td(t, e, n, r) {
  t.addEventListener(e, n, r);
}
function Sd(t, e, n, r) {
  t.removeEventListener(e, n, r);
}
const ll = Symbol("_vei");
function Dd(t, e, n, r, i = null) {
  const s = t[ll] || (t[ll] = {}), o = s[e];
  if (r && o)
    o.value = process.env.NODE_ENV !== "production" ? ul(r, e) : r;
  else {
    const [l, a] = Cd(e);
    if (r) {
      const u = s[e] = Md(
        process.env.NODE_ENV !== "production" ? ul(r, e) : r,
        i
      );
      Td(t, l, u, a);
    } else o && (Sd(t, l, o, a), s[e] = void 0);
  }
}
const al = /(?:Once|Passive|Capture)$/;
function Cd(t) {
  let e;
  if (al.test(t)) {
    e = {};
    let r;
    for (; r = t.match(al); )
      t = t.slice(0, t.length - r[0].length), e[r[0].toLowerCase()] = !0;
  }
  return [t[2] === ":" ? t.slice(3) : Re(t.slice(2)), e];
}
let Fi = 0;
const Vd = /* @__PURE__ */ Promise.resolve(), Pd = () => Fi || (Vd.then(() => Fi = 0), Fi = Date.now());
function Md(t, e) {
  const n = (r) => {
    if (!r._vts)
      r._vts = Date.now();
    else if (r._vts <= n.attached)
      return;
    at(
      kd(r, n.value),
      e,
      5,
      [r]
    );
  };
  return n.value = t, n.attached = Pd(), n;
}
function ul(t, e) {
  return U(t) || B(t) ? t : (Cr(
    `Wrong type passed as event handler to ${e} - did you forget @ or : in front of your prop?
Expected function or array of functions, received type ${typeof t}.`
  ), pe);
}
function kd(t, e) {
  if (B(e)) {
    const n = t.stopImmediatePropagation;
    return t.stopImmediatePropagation = () => {
      n.call(t), t._stopped = !0;
    }, e.map(
      (r) => (i) => !i._stopped && r && r(i)
    );
  } else
    return e;
}
const cl = (t) => t.charCodeAt(0) === 111 && t.charCodeAt(1) === 110 && // lowercase letter
t.charCodeAt(2) > 96 && t.charCodeAt(2) < 123, Ad = (t, e, n, r, i, s) => {
  const o = i === "svg";
  e === "class" ? yd(t, r, o) : e === "style" ? Ed(t, n, r) : Nr(e) ? Qr(e) || Dd(t, e, n, r, s) : (e[0] === "." ? (e = e.slice(1), !0) : e[0] === "^" ? (e = e.slice(1), !1) : Rd(t, e, r, o)) ? (wd(t, e, r), !t.tagName.includes("-") && (e === "value" || e === "checked" || e === "selected") && ol(t, e, r, o, s, e !== "value")) : (e === "true-value" ? t._trueValue = r : e === "false-value" && (t._falseValue = r), ol(t, e, r, o));
};
function Rd(t, e, n, r) {
  if (r)
    return !!(e === "innerHTML" || e === "textContent" || e in t && cl(e) && U(n));
  if (e === "spellcheck" || e === "draggable" || e === "translate" || e === "form" || e === "list" && t.tagName === "INPUT" || e === "type" && t.tagName === "TEXTAREA")
    return !1;
  if (e === "width" || e === "height") {
    const i = t.tagName;
    if (i === "IMG" || i === "VIDEO" || i === "CANVAS" || i === "SOURCE")
      return !1;
  }
  return cl(e) && me(n) ? !1 : e in t;
}
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function Tn(t, e, n) {
  const r = /* @__PURE__ */ Qt(t, e);
  class i extends no {
    constructor(o) {
      super(r, o, n);
    }
  }
  return i.def = r, i;
}
const Id = typeof HTMLElement < "u" ? HTMLElement : class {
};
class no extends Id {
  constructor(e, n = {}, r) {
    super(), this._def = e, this._props = n, this._instance = null, this._connected = !1, this._resolved = !1, this._numberProps = null, this._ob = null, this.shadowRoot && r ? r(this._createVNode(), this.shadowRoot) : (process.env.NODE_ENV !== "production" && this.shadowRoot && Cr(
      "Custom element has pre-rendered declarative shadow root but is not defined as hydratable. Use `defineSSRCustomElement`."
    ), this.attachShadow({ mode: "open" }), this._def.__asyncLoader || this._resolveProps(this._def));
  }
  connectedCallback() {
    this._connected = !0, this._instance || (this._resolved ? this._update() : this._resolveDef());
  }
  disconnectedCallback() {
    this._connected = !1, js(() => {
      this._connected || (this._ob && (this._ob.disconnect(), this._ob = null), dl(null, this.shadowRoot), this._instance = null);
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
          (u === Number || u && u.type === Number) && (a in this._props && (this._props[a] = Co(this._props[a])), (l || (l = /* @__PURE__ */ Object.create(null)))[et(a)] = !0);
        }
      this._numberProps = l, i && this._resolveProps(r), this._applyStyles(o), this._update();
    }, n = this._def.__asyncLoader;
    n ? n().then((r) => e(r, !0)) : e(this._def);
  }
  _resolveProps(e) {
    const { props: n } = e, r = B(n) ? n : Object.keys(n || {});
    for (const i of Object.keys(this))
      i[0] !== "_" && r.includes(i) && this._setProp(i, this[i], !0, !1);
    for (const i of r.map(et))
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
    let n = this.hasAttribute(e) ? this.getAttribute(e) : void 0;
    const r = et(e);
    this._numberProps && this._numberProps[r] && (n = Co(n)), this._setProp(r, n, !1);
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
    n !== this._props[e] && (this._props[e] = n, i && this._instance && this._update(), r && (n === !0 ? this.setAttribute(Re(e), "") : typeof n == "string" || typeof n == "number" ? this.setAttribute(Re(e), n + "") : n || this.removeAttribute(Re(e))));
  }
  _update() {
    dl(this._createVNode(), this.shadowRoot);
  }
  _createVNode() {
    const e = mt(this._def, de({}, this._props));
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
        r(s, o), Re(s) !== s && r(Re(s), o);
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
const Fd = /* @__PURE__ */ de({ patchProp: Ad }, md);
let fl;
function $d() {
  return fl || (fl = Rf(Fd));
}
const dl = (...t) => {
  $d().render(...t);
};
/**
* vue v3.4.37
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function Ld() {
  pd();
}
process.env.NODE_ENV !== "production" && Ld();
const zd = { class: "text-flash" }, Bd = /* @__PURE__ */ Qt({
  __name: "TextFlash",
  props: {
    lineColor: { default: "white", type: String },
    lineHeight: { default: "1px", type: String },
    hoverTextColor: { default: "currentColor", type: String }
  },
  setup(t) {
    return wn((e) => ({
      "2c672104": e.lineColor,
      "57bb546c": e.lineHeight,
      "264d960b": e.hoverTextColor
    })), (e, n) => (Jt(), Nn("div", zd, [
      xi(e.$slots, "default")
    ]));
  }
}), jd = '.text-flash{--text-flash-line-color: var(--2c672104);--text-flash-line-height: var(--57bb546c);--text-flash-line-offset: .6px;--text-flash-easing: cubic-bezier(.19, 1, .22, 1);--text-flash-hover-text-color: var(--264d960b);position:relative;display:inline-flex;transition:.5s}.text-flash:before,.text-flash:after{position:absolute;content:"";left:0;bottom:calc((var(--text-flash-line-height) + var(--text-flash-line-offset)) * -1);display:block;width:100%;height:var(--text-flash-line-height);background:var(--text-flash-line-color);transition:1.1s var(--text-flash-easing)}.text-flash:before{transform:scaleX(0);transform-origin:left}.text-flash:after{transform-origin:right;transition-delay:.25s}.text-flash:hover{color:var(--text-flash-hover-text-color)}.text-flash:hover:before{transform:scaleX(1);transition-delay:.25s}.text-flash:hover:after{transform:scaleX(0);transition-delay:0s}', Sn = (t, e) => {
  const n = t.__vccOpts || t;
  for (const [r, i] of e)
    n[r] = i;
  return n;
}, Ud = /* @__PURE__ */ Sn(Bd, [["styles", [jd]]]), Hd = /* @__PURE__ */ Tn(Ud);
function Wd(t = "text-flash") {
  customElements.define(t, Hd);
}
const Yd = { class: "text-block" }, Kd = /* @__PURE__ */ Qt({
  __name: "TextBlock",
  props: {
    blockColor: { default: "#5e5e5e", type: String },
    hoverTextColor: { default: "currentColor", type: String },
    textPadding: { default: "0 2px", type: String },
    blockTransformOrigin: { default: "bottom", type: String }
  },
  setup(t) {
    return wn((e) => ({
      "1abee73c": e.blockColor,
      "681a7834": e.hoverTextColor,
      "33ac7bd0": e.textPadding,
      "1b2e2ff1": e.blockTransformOrigin
    })), (e, n) => (Jt(), Nn("div", Yd, [
      xi(e.$slots, "default")
    ]));
  }
}), Xd = '.text-block{--text-block-block-color: var(--1abee73c);--text-block-easing: cubic-bezier(.165, .84, .44, 1);--text-block-hover-text-color: var(--681a7834);--text-block-text-padding: var(--33ac7bd0);--text-block-block-transform-origin: var(--1b2e2ff1);position:relative;display:inline-flex;padding:var(--text-block-text-padding);transition:.35s}.text-block:before{position:absolute;content:"";z-index:-1;left:0;bottom:0;display:block;width:100%;height:100%;background:var(--text-block-block-color);transition:.35s var(--text-block-easing)}.text-block:before{transform:scaleY(0);transform-origin:var(--text-block-block-transform-origin)}.text-block:hover{color:var(--text-block-hover-text-color)}.text-block:hover:before{transform:scaleY(1)}', qd = /* @__PURE__ */ Sn(Kd, [["styles", [Xd]]]), Gd = /* @__PURE__ */ Tn(qd);
function Qd(t = "text-block") {
  customElements.define(t, Gd);
}
function ro(t) {
  return Vl() ? (ec(t), !0) : !1;
}
function io(t) {
  return typeof t == "function" ? t() : Xl(t);
}
const Jd = typeof window < "u" && typeof document < "u";
typeof WorkerGlobalScope < "u" && globalThis instanceof WorkerGlobalScope;
const Zd = (t) => t != null, eh = Object.prototype.toString, th = (t) => eh.call(t) === "[object Object]", nh = () => {
};
function rh(t) {
  return Ni();
}
function ih(t, e = !0, n) {
  rh() ? Xn(t, n) : e ? t() : js(t);
}
function xn(t) {
  var e;
  const n = io(t);
  return (e = n == null ? void 0 : n.$el) != null ? e : n;
}
const Vr = Jd ? window : void 0;
function un(...t) {
  let e, n, r, i;
  if (typeof t[0] == "string" || Array.isArray(t[0]) ? ([n, r, i] = t, e = Vr) : [e, n, r, i] = t, !e)
    return nh;
  Array.isArray(n) || (n = [n]), Array.isArray(r) || (r = [r]);
  const s = [], o = () => {
    s.forEach((c) => c()), s.length = 0;
  }, l = (c, f, d, _) => (c.addEventListener(f, d, _), () => c.removeEventListener(f, d, _)), a = Ht(
    () => [xn(e), io(i)],
    ([c, f]) => {
      if (o(), !c)
        return;
      const d = th(f) ? { ...f } : f;
      s.push(
        ...n.flatMap((_) => r.map((m) => l(c, _, m, d)))
      );
    },
    { immediate: !0, flush: "post" }
  ), u = () => {
    a(), o();
  };
  return ro(u), u;
}
function sh() {
  const t = se(!1), e = Ni();
  return e && Xn(() => {
    t.value = !0;
  }, e), t;
}
function Ia(t) {
  const e = sh();
  return Ue(() => (e.value, !!t()));
}
function oh(t, e, n = {}) {
  const { window: r = Vr, ...i } = n;
  let s;
  const o = Ia(() => r && "MutationObserver" in r), l = () => {
    s && (s.disconnect(), s = void 0);
  }, a = Ue(() => {
    const d = io(t), _ = (Array.isArray(d) ? d : [d]).map(xn).filter(Zd);
    return new Set(_);
  }), u = Ht(
    () => a.value,
    (d) => {
      l(), o.value && d.size && (s = new MutationObserver(e), d.forEach((_) => s.observe(_, i)));
    },
    { immediate: !0, flush: "post" }
  ), c = () => s == null ? void 0 : s.takeRecords(), f = () => {
    l(), u();
  };
  return ro(f), {
    isSupported: o,
    stop: f,
    takeRecords: c
  };
}
function lh(t, e, n = {}) {
  const { window: r = Vr, ...i } = n;
  let s;
  const o = Ia(() => r && "ResizeObserver" in r), l = () => {
    s && (s.disconnect(), s = void 0);
  }, a = Ue(() => Array.isArray(t) ? t.map((f) => xn(f)) : [xn(t)]), u = Ht(
    a,
    (f) => {
      if (l(), o.value && r) {
        s = new ResizeObserver(e);
        for (const d of f)
          d && s.observe(d, i);
      }
    },
    { immediate: !0, flush: "post" }
  ), c = () => {
    l(), u();
  };
  return ro(c), {
    isSupported: o,
    stop: c
  };
}
function ah(t, e = {}) {
  const {
    reset: n = !0,
    windowResize: r = !0,
    windowScroll: i = !0,
    immediate: s = !0
  } = e, o = se(0), l = se(0), a = se(0), u = se(0), c = se(0), f = se(0), d = se(0), _ = se(0);
  function m() {
    const h = xn(t);
    if (!h) {
      n && (o.value = 0, l.value = 0, a.value = 0, u.value = 0, c.value = 0, f.value = 0, d.value = 0, _.value = 0);
      return;
    }
    const v = h.getBoundingClientRect();
    o.value = v.height, l.value = v.bottom, a.value = v.left, u.value = v.right, c.value = v.top, f.value = v.width, d.value = v.x, _.value = v.y;
  }
  return lh(t, m), Ht(() => xn(t), (h) => !h && m()), oh(t, m, {
    attributeFilter: ["style", "class"]
  }), i && un("scroll", m, { capture: !0, passive: !0 }), r && un("resize", m, { passive: !0 }), ih(() => {
    s && m();
  }), {
    height: o,
    bottom: l,
    left: a,
    right: u,
    top: c,
    width: f,
    x: d,
    y: _,
    update: m
  };
}
const uh = {
  page: (t) => [t.pageX, t.pageY],
  client: (t) => [t.clientX, t.clientY],
  screen: (t) => [t.screenX, t.screenY],
  movement: (t) => t instanceof Touch ? null : [t.movementX, t.movementY]
};
function ch(t = {}) {
  const {
    type: e = "page",
    touch: n = !0,
    resetOnTouchEnds: r = !1,
    initialValue: i = { x: 0, y: 0 },
    window: s = Vr,
    target: o = s,
    scroll: l = !0,
    eventFilter: a
  } = t;
  let u = null;
  const c = se(i.x), f = se(i.y), d = se(null), _ = typeof e == "function" ? e : uh[e], m = (y) => {
    const P = _(y);
    u = y, P && ([c.value, f.value] = P, d.value = "mouse");
  }, h = (y) => {
    if (y.touches.length > 0) {
      const P = _(y.touches[0]);
      P && ([c.value, f.value] = P, d.value = "touch");
    }
  }, v = () => {
    if (!u || !s)
      return;
    const y = _(u);
    u instanceof MouseEvent && y && (c.value = y[0] + s.scrollX, f.value = y[1] + s.scrollY);
  }, x = () => {
    c.value = i.x, f.value = i.y;
  }, E = a ? (y) => a(() => m(y), {}) : (y) => m(y), O = a ? (y) => a(() => h(y), {}) : (y) => h(y), w = a ? () => a(() => v(), {}) : () => v();
  if (o) {
    const y = { passive: !0 };
    un(o, ["mousemove", "dragover"], E, y), n && e !== "movement" && (un(o, ["touchstart", "touchmove"], O, y), r && un(o, "touchend", x, y)), l && e === "page" && un(s, "scroll", w, { passive: !0 });
  }
  return {
    x: c,
    y: f,
    sourceType: d
  };
}
function fh(t, e = {}) {
  const {
    handleOutside: n = !0,
    window: r = Vr
  } = e, i = e.type || "page", { x: s, y: o, sourceType: l } = ch(e), a = se(t ?? (r == null ? void 0 : r.document.body)), u = se(0), c = se(0), f = se(0), d = se(0), _ = se(0), m = se(0), h = se(!0);
  let v = () => {
  };
  return r && (v = Ht(
    [a, s, o],
    () => {
      const x = xn(a);
      if (!x)
        return;
      const {
        left: E,
        top: O,
        width: w,
        height: y
      } = x.getBoundingClientRect();
      f.value = E + (i === "page" ? r.pageXOffset : 0), d.value = O + (i === "page" ? r.pageYOffset : 0), _.value = y, m.value = w;
      const P = s.value - f.value, N = o.value - d.value;
      h.value = w === 0 || y === 0 || P < 0 || N < 0 || P > w || N > y, (n || !h.value) && (u.value = P, c.value = N);
    },
    { immediate: !0 }
  ), un(document, "mouseleave", () => {
    h.value = !0;
  })), {
    x: s,
    y: o,
    sourceType: l,
    elementX: u,
    elementY: c,
    elementPositionX: f,
    elementPositionY: d,
    elementHeight: _,
    elementWidth: m,
    isOutside: h,
    stop: v
  };
}
const dh = /* @__PURE__ */ Qt({
  __name: "MagnetMouse",
  props: {
    threshold: { default: 100, type: Number },
    transitionDuration: { default: 0.3, type: Number },
    strength: { default: 0.45, type: Number }
  },
  setup(t) {
    wn((E) => ({
      "5d55d048": n.value
    }));
    const e = t, n = Ue(() => `${e.transitionDuration}s`), r = se(null), { x: i, y: s } = fh(r), { left: o, top: l, width: a, height: u } = ah(r), c = Ue(() => o.value + a.value / 2), f = Ue(() => l.value + u.value / 2), d = Ue(() => c.value - i.value), _ = Ue(() => f.value - s.value), m = Ue(() => Math.hypot(d.value, _.value)), h = Ue(() => m.value < e.threshold), v = Ue(() => -e.strength * Math.floor(d.value)), x = Ue(() => -e.strength * Math.floor(_.value));
    return (E, O) => (Jt(), Nn("div", {
      class: "magnet-mouse",
      ref_key: "target",
      ref: r,
      style: _i({
        "--magnet-mouse-x": `${h.value ? v.value : 0}px`,
        "--magnet-mouse-y": `${h.value ? x.value : 0}px`
      })
    }, [
      xi(E.$slots, "default")
    ], 4));
  }
}), hh = ".magnet-mouse{--magnet-mouse-x: 0;--magnet-mouse-y: 0;--magnet-mouse-transition-duration: var(--5d55d048);display:inline-flex;transform:translate(var(--magnet-mouse-x),var(--magnet-mouse-y));transition:var(--magnet-mouse-transition-duration)}", ph = /* @__PURE__ */ Sn(dh, [["styles", [hh]]]), _h = /* @__PURE__ */ Tn(ph);
function gh(t = "magnet-mouse") {
  customElements.define(t, _h);
}
const mh = /* @__PURE__ */ Qt({
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
    wn((r) => ({
      "00c7d7e0": r.textColor,
      c6299c98: r.textSize,
      "1578f36b": r.textWeight,
      c63543fc: r.textFont,
      "534ed873": r.textLeading,
      "0080025e": r.textStyle,
      "656e65d0": r.textWhiteSpace
    }));
    const e = t, n = se(null);
    return Xn(() => {
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
    }), (r, i) => (Jt(), Nn("div", {
      class: "text-blink",
      ref_key: "parent",
      ref: n
    }, null, 512));
  }
}), vh = ".text-blink{--text-blink-color: var(--00c7d7e0);--text-blink-size: var(--c6299c98);--text-blink-weight: var(--1578f36b);--text-blink-font: var(--c63543fc);--text-blink-leading: var(--534ed873);--text-blink-style: var(--0080025e);--text-blink-white-space: var(--656e65d0);display:flex}.text-blink span{position:relative;overflow:hidden;transition:.6s;color:var(--text-blink-color);font-size:var(--text-blink-size);font-weight:var(--text-blink-weight);font-family:var(--text-blink-font);line-height:var(--text-blink-leading);font-style:var(--text-blink-style);white-space:var(--text-blink-white-space)}.text-blink span .out{display:inline-flex}.text-blink span .in{position:absolute;left:0;opacity:0;transform:translate(100%)}.text-blink:hover span .out{opacity:0;transform:translate(-100%)}.text-blink:hover span .in{opacity:1;transform:translate(0)}", yh = /* @__PURE__ */ Sn(mh, [["styles", [vh]]]), bh = /* @__PURE__ */ Tn(yh);
function xh(t = "text-blink") {
  customElements.define(t, bh);
}
function wt(t) {
  if (t === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return t;
}
function Fa(t, e) {
  t.prototype = Object.create(e.prototype), t.prototype.constructor = t, t.__proto__ = e;
}
/*!
 * GSAP 3.12.5
 * https://gsap.com
 *
 * @license Copyright 2008-2024, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/
var qe = {
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
}, so, Se, ae, Je = 1e8, oe = 1 / Je, ds = Math.PI * 2, Eh = ds / 4, Oh = 0, $a = Math.sqrt, Nh = Math.cos, wh = Math.sin, xe = function(e) {
  return typeof e == "string";
}, fe = function(e) {
  return typeof e == "function";
}, Pt = function(e) {
  return typeof e == "number";
}, oo = function(e) {
  return typeof e > "u";
}, yt = function(e) {
  return typeof e == "object";
}, Ie = function(e) {
  return e !== !1;
}, lo = function() {
  return typeof window < "u";
}, Lr = function(e) {
  return fe(e) || xe(e);
}, La = typeof ArrayBuffer == "function" && ArrayBuffer.isView || function() {
}, De = Array.isArray, hs = /(?:-?\.?\d|\.)+/gi, za = /[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g, Pn = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g, $i = /[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi, Ba = /[+-]=-?[.\d]+/, ja = /[^,'"\[\]\s]+/gi, Th = /^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i, ue, ft, ps, ao, Ge = {}, si = {}, Ua, Ha = function(e) {
  return (si = En(e, Ge)) && ze;
}, uo = function(e, n) {
  return console.warn("Invalid property", e, "set to", n, "Missing plugin? gsap.registerPlugin()");
}, mr = function(e, n) {
  return !n && console.warn(e);
}, Wa = function(e, n) {
  return e && (Ge[e] = n) && si && (si[e] = n) || Ge;
}, vr = function() {
  return 0;
}, Sh = {
  suppressEvents: !0,
  isStart: !0,
  kill: !1
}, Xr = {
  suppressEvents: !0,
  kill: !1
}, Dh = {
  suppressEvents: !0
}, co = {}, Wt = [], _s = {}, Ya, He = {}, Li = {}, hl = 30, qr = [], fo = "", ho = function(e) {
  var n = e[0], r, i;
  if (yt(n) || fe(n) || (e = [e]), !(r = (n._gsap || {}).harness)) {
    for (i = qr.length; i-- && !qr[i].targetTest(n); )
      ;
    r = qr[i];
  }
  for (i = e.length; i--; )
    e[i] && (e[i]._gsap || (e[i]._gsap = new gu(e[i], r))) || e.splice(i, 1);
  return e;
}, gn = function(e) {
  return e._gsap || ho(Ze(e))[0]._gsap;
}, Ka = function(e, n, r) {
  return (r = e[n]) && fe(r) ? e[n]() : oo(r) && e.getAttribute && e.getAttribute(n) || r;
}, Fe = function(e, n) {
  return (e = e.split(",")).forEach(n) || e;
}, he = function(e) {
  return Math.round(e * 1e5) / 1e5 || 0;
}, ye = function(e) {
  return Math.round(e * 1e7) / 1e7 || 0;
}, $n = function(e, n) {
  var r = n.charAt(0), i = parseFloat(n.substr(2));
  return e = parseFloat(e), r === "+" ? e + i : r === "-" ? e - i : r === "*" ? e * i : e / i;
}, Ch = function(e, n) {
  for (var r = n.length, i = 0; e.indexOf(n[i]) < 0 && ++i < r; )
    ;
  return i < r;
}, oi = function() {
  var e = Wt.length, n = Wt.slice(0), r, i;
  for (_s = {}, Wt.length = 0, r = 0; r < e; r++)
    i = n[r], i && i._lazy && (i.render(i._lazy[0], i._lazy[1], !0)._lazy = 0);
}, Xa = function(e, n, r, i) {
  Wt.length && !Se && oi(), e.render(n, r, Se && n < 0 && (e._initted || e._startAt)), Wt.length && !Se && oi();
}, qa = function(e) {
  var n = parseFloat(e);
  return (n || n === 0) && (e + "").match(ja).length < 2 ? n : xe(e) ? e.trim() : e;
}, Ga = function(e) {
  return e;
}, nt = function(e, n) {
  for (var r in n)
    r in e || (e[r] = n[r]);
  return e;
}, Vh = function(e) {
  return function(n, r) {
    for (var i in r)
      i in n || i === "duration" && e || i === "ease" || (n[i] = r[i]);
  };
}, En = function(e, n) {
  for (var r in n)
    e[r] = n[r];
  return e;
}, pl = function t(e, n) {
  for (var r in n)
    r !== "__proto__" && r !== "constructor" && r !== "prototype" && (e[r] = yt(n[r]) ? t(e[r] || (e[r] = {}), n[r]) : n[r]);
  return e;
}, li = function(e, n) {
  var r = {}, i;
  for (i in e)
    i in n || (r[i] = e[i]);
  return r;
}, cr = function(e) {
  var n = e.parent || ue, r = e.keyframes ? Vh(De(e.keyframes)) : nt;
  if (Ie(e.inherit))
    for (; n; )
      r(e, n.vars.defaults), n = n.parent || n._dp;
  return e;
}, Ph = function(e, n) {
  for (var r = e.length, i = r === n.length; i && r-- && e[r] === n[r]; )
    ;
  return r < 0;
}, Qa = function(e, n, r, i, s) {
  var o = e[i], l;
  if (s)
    for (l = n[s]; o && o[s] > l; )
      o = o._prev;
  return o ? (n._next = o._next, o._next = n) : (n._next = e[r], e[r] = n), n._next ? n._next._prev = n : e[i] = n, n._prev = o, n.parent = n._dp = e, n;
}, Si = function(e, n, r, i) {
  r === void 0 && (r = "_first"), i === void 0 && (i = "_last");
  var s = n._prev, o = n._next;
  s ? s._next = o : e[r] === n && (e[r] = o), o ? o._prev = s : e[i] === n && (e[i] = s), n._next = n._prev = n.parent = null;
}, qt = function(e, n) {
  e.parent && (!n || e.parent.autoRemoveChildren) && e.parent.remove && e.parent.remove(e), e._act = 0;
}, mn = function(e, n) {
  if (e && (!n || n._end > e._dur || n._start < 0))
    for (var r = e; r; )
      r._dirty = 1, r = r.parent;
  return e;
}, Mh = function(e) {
  for (var n = e.parent; n && n.parent; )
    n._dirty = 1, n.totalDuration(), n = n.parent;
  return e;
}, gs = function(e, n, r, i) {
  return e._startAt && (Se ? e._startAt.revert(Xr) : e.vars.immediateRender && !e.vars.autoRevert || e._startAt.render(n, !0, i));
}, kh = function t(e) {
  return !e || e._ts && t(e.parent);
}, _l = function(e) {
  return e._repeat ? jn(e._tTime, e = e.duration() + e._rDelay) * e : 0;
}, jn = function(e, n) {
  var r = Math.floor(e /= n);
  return e && r === e ? r - 1 : r;
}, ai = function(e, n) {
  return (e - n._start) * n._ts + (n._ts >= 0 ? 0 : n._dirty ? n.totalDuration() : n._tDur);
}, Di = function(e) {
  return e._end = ye(e._start + (e._tDur / Math.abs(e._ts || e._rts || oe) || 0));
}, Ci = function(e, n) {
  var r = e._dp;
  return r && r.smoothChildTiming && e._ts && (e._start = ye(r._time - (e._ts > 0 ? n / e._ts : ((e._dirty ? e.totalDuration() : e._tDur) - n) / -e._ts)), Di(e), r._dirty || mn(r, e)), e;
}, Ja = function(e, n) {
  var r;
  if ((n._time || !n._dur && n._initted || n._start < e._time && (n._dur || !n.add)) && (r = ai(e.rawTime(), n), (!n._dur || Pr(0, n.totalDuration(), r) - n._tTime > oe) && n.render(r, !0)), mn(e, n)._dp && e._initted && e._time >= e._dur && e._ts) {
    if (e._dur < e.duration())
      for (r = e; r._dp; )
        r.rawTime() >= 0 && r.totalTime(r._tTime), r = r._dp;
    e._zTime = -oe;
  }
}, ht = function(e, n, r, i) {
  return n.parent && qt(n), n._start = ye((Pt(r) ? r : r || e !== ue ? Qe(e, r, n) : e._time) + n._delay), n._end = ye(n._start + (n.totalDuration() / Math.abs(n.timeScale()) || 0)), Qa(e, n, "_first", "_last", e._sort ? "_start" : 0), ms(n) || (e._recent = n), i || Ja(e, n), e._ts < 0 && Ci(e, e._tTime), e;
}, Za = function(e, n) {
  return (Ge.ScrollTrigger || uo("scrollTrigger", n)) && Ge.ScrollTrigger.create(n, e);
}, eu = function(e, n, r, i, s) {
  if (_o(e, n, s), !e._initted)
    return 1;
  if (!r && e._pt && !Se && (e._dur && e.vars.lazy !== !1 || !e._dur && e.vars.lazy) && Ya !== Ye.frame)
    return Wt.push(e), e._lazy = [s, i], 1;
}, Ah = function t(e) {
  var n = e.parent;
  return n && n._ts && n._initted && !n._lock && (n.rawTime() < 0 || t(n));
}, ms = function(e) {
  var n = e.data;
  return n === "isFromStart" || n === "isStart";
}, Rh = function(e, n, r, i) {
  var s = e.ratio, o = n < 0 || !n && (!e._start && Ah(e) && !(!e._initted && ms(e)) || (e._ts < 0 || e._dp._ts < 0) && !ms(e)) ? 0 : 1, l = e._rDelay, a = 0, u, c, f;
  if (l && e._repeat && (a = Pr(0, e._tDur, n), c = jn(a, l), e._yoyo && c & 1 && (o = 1 - o), c !== jn(e._tTime, l) && (s = 1 - o, e.vars.repeatRefresh && e._initted && e.invalidate())), o !== s || Se || i || e._zTime === oe || !n && e._zTime) {
    if (!e._initted && eu(e, n, i, r, a))
      return;
    for (f = e._zTime, e._zTime = n || (r ? oe : 0), r || (r = n && !f), e.ratio = o, e._from && (o = 1 - o), e._time = 0, e._tTime = a, u = e._pt; u; )
      u.r(o, u.d), u = u._next;
    n < 0 && gs(e, n, r, !0), e._onUpdate && !r && Xe(e, "onUpdate"), a && e._repeat && !r && e.parent && Xe(e, "onRepeat"), (n >= e._tDur || n < 0) && e.ratio === o && (o && qt(e, 1), !r && !Se && (Xe(e, o ? "onComplete" : "onReverseComplete", !0), e._prom && e._prom()));
  } else e._zTime || (e._zTime = n);
}, Ih = function(e, n, r) {
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
  var s = e._repeat, o = ye(n) || 0, l = e._tTime / e._tDur;
  return l && !i && (e._time *= o / e._dur), e._dur = o, e._tDur = s ? s < 0 ? 1e10 : ye(o * (s + 1) + e._rDelay * s) : o, l > 0 && !i && Ci(e, e._tTime = e._tDur * l), e.parent && Di(e), r || mn(e.parent, e), e;
}, gl = function(e) {
  return e instanceof Me ? mn(e) : Un(e, e._dur);
}, Fh = {
  _start: 0,
  endTime: vr,
  totalDuration: vr
}, Qe = function t(e, n, r) {
  var i = e.labels, s = e._recent || Fh, o = e.duration() >= Je ? s.endTime(!1) : e._dur, l, a, u;
  return xe(n) && (isNaN(n) || n in i) ? (a = n.charAt(0), u = n.substr(-1) === "%", l = n.indexOf("="), a === "<" || a === ">" ? (l >= 0 && (n = n.replace(/=/, "")), (a === "<" ? s._start : s.endTime(s._repeat >= 0)) + (parseFloat(n.substr(1)) || 0) * (u ? (l < 0 ? s : r).totalDuration() / 100 : 1)) : l < 0 ? (n in i || (i[n] = o), i[n]) : (a = parseFloat(n.charAt(l - 1) + n.substr(l + 1)), u && r && (a = a / 100 * (De(r) ? r[0] : r).totalDuration()), l > 1 ? t(e, n.substr(0, l - 1), r) + a : o + a)) : n == null ? o : +n;
}, fr = function(e, n, r) {
  var i = Pt(n[1]), s = (i ? 2 : 1) + (e < 2 ? 0 : 1), o = n[s], l, a;
  if (i && (o.duration = n[1]), o.parent = r, e) {
    for (l = o, a = r; a && !("immediateRender" in l); )
      l = a.vars.defaults || {}, a = Ie(a.vars.inherit) && a.parent;
    o.immediateRender = Ie(l.immediateRender), e < 2 ? o.runBackwards = 1 : o.startAt = n[s - 1];
  }
  return new ge(n[0], o, n[s + 1]);
}, Zt = function(e, n) {
  return e || e === 0 ? n(e) : n;
}, Pr = function(e, n, r) {
  return r < e ? e : r > n ? n : r;
}, Te = function(e, n) {
  return !xe(e) || !(n = Th.exec(e)) ? "" : n[1];
}, $h = function(e, n, r) {
  return Zt(r, function(i) {
    return Pr(e, n, i);
  });
}, vs = [].slice, tu = function(e, n) {
  return e && yt(e) && "length" in e && (!n && !e.length || e.length - 1 in e && yt(e[0])) && !e.nodeType && e !== ft;
}, Lh = function(e, n, r) {
  return r === void 0 && (r = []), e.forEach(function(i) {
    var s;
    return xe(i) && !n || tu(i, 1) ? (s = r).push.apply(s, Ze(i)) : r.push(i);
  }) || r;
}, Ze = function(e, n, r) {
  return ae && !n && ae.selector ? ae.selector(e) : xe(e) && !r && (ps || !Hn()) ? vs.call((n || ao).querySelectorAll(e), 0) : De(e) ? Lh(e, r) : tu(e) ? vs.call(e, 0) : e ? [e] : [];
}, ys = function(e) {
  return e = Ze(e)[0] || mr("Invalid scope") || {}, function(n) {
    var r = e.current || e.nativeElement || e;
    return Ze(n, r.querySelectorAll ? r : r === e ? mr("Invalid scope") || ao.createElement("div") : e);
  };
}, nu = function(e) {
  return e.sort(function() {
    return 0.5 - Math.random();
  });
}, ru = function(e) {
  if (fe(e))
    return e;
  var n = yt(e) ? e : {
    each: e
  }, r = vn(n.ease), i = n.from || 0, s = parseFloat(n.base) || 0, o = {}, l = i > 0 && i < 1, a = isNaN(i) || l, u = n.axis, c = i, f = i;
  return xe(i) ? c = f = {
    center: 0.5,
    edges: 0.5,
    end: 1
  }[i] || 0 : !l && a && (c = i[0], f = i[1]), function(d, _, m) {
    var h = (m || n).length, v = o[h], x, E, O, w, y, P, N, k, D;
    if (!v) {
      if (D = n.grid === "auto" ? 0 : (n.grid || [1, Je])[1], !D) {
        for (N = -Je; N < (N = m[D++].getBoundingClientRect().left) && D < h; )
          ;
        D < h && D--;
      }
      for (v = o[h] = [], x = a ? Math.min(D, h) * c - 0.5 : i % D, E = D === Je ? 0 : a ? h * f / D - 0.5 : i / D | 0, N = 0, k = Je, P = 0; P < h; P++)
        O = P % D - x, w = E - (P / D | 0), v[P] = y = u ? Math.abs(u === "y" ? w : O) : $a(O * O + w * w), y > N && (N = y), y < k && (k = y);
      i === "random" && nu(v), v.max = N - k, v.min = k, v.v = h = (parseFloat(n.amount) || parseFloat(n.each) * (D > h ? h - 1 : u ? u === "y" ? h / D : D : Math.max(D, h / D)) || 0) * (i === "edges" ? -1 : 1), v.b = h < 0 ? s - h : s, v.u = Te(n.amount || n.each) || 0, r = r && h < 0 ? hu(r) : r;
    }
    return h = (v[d] - v.min) / v.max || 0, ye(v.b + (r ? r(h) : h) * v.v) + v.u;
  };
}, bs = function(e) {
  var n = Math.pow(10, ((e + "").split(".")[1] || "").length);
  return function(r) {
    var i = ye(Math.round(parseFloat(r) / e) * e * n);
    return (i - i % 1) / n + (Pt(r) ? 0 : Te(r));
  };
}, iu = function(e, n) {
  var r = De(e), i, s;
  return !r && yt(e) && (i = r = e.radius || Je, e.values ? (e = Ze(e.values), (s = !Pt(e[0])) && (i *= i)) : e = bs(e.increment)), Zt(n, r ? fe(e) ? function(o) {
    return s = e(o), Math.abs(s - o) <= i ? s : o;
  } : function(o) {
    for (var l = parseFloat(s ? o.x : o), a = parseFloat(s ? o.y : 0), u = Je, c = 0, f = e.length, d, _; f--; )
      s ? (d = e[f].x - l, _ = e[f].y - a, d = d * d + _ * _) : d = Math.abs(e[f] - l), d < u && (u = d, c = f);
    return c = !i || u <= i ? e[c] : o, s || c === o || Pt(o) ? c : c + Te(o);
  } : bs(e));
}, su = function(e, n, r, i) {
  return Zt(De(e) ? !n : r === !0 ? !!(r = 0) : !i, function() {
    return De(e) ? e[~~(Math.random() * e.length)] : (r = r || 1e-5) && (i = r < 1 ? Math.pow(10, (r + "").length - 2) : 1) && Math.floor(Math.round((e - r / 2 + Math.random() * (n - e + r * 0.99)) / r) * r * i) / i;
  });
}, zh = function() {
  for (var e = arguments.length, n = new Array(e), r = 0; r < e; r++)
    n[r] = arguments[r];
  return function(i) {
    return n.reduce(function(s, o) {
      return o(s);
    }, i);
  };
}, Bh = function(e, n) {
  return function(r) {
    return e(parseFloat(r)) + (n || Te(r));
  };
}, jh = function(e, n, r) {
  return lu(e, n, 0, 1, r);
}, ou = function(e, n, r) {
  return Zt(r, function(i) {
    return e[~~n(i)];
  });
}, Uh = function t(e, n, r) {
  var i = n - e;
  return De(e) ? ou(e, t(0, e.length), n) : Zt(r, function(s) {
    return (i + (s - e) % i) % i + e;
  });
}, Hh = function t(e, n, r) {
  var i = n - e, s = i * 2;
  return De(e) ? ou(e, t(0, e.length - 1), n) : Zt(r, function(o) {
    return o = (s + (o - e) % s) % s || 0, e + (o > i ? s - o : o);
  });
}, yr = function(e) {
  for (var n = 0, r = "", i, s, o, l; ~(i = e.indexOf("random(", n)); )
    o = e.indexOf(")", i), l = e.charAt(i + 7) === "[", s = e.substr(i + 7, o - i - 7).match(l ? ja : hs), r += e.substr(n, i - n) + su(l ? s : +s[0], l ? 0 : +s[1], +s[2] || 1e-5), n = o + 1;
  return r + e.substr(n, e.length - n);
}, lu = function(e, n, r, i, s) {
  var o = n - e, l = i - r;
  return Zt(s, function(a) {
    return r + ((a - e) / o * l || 0);
  });
}, Wh = function t(e, n, r, i) {
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
    else if (De(e) && !De(n)) {
      for (c = [], f = e.length, d = f - 2, u = 1; u < f; u++)
        c.push(t(e[u - 1], e[u]));
      f--, s = function(m) {
        m *= f;
        var h = Math.min(d, ~~m);
        return c[h](m - h);
      }, r = n;
    } else i || (e = En(De(e) ? [] : {}, e));
    if (!c) {
      for (a in n)
        po.call(l, e, a, "get", n[a]);
      s = function(m) {
        return vo(m, l) || (o ? e.p : e);
      };
    }
  }
  return Zt(r, s);
}, ml = function(e, n, r) {
  var i = e.labels, s = Je, o, l, a;
  for (o in i)
    l = i[o] - n, l < 0 == !!r && l && s > (l = Math.abs(l)) && (a = o, s = l);
  return a;
}, Xe = function(e, n, r) {
  var i = e.vars, s = i[n], o = ae, l = e._ctx, a, u, c;
  if (s)
    return a = i[n + "Params"], u = i.callbackScope || e, r && Wt.length && oi(), l && (ae = l), c = a ? s.apply(u, a) : s.call(u), ae = o, c;
}, ir = function(e) {
  return qt(e), e.scrollTrigger && e.scrollTrigger.kill(!!Se), e.progress() < 1 && Xe(e, "onInterrupt"), e;
}, Mn, au = [], uu = function(e) {
  if (e)
    if (e = !e.name && e.default || e, lo() || e.headless) {
      var n = e.name, r = fe(e), i = n && !r && e.init ? function() {
        this._props = [];
      } : e, s = {
        init: vr,
        render: vo,
        add: po,
        kill: lp,
        modifier: op,
        rawVars: 0
      }, o = {
        targetTest: 0,
        get: 0,
        getSetter: mo,
        aliases: {},
        register: 0
      };
      if (Hn(), e !== i) {
        if (He[n])
          return;
        nt(i, nt(li(e, s), o)), En(i.prototype, En(s, li(e, o))), He[i.prop = n] = i, e.targetTest && (qr.push(i), co[n] = 1), n = (n === "css" ? "CSS" : n.charAt(0).toUpperCase() + n.substr(1)) + "Plugin";
      }
      Wa(n, i), e.register && e.register(ze, i, $e);
    } else
      au.push(e);
}, ne = 255, sr = {
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
}, zi = function(e, n, r) {
  return e += e < 0 ? 1 : e > 1 ? -1 : 0, (e * 6 < 1 ? n + (r - n) * e * 6 : e < 0.5 ? r : e * 3 < 2 ? n + (r - n) * (2 / 3 - e) * 6 : n) * ne + 0.5 | 0;
}, cu = function(e, n, r) {
  var i = e ? Pt(e) ? [e >> 16, e >> 8 & ne, e & ne] : 0 : sr.black, s, o, l, a, u, c, f, d, _, m;
  if (!i) {
    if (e.substr(-1) === "," && (e = e.substr(0, e.length - 1)), sr[e])
      i = sr[e];
    else if (e.charAt(0) === "#") {
      if (e.length < 6 && (s = e.charAt(1), o = e.charAt(2), l = e.charAt(3), e = "#" + s + s + o + o + l + l + (e.length === 5 ? e.charAt(4) + e.charAt(4) : "")), e.length === 9)
        return i = parseInt(e.substr(1, 6), 16), [i >> 16, i >> 8 & ne, i & ne, parseInt(e.substr(7), 16) / 255];
      e = parseInt(e.substr(1), 16), i = [e >> 16, e >> 8 & ne, e & ne];
    } else if (e.substr(0, 3) === "hsl") {
      if (i = m = e.match(hs), !n)
        a = +i[0] % 360 / 360, u = +i[1] / 100, c = +i[2] / 100, o = c <= 0.5 ? c * (u + 1) : c + u - c * u, s = c * 2 - o, i.length > 3 && (i[3] *= 1), i[0] = zi(a + 1 / 3, s, o), i[1] = zi(a, s, o), i[2] = zi(a - 1 / 3, s, o);
      else if (~e.indexOf("="))
        return i = e.match(za), r && i.length < 4 && (i[3] = 1), i;
    } else
      i = e.match(hs) || sr.transparent;
    i = i.map(Number);
  }
  return n && !m && (s = i[0] / ne, o = i[1] / ne, l = i[2] / ne, f = Math.max(s, o, l), d = Math.min(s, o, l), c = (f + d) / 2, f === d ? a = u = 0 : (_ = f - d, u = c > 0.5 ? _ / (2 - f - d) : _ / (f + d), a = f === s ? (o - l) / _ + (o < l ? 6 : 0) : f === o ? (l - s) / _ + 2 : (s - o) / _ + 4, a *= 60), i[0] = ~~(a + 0.5), i[1] = ~~(u * 100 + 0.5), i[2] = ~~(c * 100 + 0.5)), r && i.length < 4 && (i[3] = 1), i;
}, fu = function(e) {
  var n = [], r = [], i = -1;
  return e.split(Yt).forEach(function(s) {
    var o = s.match(Pn) || [];
    n.push.apply(n, o), r.push(i += o.length + 1);
  }), n.c = r, n;
}, vl = function(e, n, r) {
  var i = "", s = (e + i).match(Yt), o = n ? "hsla(" : "rgba(", l = 0, a, u, c, f;
  if (!s)
    return e;
  if (s = s.map(function(d) {
    return (d = cu(d, n, 1)) && o + (n ? d[0] + "," + d[1] + "%," + d[2] + "%," + d[3] : d.join(",")) + ")";
  }), r && (c = fu(e), a = r.c, a.join(i) !== c.c.join(i)))
    for (u = e.replace(Yt, "1").split(Pn), f = u.length - 1; l < f; l++)
      i += u[l] + (~a.indexOf(l) ? s.shift() || o + "0,0,0,0)" : (c.length ? c : s.length ? s : r).shift());
  if (!u)
    for (u = e.split(Yt), f = u.length - 1; l < f; l++)
      i += u[l] + s[l];
  return i + u[f];
}, Yt = function() {
  var t = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b", e;
  for (e in sr)
    t += "|" + e + "\\b";
  return new RegExp(t + ")", "gi");
}(), Yh = /hsl[a]?\(/, du = function(e) {
  var n = e.join(" "), r;
  if (Yt.lastIndex = 0, Yt.test(n))
    return r = Yh.test(n), e[1] = vl(e[1], r), e[0] = vl(e[0], r, fu(e[1])), !0;
}, br, Ye = function() {
  var t = Date.now, e = 500, n = 33, r = t(), i = r, s = 1e3 / 240, o = s, l = [], a, u, c, f, d, _, m = function h(v) {
    var x = t() - i, E = v === !0, O, w, y, P;
    if ((x > e || x < 0) && (r += x - n), i += x, y = i - r, O = y - o, (O > 0 || E) && (P = ++f.frame, d = y - f.time * 1e3, f.time = y = y / 1e3, o += O + (O >= s ? 4 : s - O), w = 1), E || (a = u(h)), w)
      for (_ = 0; _ < l.length; _++)
        l[_](y, d, P, v);
  };
  return f = {
    time: 0,
    frame: 0,
    tick: function() {
      m(!0);
    },
    deltaRatio: function(v) {
      return d / (1e3 / (v || 60));
    },
    wake: function() {
      Ua && (!ps && lo() && (ft = ps = window, ao = ft.document || {}, Ge.gsap = ze, (ft.gsapVersions || (ft.gsapVersions = [])).push(ze.version), Ha(si || ft.GreenSockGlobals || !ft.gsap && ft || {}), au.forEach(uu)), c = typeof requestAnimationFrame < "u" && requestAnimationFrame, a && f.sleep(), u = c || function(v) {
        return setTimeout(v, o - f.time * 1e3 + 1 | 0);
      }, br = 1, m(2));
    },
    sleep: function() {
      (c ? cancelAnimationFrame : clearTimeout)(a), br = 0, u = vr;
    },
    lagSmoothing: function(v, x) {
      e = v || 1 / 0, n = Math.min(x || 33, e);
    },
    fps: function(v) {
      s = 1e3 / (v || 240), o = f.time * 1e3 + s;
    },
    add: function(v, x, E) {
      var O = x ? function(w, y, P, N) {
        v(w, y, P, N), f.remove(O);
      } : v;
      return f.remove(v), l[E ? "unshift" : "push"](O), Hn(), O;
    },
    remove: function(v, x) {
      ~(x = l.indexOf(v)) && l.splice(x, 1) && _ >= x && _--;
    },
    _listeners: l
  }, f;
}(), Hn = function() {
  return !br && Ye.wake();
}, Q = {}, Kh = /^[\d.\-M][\d.\-,\s]/, Xh = /["']/g, qh = function(e) {
  for (var n = {}, r = e.substr(1, e.length - 3).split(":"), i = r[0], s = 1, o = r.length, l, a, u; s < o; s++)
    a = r[s], l = s !== o - 1 ? a.lastIndexOf(",") : a.length, u = a.substr(0, l), n[i] = isNaN(u) ? u.replace(Xh, "").trim() : +u, i = a.substr(l + 1).trim();
  return n;
}, Gh = function(e) {
  var n = e.indexOf("(") + 1, r = e.indexOf(")"), i = e.indexOf("(", n);
  return e.substring(n, ~i && i < r ? e.indexOf(")", r + 1) : r);
}, Qh = function(e) {
  var n = (e + "").split("("), r = Q[n[0]];
  return r && n.length > 1 && r.config ? r.config.apply(null, ~e.indexOf("{") ? [qh(n[1])] : Gh(e).split(",").map(qa)) : Q._CE && Kh.test(e) ? Q._CE("", e) : r;
}, hu = function(e) {
  return function(n) {
    return 1 - e(1 - n);
  };
}, pu = function t(e, n) {
  for (var r = e._first, i; r; )
    r instanceof Me ? t(r, n) : r.vars.yoyoEase && (!r._yoyo || !r._repeat) && r._yoyo !== n && (r.timeline ? t(r.timeline, n) : (i = r._ease, r._ease = r._yEase, r._yEase = i, r._yoyo = n)), r = r._next;
}, vn = function(e, n) {
  return e && (fe(e) ? e : Q[e] || Qh(e)) || n;
}, Dn = function(e, n, r, i) {
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
    Q[l] = Ge[l] = s, Q[o = l.toLowerCase()] = r;
    for (var a in s)
      Q[o + (a === "easeIn" ? ".in" : a === "easeOut" ? ".out" : ".inOut")] = Q[l + "." + a] = s[a];
  }), s;
}, _u = function(e) {
  return function(n) {
    return n < 0.5 ? (1 - e(1 - n * 2)) / 2 : 0.5 + e((n - 0.5) * 2) / 2;
  };
}, Bi = function t(e, n, r) {
  var i = n >= 1 ? n : 1, s = (r || (e ? 0.3 : 0.45)) / (n < 1 ? n : 1), o = s / ds * (Math.asin(1 / i) || 0), l = function(c) {
    return c === 1 ? 1 : i * Math.pow(2, -10 * c) * wh((c - o) * s) + 1;
  }, a = e === "out" ? l : e === "in" ? function(u) {
    return 1 - l(1 - u);
  } : _u(l);
  return s = ds / s, a.config = function(u, c) {
    return t(e, u, c);
  }, a;
}, ji = function t(e, n) {
  n === void 0 && (n = 1.70158);
  var r = function(o) {
    return o ? --o * o * ((n + 1) * o + n) + 1 : 0;
  }, i = e === "out" ? r : e === "in" ? function(s) {
    return 1 - r(1 - s);
  } : _u(r);
  return i.config = function(s) {
    return t(e, s);
  }, i;
};
Fe("Linear,Quad,Cubic,Quart,Quint,Strong", function(t, e) {
  var n = e < 5 ? e + 1 : e;
  Dn(t + ",Power" + (n - 1), e ? function(r) {
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
Dn("Elastic", Bi("in"), Bi("out"), Bi());
(function(t, e) {
  var n = 1 / e, r = 2 * n, i = 2.5 * n, s = function(l) {
    return l < n ? t * l * l : l < r ? t * Math.pow(l - 1.5 / e, 2) + 0.75 : l < i ? t * (l -= 2.25 / e) * l + 0.9375 : t * Math.pow(l - 2.625 / e, 2) + 0.984375;
  };
  Dn("Bounce", function(o) {
    return 1 - s(1 - o);
  }, s);
})(7.5625, 2.75);
Dn("Expo", function(t) {
  return t ? Math.pow(2, 10 * (t - 1)) : 0;
});
Dn("Circ", function(t) {
  return -($a(1 - t * t) - 1);
});
Dn("Sine", function(t) {
  return t === 1 ? 1 : -Nh(t * Eh) + 1;
});
Dn("Back", ji("in"), ji("out"), ji());
Q.SteppedEase = Q.steps = Ge.SteppedEase = {
  config: function(e, n) {
    e === void 0 && (e = 1);
    var r = 1 / e, i = e + (n ? 0 : 1), s = n ? 1 : 0, o = 1 - oe;
    return function(l) {
      return ((i * Pr(0, o, l) | 0) + s) * r;
    };
  }
};
Bn.ease = Q["quad.out"];
Fe("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt", function(t) {
  return fo += t + "," + t + "Params,";
});
var gu = function(e, n) {
  this.id = Oh++, e._gsap = this, this.target = e, this.harness = n, this.get = n ? n.get : Ka, this.set = n ? n.getSetter : mo;
}, xr = /* @__PURE__ */ function() {
  function t(n) {
    this.vars = n, this._delay = +n.delay || 0, (this._repeat = n.repeat === 1 / 0 ? -2 : n.repeat || 0) && (this._rDelay = n.repeatDelay || 0, this._yoyo = !!n.yoyo || !!n.yoyoEase), this._ts = 1, Un(this, +n.duration, 1, 1), this.data = n.data, ae && (this._ctx = ae, ae.data.push(this)), br || Ye.wake();
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
      for (Ci(this, r), !s._dp || s.parent || Ja(s, this); s && s.parent; )
        s.parent._time !== s._start + (s._ts >= 0 ? s._tTime / s._ts : (s.totalDuration() - s._tTime) / -s._ts) && s.totalTime(s._tTime, !0), s = s.parent;
      !this.parent && this._dp.autoRemoveChildren && (this._ts > 0 && r < this._tDur || this._ts < 0 && r > 0 || !this._tDur && !r) && ht(this._dp, this, this._start - this._delay);
    }
    return (this._tTime !== r || !this._dur && !i || this._initted && Math.abs(this._zTime) === oe || !r && !this._initted && (this.add || this._ptLookup)) && (this._ts || (this._pTime = r), Xa(this, r, i)), this;
  }, e.time = function(r, i) {
    return arguments.length ? this.totalTime(Math.min(this.totalDuration(), r + _l(this)) % (this._dur + this._rDelay) || (r ? this._dur : 0), i) : this._time;
  }, e.totalProgress = function(r, i) {
    return arguments.length ? this.totalTime(this.totalDuration() * r, i) : this.totalDuration() ? Math.min(1, this._tTime / this._tDur) : this.rawTime() > 0 ? 1 : 0;
  }, e.progress = function(r, i) {
    return arguments.length ? this.totalTime(this.duration() * (this._yoyo && !(this.iteration() & 1) ? 1 - r : r) + _l(this), i) : this.duration() ? Math.min(1, this._time / this._dur) : this.rawTime() > 0 ? 1 : 0;
  }, e.iteration = function(r, i) {
    var s = this.duration() + this._rDelay;
    return arguments.length ? this.totalTime(this._time + (r - 1) * s, i) : this._repeat ? jn(this._tTime, s) + 1 : 1;
  }, e.timeScale = function(r, i) {
    if (!arguments.length)
      return this._rts === -oe ? 0 : this._rts;
    if (this._rts === r)
      return this;
    var s = this.parent && this._ts ? ai(this.parent._time, this) : this._tTime;
    return this._rts = +r || 0, this._ts = this._ps || r === -oe ? 0 : this._rts, this.totalTime(Pr(-Math.abs(this._delay), this._tDur, s), i !== !1), Di(this), Mh(this);
  }, e.paused = function(r) {
    return arguments.length ? (this._ps !== r && (this._ps = r, r ? (this._pTime = this._tTime || Math.max(-this._delay, this.rawTime()), this._ts = this._act = 0) : (Hn(), this._ts = this._rts, this.totalTime(this.parent && !this.parent.smoothChildTiming ? this.rawTime() : this._tTime || this._pTime, this.progress() === 1 && Math.abs(this._zTime) !== oe && (this._tTime -= oe)))), this) : this._ps;
  }, e.startTime = function(r) {
    if (arguments.length) {
      this._start = r;
      var i = this.parent || this._dp;
      return i && (i._sort || !this.parent) && ht(i, this, r - this._delay), this;
    }
    return this._start;
  }, e.endTime = function(r) {
    return this._start + (Ie(r) ? this.totalDuration() : this.duration()) / Math.abs(this._ts || 1);
  }, e.rawTime = function(r) {
    var i = this.parent || this._dp;
    return i ? r && (!this._ts || this._repeat && this._time && this.totalProgress() < 1) ? this._tTime % (this._dur + this._rDelay) : this._ts ? ai(i.rawTime(r), this) : this._tTime : this._tTime;
  }, e.revert = function(r) {
    r === void 0 && (r = Dh);
    var i = Se;
    return Se = r, (this._initted || this._startAt) && (this.timeline && this.timeline.revert(r), this.totalTime(-0.01, r.suppressEvents)), this.data !== "nested" && r.kill !== !1 && this.kill(), Se = i, this;
  }, e.globalTime = function(r) {
    for (var i = this, s = arguments.length ? r : i.rawTime(); i; )
      s = i._start + s / (Math.abs(i._ts) || 1), i = i._dp;
    return !this.parent && this._sat ? this._sat.globalTime(r) : s;
  }, e.repeat = function(r) {
    return arguments.length ? (this._repeat = r === 1 / 0 ? -2 : r, gl(this)) : this._repeat === -2 ? 1 / 0 : this._repeat;
  }, e.repeatDelay = function(r) {
    if (arguments.length) {
      var i = this._time;
      return this._rDelay = r, gl(this), i ? this.time(i) : this;
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
    return arguments.length ? (!!r !== this.reversed() && this.timeScale(-this._rts || (r ? -oe : 0)), this) : this._rts < 0;
  }, e.invalidate = function() {
    return this._initted = this._act = 0, this._zTime = -oe, this;
  }, e.isActive = function() {
    var r = this.parent || this._dp, i = this._start, s;
    return !!(!r || this._ts && this._initted && r.isActive() && (s = r.rawTime(!0)) >= i && s < this.endTime(!0) - oe);
  }, e.eventCallback = function(r, i, s) {
    var o = this.vars;
    return arguments.length > 1 ? (i ? (o[r] = i, s && (o[r + "Params"] = s), r === "onUpdate" && (this._onUpdate = i)) : delete o[r], this) : o[r];
  }, e.then = function(r) {
    var i = this;
    return new Promise(function(s) {
      var o = fe(r) ? r : Ga, l = function() {
        var u = i.then;
        i.then = null, fe(o) && (o = o(i)) && (o.then || o === i) && (i.then = u), s(o), i.then = u;
      };
      i._initted && i.totalProgress() === 1 && i._ts >= 0 || !i._tTime && i._ts < 0 ? l() : i._prom = l;
    });
  }, e.kill = function() {
    ir(this);
  }, t;
}();
nt(xr.prototype, {
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
  _zTime: -oe,
  _prom: 0,
  _ps: !1,
  _rts: 1
});
var Me = /* @__PURE__ */ function(t) {
  Fa(e, t);
  function e(r, i) {
    var s;
    return r === void 0 && (r = {}), s = t.call(this, r) || this, s.labels = {}, s.smoothChildTiming = !!r.smoothChildTiming, s.autoRemoveChildren = !!r.autoRemoveChildren, s._sort = Ie(r.sortChildren), ue && ht(r.parent || ue, wt(s), i), r.reversed && s.reverse(), r.paused && s.paused(!0), r.scrollTrigger && Za(wt(s), r.scrollTrigger), s;
  }
  var n = e.prototype;
  return n.to = function(i, s, o) {
    return fr(0, arguments, this), this;
  }, n.from = function(i, s, o) {
    return fr(1, arguments, this), this;
  }, n.fromTo = function(i, s, o, l) {
    return fr(2, arguments, this), this;
  }, n.set = function(i, s, o) {
    return s.duration = 0, s.parent = this, cr(s).repeatDelay || (s.repeat = 0), s.immediateRender = !!s.immediateRender, new ge(i, s, Qe(this, o), 1), this;
  }, n.call = function(i, s, o) {
    return ht(this, ge.delayedCall(0, i, s), o);
  }, n.staggerTo = function(i, s, o, l, a, u, c) {
    return o.duration = s, o.stagger = o.stagger || l, o.onComplete = u, o.onCompleteParams = c, o.parent = this, new ge(i, o, Qe(this, a)), this;
  }, n.staggerFrom = function(i, s, o, l, a, u, c) {
    return o.runBackwards = 1, cr(o).immediateRender = Ie(o.immediateRender), this.staggerTo(i, s, o, l, a, u, c);
  }, n.staggerFromTo = function(i, s, o, l, a, u, c, f) {
    return l.startAt = o, cr(l).immediateRender = Ie(l.immediateRender), this.staggerTo(i, s, l, a, u, c, f);
  }, n.render = function(i, s, o) {
    var l = this._time, a = this._dirty ? this.totalDuration() : this._tDur, u = this._dur, c = i <= 0 ? 0 : ye(i), f = this._zTime < 0 != i < 0 && (this._initted || !u), d, _, m, h, v, x, E, O, w, y, P, N;
    if (this !== ue && c > a && i >= 0 && (c = a), c !== this._tTime || o || f) {
      if (l !== this._time && u && (c += this._time - l, i += this._time - l), d = c, w = this._start, O = this._ts, x = !O, f && (u || (l = this._zTime), (i || !s) && (this._zTime = i)), this._repeat) {
        if (P = this._yoyo, v = u + this._rDelay, this._repeat < -1 && i < 0)
          return this.totalTime(v * 100 + i, s, o);
        if (d = ye(c % v), c === a ? (h = this._repeat, d = u) : (h = ~~(c / v), h && h === c / v && (d = u, h--), d > u && (d = u)), y = jn(this._tTime, v), !l && this._tTime && y !== h && this._tTime - y * v - this._dur <= 0 && (y = h), P && h & 1 && (d = u - d, N = 1), h !== y && !this._lock) {
          var k = P && y & 1, D = k === (P && h & 1);
          if (h < y && (k = !k), l = k ? 0 : c % u ? u : c, this._lock = 1, this.render(l || (N ? 0 : ye(h * v)), s, !u)._lock = 0, this._tTime = c, !s && this.parent && Xe(this, "onRepeat"), this.vars.repeatRefresh && !N && (this.invalidate()._lock = 1), l && l !== this._time || x !== !this._ts || this.vars.onRepeat && !this.parent && !this._act)
            return this;
          if (u = this._dur, a = this._tDur, D && (this._lock = 2, l = k ? u : -1e-4, this.render(l, !0), this.vars.repeatRefresh && !N && this.invalidate()), this._lock = 0, !this._ts && !x)
            return this;
          pu(this, N);
        }
      }
      if (this._hasPause && !this._forcing && this._lock < 2 && (E = Ih(this, ye(l), ye(d)), E && (c -= d - (d = E._start))), this._tTime = c, this._time = d, this._act = !O, this._initted || (this._onUpdate = this.vars.onUpdate, this._initted = 1, this._zTime = i, l = 0), !l && d && !s && !h && (Xe(this, "onStart"), this._tTime !== c))
        return this;
      if (d >= l && i >= 0)
        for (_ = this._first; _; ) {
          if (m = _._next, (_._act || d >= _._start) && _._ts && E !== _) {
            if (_.parent !== this)
              return this.render(i, s, o);
            if (_.render(_._ts > 0 ? (d - _._start) * _._ts : (_._dirty ? _.totalDuration() : _._tDur) + (d - _._start) * _._ts, s, o), d !== this._time || !this._ts && !x) {
              E = 0, m && (c += this._zTime = -oe);
              break;
            }
          }
          _ = m;
        }
      else {
        _ = this._last;
        for (var W = i < 0 ? i : d; _; ) {
          if (m = _._prev, (_._act || W <= _._end) && _._ts && E !== _) {
            if (_.parent !== this)
              return this.render(i, s, o);
            if (_.render(_._ts > 0 ? (W - _._start) * _._ts : (_._dirty ? _.totalDuration() : _._tDur) + (W - _._start) * _._ts, s, o || Se && (_._initted || _._startAt)), d !== this._time || !this._ts && !x) {
              E = 0, m && (c += this._zTime = W ? -oe : oe);
              break;
            }
          }
          _ = m;
        }
      }
      if (E && !s && (this.pause(), E.render(d >= l ? 0 : -oe)._zTime = d >= l ? 1 : -1, this._ts))
        return this._start = w, Di(this), this.render(i, s, o);
      this._onUpdate && !s && Xe(this, "onUpdate", !0), (c === a && this._tTime >= this.totalDuration() || !c && l) && (w === this._start || Math.abs(O) !== Math.abs(this._ts)) && (this._lock || ((i || !u) && (c === a && this._ts > 0 || !c && this._ts < 0) && qt(this, 1), !s && !(i < 0 && !l) && (c || l || !a) && (Xe(this, c === a && i >= 0 ? "onComplete" : "onReverseComplete", !0), this._prom && !(c < a && this.timeScale() > 0) && this._prom())));
    }
    return this;
  }, n.add = function(i, s) {
    var o = this;
    if (Pt(s) || (s = Qe(this, s, i)), !(i instanceof xr)) {
      if (De(i))
        return i.forEach(function(l) {
          return o.add(l, s);
        }), this;
      if (xe(i))
        return this.addLabel(i, s);
      if (fe(i))
        i = ge.delayedCall(0, i);
      else
        return this;
    }
    return this !== i ? ht(this, i, s) : this;
  }, n.getChildren = function(i, s, o, l) {
    i === void 0 && (i = !0), s === void 0 && (s = !0), o === void 0 && (o = !0), l === void 0 && (l = -Je);
    for (var a = [], u = this._first; u; )
      u._start >= l && (u instanceof ge ? s && a.push(u) : (o && a.push(u), i && a.push.apply(a, u.getChildren(!0, s, o)))), u = u._next;
    return a;
  }, n.getById = function(i) {
    for (var s = this.getChildren(1, 1, 1), o = s.length; o--; )
      if (s[o].vars.id === i)
        return s[o];
  }, n.remove = function(i) {
    return xe(i) ? this.removeLabel(i) : fe(i) ? this.killTweensOf(i) : (Si(this, i), i === this._recent && (this._recent = this._last), mn(this));
  }, n.totalTime = function(i, s) {
    return arguments.length ? (this._forcing = 1, !this._dp && this._ts && (this._start = ye(Ye.time - (this._ts > 0 ? i / this._ts : (this.totalDuration() - i) / -this._ts))), t.prototype.totalTime.call(this, i, s), this._forcing = 0, this) : this._tTime;
  }, n.addLabel = function(i, s) {
    return this.labels[i] = Qe(this, s), this;
  }, n.removeLabel = function(i) {
    return delete this.labels[i], this;
  }, n.addPause = function(i, s, o) {
    var l = ge.delayedCall(0, s || vr, o);
    return l.data = "isPause", this._hasPause = 1, ht(this, l, Qe(this, i));
  }, n.removePause = function(i) {
    var s = this._first;
    for (i = Qe(this, i); s; )
      s._start === i && s.data === "isPause" && qt(s), s = s._next;
  }, n.killTweensOf = function(i, s, o) {
    for (var l = this.getTweensOf(i, o), a = l.length; a--; )
      zt !== l[a] && l[a].kill(i, s);
    return this;
  }, n.getTweensOf = function(i, s) {
    for (var o = [], l = Ze(i), a = this._first, u = Pt(s), c; a; )
      a instanceof ge ? Ch(a._targets, l) && (u ? (!zt || a._initted && a._ts) && a.globalTime(0) <= s && a.globalTime(a.totalDuration()) > s : !s || a.isActive()) && o.push(a) : (c = a.getTweensOf(l, s)).length && o.push.apply(o, c), a = a._next;
    return o;
  }, n.tweenTo = function(i, s) {
    s = s || {};
    var o = this, l = Qe(o, i), a = s, u = a.startAt, c = a.onStart, f = a.onStartParams, d = a.immediateRender, _, m = ge.to(o, nt({
      ease: s.ease || "none",
      lazy: !1,
      immediateRender: !1,
      time: l,
      overwrite: "auto",
      duration: s.duration || Math.abs((l - (u && "time" in u ? u.time : o._time)) / o.timeScale()) || oe,
      onStart: function() {
        if (o.pause(), !_) {
          var v = s.duration || Math.abs((l - (u && "time" in u ? u.time : o._time)) / o.timeScale());
          m._dur !== v && Un(m, v, 0, 1).render(m._time, !0, !0), _ = 1;
        }
        c && c.apply(m, f || []);
      }
    }, s));
    return d ? m.render(0) : m;
  }, n.tweenFromTo = function(i, s, o) {
    return this.tweenTo(s, nt({
      startAt: {
        time: Qe(this, i)
      }
    }, o));
  }, n.recent = function() {
    return this._recent;
  }, n.nextLabel = function(i) {
    return i === void 0 && (i = this._time), ml(this, Qe(this, i));
  }, n.previousLabel = function(i) {
    return i === void 0 && (i = this._time), ml(this, Qe(this, i), 1);
  }, n.currentLabel = function(i) {
    return arguments.length ? this.seek(i, !0) : this.previousLabel(this._time + oe);
  }, n.shiftChildren = function(i, s, o) {
    o === void 0 && (o = 0);
    for (var l = this._first, a = this.labels, u; l; )
      l._start >= o && (l._start += i, l._end += i), l = l._next;
    if (s)
      for (u in a)
        a[u] >= o && (a[u] += i);
    return mn(this);
  }, n.invalidate = function(i) {
    var s = this._first;
    for (this._lock = 0; s; )
      s.invalidate(i), s = s._next;
    return t.prototype.invalidate.call(this, i);
  }, n.clear = function(i) {
    i === void 0 && (i = !0);
    for (var s = this._first, o; s; )
      o = s._next, this.remove(s), s = o;
    return this._dp && (this._time = this._tTime = this._pTime = 0), i && (this.labels = {}), mn(this);
  }, n.totalDuration = function(i) {
    var s = 0, o = this, l = o._last, a = Je, u, c, f;
    if (arguments.length)
      return o.timeScale((o._repeat < 0 ? o.duration() : o.totalDuration()) / (o.reversed() ? -i : i));
    if (o._dirty) {
      for (f = o.parent; l; )
        u = l._prev, l._dirty && l.totalDuration(), c = l._start, c > a && o._sort && l._ts && !o._lock ? (o._lock = 1, ht(o, l, c - l._delay, 1)._lock = 0) : a = c, c < 0 && l._ts && (s -= c, (!f && !o._dp || f && f.smoothChildTiming) && (o._start += c / o._ts, o._time -= c, o._tTime -= c), o.shiftChildren(-c, !1, -1 / 0), a = 0), l._end > s && l._ts && (s = l._end), l = u;
      Un(o, o === ue && o._time > s ? o._time : s, 1, 1), o._dirty = 0;
    }
    return o._tDur;
  }, e.updateRoot = function(i) {
    if (ue._ts && (Xa(ue, ai(i, ue)), Ya = Ye.frame), Ye.frame >= hl) {
      hl += qe.autoSleep || 120;
      var s = ue._first;
      if ((!s || !s._ts) && qe.autoSleep && Ye._listeners.length < 2) {
        for (; s && !s._ts; )
          s = s._next;
        s || Ye.sleep();
      }
    }
  }, e;
}(xr);
nt(Me.prototype, {
  _lock: 0,
  _hasPause: 0,
  _forcing: 0
});
var Jh = function(e, n, r, i, s, o, l) {
  var a = new $e(this._pt, e, n, 0, 1, Eu, null, s), u = 0, c = 0, f, d, _, m, h, v, x, E;
  for (a.b = r, a.e = i, r += "", i += "", (x = ~i.indexOf("random(")) && (i = yr(i)), o && (E = [r, i], o(E, e, n), r = E[0], i = E[1]), d = r.match($i) || []; f = $i.exec(i); )
    m = f[0], h = i.substring(u, f.index), _ ? _ = (_ + 1) % 5 : h.substr(-5) === "rgba(" && (_ = 1), m !== d[c++] && (v = parseFloat(d[c - 1]) || 0, a._pt = {
      _next: a._pt,
      p: h || c === 1 ? h : ",",
      //note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.
      s: v,
      c: m.charAt(1) === "=" ? $n(v, m) - v : parseFloat(m) - v,
      m: _ && _ < 4 ? Math.round : 0
    }, u = $i.lastIndex);
  return a.c = u < i.length ? i.substring(u, i.length) : "", a.fp = l, (Ba.test(i) || x) && (a.e = 0), this._pt = a, a;
}, po = function(e, n, r, i, s, o, l, a, u, c) {
  fe(i) && (i = i(s || 0, e, o));
  var f = e[n], d = r !== "get" ? r : fe(f) ? u ? e[n.indexOf("set") || !fe(e["get" + n.substr(3)]) ? n : "get" + n.substr(3)](u) : e[n]() : f, _ = fe(f) ? u ? rp : bu : go, m;
  if (xe(i) && (~i.indexOf("random(") && (i = yr(i)), i.charAt(1) === "=" && (m = $n(d, i) + (Te(d) || 0), (m || m === 0) && (i = m))), !c || d !== i || xs)
    return !isNaN(d * i) && i !== "" ? (m = new $e(this._pt, e, n, +d || 0, i - (d || 0), typeof f == "boolean" ? sp : xu, 0, _), u && (m.fp = u), l && m.modifier(l, this, e), this._pt = m) : (!f && !(n in e) && uo(n, i), Jh.call(this, e, n, d, i, _, a || qe.stringFilter, u));
}, Zh = function(e, n, r, i, s) {
  if (fe(e) && (e = dr(e, s, n, r, i)), !yt(e) || e.style && e.nodeType || De(e) || La(e))
    return xe(e) ? dr(e, s, n, r, i) : e;
  var o = {}, l;
  for (l in e)
    o[l] = dr(e[l], s, n, r, i);
  return o;
}, mu = function(e, n, r, i, s, o) {
  var l, a, u, c;
  if (He[e] && (l = new He[e]()).init(s, l.rawVars ? n[e] : Zh(n[e], i, s, o, r), r, i, o) !== !1 && (r._pt = a = new $e(r._pt, s, e, 0, 1, l.render, l, 0, l.priority), r !== Mn))
    for (u = r._ptLookup[r._targets.indexOf(s)], c = l._props.length; c--; )
      u[l._props[c]] = a;
  return l;
}, zt, xs, _o = function t(e, n, r) {
  var i = e.vars, s = i.ease, o = i.startAt, l = i.immediateRender, a = i.lazy, u = i.onUpdate, c = i.runBackwards, f = i.yoyoEase, d = i.keyframes, _ = i.autoRevert, m = e._dur, h = e._startAt, v = e._targets, x = e.parent, E = x && x.data === "nested" ? x.vars.targets : v, O = e._overwrite === "auto" && !so, w = e.timeline, y, P, N, k, D, W, J, K, Z, _e, te, G, z;
  if (w && (!d || !s) && (s = "none"), e._ease = vn(s, Bn.ease), e._yEase = f ? hu(vn(f === !0 ? s : f, Bn.ease)) : 0, f && e._yoyo && !e._repeat && (f = e._yEase, e._yEase = e._ease, e._ease = f), e._from = !w && !!i.runBackwards, !w || d && !i.stagger) {
    if (K = v[0] ? gn(v[0]).harness : 0, G = K && i[K.prop], y = li(i, co), h && (h._zTime < 0 && h.progress(1), n < 0 && c && l && !_ ? h.render(-1, !0) : h.revert(c && m ? Xr : Sh), h._lazy = 0), o) {
      if (qt(e._startAt = ge.set(v, nt({
        data: "isStart",
        overwrite: !1,
        parent: x,
        immediateRender: !0,
        lazy: !h && Ie(a),
        startAt: null,
        delay: 0,
        onUpdate: u && function() {
          return Xe(e, "onUpdate");
        },
        stagger: 0
      }, o))), e._startAt._dp = 0, e._startAt._sat = e, n < 0 && (Se || !l && !_) && e._startAt.revert(Xr), l && m && n <= 0 && r <= 0) {
        n && (e._zTime = n);
        return;
      }
    } else if (c && m && !h) {
      if (n && (l = !1), N = nt({
        overwrite: !1,
        data: "isFromStart",
        //we tag the tween with as "isFromStart" so that if [inside a plugin] we need to only do something at the very END of a tween, we have a way of identifying this tween as merely the one that's setting the beginning values for a "from()" tween. For example, clearProps in CSSPlugin should only get applied at the very END of a tween and without this tag, from(...{height:100, clearProps:"height", delay:1}) would wipe the height at the beginning of the tween and after 1 second, it'd kick back in.
        lazy: l && !h && Ie(a),
        immediateRender: l,
        //zero-duration tweens render immediately by default, but if we're not specifically instructed to render this tween immediately, we should skip this and merely _init() to record the starting values (rendering them immediately would push them to completion which is wasteful in that case - we'd have to render(-1) immediately after)
        stagger: 0,
        parent: x
        //ensures that nested tweens that had a stagger are handled properly, like gsap.from(".class", {y: gsap.utils.wrap([-100,100]), stagger: 0.5})
      }, y), G && (N[K.prop] = G), qt(e._startAt = ge.set(v, N)), e._startAt._dp = 0, e._startAt._sat = e, n < 0 && (Se ? e._startAt.revert(Xr) : e._startAt.render(-1, !0)), e._zTime = n, !l)
        t(e._startAt, oe, oe);
      else if (!n)
        return;
    }
    for (e._pt = e._ptCache = 0, a = m && Ie(a) || a && !m, P = 0; P < v.length; P++) {
      if (D = v[P], J = D._gsap || ho(v)[P]._gsap, e._ptLookup[P] = _e = {}, _s[J.id] && Wt.length && oi(), te = E === v ? P : E.indexOf(D), K && (Z = new K()).init(D, G || y, e, te, E) !== !1 && (e._pt = k = new $e(e._pt, D, Z.name, 0, 1, Z.render, Z, 0, Z.priority), Z._props.forEach(function(j) {
        _e[j] = k;
      }), Z.priority && (W = 1)), !K || G)
        for (N in y)
          He[N] && (Z = mu(N, y, e, te, D, E)) ? Z.priority && (W = 1) : _e[N] = k = po.call(e, D, N, "get", y[N], te, E, 0, i.stringFilter);
      e._op && e._op[P] && e.kill(D, e._op[P]), O && e._pt && (zt = e, ue.killTweensOf(D, _e, e.globalTime(n)), z = !e.parent, zt = 0), e._pt && a && (_s[J.id] = 1);
    }
    W && Ou(e), e._onInit && e._onInit(e);
  }
  e._onUpdate = u, e._initted = (!e._op || e._pt) && !z, d && n <= 0 && w.render(Je, !0, !0);
}, ep = function(e, n, r, i, s, o, l, a) {
  var u = (e._pt && e._ptCache || (e._ptCache = {}))[n], c, f, d, _;
  if (!u)
    for (u = e._ptCache[n] = [], d = e._ptLookup, _ = e._targets.length; _--; ) {
      if (c = d[_][n], c && c.d && c.d._pt)
        for (c = c.d._pt; c && c.p !== n && c.fp !== n; )
          c = c._next;
      if (!c)
        return xs = 1, e.vars[n] = "+=0", _o(e, l), xs = 0, a ? mr(n + " not eligible for reset") : 1;
      u.push(c);
    }
  for (_ = u.length; _--; )
    f = u[_], c = f._pt || f, c.s = (i || i === 0) && !s ? i : c.s + (i || 0) + o * c.c, c.c = r - c.s, f.e && (f.e = he(r) + Te(f.e)), f.b && (f.b = c.s + Te(f.b));
}, tp = function(e, n) {
  var r = e[0] ? gn(e[0]).harness : 0, i = r && r.aliases, s, o, l, a;
  if (!i)
    return n;
  s = En({}, n);
  for (o in i)
    if (o in s)
      for (a = i[o].split(","), l = a.length; l--; )
        s[a[l]] = s[o];
  return s;
}, np = function(e, n, r, i) {
  var s = n.ease || i || "power1.inOut", o, l;
  if (De(n))
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
}, dr = function(e, n, r, i, s) {
  return fe(e) ? e.call(n, r, i, s) : xe(e) && ~e.indexOf("random(") ? yr(e) : e;
}, vu = fo + "repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert", yu = {};
Fe(vu + ",id,stagger,delay,duration,paused,scrollTrigger", function(t) {
  return yu[t] = 1;
});
var ge = /* @__PURE__ */ function(t) {
  Fa(e, t);
  function e(r, i, s, o) {
    var l;
    typeof i == "number" && (s.duration = i, i = s, s = null), l = t.call(this, o ? i : cr(i)) || this;
    var a = l.vars, u = a.duration, c = a.delay, f = a.immediateRender, d = a.stagger, _ = a.overwrite, m = a.keyframes, h = a.defaults, v = a.scrollTrigger, x = a.yoyoEase, E = i.parent || ue, O = (De(r) || La(r) ? Pt(r[0]) : "length" in i) ? [r] : Ze(r), w, y, P, N, k, D, W, J;
    if (l._targets = O.length ? ho(O) : mr("GSAP target " + r + " not found. https://gsap.com", !qe.nullTargetWarn) || [], l._ptLookup = [], l._overwrite = _, m || d || Lr(u) || Lr(c)) {
      if (i = l.vars, w = l.timeline = new Me({
        data: "nested",
        defaults: h || {},
        targets: E && E.data === "nested" ? E.vars.targets : O
      }), w.kill(), w.parent = w._dp = wt(l), w._start = 0, d || Lr(u) || Lr(c)) {
        if (N = O.length, W = d && ru(d), yt(d))
          for (k in d)
            ~vu.indexOf(k) && (J || (J = {}), J[k] = d[k]);
        for (y = 0; y < N; y++)
          P = li(i, yu), P.stagger = 0, x && (P.yoyoEase = x), J && En(P, J), D = O[y], P.duration = +dr(u, wt(l), y, D, O), P.delay = (+dr(c, wt(l), y, D, O) || 0) - l._delay, !d && N === 1 && P.delay && (l._delay = c = P.delay, l._start += c, P.delay = 0), w.to(D, P, W ? W(y, D, O) : 0), w._ease = Q.none;
        w.duration() ? u = c = 0 : l.timeline = 0;
      } else if (m) {
        cr(nt(w.vars.defaults, {
          ease: "none"
        })), w._ease = vn(m.ease || i.ease || "none");
        var K = 0, Z, _e, te;
        if (De(m))
          m.forEach(function(G) {
            return w.to(O, G, ">");
          }), w.duration();
        else {
          P = {};
          for (k in m)
            k === "ease" || k === "easeEach" || np(k, m[k], P, m.easeEach);
          for (k in P)
            for (Z = P[k].sort(function(G, z) {
              return G.t - z.t;
            }), K = 0, y = 0; y < Z.length; y++)
              _e = Z[y], te = {
                ease: _e.e,
                duration: (_e.t - (y ? Z[y - 1].t : 0)) / 100 * u
              }, te[k] = _e.v, w.to(O, te, K), K += te.duration;
          w.duration() < u && w.to({}, {
            duration: u - w.duration()
          });
        }
      }
      u || l.duration(u = w.duration());
    } else
      l.timeline = 0;
    return _ === !0 && !so && (zt = wt(l), ue.killTweensOf(O), zt = 0), ht(E, wt(l), s), i.reversed && l.reverse(), i.paused && l.paused(!0), (f || !u && !m && l._start === ye(E._time) && Ie(f) && kh(wt(l)) && E.data !== "nested") && (l._tTime = -oe, l.render(Math.max(0, -c) || 0)), v && Za(wt(l), v), l;
  }
  var n = e.prototype;
  return n.render = function(i, s, o) {
    var l = this._time, a = this._tDur, u = this._dur, c = i < 0, f = i > a - oe && !c ? a : i < oe ? 0 : i, d, _, m, h, v, x, E, O, w;
    if (!u)
      Rh(this, i, s, o);
    else if (f !== this._tTime || !i || o || !this._initted && this._tTime || this._startAt && this._zTime < 0 !== c) {
      if (d = f, O = this.timeline, this._repeat) {
        if (h = u + this._rDelay, this._repeat < -1 && c)
          return this.totalTime(h * 100 + i, s, o);
        if (d = ye(f % h), f === a ? (m = this._repeat, d = u) : (m = ~~(f / h), m && m === ye(f / h) && (d = u, m--), d > u && (d = u)), x = this._yoyo && m & 1, x && (w = this._yEase, d = u - d), v = jn(this._tTime, h), d === l && !o && this._initted && m === v)
          return this._tTime = f, this;
        m !== v && (O && this._yEase && pu(O, x), this.vars.repeatRefresh && !x && !this._lock && this._time !== h && this._initted && (this._lock = o = 1, this.render(ye(h * m), !0).invalidate()._lock = 0));
      }
      if (!this._initted) {
        if (eu(this, c ? i : d, o, s, f))
          return this._tTime = 0, this;
        if (l !== this._time && !(o && this.vars.repeatRefresh && m !== v))
          return this;
        if (u !== this._dur)
          return this.render(i, s, o);
      }
      if (this._tTime = f, this._time = d, !this._act && this._ts && (this._act = 1, this._lazy = 0), this.ratio = E = (w || this._ease)(d / u), this._from && (this.ratio = E = 1 - E), d && !l && !s && !m && (Xe(this, "onStart"), this._tTime !== f))
        return this;
      for (_ = this._pt; _; )
        _.r(E, _.d), _ = _._next;
      O && O.render(i < 0 ? i : O._dur * O._ease(d / this._dur), s, o) || this._startAt && (this._zTime = i), this._onUpdate && !s && (c && gs(this, i, s, o), Xe(this, "onUpdate")), this._repeat && m !== v && this.vars.onRepeat && !s && this.parent && Xe(this, "onRepeat"), (f === this._tDur || !f) && this._tTime === f && (c && !this._onUpdate && gs(this, i, !0, !0), (i || !u) && (f === this._tDur && this._ts > 0 || !f && this._ts < 0) && qt(this, 1), !s && !(c && !l) && (f || l || x) && (Xe(this, f === a ? "onComplete" : "onReverseComplete", !0), this._prom && !(f < a && this.timeScale() > 0) && this._prom()));
    }
    return this;
  }, n.targets = function() {
    return this._targets;
  }, n.invalidate = function(i) {
    return (!i || !this.vars.runBackwards) && (this._startAt = 0), this._pt = this._op = this._onUpdate = this._lazy = this.ratio = 0, this._ptLookup = [], this.timeline && this.timeline.invalidate(i), t.prototype.invalidate.call(this, i);
  }, n.resetTo = function(i, s, o, l, a) {
    br || Ye.wake(), this._ts || this.play();
    var u = Math.min(this._dur, (this._dp._time - this._start) * this._ts), c;
    return this._initted || _o(this, u), c = this._ease(u / this._dur), ep(this, i, s, o, l, c, u, a) ? this.resetTo(i, s, o, l, 1) : (Ci(this, 0), this.parent || Qa(this._dp, this, "_first", "_last", this._dp._sort ? "_start" : 0), this.render(0));
  }, n.kill = function(i, s) {
    if (s === void 0 && (s = "all"), !i && (!s || s === "all"))
      return this._lazy = this._pt = 0, this.parent ? ir(this) : this;
    if (this.timeline) {
      var o = this.timeline.totalDuration();
      return this.timeline.killTweensOf(i, s, zt && zt.vars.overwrite !== !0)._first || ir(this), this.parent && o !== this.timeline.totalDuration() && Un(this, this._dur * this.timeline._tDur / o, 0, 1), this;
    }
    var l = this._targets, a = i ? Ze(i) : l, u = this._ptLookup, c = this._pt, f, d, _, m, h, v, x;
    if ((!s || s === "all") && Ph(l, a))
      return s === "all" && (this._pt = 0), ir(this);
    for (f = this._op = this._op || [], s !== "all" && (xe(s) && (h = {}, Fe(s, function(E) {
      return h[E] = 1;
    }), s = h), s = tp(l, s)), x = l.length; x--; )
      if (~a.indexOf(l[x])) {
        d = u[x], s === "all" ? (f[x] = s, m = d, _ = {}) : (_ = f[x] = f[x] || {}, m = s);
        for (h in m)
          v = d && d[h], v && ((!("kill" in v.d) || v.d.kill(h) === !0) && Si(this, v, "_pt"), delete d[h]), _ !== "all" && (_[h] = 1);
      }
    return this._initted && !this._pt && c && ir(this), this;
  }, e.to = function(i, s) {
    return new e(i, s, arguments[2]);
  }, e.from = function(i, s) {
    return fr(1, arguments);
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
    return fr(2, arguments);
  }, e.set = function(i, s) {
    return s.duration = 0, s.repeatDelay || (s.repeat = 0), new e(i, s);
  }, e.killTweensOf = function(i, s, o) {
    return ue.killTweensOf(i, s, o);
  }, e;
}(xr);
nt(ge.prototype, {
  _targets: [],
  _lazy: 0,
  _startAt: 0,
  _op: 0,
  _onInit: 0
});
Fe("staggerTo,staggerFrom,staggerFromTo", function(t) {
  ge[t] = function() {
    var e = new Me(), n = vs.call(arguments, 0);
    return n.splice(t === "staggerFromTo" ? 5 : 4, 0, 0), e[t].apply(e, n);
  };
});
var go = function(e, n, r) {
  return e[n] = r;
}, bu = function(e, n, r) {
  return e[n](r);
}, rp = function(e, n, r, i) {
  return e[n](i.fp, r);
}, ip = function(e, n, r) {
  return e.setAttribute(n, r);
}, mo = function(e, n) {
  return fe(e[n]) ? bu : oo(e[n]) && e.setAttribute ? ip : go;
}, xu = function(e, n) {
  return n.set(n.t, n.p, Math.round((n.s + n.c * e) * 1e6) / 1e6, n);
}, sp = function(e, n) {
  return n.set(n.t, n.p, !!(n.s + n.c * e), n);
}, Eu = function(e, n) {
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
}, vo = function(e, n) {
  for (var r = n._pt; r; )
    r.r(e, r.d), r = r._next;
}, op = function(e, n, r, i) {
  for (var s = this._pt, o; s; )
    o = s._next, s.p === i && s.modifier(e, n, r), s = o;
}, lp = function(e) {
  for (var n = this._pt, r, i; n; )
    i = n._next, n.p === e && !n.op || n.op === e ? Si(this, n, "_pt") : n.dep || (r = 1), n = i;
  return !r;
}, ap = function(e, n, r, i) {
  i.mSet(e, n, i.m.call(i.tween, r, i.mt), i);
}, Ou = function(e) {
  for (var n = e._pt, r, i, s, o; n; ) {
    for (r = n._next, i = s; i && i.pr > n.pr; )
      i = i._next;
    (n._prev = i ? i._prev : o) ? n._prev._next = n : s = n, (n._next = i) ? i._prev = n : o = n, n = r;
  }
  e._pt = s;
}, $e = /* @__PURE__ */ function() {
  function t(n, r, i, s, o, l, a, u, c) {
    this.t = r, this.s = s, this.c = o, this.p = i, this.r = l || xu, this.d = a || this, this.set = u || go, this.pr = c || 0, this._next = n, n && (n._prev = this);
  }
  var e = t.prototype;
  return e.modifier = function(r, i, s) {
    this.mSet = this.mSet || this.set, this.set = ap, this.m = r, this.mt = s, this.tween = i;
  }, t;
}();
Fe(fo + "parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger", function(t) {
  return co[t] = 1;
});
Ge.TweenMax = Ge.TweenLite = ge;
Ge.TimelineLite = Ge.TimelineMax = Me;
ue = new Me({
  sortChildren: !1,
  defaults: Bn,
  autoRemoveChildren: !0,
  id: "root",
  smoothChildTiming: !0
});
qe.stringFilter = du;
var yn = [], Gr = {}, up = [], yl = 0, cp = 0, Ui = function(e) {
  return (Gr[e] || up).map(function(n) {
    return n();
  });
}, Es = function() {
  var e = Date.now(), n = [];
  e - yl > 2 && (Ui("matchMediaInit"), yn.forEach(function(r) {
    var i = r.queries, s = r.conditions, o, l, a, u;
    for (l in i)
      o = ft.matchMedia(i[l]).matches, o && (a = 1), o !== s[l] && (s[l] = o, u = 1);
    u && (r.revert(), a && n.push(r));
  }), Ui("matchMediaRevert"), n.forEach(function(r) {
    return r.onMatch(r, function(i) {
      return r.add(null, i);
    });
  }), yl = e, Ui("matchMedia"));
}, Nu = /* @__PURE__ */ function() {
  function t(n, r) {
    this.selector = r && ys(r), this.data = [], this._r = [], this.isReverted = !1, this.id = cp++, n && this.add(n);
  }
  var e = t.prototype;
  return e.add = function(r, i, s) {
    fe(r) && (s = i, i = r, r = fe);
    var o = this, l = function() {
      var u = ae, c = o.selector, f;
      return u && u !== o && u.data.push(o), s && (o.selector = ys(s)), ae = o, f = i.apply(o, arguments), fe(f) && o._r.push(f), ae = u, o.selector = c, o.isReverted = !1, f;
    };
    return o.last = l, r === fe ? l(o, function(a) {
      return o.add(null, a);
    }) : r ? o[r] = l : l;
  }, e.ignore = function(r) {
    var i = ae;
    ae = null, r(this), ae = i;
  }, e.getTweens = function() {
    var r = [];
    return this.data.forEach(function(i) {
      return i instanceof t ? r.push.apply(r, i.getTweens()) : i instanceof ge && !(i.parent && i.parent.data === "nested") && r.push(i);
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
        u = s.data[a], u instanceof Me ? u.data !== "nested" && (u.scrollTrigger && u.scrollTrigger.revert(), u.kill()) : !(u instanceof ge) && u.revert && u.revert(r);
      s._r.forEach(function(c) {
        return c(r, s);
      }), s.isReverted = !0;
    }() : this.data.forEach(function(l) {
      return l.kill && l.kill();
    }), this.clear(), i)
      for (var o = yn.length; o--; )
        yn[o].id === this.id && yn.splice(o, 1);
  }, e.revert = function(r) {
    this.kill(r || {});
  }, t;
}(), fp = /* @__PURE__ */ function() {
  function t(n) {
    this.contexts = [], this.scope = n, ae && ae.data.push(this);
  }
  var e = t.prototype;
  return e.add = function(r, i, s) {
    yt(r) || (r = {
      matches: r
    });
    var o = new Nu(0, s || this.scope), l = o.conditions = {}, a, u, c;
    ae && !o.selector && (o.selector = ae.selector), this.contexts.push(o), i = o.add("onMatch", i), o.queries = r;
    for (u in r)
      u === "all" ? c = 1 : (a = ft.matchMedia(r[u]), a && (yn.indexOf(o) < 0 && yn.push(o), (l[u] = a.matches) && (c = 1), a.addListener ? a.addListener(Es) : a.addEventListener("change", Es)));
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
}(), ui = {
  registerPlugin: function() {
    for (var e = arguments.length, n = new Array(e), r = 0; r < e; r++)
      n[r] = arguments[r];
    n.forEach(function(i) {
      return uu(i);
    });
  },
  timeline: function(e) {
    return new Me(e);
  },
  getTweensOf: function(e, n) {
    return ue.getTweensOf(e, n);
  },
  getProperty: function(e, n, r, i) {
    xe(e) && (e = Ze(e)[0]);
    var s = gn(e || {}).get, o = r ? Ga : qa;
    return r === "native" && (r = ""), e && (n ? o((He[n] && He[n].get || s)(e, n, r, i)) : function(l, a, u) {
      return o((He[l] && He[l].get || s)(e, l, a, u));
    });
  },
  quickSetter: function(e, n, r) {
    if (e = Ze(e), e.length > 1) {
      var i = e.map(function(c) {
        return ze.quickSetter(c, n, r);
      }), s = i.length;
      return function(c) {
        for (var f = s; f--; )
          i[f](c);
      };
    }
    e = e[0] || {};
    var o = He[n], l = gn(e), a = l.harness && (l.harness.aliases || {})[n] || n, u = o ? function(c) {
      var f = new o();
      Mn._pt = 0, f.init(e, r ? c + r : c, Mn, 0, [e]), f.render(1, f), Mn._pt && vo(1, Mn);
    } : l.set(e, a);
    return o ? u : function(c) {
      return u(e, a, r ? c + r : c, l, 1);
    };
  },
  quickTo: function(e, n, r) {
    var i, s = ze.to(e, En((i = {}, i[n] = "+=0.1", i.paused = !0, i), r || {})), o = function(a, u, c) {
      return s.resetTo(n, a, u, c);
    };
    return o.tween = s, o;
  },
  isTweening: function(e) {
    return ue.getTweensOf(e, !0).length > 0;
  },
  defaults: function(e) {
    return e && e.ease && (e.ease = vn(e.ease, Bn.ease)), pl(Bn, e || {});
  },
  config: function(e) {
    return pl(qe, e || {});
  },
  registerEffect: function(e) {
    var n = e.name, r = e.effect, i = e.plugins, s = e.defaults, o = e.extendTimeline;
    (i || "").split(",").forEach(function(l) {
      return l && !He[l] && !Ge[l] && mr(n + " effect requires " + l + " plugin.");
    }), Li[n] = function(l, a, u) {
      return r(Ze(l), nt(a || {}, s), u);
    }, o && (Me.prototype[n] = function(l, a, u) {
      return this.add(Li[n](l, yt(a) ? a : (u = a) && {}, this), u);
    });
  },
  registerEase: function(e, n) {
    Q[e] = vn(n);
  },
  parseEase: function(e, n) {
    return arguments.length ? vn(e, n) : Q;
  },
  getById: function(e) {
    return ue.getById(e);
  },
  exportRoot: function(e, n) {
    e === void 0 && (e = {});
    var r = new Me(e), i, s;
    for (r.smoothChildTiming = Ie(e.smoothChildTiming), ue.remove(r), r._dp = 0, r._time = r._tTime = ue._time, i = ue._first; i; )
      s = i._next, (n || !(!i._dur && i instanceof ge && i.vars.onComplete === i._targets[0])) && ht(r, i, i._start - i._delay), i = s;
    return ht(ue, r, 0), r;
  },
  context: function(e, n) {
    return e ? new Nu(e, n) : ae;
  },
  matchMedia: function(e) {
    return new fp(e);
  },
  matchMediaRefresh: function() {
    return yn.forEach(function(e) {
      var n = e.conditions, r, i;
      for (i in n)
        n[i] && (n[i] = !1, r = 1);
      r && e.revert();
    }) || Es();
  },
  addEventListener: function(e, n) {
    var r = Gr[e] || (Gr[e] = []);
    ~r.indexOf(n) || r.push(n);
  },
  removeEventListener: function(e, n) {
    var r = Gr[e], i = r && r.indexOf(n);
    i >= 0 && r.splice(i, 1);
  },
  utils: {
    wrap: Uh,
    wrapYoyo: Hh,
    distribute: ru,
    random: su,
    snap: iu,
    normalize: jh,
    getUnit: Te,
    clamp: $h,
    splitColor: cu,
    toArray: Ze,
    selector: ys,
    mapRange: lu,
    pipe: zh,
    unitize: Bh,
    interpolate: Wh,
    shuffle: nu
  },
  install: Ha,
  effects: Li,
  ticker: Ye,
  updateRoot: Me.updateRoot,
  plugins: He,
  globalTimeline: ue,
  core: {
    PropTween: $e,
    globals: Wa,
    Tween: ge,
    Timeline: Me,
    Animation: xr,
    getCache: gn,
    _removeLinkedListItem: Si,
    reverting: function() {
      return Se;
    },
    context: function(e) {
      return e && ae && (ae.data.push(e), e._ctx = ae), ae;
    },
    suppressOverwrites: function(e) {
      return so = e;
    }
  }
};
Fe("to,from,fromTo,delayedCall,set,killTweensOf", function(t) {
  return ui[t] = ge[t];
});
Ye.add(Me.updateRoot);
Mn = ui.to({}, {
  duration: 0
});
var dp = function(e, n) {
  for (var r = e._pt; r && r.p !== n && r.op !== n && r.fp !== n; )
    r = r._next;
  return r;
}, hp = function(e, n) {
  var r = e._targets, i, s, o;
  for (i in n)
    for (s = r.length; s--; )
      o = e._ptLookup[s][i], o && (o = o.d) && (o._pt && (o = dp(o, i)), o && o.modifier && o.modifier(n[i], e, r[s], i));
}, Hi = function(e, n) {
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
        hp(l, s);
      };
    }
  };
}, ze = ui.registerPlugin({
  name: "attr",
  init: function(e, n, r, i, s) {
    var o, l, a;
    this.tween = r;
    for (o in n)
      a = e.getAttribute(o) || "", l = this.add(e, "setAttribute", (a || 0) + "", n[o], i, s, 0, 0, o), l.op = o, l.b = a, this._props.push(o);
  },
  render: function(e, n) {
    for (var r = n._pt; r; )
      Se ? r.set(r.t, r.p, r.b, r) : r.r(e, r.d), r = r._next;
  }
}, {
  name: "endArray",
  init: function(e, n) {
    for (var r = n.length; r--; )
      this.add(e, r, e[r] || 0, n[r], 0, 0, 0, 0, 0, 1);
  }
}, Hi("roundProps", bs), Hi("modifiers"), Hi("snap", iu)) || ui;
ge.version = Me.version = ze.version = "3.12.5";
Ua = 1;
lo() && Hn();
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
 * CSSPlugin 3.12.5
 * https://gsap.com
 *
 * Copyright 2008-2024, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/
var bl, Bt, Ln, yo, cn, xl, bo, pp = function() {
  return typeof window < "u";
}, Mt = {}, on = 180 / Math.PI, zn = Math.PI / 180, Vn = Math.atan2, El = 1e8, xo = /([A-Z])/g, _p = /(left|right|width|margin|padding|x)/i, gp = /[\s,\(]\S/, _t = {
  autoAlpha: "opacity,visibility",
  scale: "scaleX,scaleY",
  alpha: "opacity"
}, Os = function(e, n) {
  return n.set(n.t, n.p, Math.round((n.s + n.c * e) * 1e4) / 1e4 + n.u, n);
}, mp = function(e, n) {
  return n.set(n.t, n.p, e === 1 ? n.e : Math.round((n.s + n.c * e) * 1e4) / 1e4 + n.u, n);
}, vp = function(e, n) {
  return n.set(n.t, n.p, e ? Math.round((n.s + n.c * e) * 1e4) / 1e4 + n.u : n.b, n);
}, yp = function(e, n) {
  var r = n.s + n.c * e;
  n.set(n.t, n.p, ~~(r + (r < 0 ? -0.5 : 0.5)) + n.u, n);
}, wu = function(e, n) {
  return n.set(n.t, n.p, e ? n.e : n.b, n);
}, Tu = function(e, n) {
  return n.set(n.t, n.p, e !== 1 ? n.b : n.e, n);
}, bp = function(e, n, r) {
  return e.style[n] = r;
}, xp = function(e, n, r) {
  return e.style.setProperty(n, r);
}, Ep = function(e, n, r) {
  return e._gsap[n] = r;
}, Op = function(e, n, r) {
  return e._gsap.scaleX = e._gsap.scaleY = r;
}, Np = function(e, n, r, i, s) {
  var o = e._gsap;
  o.scaleX = o.scaleY = r, o.renderTransform(s, o);
}, wp = function(e, n, r, i, s) {
  var o = e._gsap;
  o[n] = r, o.renderTransform(s, o);
}, ce = "transform", Le = ce + "Origin", Tp = function t(e, n) {
  var r = this, i = this.target, s = i.style, o = i._gsap;
  if (e in Mt && s) {
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
}, Su = function(e) {
  e.translate && (e.removeProperty("translate"), e.removeProperty("scale"), e.removeProperty("rotate"));
}, Sp = function() {
  var e = this.props, n = this.target, r = n.style, i = n._gsap, s, o;
  for (s = 0; s < e.length; s += 3)
    e[s + 1] ? n[e[s]] = e[s + 2] : e[s + 2] ? r[e[s]] = e[s + 2] : r.removeProperty(e[s].substr(0, 2) === "--" ? e[s] : e[s].replace(xo, "-$1").toLowerCase());
  if (this.tfm) {
    for (o in this.tfm)
      i[o] = this.tfm[o];
    i.svg && (i.renderTransform(), n.setAttribute("data-svg-origin", this.svgo || "")), s = bo(), (!s || !s.isStart) && !r[ce] && (Su(r), i.zOrigin && r[Le] && (r[Le] += " " + i.zOrigin + "px", i.zOrigin = 0, i.renderTransform()), i.uncache = 1);
  }
}, Du = function(e, n) {
  var r = {
    target: e,
    props: [],
    revert: Sp,
    save: Tp
  };
  return e._gsap || ze.core.getCache(e), n && n.split(",").forEach(function(i) {
    return r.save(i);
  }), r;
}, Cu, Ns = function(e, n) {
  var r = Bt.createElementNS ? Bt.createElementNS((n || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"), e) : Bt.createElement(e);
  return r && r.style ? r : Bt.createElement(e);
}, vt = function t(e, n, r) {
  var i = getComputedStyle(e);
  return i[n] || i.getPropertyValue(n.replace(xo, "-$1").toLowerCase()) || i.getPropertyValue(n) || !r && t(e, Wn(n) || n, 1) || "";
}, Ol = "O,Moz,ms,Ms,Webkit".split(","), Wn = function(e, n, r) {
  var i = n || cn, s = i.style, o = 5;
  if (e in s && !r)
    return e;
  for (e = e.charAt(0).toUpperCase() + e.substr(1); o-- && !(Ol[o] + e in s); )
    ;
  return o < 0 ? null : (o === 3 ? "ms" : o >= 0 ? Ol[o] : "") + e;
}, ws = function() {
  pp() && window.document && (bl = window, Bt = bl.document, Ln = Bt.documentElement, cn = Ns("div") || {
    style: {}
  }, Ns("div"), ce = Wn(ce), Le = ce + "Origin", cn.style.cssText = "border-width:0;line-height:0;position:absolute;padding:0", Cu = !!Wn("perspective"), bo = ze.core.reverting, yo = 1);
}, Wi = function t(e) {
  var n = Ns("svg", this.ownerSVGElement && this.ownerSVGElement.getAttribute("xmlns") || "http://www.w3.org/2000/svg"), r = this.parentNode, i = this.nextSibling, s = this.style.cssText, o;
  if (Ln.appendChild(n), n.appendChild(this), this.style.display = "block", e)
    try {
      o = this.getBBox(), this._gsapBBox = this.getBBox, this.getBBox = t;
    } catch {
    }
  else this._gsapBBox && (o = this._gsapBBox());
  return r && (i ? r.insertBefore(this, i) : r.appendChild(this)), Ln.removeChild(n), this.style.cssText = s, o;
}, Nl = function(e, n) {
  for (var r = n.length; r--; )
    if (e.hasAttribute(n[r]))
      return e.getAttribute(n[r]);
}, Vu = function(e) {
  var n;
  try {
    n = e.getBBox();
  } catch {
    n = Wi.call(e, !0);
  }
  return n && (n.width || n.height) || e.getBBox === Wi || (n = Wi.call(e, !0)), n && !n.width && !n.x && !n.y ? {
    x: +Nl(e, ["x", "cx", "x1"]) || 0,
    y: +Nl(e, ["y", "cy", "y1"]) || 0,
    width: 0,
    height: 0
  } : n;
}, Pu = function(e) {
  return !!(e.getCTM && (!e.parentNode || e.ownerSVGElement) && Vu(e));
}, On = function(e, n) {
  if (n) {
    var r = e.style, i;
    n in Mt && n !== Le && (n = ce), r.removeProperty ? (i = n.substr(0, 2), (i === "ms" || n.substr(0, 6) === "webkit") && (n = "-" + n), r.removeProperty(i === "--" ? n : n.replace(xo, "-$1").toLowerCase())) : r.removeAttribute(n);
  }
}, jt = function(e, n, r, i, s, o) {
  var l = new $e(e._pt, n, r, 0, 1, o ? Tu : wu);
  return e._pt = l, l.b = i, l.e = s, e._props.push(r), l;
}, wl = {
  deg: 1,
  rad: 1,
  turn: 1
}, Dp = {
  grid: 1,
  flex: 1
}, Gt = function t(e, n, r, i) {
  var s = parseFloat(r) || 0, o = (r + "").trim().substr((s + "").length) || "px", l = cn.style, a = _p.test(n), u = e.tagName.toLowerCase() === "svg", c = (u ? "client" : "offset") + (a ? "Width" : "Height"), f = 100, d = i === "px", _ = i === "%", m, h, v, x;
  if (i === o || !s || wl[i] || wl[o])
    return s;
  if (o !== "px" && !d && (s = t(e, n, r, "px")), x = e.getCTM && Pu(e), (_ || o === "%") && (Mt[n] || ~n.indexOf("adius")))
    return m = x ? e.getBBox()[a ? "width" : "height"] : e[c], he(_ ? s / m * f : s / 100 * m);
  if (l[a ? "width" : "height"] = f + (d ? o : i), h = ~n.indexOf("adius") || i === "em" && e.appendChild && !u ? e : e.parentNode, x && (h = (e.ownerSVGElement || {}).parentNode), (!h || h === Bt || !h.appendChild) && (h = Bt.body), v = h._gsap, v && _ && v.width && a && v.time === Ye.time && !v.uncache)
    return he(s / v.width * f);
  if (_ && (n === "height" || n === "width")) {
    var E = e.style[n];
    e.style[n] = f + i, m = e[c], E ? e.style[n] = E : On(e, n);
  } else
    (_ || o === "%") && !Dp[vt(h, "display")] && (l.position = vt(e, "position")), h === e && (l.position = "static"), h.appendChild(cn), m = cn[c], h.removeChild(cn), l.position = "absolute";
  return a && _ && (v = gn(h), v.time = Ye.time, v.width = h[c]), he(d ? m * s / f : m && s ? f / m * s : 0);
}, Tt = function(e, n, r, i) {
  var s;
  return yo || ws(), n in _t && n !== "transform" && (n = _t[n], ~n.indexOf(",") && (n = n.split(",")[0])), Mt[n] && n !== "transform" ? (s = Or(e, i), s = n !== "transformOrigin" ? s[n] : s.svg ? s.origin : fi(vt(e, Le)) + " " + s.zOrigin + "px") : (s = e.style[n], (!s || s === "auto" || i || ~(s + "").indexOf("calc(")) && (s = ci[n] && ci[n](e, n, r) || vt(e, n) || Ka(e, n) || (n === "opacity" ? 1 : 0))), r && !~(s + "").trim().indexOf(" ") ? Gt(e, n, s, r) + r : s;
}, Cp = function(e, n, r, i) {
  if (!r || r === "none") {
    var s = Wn(n, e, 1), o = s && vt(e, s, 1);
    o && o !== r ? (n = s, r = o) : n === "borderColor" && (r = vt(e, "borderTopColor"));
  }
  var l = new $e(this._pt, e.style, n, 0, 1, Eu), a = 0, u = 0, c, f, d, _, m, h, v, x, E, O, w, y;
  if (l.b = r, l.e = i, r += "", i += "", i === "auto" && (h = e.style[n], e.style[n] = i, i = vt(e, n) || i, h ? e.style[n] = h : On(e, n)), c = [r, i], du(c), r = c[0], i = c[1], d = r.match(Pn) || [], y = i.match(Pn) || [], y.length) {
    for (; f = Pn.exec(i); )
      v = f[0], E = i.substring(a, f.index), m ? m = (m + 1) % 5 : (E.substr(-5) === "rgba(" || E.substr(-5) === "hsla(") && (m = 1), v !== (h = d[u++] || "") && (_ = parseFloat(h) || 0, w = h.substr((_ + "").length), v.charAt(1) === "=" && (v = $n(_, v) + w), x = parseFloat(v), O = v.substr((x + "").length), a = Pn.lastIndex - O.length, O || (O = O || qe.units[n] || w, a === i.length && (i += O, l.e += O)), w !== O && (_ = Gt(e, n, h, O) || 0), l._pt = {
        _next: l._pt,
        p: E || u === 1 ? E : ",",
        //note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.
        s: _,
        c: x - _,
        m: m && m < 4 || n === "zIndex" ? Math.round : 0
      });
    l.c = a < i.length ? i.substring(a, i.length) : "";
  } else
    l.r = n === "display" && i === "none" ? Tu : wu;
  return Ba.test(i) && (l.e = 0), this._pt = l, l;
}, Tl = {
  top: "0%",
  bottom: "100%",
  left: "0%",
  right: "100%",
  center: "50%"
}, Vp = function(e) {
  var n = e.split(" "), r = n[0], i = n[1] || "50%";
  return (r === "top" || r === "bottom" || i === "left" || i === "right") && (e = r, r = i, i = e), n[0] = Tl[r] || r, n[1] = Tl[i] || i, n.join(" ");
}, Pp = function(e, n) {
  if (n.tween && n.tween._time === n.tween._dur) {
    var r = n.t, i = r.style, s = n.u, o = r._gsap, l, a, u;
    if (s === "all" || s === !0)
      i.cssText = "", a = 1;
    else
      for (s = s.split(","), u = s.length; --u > -1; )
        l = s[u], Mt[l] && (a = 1, l = l === "transformOrigin" ? Le : ce), On(r, l);
    a && (On(r, ce), o && (o.svg && r.removeAttribute("transform"), Or(r, 1), o.uncache = 1, Su(i)));
  }
}, ci = {
  clearProps: function(e, n, r, i, s) {
    if (s.data !== "isFromStart") {
      var o = e._pt = new $e(e._pt, n, r, 0, 0, Pp);
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
}, Er = [1, 0, 0, 1, 0, 0], Mu = {}, ku = function(e) {
  return e === "matrix(1, 0, 0, 1, 0, 0)" || e === "none" || !e;
}, Sl = function(e) {
  var n = vt(e, ce);
  return ku(n) ? Er : n.substr(7).match(za).map(he);
}, Eo = function(e, n) {
  var r = e._gsap || gn(e), i = e.style, s = Sl(e), o, l, a, u;
  return r.svg && e.getAttribute("transform") ? (a = e.transform.baseVal.consolidate().matrix, s = [a.a, a.b, a.c, a.d, a.e, a.f], s.join(",") === "1,0,0,1,0,0" ? Er : s) : (s === Er && !e.offsetParent && e !== Ln && !r.svg && (a = i.display, i.display = "block", o = e.parentNode, (!o || !e.offsetParent) && (u = 1, l = e.nextElementSibling, Ln.appendChild(e)), s = Sl(e), a ? i.display = a : On(e, "display"), u && (l ? o.insertBefore(e, l) : o ? o.appendChild(e) : Ln.removeChild(e))), n && s.length > 6 ? [s[0], s[1], s[4], s[5], s[12], s[13]] : s);
}, Ts = function(e, n, r, i, s, o) {
  var l = e._gsap, a = s || Eo(e, !0), u = l.xOrigin || 0, c = l.yOrigin || 0, f = l.xOffset || 0, d = l.yOffset || 0, _ = a[0], m = a[1], h = a[2], v = a[3], x = a[4], E = a[5], O = n.split(" "), w = parseFloat(O[0]) || 0, y = parseFloat(O[1]) || 0, P, N, k, D;
  r ? a !== Er && (N = _ * v - m * h) && (k = w * (v / N) + y * (-h / N) + (h * E - v * x) / N, D = w * (-m / N) + y * (_ / N) - (_ * E - m * x) / N, w = k, y = D) : (P = Vu(e), w = P.x + (~O[0].indexOf("%") ? w / 100 * P.width : w), y = P.y + (~(O[1] || O[0]).indexOf("%") ? y / 100 * P.height : y)), i || i !== !1 && l.smooth ? (x = w - u, E = y - c, l.xOffset = f + (x * _ + E * h) - x, l.yOffset = d + (x * m + E * v) - E) : l.xOffset = l.yOffset = 0, l.xOrigin = w, l.yOrigin = y, l.smooth = !!i, l.origin = n, l.originIsAbsolute = !!r, e.style[Le] = "0px 0px", o && (jt(o, l, "xOrigin", u, w), jt(o, l, "yOrigin", c, y), jt(o, l, "xOffset", f, l.xOffset), jt(o, l, "yOffset", d, l.yOffset)), e.setAttribute("data-svg-origin", w + " " + y);
}, Or = function(e, n) {
  var r = e._gsap || new gu(e);
  if ("x" in r && !n && !r.uncache)
    return r;
  var i = e.style, s = r.scaleX < 0, o = "px", l = "deg", a = getComputedStyle(e), u = vt(e, Le) || "0", c, f, d, _, m, h, v, x, E, O, w, y, P, N, k, D, W, J, K, Z, _e, te, G, z, j, Ce, bt, rt, ke, it, Be, xt;
  return c = f = d = h = v = x = E = O = w = 0, _ = m = 1, r.svg = !!(e.getCTM && Pu(e)), a.translate && ((a.translate !== "none" || a.scale !== "none" || a.rotate !== "none") && (i[ce] = (a.translate !== "none" ? "translate3d(" + (a.translate + " 0 0").split(" ").slice(0, 3).join(", ") + ") " : "") + (a.rotate !== "none" ? "rotate(" + a.rotate + ") " : "") + (a.scale !== "none" ? "scale(" + a.scale.split(" ").join(",") + ") " : "") + (a[ce] !== "none" ? a[ce] : "")), i.scale = i.rotate = i.translate = "none"), N = Eo(e, r.svg), r.svg && (r.uncache ? (j = e.getBBox(), u = r.xOrigin - j.x + "px " + (r.yOrigin - j.y) + "px", z = "") : z = !n && e.getAttribute("data-svg-origin"), Ts(e, z || u, !!z || r.originIsAbsolute, r.smooth !== !1, N)), y = r.xOrigin || 0, P = r.yOrigin || 0, N !== Er && (J = N[0], K = N[1], Z = N[2], _e = N[3], c = te = N[4], f = G = N[5], N.length === 6 ? (_ = Math.sqrt(J * J + K * K), m = Math.sqrt(_e * _e + Z * Z), h = J || K ? Vn(K, J) * on : 0, E = Z || _e ? Vn(Z, _e) * on + h : 0, E && (m *= Math.abs(Math.cos(E * zn))), r.svg && (c -= y - (y * J + P * Z), f -= P - (y * K + P * _e))) : (xt = N[6], it = N[7], bt = N[8], rt = N[9], ke = N[10], Be = N[11], c = N[12], f = N[13], d = N[14], k = Vn(xt, ke), v = k * on, k && (D = Math.cos(-k), W = Math.sin(-k), z = te * D + bt * W, j = G * D + rt * W, Ce = xt * D + ke * W, bt = te * -W + bt * D, rt = G * -W + rt * D, ke = xt * -W + ke * D, Be = it * -W + Be * D, te = z, G = j, xt = Ce), k = Vn(-Z, ke), x = k * on, k && (D = Math.cos(-k), W = Math.sin(-k), z = J * D - bt * W, j = K * D - rt * W, Ce = Z * D - ke * W, Be = _e * W + Be * D, J = z, K = j, Z = Ce), k = Vn(K, J), h = k * on, k && (D = Math.cos(k), W = Math.sin(k), z = J * D + K * W, j = te * D + G * W, K = K * D - J * W, G = G * D - te * W, J = z, te = j), v && Math.abs(v) + Math.abs(h) > 359.9 && (v = h = 0, x = 180 - x), _ = he(Math.sqrt(J * J + K * K + Z * Z)), m = he(Math.sqrt(G * G + xt * xt)), k = Vn(te, G), E = Math.abs(k) > 2e-4 ? k * on : 0, w = Be ? 1 / (Be < 0 ? -Be : Be) : 0), r.svg && (z = e.getAttribute("transform"), r.forceCSS = e.setAttribute("transform", "") || !ku(vt(e, ce)), z && e.setAttribute("transform", z))), Math.abs(E) > 90 && Math.abs(E) < 270 && (s ? (_ *= -1, E += h <= 0 ? 180 : -180, h += h <= 0 ? 180 : -180) : (m *= -1, E += E <= 0 ? 180 : -180)), n = n || r.uncache, r.x = c - ((r.xPercent = c && (!n && r.xPercent || (Math.round(e.offsetWidth / 2) === Math.round(-c) ? -50 : 0))) ? e.offsetWidth * r.xPercent / 100 : 0) + o, r.y = f - ((r.yPercent = f && (!n && r.yPercent || (Math.round(e.offsetHeight / 2) === Math.round(-f) ? -50 : 0))) ? e.offsetHeight * r.yPercent / 100 : 0) + o, r.z = d + o, r.scaleX = he(_), r.scaleY = he(m), r.rotation = he(h) + l, r.rotationX = he(v) + l, r.rotationY = he(x) + l, r.skewX = E + l, r.skewY = O + l, r.transformPerspective = w + o, (r.zOrigin = parseFloat(u.split(" ")[2]) || !n && r.zOrigin || 0) && (i[Le] = fi(u)), r.xOffset = r.yOffset = 0, r.force3D = qe.force3D, r.renderTransform = r.svg ? kp : Cu ? Au : Mp, r.uncache = 0, r;
}, fi = function(e) {
  return (e = e.split(" "))[0] + " " + e[1];
}, Yi = function(e, n, r) {
  var i = Te(n);
  return he(parseFloat(n) + parseFloat(Gt(e, "x", r + "px", i))) + i;
}, Mp = function(e, n) {
  n.z = "0px", n.rotationY = n.rotationX = "0deg", n.force3D = 0, Au(e, n);
}, nn = "0deg", tr = "0px", rn = ") ", Au = function(e, n) {
  var r = n || this, i = r.xPercent, s = r.yPercent, o = r.x, l = r.y, a = r.z, u = r.rotation, c = r.rotationY, f = r.rotationX, d = r.skewX, _ = r.skewY, m = r.scaleX, h = r.scaleY, v = r.transformPerspective, x = r.force3D, E = r.target, O = r.zOrigin, w = "", y = x === "auto" && e && e !== 1 || x === !0;
  if (O && (f !== nn || c !== nn)) {
    var P = parseFloat(c) * zn, N = Math.sin(P), k = Math.cos(P), D;
    P = parseFloat(f) * zn, D = Math.cos(P), o = Yi(E, o, N * D * -O), l = Yi(E, l, -Math.sin(P) * -O), a = Yi(E, a, k * D * -O + O);
  }
  v !== tr && (w += "perspective(" + v + rn), (i || s) && (w += "translate(" + i + "%, " + s + "%) "), (y || o !== tr || l !== tr || a !== tr) && (w += a !== tr || y ? "translate3d(" + o + ", " + l + ", " + a + ") " : "translate(" + o + ", " + l + rn), u !== nn && (w += "rotate(" + u + rn), c !== nn && (w += "rotateY(" + c + rn), f !== nn && (w += "rotateX(" + f + rn), (d !== nn || _ !== nn) && (w += "skew(" + d + ", " + _ + rn), (m !== 1 || h !== 1) && (w += "scale(" + m + ", " + h + rn), E.style[ce] = w || "translate(0, 0)";
}, kp = function(e, n) {
  var r = n || this, i = r.xPercent, s = r.yPercent, o = r.x, l = r.y, a = r.rotation, u = r.skewX, c = r.skewY, f = r.scaleX, d = r.scaleY, _ = r.target, m = r.xOrigin, h = r.yOrigin, v = r.xOffset, x = r.yOffset, E = r.forceCSS, O = parseFloat(o), w = parseFloat(l), y, P, N, k, D;
  a = parseFloat(a), u = parseFloat(u), c = parseFloat(c), c && (c = parseFloat(c), u += c, a += c), a || u ? (a *= zn, u *= zn, y = Math.cos(a) * f, P = Math.sin(a) * f, N = Math.sin(a - u) * -d, k = Math.cos(a - u) * d, u && (c *= zn, D = Math.tan(u - c), D = Math.sqrt(1 + D * D), N *= D, k *= D, c && (D = Math.tan(c), D = Math.sqrt(1 + D * D), y *= D, P *= D)), y = he(y), P = he(P), N = he(N), k = he(k)) : (y = f, k = d, P = N = 0), (O && !~(o + "").indexOf("px") || w && !~(l + "").indexOf("px")) && (O = Gt(_, "x", o, "px"), w = Gt(_, "y", l, "px")), (m || h || v || x) && (O = he(O + m - (m * y + h * N) + v), w = he(w + h - (m * P + h * k) + x)), (i || s) && (D = _.getBBox(), O = he(O + i / 100 * D.width), w = he(w + s / 100 * D.height)), D = "matrix(" + y + "," + P + "," + N + "," + k + "," + O + "," + w + ")", _.setAttribute("transform", D), E && (_.style[ce] = D);
}, Ap = function(e, n, r, i, s) {
  var o = 360, l = xe(s), a = parseFloat(s) * (l && ~s.indexOf("rad") ? on : 1), u = a - i, c = i + u + "deg", f, d;
  return l && (f = s.split("_")[1], f === "short" && (u %= o, u !== u % (o / 2) && (u += u < 0 ? o : -o)), f === "cw" && u < 0 ? u = (u + o * El) % o - ~~(u / o) * o : f === "ccw" && u > 0 && (u = (u - o * El) % o - ~~(u / o) * o)), e._pt = d = new $e(e._pt, n, r, i, u, mp), d.e = c, d.u = "deg", e._props.push(r), d;
}, Dl = function(e, n) {
  for (var r in n)
    e[r] = n[r];
  return e;
}, Rp = function(e, n, r) {
  var i = Dl({}, r._gsap), s = "perspective,force3D,transformOrigin,svgOrigin", o = r.style, l, a, u, c, f, d, _, m;
  i.svg ? (u = r.getAttribute("transform"), r.setAttribute("transform", ""), o[ce] = n, l = Or(r, 1), On(r, ce), r.setAttribute("transform", u)) : (u = getComputedStyle(r)[ce], o[ce] = n, l = Or(r, 1), o[ce] = u);
  for (a in Mt)
    u = i[a], c = l[a], u !== c && s.indexOf(a) < 0 && (_ = Te(u), m = Te(c), f = _ !== m ? Gt(r, a, u, m) : parseFloat(u), d = parseFloat(c), e._pt = new $e(e._pt, l, a, f, d - f, Os), e._pt.u = m || 0, e._props.push(a));
  Dl(l, i);
};
Fe("padding,margin,Width,Radius", function(t, e) {
  var n = "Top", r = "Right", i = "Bottom", s = "Left", o = (e < 3 ? [n, r, i, s] : [n + s, n + r, i + r, i + s]).map(function(l) {
    return e < 2 ? t + l : "border" + l + t;
  });
  ci[e > 1 ? "border" + t : t] = function(l, a, u, c, f) {
    var d, _;
    if (arguments.length < 4)
      return d = o.map(function(m) {
        return Tt(l, m, u);
      }), _ = d.join(" "), _.split(d[0]).length === 5 ? d[0] : _;
    d = (c + "").split(" "), _ = {}, o.forEach(function(m, h) {
      return _[m] = d[h] = d[h] || d[(h - 1) / 2 | 0];
    }), l.init(a, _, f);
  };
});
var Ru = {
  name: "css",
  register: ws,
  targetTest: function(e) {
    return e.style && e.nodeType;
  },
  init: function(e, n, r, i, s) {
    var o = this._props, l = e.style, a = r.vars.startAt, u, c, f, d, _, m, h, v, x, E, O, w, y, P, N, k;
    yo || ws(), this.styles = this.styles || Du(e), k = this.styles.props, this.tween = r;
    for (h in n)
      if (h !== "autoRound" && (c = n[h], !(He[h] && mu(h, n, r, i, e, s)))) {
        if (_ = typeof c, m = ci[h], _ === "function" && (c = c.call(r, i, e, s), _ = typeof c), _ === "string" && ~c.indexOf("random(") && (c = yr(c)), m)
          m(this, e, h, c, r) && (N = 1);
        else if (h.substr(0, 2) === "--")
          u = (getComputedStyle(e).getPropertyValue(h) + "").trim(), c += "", Yt.lastIndex = 0, Yt.test(u) || (v = Te(u), x = Te(c)), x ? v !== x && (u = Gt(e, h, u, x) + x) : v && (c += v), this.add(l, "setProperty", u, c, i, s, 0, 0, h), o.push(h), k.push(h, 0, l[h]);
        else if (_ !== "undefined") {
          if (a && h in a ? (u = typeof a[h] == "function" ? a[h].call(r, i, e, s) : a[h], xe(u) && ~u.indexOf("random(") && (u = yr(u)), Te(u + "") || u === "auto" || (u += qe.units[h] || Te(Tt(e, h)) || ""), (u + "").charAt(1) === "=" && (u = Tt(e, h))) : u = Tt(e, h), d = parseFloat(u), E = _ === "string" && c.charAt(1) === "=" && c.substr(0, 2), E && (c = c.substr(2)), f = parseFloat(c), h in _t && (h === "autoAlpha" && (d === 1 && Tt(e, "visibility") === "hidden" && f && (d = 0), k.push("visibility", 0, l.visibility), jt(this, l, "visibility", d ? "inherit" : "hidden", f ? "inherit" : "hidden", !f)), h !== "scale" && h !== "transform" && (h = _t[h], ~h.indexOf(",") && (h = h.split(",")[0]))), O = h in Mt, O) {
            if (this.styles.save(h), w || (y = e._gsap, y.renderTransform && !n.parseTransform || Or(e, n.parseTransform), P = n.smoothOrigin !== !1 && y.smooth, w = this._pt = new $e(this._pt, l, ce, 0, 1, y.renderTransform, y, 0, -1), w.dep = 1), h === "scale")
              this._pt = new $e(this._pt, y, "scaleY", y.scaleY, (E ? $n(y.scaleY, E + f) : f) - y.scaleY || 0, Os), this._pt.u = 0, o.push("scaleY", h), h += "X";
            else if (h === "transformOrigin") {
              k.push(Le, 0, l[Le]), c = Vp(c), y.svg ? Ts(e, c, 0, P, 0, this) : (x = parseFloat(c.split(" ")[2]) || 0, x !== y.zOrigin && jt(this, y, "zOrigin", y.zOrigin, x), jt(this, l, h, fi(u), fi(c)));
              continue;
            } else if (h === "svgOrigin") {
              Ts(e, c, 1, P, 0, this);
              continue;
            } else if (h in Mu) {
              Ap(this, y, h, d, E ? $n(d, E + c) : c);
              continue;
            } else if (h === "smoothOrigin") {
              jt(this, y, "smooth", y.smooth, c);
              continue;
            } else if (h === "force3D") {
              y[h] = c;
              continue;
            } else if (h === "transform") {
              Rp(this, c, e);
              continue;
            }
          } else h in l || (h = Wn(h) || h);
          if (O || (f || f === 0) && (d || d === 0) && !gp.test(c) && h in l)
            v = (u + "").substr((d + "").length), f || (f = 0), x = Te(c) || (h in qe.units ? qe.units[h] : v), v !== x && (d = Gt(e, h, u, x)), this._pt = new $e(this._pt, O ? y : l, h, d, (E ? $n(d, E + f) : f) - d, !O && (x === "px" || h === "zIndex") && n.autoRound !== !1 ? yp : Os), this._pt.u = x || 0, v !== x && x !== "%" && (this._pt.b = u, this._pt.r = vp);
          else if (h in l)
            Cp.call(this, e, h, u, E ? E + c : c);
          else if (h in e)
            this.add(e, h, u || e[h], E ? E + c : c, i, s);
          else if (h !== "parseTransform") {
            uo(h, c);
            continue;
          }
          O || (h in l ? k.push(h, 0, l[h]) : k.push(h, 1, u || e[h])), o.push(h);
        }
      }
    N && Ou(this);
  },
  render: function(e, n) {
    if (n.tween._time || !bo())
      for (var r = n._pt; r; )
        r.r(e, r.d), r = r._next;
    else
      n.styles.revert();
  },
  get: Tt,
  aliases: _t,
  getSetter: function(e, n, r) {
    var i = _t[n];
    return i && i.indexOf(",") < 0 && (n = i), n in Mt && n !== Le && (e._gsap.x || Tt(e, "x")) ? r && xl === r ? n === "scale" ? Op : Ep : (xl = r || {}) && (n === "scale" ? Np : wp) : e.style && !oo(e.style[n]) ? bp : ~n.indexOf("-") ? xp : mo(e, n);
  },
  core: {
    _removeProperty: On,
    _getMatrix: Eo
  }
};
ze.utils.checkPrefix = Wn;
ze.core.getStyleSaver = Du;
(function(t, e, n, r) {
  var i = Fe(t + "," + e + "," + n, function(s) {
    Mt[s] = 1;
  });
  Fe(e, function(s) {
    qe.units[s] = "deg", Mu[s] = 1;
  }), _t[i[13]] = t + "," + e, Fe(r, function(s) {
    var o = s.split(":");
    _t[o[1]] = i[o[0]];
  });
})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent", "rotation,rotationX,rotationY,skewX,skewY", "transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective", "0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");
Fe("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective", function(t) {
  qe.units[t] = "px";
});
ze.registerPlugin(Ru);
var Ss = ze.registerPlugin(Ru) || ze;
Ss.core.Tween;
const Ip = ["fill"], Fp = /* @__PURE__ */ Qt({
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
    wn((u) => ({
      "09e7e913": u.zIndex
    }));
    const r = n, i = se(!1), s = se(null), o = se(null);
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
    }), (u, c) => (Jt(), Nn("svg", {
      class: "curve-mask",
      width: "100%",
      height: "100%",
      viewBox: "0 0 100 100",
      preserveAspectRatio: "none",
      fill: u.maskColor,
      ref_key: "overlay",
      ref: s
    }, [
      Zs("path", {
        class: "curve-mask__path",
        "vector-effect": "non-scaling-stroke",
        d: "M 0 100 V 100 Q 50 100 100 100 V 100 z",
        ref_key: "overlayPath",
        ref: o
      }, null, 512)
    ], 8, Ip));
  }
}), $p = ".curve-mask{position:absolute;z-index:var(--09e7e913);top:0;left:0;width:100%;height:100%;pointer-events:none}", Lp = /* @__PURE__ */ Sn(Fp, [["styles", [$p]]]), zp = /* @__PURE__ */ Tn(Lp);
function Bp(t = "curve-mask") {
  customElements.define(t, zp);
}
const jp = { class: "text-underline" }, Up = /* @__PURE__ */ Qt({
  __name: "TextUnderline",
  props: {
    lineColor: { default: "white", type: String },
    lineHeight: { default: "3px", type: String },
    hoverTextColor: { default: "currentColor", type: String }
  },
  setup(t) {
    return wn((e) => ({
      "197a2a41": e.lineColor,
      "1dc4f209": e.lineHeight,
      "6ce51d28": e.hoverTextColor
    })), (e, n) => (Jt(), Nn("div", jp, [
      xi(e.$slots, "default")
    ]));
  }
}), Hp = '.text-underline{--text-underline-line-color: var(--197a2a41);--text-underline-line-height: var(--1dc4f209);--text-underline-hover-text-color: var(--6ce51d28);position:relative;display:inline-flex;transition:.5s}.text-underline:after{position:absolute;content:"";top:100%;left:0;width:100%;height:var(--text-underline-line-height);background:var(--text-underline-line-color);transform:scaleX(0);transform-origin:right;transition:transform .5s}.text-underline:hover{color:var(--text-underline-hover-text-color)}.text-underline:hover:after{transform:scaleX(1);transform-origin:left}', Wp = /* @__PURE__ */ Sn(Up, [["styles", [Hp]]]), Yp = /* @__PURE__ */ Tn(Wp);
function Kp(t = "text-underline") {
  customElements.define(t, Yp);
}
const Xp = /* @__PURE__ */ Qt({
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
    wn((r) => ({
      "5a98d278": r.textColor,
      "4cadf368": r.textSize,
      "1a140203": r.textWeight,
      "4cb99acc": r.textFont,
      "3bd4c64a": r.textLeading,
      "5b7cc0c6": r.textStyle,
      72306868: r.textWhiteSpace,
      "7db84722": r.stagger
    }));
    const e = t, n = se(null);
    return Xn(() => {
      const r = e.text;
      if (n.value && r) {
        let i = r.split("");
        n.value.textContent = "", i.forEach((s, o) => {
          var a;
          let l = document.createElement("span");
          l.textContent = s, l.style.setProperty("--i", `${o}`), l.dataset.text = s, (a = n.value) == null || a.append(l);
        });
      }
    }), (r, i) => (Jt(), Nn("div", {
      class: "text-float",
      ref_key: "parent",
      ref: n
    }, null, 512));
  }
}), qp = ".text-float{--text-float-color: var(--5a98d278);--text-float-size: var(--4cadf368);--text-float-weight: var(--1a140203);--text-float-font: var(--4cb99acc);--text-float-leading: var(--3bd4c64a);--text-float-style: var(--5b7cc0c6);--text-float-white-space: var(--72306868);--text-float-stagger: var(--7db84722);display:flex;overflow:hidden}.text-float span{position:relative;transition:.3s;color:var(--text-float-color);font-size:var(--text-float-size);font-weight:var(--text-float-weight);font-family:var(--text-float-font);line-height:var(--text-float-leading);font-style:var(--text-float-style);white-space:var(--text-float-white-space);transition-delay:calc(var(--i) * var(--text-float-stagger) * .05 * 1s)}.text-float span:before{position:absolute;content:attr(data-text);transform:translateY(130%)}.text-float:hover span{transform:translateY(-130%)}", Gp = /* @__PURE__ */ Sn(Xp, [["styles", [qp]]]), Qp = /* @__PURE__ */ Tn(Gp);
function Jp(t = "text-float") {
  customElements.define(t, Qp);
}
function Zp() {
  Wd(), Qd(), gh(), xh(), Bp(), Kp(), Jp();
}
export {
  Zp as register
};
