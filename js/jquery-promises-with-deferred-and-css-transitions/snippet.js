// jQuery promises with deferred and CSS transitions

var animate = function($el, cl) {
    var deferred = $.Deferred();
    var transitionEnd = 'transitionend webkitTransitionEnd MSTransitionEnd';

    $el.addClass(cl).on(transitionEnd, function() {
        deferred.resolve($(this));
    });

    return deferred.promise();
};

// Usage
var p = animate($('.element'), 'moveRight').then(function($el) {
    // $el is returned as an argument
    return animate($el, 'moveDown');
}).then(function($el) {
    return animate($el, 'moveLeft');
}).then(function($el) {
    return animate($el, 'moveUp');
});

// p is also a Promise
p.then(function() {
    console.log('Done with all');
});
