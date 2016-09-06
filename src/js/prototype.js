Array.prototype.arrRemove = function (n) {   
    if (n < 0)
        return this;
    else
        return this.slice(0, n).concat(this.slice(n + 1, this.length));
}
