var I = "top", Y = "bottom", X = "right", W = "left", bt = "auto", Ue = [I, Y, X, W], Te = "start", $e = "end", wr = "clippingParents", Yt = "viewport", Re = "popper", Or = "reference", St = /* @__PURE__ */ Ue.reduce(function(e, t) {
  return e.concat([t + "-" + Te, t + "-" + $e]);
}, []), Xt = /* @__PURE__ */ [].concat(Ue, [bt]).reduce(function(e, t) {
  return e.concat([t, t + "-" + Te, t + "-" + $e]);
}, []), xr = "beforeRead", Er = "read", Ar = "afterRead", Tr = "beforeMain", Dr = "main", Cr = "afterMain", Sr = "beforeWrite", Lr = "write", jr = "afterWrite", Pr = [xr, Er, Ar, Tr, Dr, Cr, Sr, Lr, jr];
function te(e) {
  return e ? (e.nodeName || "").toLowerCase() : null;
}
function q(e) {
  if (e == null)
    return window;
  if (e.toString() !== "[object Window]") {
    var t = e.ownerDocument;
    return t && t.defaultView || window;
  }
  return e;
}
function ge(e) {
  var t = q(e).Element;
  return e instanceof t || e instanceof Element;
}
function z(e) {
  var t = q(e).HTMLElement;
  return e instanceof t || e instanceof HTMLElement;
}
function wt(e) {
  if (typeof ShadowRoot > "u")
    return !1;
  var t = q(e).ShadowRoot;
  return e instanceof t || e instanceof ShadowRoot;
}
function Mr(e) {
  var t = e.state;
  Object.keys(t.elements).forEach(function(r) {
    var i = t.styles[r] || {}, o = t.attributes[r] || {}, s = t.elements[r];
    !z(s) || !te(s) || (Object.assign(s.style, i), Object.keys(o).forEach(function(c) {
      var f = o[c];
      f === !1 ? s.removeAttribute(c) : s.setAttribute(c, f === !0 ? "" : f);
    }));
  });
}
function Nr(e) {
  var t = e.state, r = {
    popper: {
      position: t.options.strategy,
      left: "0",
      top: "0",
      margin: "0"
    },
    arrow: {
      position: "absolute"
    },
    reference: {}
  };
  return Object.assign(t.elements.popper.style, r.popper), t.styles = r, t.elements.arrow && Object.assign(t.elements.arrow.style, r.arrow), function() {
    Object.keys(t.elements).forEach(function(i) {
      var o = t.elements[i], s = t.attributes[i] || {}, c = Object.keys(t.styles.hasOwnProperty(i) ? t.styles[i] : r[i]), f = c.reduce(function(u, l) {
        return u[l] = "", u;
      }, {});
      !z(o) || !te(o) || (Object.assign(o.style, f), Object.keys(s).forEach(function(u) {
        o.removeAttribute(u);
      }));
    });
  };
}
const Gt = {
  name: "applyStyles",
  enabled: !0,
  phase: "write",
  fn: Mr,
  effect: Nr,
  requires: ["computeStyles"]
};
function ee(e) {
  return e.split("-")[0];
}
var he = Math.max, ot = Math.min, De = Math.round;
function vt() {
  var e = navigator.userAgentData;
  return e != null && e.brands && Array.isArray(e.brands) ? e.brands.map(function(t) {
    return t.brand + "/" + t.version;
  }).join(" ") : navigator.userAgent;
}
function Kt() {
  return !/^((?!chrome|android).)*safari/i.test(vt());
}
function Ce(e, t, r) {
  t === void 0 && (t = !1), r === void 0 && (r = !1);
  var i = e.getBoundingClientRect(), o = 1, s = 1;
  t && z(e) && (o = e.offsetWidth > 0 && De(i.width) / e.offsetWidth || 1, s = e.offsetHeight > 0 && De(i.height) / e.offsetHeight || 1);
  var c = ge(e) ? q(e) : window, f = c.visualViewport, u = !Kt() && r, l = (i.left + (u && f ? f.offsetLeft : 0)) / o, p = (i.top + (u && f ? f.offsetTop : 0)) / s, b = i.width / o, x = i.height / s;
  return {
    width: b,
    height: x,
    top: p,
    right: l + b,
    bottom: p + x,
    left: l,
    x: l,
    y: p
  };
}
function Ot(e) {
  var t = Ce(e), r = e.offsetWidth, i = e.offsetHeight;
  return Math.abs(t.width - r) <= 1 && (r = t.width), Math.abs(t.height - i) <= 1 && (i = t.height), {
    x: e.offsetLeft,
    y: e.offsetTop,
    width: r,
    height: i
  };
}
function Jt(e, t) {
  var r = t.getRootNode && t.getRootNode();
  if (e.contains(t))
    return !0;
  if (r && wt(r)) {
    var i = t;
    do {
      if (i && e.isSameNode(i))
        return !0;
      i = i.parentNode || i.host;
    } while (i);
  }
  return !1;
}
function se(e) {
  return q(e).getComputedStyle(e);
}
function Rr(e) {
  return ["table", "td", "th"].indexOf(te(e)) >= 0;
}
function fe(e) {
  return ((ge(e) ? e.ownerDocument : (
    // $FlowFixMe[prop-missing]
    e.document
  )) || window.document).documentElement;
}
function st(e) {
  return te(e) === "html" ? e : (
    // this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    e.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    e.parentNode || // DOM Element detected
    (wt(e) ? e.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    fe(e)
  );
}
function Lt(e) {
  return !z(e) || // https://github.com/popperjs/popper-core/issues/837
  se(e).position === "fixed" ? null : e.offsetParent;
}
function Br(e) {
  var t = /firefox/i.test(vt()), r = /Trident/i.test(vt());
  if (r && z(e)) {
    var i = se(e);
    if (i.position === "fixed")
      return null;
  }
  var o = st(e);
  for (wt(o) && (o = o.host); z(o) && ["html", "body"].indexOf(te(o)) < 0; ) {
    var s = se(o);
    if (s.transform !== "none" || s.perspective !== "none" || s.contain === "paint" || ["transform", "perspective"].indexOf(s.willChange) !== -1 || t && s.willChange === "filter" || t && s.filter && s.filter !== "none")
      return o;
    o = o.parentNode;
  }
  return null;
}
function Fe(e) {
  for (var t = q(e), r = Lt(e); r && Rr(r) && se(r).position === "static"; )
    r = Lt(r);
  return r && (te(r) === "html" || te(r) === "body" && se(r).position === "static") ? t : r || Br(e) || t;
}
function xt(e) {
  return ["top", "bottom"].indexOf(e) >= 0 ? "x" : "y";
}
function Be(e, t, r) {
  return he(e, ot(t, r));
}
function Vr(e, t, r) {
  var i = Be(e, t, r);
  return i > r ? r : i;
}
function Qt() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}
function Zt(e) {
  return Object.assign({}, Qt(), e);
}
function er(e, t) {
  return t.reduce(function(r, i) {
    return r[i] = e, r;
  }, {});
}
var kr = function(t, r) {
  return t = typeof t == "function" ? t(Object.assign({}, r.rects, {
    placement: r.placement
  })) : t, Zt(typeof t != "number" ? t : er(t, Ue));
};
function $r(e) {
  var t, r = e.state, i = e.name, o = e.options, s = r.elements.arrow, c = r.modifiersData.popperOffsets, f = ee(r.placement), u = xt(f), l = [W, X].indexOf(f) >= 0, p = l ? "height" : "width";
  if (!(!s || !c)) {
    var b = kr(o.padding, r), x = Ot(s), h = u === "y" ? I : W, w = u === "y" ? Y : X, g = r.rects.reference[p] + r.rects.reference[u] - c[u] - r.rects.popper[p], y = c[u] - r.rects.reference[u], A = Fe(s), D = A ? u === "y" ? A.clientHeight || 0 : A.clientWidth || 0 : 0, S = g / 2 - y / 2, n = b[h], E = D - x[p] - b[w], d = D / 2 - x[p] / 2 + S, C = Be(n, d, E), N = u;
    r.modifiersData[i] = (t = {}, t[N] = C, t.centerOffset = C - d, t);
  }
}
function Ir(e) {
  var t = e.state, r = e.options, i = r.element, o = i === void 0 ? "[data-popper-arrow]" : i;
  o != null && (typeof o == "string" && (o = t.elements.popper.querySelector(o), !o) || Jt(t.elements.popper, o) && (t.elements.arrow = o));
}
const Wr = {
  name: "arrow",
  enabled: !0,
  phase: "main",
  fn: $r,
  effect: Ir,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"]
};
function Se(e) {
  return e.split("-")[1];
}
var Hr = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function Ur(e, t) {
  var r = e.x, i = e.y, o = t.devicePixelRatio || 1;
  return {
    x: De(r * o) / o || 0,
    y: De(i * o) / o || 0
  };
}
function jt(e) {
  var t, r = e.popper, i = e.popperRect, o = e.placement, s = e.variation, c = e.offsets, f = e.position, u = e.gpuAcceleration, l = e.adaptive, p = e.roundOffsets, b = e.isFixed, x = c.x, h = x === void 0 ? 0 : x, w = c.y, g = w === void 0 ? 0 : w, y = typeof p == "function" ? p({
    x: h,
    y: g
  }) : {
    x: h,
    y: g
  };
  h = y.x, g = y.y;
  var A = c.hasOwnProperty("x"), D = c.hasOwnProperty("y"), S = W, n = I, E = window;
  if (l) {
    var d = Fe(r), C = "clientHeight", N = "clientWidth";
    if (d === q(r) && (d = fe(r), se(d).position !== "static" && f === "absolute" && (C = "scrollHeight", N = "scrollWidth")), d = d, o === I || (o === W || o === X) && s === $e) {
      n = Y;
      var M = b && d === E && E.visualViewport ? E.visualViewport.height : (
        // $FlowFixMe[prop-missing]
        d[C]
      );
      g -= M - i.height, g *= u ? 1 : -1;
    }
    if (o === W || (o === I || o === Y) && s === $e) {
      S = X;
      var j = b && d === E && E.visualViewport ? E.visualViewport.width : (
        // $FlowFixMe[prop-missing]
        d[N]
      );
      h -= j - i.width, h *= u ? 1 : -1;
    }
  }
  var R = Object.assign({
    position: f
  }, l && Hr), P = p === !0 ? Ur({
    x: h,
    y: g
  }, q(r)) : {
    x: h,
    y: g
  };
  if (h = P.x, g = P.y, u) {
    var L;
    return Object.assign({}, R, (L = {}, L[n] = D ? "0" : "", L[S] = A ? "0" : "", L.transform = (E.devicePixelRatio || 1) <= 1 ? "translate(" + h + "px, " + g + "px)" : "translate3d(" + h + "px, " + g + "px, 0)", L));
  }
  return Object.assign({}, R, (t = {}, t[n] = D ? g + "px" : "", t[S] = A ? h + "px" : "", t.transform = "", t));
}
function Fr(e) {
  var t = e.state, r = e.options, i = r.gpuAcceleration, o = i === void 0 ? !0 : i, s = r.adaptive, c = s === void 0 ? !0 : s, f = r.roundOffsets, u = f === void 0 ? !0 : f, l = {
    placement: ee(t.placement),
    variation: Se(t.placement),
    popper: t.elements.popper,
    popperRect: t.rects.popper,
    gpuAcceleration: o,
    isFixed: t.options.strategy === "fixed"
  };
  t.modifiersData.popperOffsets != null && (t.styles.popper = Object.assign({}, t.styles.popper, jt(Object.assign({}, l, {
    offsets: t.modifiersData.popperOffsets,
    position: t.options.strategy,
    adaptive: c,
    roundOffsets: u
  })))), t.modifiersData.arrow != null && (t.styles.arrow = Object.assign({}, t.styles.arrow, jt(Object.assign({}, l, {
    offsets: t.modifiersData.arrow,
    position: "absolute",
    adaptive: !1,
    roundOffsets: u
  })))), t.attributes.popper = Object.assign({}, t.attributes.popper, {
    "data-popper-placement": t.placement
  });
}
const qr = {
  name: "computeStyles",
  enabled: !0,
  phase: "beforeWrite",
  fn: Fr,
  data: {}
};
var rt = {
  passive: !0
};
function _r(e) {
  var t = e.state, r = e.instance, i = e.options, o = i.scroll, s = o === void 0 ? !0 : o, c = i.resize, f = c === void 0 ? !0 : c, u = q(t.elements.popper), l = [].concat(t.scrollParents.reference, t.scrollParents.popper);
  return s && l.forEach(function(p) {
    p.addEventListener("scroll", r.update, rt);
  }), f && u.addEventListener("resize", r.update, rt), function() {
    s && l.forEach(function(p) {
      p.removeEventListener("scroll", r.update, rt);
    }), f && u.removeEventListener("resize", r.update, rt);
  };
}
const zr = {
  name: "eventListeners",
  enabled: !0,
  phase: "write",
  fn: function() {
  },
  effect: _r,
  data: {}
};
var Yr = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function it(e) {
  return e.replace(/left|right|bottom|top/g, function(t) {
    return Yr[t];
  });
}
var Xr = {
  start: "end",
  end: "start"
};
function Pt(e) {
  return e.replace(/start|end/g, function(t) {
    return Xr[t];
  });
}
function Et(e) {
  var t = q(e), r = t.pageXOffset, i = t.pageYOffset;
  return {
    scrollLeft: r,
    scrollTop: i
  };
}
function At(e) {
  return Ce(fe(e)).left + Et(e).scrollLeft;
}
function Gr(e, t) {
  var r = q(e), i = fe(e), o = r.visualViewport, s = i.clientWidth, c = i.clientHeight, f = 0, u = 0;
  if (o) {
    s = o.width, c = o.height;
    var l = Kt();
    (l || !l && t === "fixed") && (f = o.offsetLeft, u = o.offsetTop);
  }
  return {
    width: s,
    height: c,
    x: f + At(e),
    y: u
  };
}
function Kr(e) {
  var t, r = fe(e), i = Et(e), o = (t = e.ownerDocument) == null ? void 0 : t.body, s = he(r.scrollWidth, r.clientWidth, o ? o.scrollWidth : 0, o ? o.clientWidth : 0), c = he(r.scrollHeight, r.clientHeight, o ? o.scrollHeight : 0, o ? o.clientHeight : 0), f = -i.scrollLeft + At(e), u = -i.scrollTop;
  return se(o || r).direction === "rtl" && (f += he(r.clientWidth, o ? o.clientWidth : 0) - s), {
    width: s,
    height: c,
    x: f,
    y: u
  };
}
function Tt(e) {
  var t = se(e), r = t.overflow, i = t.overflowX, o = t.overflowY;
  return /auto|scroll|overlay|hidden/.test(r + o + i);
}
function tr(e) {
  return ["html", "body", "#document"].indexOf(te(e)) >= 0 ? e.ownerDocument.body : z(e) && Tt(e) ? e : tr(st(e));
}
function Ve(e, t) {
  var r;
  t === void 0 && (t = []);
  var i = tr(e), o = i === ((r = e.ownerDocument) == null ? void 0 : r.body), s = q(i), c = o ? [s].concat(s.visualViewport || [], Tt(i) ? i : []) : i, f = t.concat(c);
  return o ? f : (
    // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
    f.concat(Ve(st(c)))
  );
}
function mt(e) {
  return Object.assign({}, e, {
    left: e.x,
    top: e.y,
    right: e.x + e.width,
    bottom: e.y + e.height
  });
}
function Jr(e, t) {
  var r = Ce(e, !1, t === "fixed");
  return r.top = r.top + e.clientTop, r.left = r.left + e.clientLeft, r.bottom = r.top + e.clientHeight, r.right = r.left + e.clientWidth, r.width = e.clientWidth, r.height = e.clientHeight, r.x = r.left, r.y = r.top, r;
}
function Mt(e, t, r) {
  return t === Yt ? mt(Gr(e, r)) : ge(t) ? Jr(t, r) : mt(Kr(fe(e)));
}
function Qr(e) {
  var t = Ve(st(e)), r = ["absolute", "fixed"].indexOf(se(e).position) >= 0, i = r && z(e) ? Fe(e) : e;
  return ge(i) ? t.filter(function(o) {
    return ge(o) && Jt(o, i) && te(o) !== "body";
  }) : [];
}
function Zr(e, t, r, i) {
  var o = t === "clippingParents" ? Qr(e) : [].concat(t), s = [].concat(o, [r]), c = s[0], f = s.reduce(function(u, l) {
    var p = Mt(e, l, i);
    return u.top = he(p.top, u.top), u.right = ot(p.right, u.right), u.bottom = ot(p.bottom, u.bottom), u.left = he(p.left, u.left), u;
  }, Mt(e, c, i));
  return f.width = f.right - f.left, f.height = f.bottom - f.top, f.x = f.left, f.y = f.top, f;
}
function rr(e) {
  var t = e.reference, r = e.element, i = e.placement, o = i ? ee(i) : null, s = i ? Se(i) : null, c = t.x + t.width / 2 - r.width / 2, f = t.y + t.height / 2 - r.height / 2, u;
  switch (o) {
    case I:
      u = {
        x: c,
        y: t.y - r.height
      };
      break;
    case Y:
      u = {
        x: c,
        y: t.y + t.height
      };
      break;
    case X:
      u = {
        x: t.x + t.width,
        y: f
      };
      break;
    case W:
      u = {
        x: t.x - r.width,
        y: f
      };
      break;
    default:
      u = {
        x: t.x,
        y: t.y
      };
  }
  var l = o ? xt(o) : null;
  if (l != null) {
    var p = l === "y" ? "height" : "width";
    switch (s) {
      case Te:
        u[l] = u[l] - (t[p] / 2 - r[p] / 2);
        break;
      case $e:
        u[l] = u[l] + (t[p] / 2 - r[p] / 2);
        break;
    }
  }
  return u;
}
function Ie(e, t) {
  t === void 0 && (t = {});
  var r = t, i = r.placement, o = i === void 0 ? e.placement : i, s = r.strategy, c = s === void 0 ? e.strategy : s, f = r.boundary, u = f === void 0 ? wr : f, l = r.rootBoundary, p = l === void 0 ? Yt : l, b = r.elementContext, x = b === void 0 ? Re : b, h = r.altBoundary, w = h === void 0 ? !1 : h, g = r.padding, y = g === void 0 ? 0 : g, A = Zt(typeof y != "number" ? y : er(y, Ue)), D = x === Re ? Or : Re, S = e.rects.popper, n = e.elements[w ? D : x], E = Zr(ge(n) ? n : n.contextElement || fe(e.elements.popper), u, p, c), d = Ce(e.elements.reference), C = rr({
    reference: d,
    element: S,
    strategy: "absolute",
    placement: o
  }), N = mt(Object.assign({}, S, C)), M = x === Re ? N : d, j = {
    top: E.top - M.top + A.top,
    bottom: M.bottom - E.bottom + A.bottom,
    left: E.left - M.left + A.left,
    right: M.right - E.right + A.right
  }, R = e.modifiersData.offset;
  if (x === Re && R) {
    var P = R[o];
    Object.keys(j).forEach(function(L) {
      var H = [X, Y].indexOf(L) >= 0 ? 1 : -1, U = [I, Y].indexOf(L) >= 0 ? "y" : "x";
      j[L] += P[U] * H;
    });
  }
  return j;
}
function en(e, t) {
  t === void 0 && (t = {});
  var r = t, i = r.placement, o = r.boundary, s = r.rootBoundary, c = r.padding, f = r.flipVariations, u = r.allowedAutoPlacements, l = u === void 0 ? Xt : u, p = Se(i), b = p ? f ? St : St.filter(function(w) {
    return Se(w) === p;
  }) : Ue, x = b.filter(function(w) {
    return l.indexOf(w) >= 0;
  });
  x.length === 0 && (x = b);
  var h = x.reduce(function(w, g) {
    return w[g] = Ie(e, {
      placement: g,
      boundary: o,
      rootBoundary: s,
      padding: c
    })[ee(g)], w;
  }, {});
  return Object.keys(h).sort(function(w, g) {
    return h[w] - h[g];
  });
}
function tn(e) {
  if (ee(e) === bt)
    return [];
  var t = it(e);
  return [Pt(e), t, Pt(t)];
}
function rn(e) {
  var t = e.state, r = e.options, i = e.name;
  if (!t.modifiersData[i]._skip) {
    for (var o = r.mainAxis, s = o === void 0 ? !0 : o, c = r.altAxis, f = c === void 0 ? !0 : c, u = r.fallbackPlacements, l = r.padding, p = r.boundary, b = r.rootBoundary, x = r.altBoundary, h = r.flipVariations, w = h === void 0 ? !0 : h, g = r.allowedAutoPlacements, y = t.options.placement, A = ee(y), D = A === y, S = u || (D || !w ? [it(y)] : tn(y)), n = [y].concat(S).reduce(function(re, G) {
      return re.concat(ee(G) === bt ? en(t, {
        placement: G,
        boundary: p,
        rootBoundary: b,
        padding: l,
        flipVariations: w,
        allowedAutoPlacements: g
      }) : G);
    }, []), E = t.rects.reference, d = t.rects.popper, C = /* @__PURE__ */ new Map(), N = !0, M = n[0], j = 0; j < n.length; j++) {
      var R = n[j], P = ee(R), L = Se(R) === Te, H = [I, Y].indexOf(P) >= 0, U = H ? "width" : "height", V = Ie(t, {
        placement: R,
        boundary: p,
        rootBoundary: b,
        altBoundary: x,
        padding: l
      }), k = H ? L ? X : W : L ? Y : I;
      E[U] > d[U] && (k = it(k));
      var B = it(k), K = [];
      if (s && K.push(V[P] <= 0), f && K.push(V[k] <= 0, V[B] <= 0), K.every(function(re) {
        return re;
      })) {
        M = R, N = !1;
        break;
      }
      C.set(R, K);
    }
    if (N)
      for (var J = w ? 3 : 1, pe = function(G) {
        var ne = n.find(function(ye) {
          var ie = C.get(ye);
          if (ie)
            return ie.slice(0, G).every(function(be) {
              return be;
            });
        });
        if (ne)
          return M = ne, "break";
      }, Q = J; Q > 0; Q--) {
        var le = pe(Q);
        if (le === "break")
          break;
      }
    t.placement !== M && (t.modifiersData[i]._skip = !0, t.placement = M, t.reset = !0);
  }
}
const nn = {
  name: "flip",
  enabled: !0,
  phase: "main",
  fn: rn,
  requiresIfExists: ["offset"],
  data: {
    _skip: !1
  }
};
function Nt(e, t, r) {
  return r === void 0 && (r = {
    x: 0,
    y: 0
  }), {
    top: e.top - t.height - r.y,
    right: e.right - t.width + r.x,
    bottom: e.bottom - t.height + r.y,
    left: e.left - t.width - r.x
  };
}
function Rt(e) {
  return [I, X, Y, W].some(function(t) {
    return e[t] >= 0;
  });
}
function on(e) {
  var t = e.state, r = e.name, i = t.rects.reference, o = t.rects.popper, s = t.modifiersData.preventOverflow, c = Ie(t, {
    elementContext: "reference"
  }), f = Ie(t, {
    altBoundary: !0
  }), u = Nt(c, i), l = Nt(f, o, s), p = Rt(u), b = Rt(l);
  t.modifiersData[r] = {
    referenceClippingOffsets: u,
    popperEscapeOffsets: l,
    isReferenceHidden: p,
    hasPopperEscaped: b
  }, t.attributes.popper = Object.assign({}, t.attributes.popper, {
    "data-popper-reference-hidden": p,
    "data-popper-escaped": b
  });
}
const an = {
  name: "hide",
  enabled: !0,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: on
};
function sn(e, t, r) {
  var i = ee(e), o = [W, I].indexOf(i) >= 0 ? -1 : 1, s = typeof r == "function" ? r(Object.assign({}, t, {
    placement: e
  })) : r, c = s[0], f = s[1];
  return c = c || 0, f = (f || 0) * o, [W, X].indexOf(i) >= 0 ? {
    x: f,
    y: c
  } : {
    x: c,
    y: f
  };
}
function un(e) {
  var t = e.state, r = e.options, i = e.name, o = r.offset, s = o === void 0 ? [0, 0] : o, c = Xt.reduce(function(p, b) {
    return p[b] = sn(b, t.rects, s), p;
  }, {}), f = c[t.placement], u = f.x, l = f.y;
  t.modifiersData.popperOffsets != null && (t.modifiersData.popperOffsets.x += u, t.modifiersData.popperOffsets.y += l), t.modifiersData[i] = c;
}
const cn = {
  name: "offset",
  enabled: !0,
  phase: "main",
  requires: ["popperOffsets"],
  fn: un
};
function fn(e) {
  var t = e.state, r = e.name;
  t.modifiersData[r] = rr({
    reference: t.rects.reference,
    element: t.rects.popper,
    strategy: "absolute",
    placement: t.placement
  });
}
const pn = {
  name: "popperOffsets",
  enabled: !0,
  phase: "read",
  fn,
  data: {}
};
function ln(e) {
  return e === "x" ? "y" : "x";
}
function dn(e) {
  var t = e.state, r = e.options, i = e.name, o = r.mainAxis, s = o === void 0 ? !0 : o, c = r.altAxis, f = c === void 0 ? !1 : c, u = r.boundary, l = r.rootBoundary, p = r.altBoundary, b = r.padding, x = r.tether, h = x === void 0 ? !0 : x, w = r.tetherOffset, g = w === void 0 ? 0 : w, y = Ie(t, {
    boundary: u,
    rootBoundary: l,
    padding: b,
    altBoundary: p
  }), A = ee(t.placement), D = Se(t.placement), S = !D, n = xt(A), E = ln(n), d = t.modifiersData.popperOffsets, C = t.rects.reference, N = t.rects.popper, M = typeof g == "function" ? g(Object.assign({}, t.rects, {
    placement: t.placement
  })) : g, j = typeof M == "number" ? {
    mainAxis: M,
    altAxis: M
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, M), R = t.modifiersData.offset ? t.modifiersData.offset[t.placement] : null, P = {
    x: 0,
    y: 0
  };
  if (d) {
    if (s) {
      var L, H = n === "y" ? I : W, U = n === "y" ? Y : X, V = n === "y" ? "height" : "width", k = d[n], B = k + y[H], K = k - y[U], J = h ? -N[V] / 2 : 0, pe = D === Te ? C[V] : N[V], Q = D === Te ? -N[V] : -C[V], le = t.elements.arrow, re = h && le ? Ot(le) : {
        width: 0,
        height: 0
      }, G = t.modifiersData["arrow#persistent"] ? t.modifiersData["arrow#persistent"].padding : Qt(), ne = G[H], ye = G[U], ie = Be(0, C[V], re[V]), be = S ? C[V] / 2 - J - ie - ne - j.mainAxis : pe - ie - ne - j.mainAxis, ue = S ? -C[V] / 2 + J + ie + ye + j.mainAxis : Q + ie + ye + j.mainAxis, we = t.elements.arrow && Fe(t.elements.arrow), _e = we ? n === "y" ? we.clientTop || 0 : we.clientLeft || 0 : 0, Le = (L = R == null ? void 0 : R[n]) != null ? L : 0, ze = k + be - Le - _e, Ye = k + ue - Le, je = Be(h ? ot(B, ze) : B, k, h ? he(K, Ye) : K);
      d[n] = je, P[n] = je - k;
    }
    if (f) {
      var Pe, Xe = n === "x" ? I : W, Ge = n === "x" ? Y : X, oe = d[E], ce = E === "y" ? "height" : "width", Me = oe + y[Xe], de = oe - y[Ge], Ne = [I, W].indexOf(A) !== -1, Ke = (Pe = R == null ? void 0 : R[E]) != null ? Pe : 0, Je = Ne ? Me : oe - C[ce] - N[ce] - Ke + j.altAxis, Qe = Ne ? oe + C[ce] + N[ce] - Ke - j.altAxis : de, Ze = h && Ne ? Vr(Je, oe, Qe) : Be(h ? Je : Me, oe, h ? Qe : de);
      d[E] = Ze, P[E] = Ze - oe;
    }
    t.modifiersData[i] = P;
  }
}
const vn = {
  name: "preventOverflow",
  enabled: !0,
  phase: "main",
  fn: dn,
  requiresIfExists: ["offset"]
};
function mn(e) {
  return {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  };
}
function hn(e) {
  return e === q(e) || !z(e) ? Et(e) : mn(e);
}
function gn(e) {
  var t = e.getBoundingClientRect(), r = De(t.width) / e.offsetWidth || 1, i = De(t.height) / e.offsetHeight || 1;
  return r !== 1 || i !== 1;
}
function yn(e, t, r) {
  r === void 0 && (r = !1);
  var i = z(t), o = z(t) && gn(t), s = fe(t), c = Ce(e, o, r), f = {
    scrollLeft: 0,
    scrollTop: 0
  }, u = {
    x: 0,
    y: 0
  };
  return (i || !i && !r) && ((te(t) !== "body" || // https://github.com/popperjs/popper-core/issues/1078
  Tt(s)) && (f = hn(t)), z(t) ? (u = Ce(t, !0), u.x += t.clientLeft, u.y += t.clientTop) : s && (u.x = At(s))), {
    x: c.left + f.scrollLeft - u.x,
    y: c.top + f.scrollTop - u.y,
    width: c.width,
    height: c.height
  };
}
function bn(e) {
  var t = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Set(), i = [];
  e.forEach(function(s) {
    t.set(s.name, s);
  });
  function o(s) {
    r.add(s.name);
    var c = [].concat(s.requires || [], s.requiresIfExists || []);
    c.forEach(function(f) {
      if (!r.has(f)) {
        var u = t.get(f);
        u && o(u);
      }
    }), i.push(s);
  }
  return e.forEach(function(s) {
    r.has(s.name) || o(s);
  }), i;
}
function wn(e) {
  var t = bn(e);
  return Pr.reduce(function(r, i) {
    return r.concat(t.filter(function(o) {
      return o.phase === i;
    }));
  }, []);
}
function On(e) {
  var t;
  return function() {
    return t || (t = new Promise(function(r) {
      Promise.resolve().then(function() {
        t = void 0, r(e());
      });
    })), t;
  };
}
function xn(e) {
  var t = e.reduce(function(r, i) {
    var o = r[i.name];
    return r[i.name] = o ? Object.assign({}, o, i, {
      options: Object.assign({}, o.options, i.options),
      data: Object.assign({}, o.data, i.data)
    }) : i, r;
  }, {});
  return Object.keys(t).map(function(r) {
    return t[r];
  });
}
var Bt = {
  placement: "bottom",
  modifiers: [],
  strategy: "absolute"
};
function Vt() {
  for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++)
    t[r] = arguments[r];
  return !t.some(function(i) {
    return !(i && typeof i.getBoundingClientRect == "function");
  });
}
function En(e) {
  e === void 0 && (e = {});
  var t = e, r = t.defaultModifiers, i = r === void 0 ? [] : r, o = t.defaultOptions, s = o === void 0 ? Bt : o;
  return function(f, u, l) {
    l === void 0 && (l = s);
    var p = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, Bt, s),
      modifiersData: {},
      elements: {
        reference: f,
        popper: u
      },
      attributes: {},
      styles: {}
    }, b = [], x = !1, h = {
      state: p,
      setOptions: function(A) {
        var D = typeof A == "function" ? A(p.options) : A;
        g(), p.options = Object.assign({}, s, p.options, D), p.scrollParents = {
          reference: ge(f) ? Ve(f) : f.contextElement ? Ve(f.contextElement) : [],
          popper: Ve(u)
        };
        var S = wn(xn([].concat(i, p.options.modifiers)));
        return p.orderedModifiers = S.filter(function(n) {
          return n.enabled;
        }), w(), h.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function() {
        if (!x) {
          var A = p.elements, D = A.reference, S = A.popper;
          if (Vt(D, S)) {
            p.rects = {
              reference: yn(D, Fe(S), p.options.strategy === "fixed"),
              popper: Ot(S)
            }, p.reset = !1, p.placement = p.options.placement, p.orderedModifiers.forEach(function(j) {
              return p.modifiersData[j.name] = Object.assign({}, j.data);
            });
            for (var n = 0; n < p.orderedModifiers.length; n++) {
              if (p.reset === !0) {
                p.reset = !1, n = -1;
                continue;
              }
              var E = p.orderedModifiers[n], d = E.fn, C = E.options, N = C === void 0 ? {} : C, M = E.name;
              typeof d == "function" && (p = d({
                state: p,
                options: N,
                name: M,
                instance: h
              }) || p);
            }
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: On(function() {
        return new Promise(function(y) {
          h.forceUpdate(), y(p);
        });
      }),
      destroy: function() {
        g(), x = !0;
      }
    };
    if (!Vt(f, u))
      return h;
    h.setOptions(l).then(function(y) {
      !x && l.onFirstUpdate && l.onFirstUpdate(y);
    });
    function w() {
      p.orderedModifiers.forEach(function(y) {
        var A = y.name, D = y.options, S = D === void 0 ? {} : D, n = y.effect;
        if (typeof n == "function") {
          var E = n({
            state: p,
            name: A,
            instance: h,
            options: S
          }), d = function() {
          };
          b.push(E || d);
        }
      });
    }
    function g() {
      b.forEach(function(y) {
        return y();
      }), b = [];
    }
    return h;
  };
}
var An = [zr, pn, qr, Gt, cn, nn, vn, Wr, an], Tn = /* @__PURE__ */ En({
  defaultModifiers: An
}), Dn = "tippy-box", nr = "tippy-content", Cn = "tippy-backdrop", ir = "tippy-arrow", or = "tippy-svg-arrow", me = {
  passive: !0,
  capture: !0
}, ar = function() {
  return document.body;
};
function Sn(e, t) {
  return {}.hasOwnProperty.call(e, t);
}
function ft(e, t, r) {
  if (Array.isArray(e)) {
    var i = e[t];
    return i ?? (Array.isArray(r) ? r[t] : r);
  }
  return e;
}
function Dt(e, t) {
  var r = {}.toString.call(e);
  return r.indexOf("[object") === 0 && r.indexOf(t + "]") > -1;
}
function sr(e, t) {
  return typeof e == "function" ? e.apply(void 0, t) : e;
}
function kt(e, t) {
  if (t === 0)
    return e;
  var r;
  return function(i) {
    clearTimeout(r), r = setTimeout(function() {
      e(i);
    }, t);
  };
}
function Ln(e, t) {
  var r = Object.assign({}, e);
  return t.forEach(function(i) {
    delete r[i];
  }), r;
}
function jn(e) {
  return e.split(/\s+/).filter(Boolean);
}
function Ae(e) {
  return [].concat(e);
}
function $t(e, t) {
  e.indexOf(t) === -1 && e.push(t);
}
function Pn(e) {
  return e.filter(function(t, r) {
    return e.indexOf(t) === r;
  });
}
function Mn(e) {
  return e.split("-")[0];
}
function at(e) {
  return [].slice.call(e);
}
function It(e) {
  return Object.keys(e).reduce(function(t, r) {
    return e[r] !== void 0 && (t[r] = e[r]), t;
  }, {});
}
function ke() {
  return document.createElement("div");
}
function We(e) {
  return ["Element", "Fragment"].some(function(t) {
    return Dt(e, t);
  });
}
function Nn(e) {
  return Dt(e, "NodeList");
}
function Rn(e) {
  return Dt(e, "MouseEvent");
}
function Bn(e) {
  return !!(e && e._tippy && e._tippy.reference === e);
}
function Vn(e) {
  return We(e) ? [e] : Nn(e) ? at(e) : Array.isArray(e) ? e : at(document.querySelectorAll(e));
}
function pt(e, t) {
  e.forEach(function(r) {
    r && (r.style.transitionDuration = t + "ms");
  });
}
function Wt(e, t) {
  e.forEach(function(r) {
    r && r.setAttribute("data-state", t);
  });
}
function kn(e) {
  var t, r = Ae(e), i = r[0];
  return i != null && (t = i.ownerDocument) != null && t.body ? i.ownerDocument : document;
}
function $n(e, t) {
  var r = t.clientX, i = t.clientY;
  return e.every(function(o) {
    var s = o.popperRect, c = o.popperState, f = o.props, u = f.interactiveBorder, l = Mn(c.placement), p = c.modifiersData.offset;
    if (!p)
      return !0;
    var b = l === "bottom" ? p.top.y : 0, x = l === "top" ? p.bottom.y : 0, h = l === "right" ? p.left.x : 0, w = l === "left" ? p.right.x : 0, g = s.top - i + b > u, y = i - s.bottom - x > u, A = s.left - r + h > u, D = r - s.right - w > u;
    return g || y || A || D;
  });
}
function lt(e, t, r) {
  var i = t + "EventListener";
  ["transitionend", "webkitTransitionEnd"].forEach(function(o) {
    e[i](o, r);
  });
}
function Ht(e, t) {
  for (var r = t; r; ) {
    var i;
    if (e.contains(r))
      return !0;
    r = r.getRootNode == null || (i = r.getRootNode()) == null ? void 0 : i.host;
  }
  return !1;
}
var Z = {
  isTouch: !1
}, Ut = 0;
function In() {
  Z.isTouch || (Z.isTouch = !0, window.performance && document.addEventListener("mousemove", ur));
}
function ur() {
  var e = performance.now();
  e - Ut < 20 && (Z.isTouch = !1, document.removeEventListener("mousemove", ur)), Ut = e;
}
function Wn() {
  var e = document.activeElement;
  if (Bn(e)) {
    var t = e._tippy;
    e.blur && !t.state.isVisible && e.blur();
  }
}
function Hn() {
  document.addEventListener("touchstart", In, me), window.addEventListener("blur", Wn);
}
var Un = typeof window < "u" && typeof document < "u", Fn = Un ? (
  // @ts-ignore
  !!window.msCrypto
) : !1;
function Ee(e) {
  var t = e === "destroy" ? "n already-" : " ";
  return [e + "() was called on a" + t + "destroyed instance. This is a no-op but", "indicates a potential memory leak."].join(" ");
}
function Ft(e) {
  var t = /[ \t]{2,}/g, r = /^[ \t]*/gm;
  return e.replace(t, " ").replace(r, "").trim();
}
function qn(e) {
  return Ft(`
  %ctippy.js

  %c` + Ft(e) + `

  %c👷‍ This is a development-only message. It will be removed in production.
  `);
}
function cr(e) {
  return [
    qn(e),
    // title
    "color: #00C584; font-size: 1.3em; font-weight: bold;",
    // message
    "line-height: 1.5",
    // footer
    "color: #a6a095;"
  ];
}
var He;
process.env.NODE_ENV !== "production" && _n();
function _n() {
  He = /* @__PURE__ */ new Set();
}
function ae(e, t) {
  if (e && !He.has(t)) {
    var r;
    He.add(t), (r = console).warn.apply(r, cr(t));
  }
}
function ht(e, t) {
  if (e && !He.has(t)) {
    var r;
    He.add(t), (r = console).error.apply(r, cr(t));
  }
}
function zn(e) {
  var t = !e, r = Object.prototype.toString.call(e) === "[object Object]" && !e.addEventListener;
  ht(t, ["tippy() was passed", "`" + String(e) + "`", "as its targets (first) argument. Valid types are: String, Element,", "Element[], or NodeList."].join(" ")), ht(r, ["tippy() was passed a plain object which is not supported as an argument", "for virtual positioning. Use props.getReferenceClientRect instead."].join(" "));
}
var fr = {
  animateFill: !1,
  followCursor: !1,
  inlinePositioning: !1,
  sticky: !1
}, Yn = {
  allowHTML: !1,
  animation: "fade",
  arrow: !0,
  content: "",
  inertia: !1,
  maxWidth: 350,
  role: "tooltip",
  theme: "",
  zIndex: 9999
}, F = Object.assign({
  appendTo: ar,
  aria: {
    content: "auto",
    expanded: "auto"
  },
  delay: 0,
  duration: [300, 250],
  getReferenceClientRect: null,
  hideOnClick: !0,
  ignoreAttributes: !1,
  interactive: !1,
  interactiveBorder: 2,
  interactiveDebounce: 0,
  moveTransition: "",
  offset: [0, 10],
  onAfterUpdate: function() {
  },
  onBeforeUpdate: function() {
  },
  onCreate: function() {
  },
  onDestroy: function() {
  },
  onHidden: function() {
  },
  onHide: function() {
  },
  onMount: function() {
  },
  onShow: function() {
  },
  onShown: function() {
  },
  onTrigger: function() {
  },
  onUntrigger: function() {
  },
  onClickOutside: function() {
  },
  placement: "top",
  plugins: [],
  popperOptions: {},
  render: null,
  showOnCreate: !1,
  touch: !0,
  trigger: "mouseenter focus",
  triggerTarget: null
}, fr, Yn), Xn = Object.keys(F), Gn = function(t) {
  process.env.NODE_ENV !== "production" && lr(t, []);
  var r = Object.keys(t);
  r.forEach(function(i) {
    F[i] = t[i];
  });
};
function pr(e) {
  var t = e.plugins || [], r = t.reduce(function(i, o) {
    var s = o.name, c = o.defaultValue;
    if (s) {
      var f;
      i[s] = e[s] !== void 0 ? e[s] : (f = F[s]) != null ? f : c;
    }
    return i;
  }, {});
  return Object.assign({}, e, r);
}
function Kn(e, t) {
  var r = t ? Object.keys(pr(Object.assign({}, F, {
    plugins: t
  }))) : Xn, i = r.reduce(function(o, s) {
    var c = (e.getAttribute("data-tippy-" + s) || "").trim();
    if (!c)
      return o;
    if (s === "content")
      o[s] = c;
    else
      try {
        o[s] = JSON.parse(c);
      } catch {
        o[s] = c;
      }
    return o;
  }, {});
  return i;
}
function qt(e, t) {
  var r = Object.assign({}, t, {
    content: sr(t.content, [e])
  }, t.ignoreAttributes ? {} : Kn(e, t.plugins));
  return r.aria = Object.assign({}, F.aria, r.aria), r.aria = {
    expanded: r.aria.expanded === "auto" ? t.interactive : r.aria.expanded,
    content: r.aria.content === "auto" ? t.interactive ? null : "describedby" : r.aria.content
  }, r;
}
function lr(e, t) {
  e === void 0 && (e = {}), t === void 0 && (t = []);
  var r = Object.keys(e);
  r.forEach(function(i) {
    var o = Ln(F, Object.keys(fr)), s = !Sn(o, i);
    s && (s = t.filter(function(c) {
      return c.name === i;
    }).length === 0), ae(s, ["`" + i + "`", "is not a valid prop. You may have spelled it incorrectly, or if it's", "a plugin, forgot to pass it in an array as props.plugins.", `

`, `All props: https://atomiks.github.io/tippyjs/v6/all-props/
`, "Plugins: https://atomiks.github.io/tippyjs/v6/plugins/"].join(" "));
  });
}
var Jn = function() {
  return "innerHTML";
};
function gt(e, t) {
  e[Jn()] = t;
}
function _t(e) {
  var t = ke();
  return e === !0 ? t.className = ir : (t.className = or, We(e) ? t.appendChild(e) : gt(t, e)), t;
}
function zt(e, t) {
  We(t.content) ? (gt(e, ""), e.appendChild(t.content)) : typeof t.content != "function" && (t.allowHTML ? gt(e, t.content) : e.textContent = t.content);
}
function yt(e) {
  var t = e.firstElementChild, r = at(t.children);
  return {
    box: t,
    content: r.find(function(i) {
      return i.classList.contains(nr);
    }),
    arrow: r.find(function(i) {
      return i.classList.contains(ir) || i.classList.contains(or);
    }),
    backdrop: r.find(function(i) {
      return i.classList.contains(Cn);
    })
  };
}
function dr(e) {
  var t = ke(), r = ke();
  r.className = Dn, r.setAttribute("data-state", "hidden"), r.setAttribute("tabindex", "-1");
  var i = ke();
  i.className = nr, i.setAttribute("data-state", "hidden"), zt(i, e.props), t.appendChild(r), r.appendChild(i), o(e.props, e.props);
  function o(s, c) {
    var f = yt(t), u = f.box, l = f.content, p = f.arrow;
    c.theme ? u.setAttribute("data-theme", c.theme) : u.removeAttribute("data-theme"), typeof c.animation == "string" ? u.setAttribute("data-animation", c.animation) : u.removeAttribute("data-animation"), c.inertia ? u.setAttribute("data-inertia", "") : u.removeAttribute("data-inertia"), u.style.maxWidth = typeof c.maxWidth == "number" ? c.maxWidth + "px" : c.maxWidth, c.role ? u.setAttribute("role", c.role) : u.removeAttribute("role"), (s.content !== c.content || s.allowHTML !== c.allowHTML) && zt(l, e.props), c.arrow ? p ? s.arrow !== c.arrow && (u.removeChild(p), u.appendChild(_t(c.arrow))) : u.appendChild(_t(c.arrow)) : p && u.removeChild(p);
  }
  return {
    popper: t,
    onUpdate: o
  };
}
dr.$$tippy = !0;
var Qn = 1, nt = [], dt = [];
function Zn(e, t) {
  var r = qt(e, Object.assign({}, F, pr(It(t)))), i, o, s, c = !1, f = !1, u = !1, l = !1, p, b, x, h = [], w = kt(ze, r.interactiveDebounce), g, y = Qn++, A = null, D = Pn(r.plugins), S = {
    // Is the instance currently enabled?
    isEnabled: !0,
    // Is the tippy currently showing and not transitioning out?
    isVisible: !1,
    // Has the instance been destroyed?
    isDestroyed: !1,
    // Is the tippy currently mounted to the DOM?
    isMounted: !1,
    // Has the tippy finished transitioning in?
    isShown: !1
  }, n = {
    // properties
    id: y,
    reference: e,
    popper: ke(),
    popperInstance: A,
    props: r,
    state: S,
    plugins: D,
    // methods
    clearDelayTimeouts: Je,
    setProps: Qe,
    setContent: Ze,
    show: vr,
    hide: mr,
    hideWithInteractivity: hr,
    enable: Ne,
    disable: Ke,
    unmount: gr,
    destroy: yr
  };
  if (!r.render)
    return process.env.NODE_ENV !== "production" && ht(!0, "render() function has not been supplied."), n;
  var E = r.render(n), d = E.popper, C = E.onUpdate;
  d.setAttribute("data-tippy-root", ""), d.id = "tippy-" + n.id, n.popper = d, e._tippy = n, d._tippy = n;
  var N = D.map(function(a) {
    return a.fn(n);
  }), M = e.hasAttribute("aria-expanded");
  return we(), J(), k(), B("onCreate", [n]), r.showOnCreate && Me(), d.addEventListener("mouseenter", function() {
    n.props.interactive && n.state.isVisible && n.clearDelayTimeouts();
  }), d.addEventListener("mouseleave", function() {
    n.props.interactive && n.props.trigger.indexOf("mouseenter") >= 0 && H().addEventListener("mousemove", w);
  }), n;
  function j() {
    var a = n.props.touch;
    return Array.isArray(a) ? a : [a, 0];
  }
  function R() {
    return j()[0] === "hold";
  }
  function P() {
    var a;
    return !!((a = n.props.render) != null && a.$$tippy);
  }
  function L() {
    return g || e;
  }
  function H() {
    var a = L().parentNode;
    return a ? kn(a) : document;
  }
  function U() {
    return yt(d);
  }
  function V(a) {
    return n.state.isMounted && !n.state.isVisible || Z.isTouch || p && p.type === "focus" ? 0 : ft(n.props.delay, a ? 0 : 1, F.delay);
  }
  function k(a) {
    a === void 0 && (a = !1), d.style.pointerEvents = n.props.interactive && !a ? "" : "none", d.style.zIndex = "" + n.props.zIndex;
  }
  function B(a, v, m) {
    if (m === void 0 && (m = !0), N.forEach(function(O) {
      O[a] && O[a].apply(O, v);
    }), m) {
      var T;
      (T = n.props)[a].apply(T, v);
    }
  }
  function K() {
    var a = n.props.aria;
    if (a.content) {
      var v = "aria-" + a.content, m = d.id, T = Ae(n.props.triggerTarget || e);
      T.forEach(function(O) {
        var $ = O.getAttribute(v);
        if (n.state.isVisible)
          O.setAttribute(v, $ ? $ + " " + m : m);
        else {
          var _ = $ && $.replace(m, "").trim();
          _ ? O.setAttribute(v, _) : O.removeAttribute(v);
        }
      });
    }
  }
  function J() {
    if (!(M || !n.props.aria.expanded)) {
      var a = Ae(n.props.triggerTarget || e);
      a.forEach(function(v) {
        n.props.interactive ? v.setAttribute("aria-expanded", n.state.isVisible && v === L() ? "true" : "false") : v.removeAttribute("aria-expanded");
      });
    }
  }
  function pe() {
    H().removeEventListener("mousemove", w), nt = nt.filter(function(a) {
      return a !== w;
    });
  }
  function Q(a) {
    if (!(Z.isTouch && (u || a.type === "mousedown"))) {
      var v = a.composedPath && a.composedPath()[0] || a.target;
      if (!(n.props.interactive && Ht(d, v))) {
        if (Ae(n.props.triggerTarget || e).some(function(m) {
          return Ht(m, v);
        })) {
          if (Z.isTouch || n.state.isVisible && n.props.trigger.indexOf("click") >= 0)
            return;
        } else
          B("onClickOutside", [n, a]);
        n.props.hideOnClick === !0 && (n.clearDelayTimeouts(), n.hide(), f = !0, setTimeout(function() {
          f = !1;
        }), n.state.isMounted || ne());
      }
    }
  }
  function le() {
    u = !0;
  }
  function re() {
    u = !1;
  }
  function G() {
    var a = H();
    a.addEventListener("mousedown", Q, !0), a.addEventListener("touchend", Q, me), a.addEventListener("touchstart", re, me), a.addEventListener("touchmove", le, me);
  }
  function ne() {
    var a = H();
    a.removeEventListener("mousedown", Q, !0), a.removeEventListener("touchend", Q, me), a.removeEventListener("touchstart", re, me), a.removeEventListener("touchmove", le, me);
  }
  function ye(a, v) {
    be(a, function() {
      !n.state.isVisible && d.parentNode && d.parentNode.contains(d) && v();
    });
  }
  function ie(a, v) {
    be(a, v);
  }
  function be(a, v) {
    var m = U().box;
    function T(O) {
      O.target === m && (lt(m, "remove", T), v());
    }
    if (a === 0)
      return v();
    lt(m, "remove", b), lt(m, "add", T), b = T;
  }
  function ue(a, v, m) {
    m === void 0 && (m = !1);
    var T = Ae(n.props.triggerTarget || e);
    T.forEach(function(O) {
      O.addEventListener(a, v, m), h.push({
        node: O,
        eventType: a,
        handler: v,
        options: m
      });
    });
  }
  function we() {
    R() && (ue("touchstart", Le, {
      passive: !0
    }), ue("touchend", Ye, {
      passive: !0
    })), jn(n.props.trigger).forEach(function(a) {
      if (a !== "manual")
        switch (ue(a, Le), a) {
          case "mouseenter":
            ue("mouseleave", Ye);
            break;
          case "focus":
            ue(Fn ? "focusout" : "blur", je);
            break;
          case "focusin":
            ue("focusout", je);
            break;
        }
    });
  }
  function _e() {
    h.forEach(function(a) {
      var v = a.node, m = a.eventType, T = a.handler, O = a.options;
      v.removeEventListener(m, T, O);
    }), h = [];
  }
  function Le(a) {
    var v, m = !1;
    if (!(!n.state.isEnabled || Pe(a) || f)) {
      var T = ((v = p) == null ? void 0 : v.type) === "focus";
      p = a, g = a.currentTarget, J(), !n.state.isVisible && Rn(a) && nt.forEach(function(O) {
        return O(a);
      }), a.type === "click" && (n.props.trigger.indexOf("mouseenter") < 0 || c) && n.props.hideOnClick !== !1 && n.state.isVisible ? m = !0 : Me(a), a.type === "click" && (c = !m), m && !T && de(a);
    }
  }
  function ze(a) {
    var v = a.target, m = L().contains(v) || d.contains(v);
    if (!(a.type === "mousemove" && m)) {
      var T = ce().concat(d).map(function(O) {
        var $, _ = O._tippy, Oe = ($ = _.popperInstance) == null ? void 0 : $.state;
        return Oe ? {
          popperRect: O.getBoundingClientRect(),
          popperState: Oe,
          props: r
        } : null;
      }).filter(Boolean);
      $n(T, a) && (pe(), de(a));
    }
  }
  function Ye(a) {
    var v = Pe(a) || n.props.trigger.indexOf("click") >= 0 && c;
    if (!v) {
      if (n.props.interactive) {
        n.hideWithInteractivity(a);
        return;
      }
      de(a);
    }
  }
  function je(a) {
    n.props.trigger.indexOf("focusin") < 0 && a.target !== L() || n.props.interactive && a.relatedTarget && d.contains(a.relatedTarget) || de(a);
  }
  function Pe(a) {
    return Z.isTouch ? R() !== a.type.indexOf("touch") >= 0 : !1;
  }
  function Xe() {
    Ge();
    var a = n.props, v = a.popperOptions, m = a.placement, T = a.offset, O = a.getReferenceClientRect, $ = a.moveTransition, _ = P() ? yt(d).arrow : null, Oe = O ? {
      getBoundingClientRect: O,
      contextElement: O.contextElement || L()
    } : e, Ct = {
      name: "$$tippy",
      enabled: !0,
      phase: "beforeWrite",
      requires: ["computeStyles"],
      fn: function(et) {
        var xe = et.state;
        if (P()) {
          var br = U(), ct = br.box;
          ["placement", "reference-hidden", "escaped"].forEach(function(tt) {
            tt === "placement" ? ct.setAttribute("data-placement", xe.placement) : xe.attributes.popper["data-popper-" + tt] ? ct.setAttribute("data-" + tt, "") : ct.removeAttribute("data-" + tt);
          }), xe.attributes.popper = {};
        }
      }
    }, ve = [{
      name: "offset",
      options: {
        offset: T
      }
    }, {
      name: "preventOverflow",
      options: {
        padding: {
          top: 2,
          bottom: 2,
          left: 5,
          right: 5
        }
      }
    }, {
      name: "flip",
      options: {
        padding: 5
      }
    }, {
      name: "computeStyles",
      options: {
        adaptive: !$
      }
    }, Ct];
    P() && _ && ve.push({
      name: "arrow",
      options: {
        element: _,
        padding: 3
      }
    }), ve.push.apply(ve, (v == null ? void 0 : v.modifiers) || []), n.popperInstance = Tn(Oe, d, Object.assign({}, v, {
      placement: m,
      onFirstUpdate: x,
      modifiers: ve
    }));
  }
  function Ge() {
    n.popperInstance && (n.popperInstance.destroy(), n.popperInstance = null);
  }
  function oe() {
    var a = n.props.appendTo, v, m = L();
    n.props.interactive && a === ar || a === "parent" ? v = m.parentNode : v = sr(a, [m]), v.contains(d) || v.appendChild(d), n.state.isMounted = !0, Xe(), process.env.NODE_ENV !== "production" && ae(n.props.interactive && a === F.appendTo && m.nextElementSibling !== d, ["Interactive tippy element may not be accessible via keyboard", "navigation because it is not directly after the reference element", "in the DOM source order.", `

`, "Using a wrapper <div> or <span> tag around the reference element", "solves this by creating a new parentNode context.", `

`, "Specifying `appendTo: document.body` silences this warning, but it", "assumes you are using a focus management solution to handle", "keyboard navigation.", `

`, "See: https://atomiks.github.io/tippyjs/v6/accessibility/#interactivity"].join(" "));
  }
  function ce() {
    return at(d.querySelectorAll("[data-tippy-root]"));
  }
  function Me(a) {
    n.clearDelayTimeouts(), a && B("onTrigger", [n, a]), G();
    var v = V(!0), m = j(), T = m[0], O = m[1];
    Z.isTouch && T === "hold" && O && (v = O), v ? i = setTimeout(function() {
      n.show();
    }, v) : n.show();
  }
  function de(a) {
    if (n.clearDelayTimeouts(), B("onUntrigger", [n, a]), !n.state.isVisible) {
      ne();
      return;
    }
    if (!(n.props.trigger.indexOf("mouseenter") >= 0 && n.props.trigger.indexOf("click") >= 0 && ["mouseleave", "mousemove"].indexOf(a.type) >= 0 && c)) {
      var v = V(!1);
      v ? o = setTimeout(function() {
        n.state.isVisible && n.hide();
      }, v) : s = requestAnimationFrame(function() {
        n.hide();
      });
    }
  }
  function Ne() {
    n.state.isEnabled = !0;
  }
  function Ke() {
    n.hide(), n.state.isEnabled = !1;
  }
  function Je() {
    clearTimeout(i), clearTimeout(o), cancelAnimationFrame(s);
  }
  function Qe(a) {
    if (process.env.NODE_ENV !== "production" && ae(n.state.isDestroyed, Ee("setProps")), !n.state.isDestroyed) {
      B("onBeforeUpdate", [n, a]), _e();
      var v = n.props, m = qt(e, Object.assign({}, v, It(a), {
        ignoreAttributes: !0
      }));
      n.props = m, we(), v.interactiveDebounce !== m.interactiveDebounce && (pe(), w = kt(ze, m.interactiveDebounce)), v.triggerTarget && !m.triggerTarget ? Ae(v.triggerTarget).forEach(function(T) {
        T.removeAttribute("aria-expanded");
      }) : m.triggerTarget && e.removeAttribute("aria-expanded"), J(), k(), C && C(v, m), n.popperInstance && (Xe(), ce().forEach(function(T) {
        requestAnimationFrame(T._tippy.popperInstance.forceUpdate);
      })), B("onAfterUpdate", [n, a]);
    }
  }
  function Ze(a) {
    n.setProps({
      content: a
    });
  }
  function vr() {
    process.env.NODE_ENV !== "production" && ae(n.state.isDestroyed, Ee("show"));
    var a = n.state.isVisible, v = n.state.isDestroyed, m = !n.state.isEnabled, T = Z.isTouch && !n.props.touch, O = ft(n.props.duration, 0, F.duration);
    if (!(a || v || m || T) && !L().hasAttribute("disabled") && (B("onShow", [n], !1), n.props.onShow(n) !== !1)) {
      if (n.state.isVisible = !0, P() && (d.style.visibility = "visible"), k(), G(), n.state.isMounted || (d.style.transition = "none"), P()) {
        var $ = U(), _ = $.box, Oe = $.content;
        pt([_, Oe], 0);
      }
      x = function() {
        var ve;
        if (!(!n.state.isVisible || l)) {
          if (l = !0, d.offsetHeight, d.style.transition = n.props.moveTransition, P() && n.props.animation) {
            var ut = U(), et = ut.box, xe = ut.content;
            pt([et, xe], O), Wt([et, xe], "visible");
          }
          K(), J(), $t(dt, n), (ve = n.popperInstance) == null || ve.forceUpdate(), B("onMount", [n]), n.props.animation && P() && ie(O, function() {
            n.state.isShown = !0, B("onShown", [n]);
          });
        }
      }, oe();
    }
  }
  function mr() {
    process.env.NODE_ENV !== "production" && ae(n.state.isDestroyed, Ee("hide"));
    var a = !n.state.isVisible, v = n.state.isDestroyed, m = !n.state.isEnabled, T = ft(n.props.duration, 1, F.duration);
    if (!(a || v || m) && (B("onHide", [n], !1), n.props.onHide(n) !== !1)) {
      if (n.state.isVisible = !1, n.state.isShown = !1, l = !1, c = !1, P() && (d.style.visibility = "hidden"), pe(), ne(), k(!0), P()) {
        var O = U(), $ = O.box, _ = O.content;
        n.props.animation && (pt([$, _], T), Wt([$, _], "hidden"));
      }
      K(), J(), n.props.animation ? P() && ye(T, n.unmount) : n.unmount();
    }
  }
  function hr(a) {
    process.env.NODE_ENV !== "production" && ae(n.state.isDestroyed, Ee("hideWithInteractivity")), H().addEventListener("mousemove", w), $t(nt, w), w(a);
  }
  function gr() {
    process.env.NODE_ENV !== "production" && ae(n.state.isDestroyed, Ee("unmount")), n.state.isVisible && n.hide(), n.state.isMounted && (Ge(), ce().forEach(function(a) {
      a._tippy.unmount();
    }), d.parentNode && d.parentNode.removeChild(d), dt = dt.filter(function(a) {
      return a !== n;
    }), n.state.isMounted = !1, B("onHidden", [n]));
  }
  function yr() {
    process.env.NODE_ENV !== "production" && ae(n.state.isDestroyed, Ee("destroy")), !n.state.isDestroyed && (n.clearDelayTimeouts(), n.unmount(), _e(), delete e._tippy, n.state.isDestroyed = !0, B("onDestroy", [n]));
  }
}
function qe(e, t) {
  t === void 0 && (t = {});
  var r = F.plugins.concat(t.plugins || []);
  process.env.NODE_ENV !== "production" && (zn(e), lr(t, r)), Hn();
  var i = Object.assign({}, t, {
    plugins: r
  }), o = Vn(e);
  if (process.env.NODE_ENV !== "production") {
    var s = We(i.content), c = o.length > 1;
    ae(s && c, ["tippy() was passed an Element as the `content` prop, but more than", "one tippy instance was created by this invocation. This means the", "content element will only be appended to the last tippy instance.", `

`, "Instead, pass the .innerHTML of the element, or use a function that", "returns a cloned version of the element instead.", `

`, `1) content: element.innerHTML
`, "2) content: () => element.cloneNode(true)"].join(" "));
  }
  var f = o.reduce(function(u, l) {
    var p = l && Zn(l, i);
    return p && u.push(p), u;
  }, []);
  return We(e) ? f[0] : f;
}
qe.defaultProps = F;
qe.setDefaultProps = Gn;
qe.currentInput = Z;
Object.assign({}, Gt, {
  effect: function(t) {
    var r = t.state, i = {
      popper: {
        position: r.options.strategy,
        left: "0",
        top: "0",
        margin: "0"
      },
      arrow: {
        position: "absolute"
      },
      reference: {}
    };
    Object.assign(r.elements.popper.style, i.popper), r.styles = i, r.elements.arrow && Object.assign(r.elements.arrow.style, i.arrow);
  }
});
qe.setDefaultProps({
  render: dr
});
function ei(e, t = {}) {
  (e || document).querySelectorAll("abbr[title]").forEach((r) => {
    r.dataset.title = r.title, r.removeAttribute("title"), r.tippy = qe(r, Object.assign({}, t, {
      theme: "doc-it",
      content: r.dataset.title
    }));
  });
}
function ti(e) {
  (e || document.querySelectorAll("abbr[data-title]")).forEach((t) => {
    t.title = t.dataset.title, t.removeAttribute("data-title"), t.tippy.destroy();
  });
}
export {
  ei as bindDefinitionTags,
  ti as unbindDefinitionTags
};
