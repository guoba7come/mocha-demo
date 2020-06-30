function Rectangle(w, h) {
    var _w = Number(w),
        _h = Number(h);
    
    this.perimeter = () => 2 * (_w + _h);
    this.area = () => _w * _h;
}
