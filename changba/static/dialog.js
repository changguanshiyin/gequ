(function ($, undefined) {
    $.widget("ui.dialog", {
        options: {
            overlayColor: '#333333',
            overlayOpacity: 0.5,
            title: '唱吧',
            verticalOffset: 0,
            horizontalOffset: 0,
            onShow: null,
            onHide: null
        },

        _create: function () {
            var self = this;
            var titleId = 'ui-dialog-title-' + Math.random().toString(16).slice(2, 10).replace(':', '\\:');
            this.popupContainer = $('<div class="ui-dialog-wrapper" aria-labelledby="' + titleId + '" role="alertdialog"></div>');
            var popupHeader = this.popupHeader = $('<div class="ui-dialog-header"><h3 id="' + titleId + '">' + this.options.title + '</h3><button title="关闭" aria-label="关闭" class="ui-dialog-close">×</button></div>');
            this.popupContainer.append(popupHeader);
            this.popupContainer.append(this.element);
            this.element.css('display', 'block');

            popupHeader.children('.ui-dialog-close')
                .on('click', function () {
                    self.hide();
                });

            this.popupContainer.append(this.element.show());

            this.overlay = $('<div class="ui-dialog-overlay"></div>').css({
                backgroundColor: this.options.overlayColor,
                opacity: this.options.overlayOpacity
            });

            $("body").append(this.overlay).append(this.popupContainer);
            var height = this.popupContainer.height(), width = this.popupContainer.width();
            this.popupContainer.css({
                marginLeft: (-width / 2 + this.options.horizontalOffset) + 'px',
                marginTop: (-height / 2 + this.options.verticalOffset) + 'px',
                visibility: 'visible'
            }).addClass('ui-dialog-wrapper-hide');
        },

        _setOption: function (key, value) {
            $.Widget.prototype._setOption.apply(this, arguments);
            switch (key) {
                case 'title':                    
                    this.popupHeader.children('h3').html(value);
                    break;
                case 'overlayColor':
                    this.overlay.css('backgroundColor', value);
                    break;
                case 'overlayOpacity':
                    this.overlay.css('opacity', value);
                    break;
                case 'overlayOpacity':
                    this.overlay.css('opacity', value);
                    break;
                case 'verticalOffset':
                    this.overlay.css('opacity', value);
                    break;
                default:
                    break;
            }
        },

        show: function () {            
            this.overlay.show();
            this.popupContainer.addClass('ui-dialog-wrapper-show');
            if (typeof this.options.onShow === 'function') {
                this.options.onShow();
            }
            $('html').css('overflow', 'hidden');
        },

        hide: function () {
            this.popupContainer.removeClass('ui-dialog-wrapper-show');
            this.overlay.hide();
            if (typeof this.options.onHide === 'function') {
                this.options.onHide();
            }
            $('html').css('overflow', 'auto');
        },

        destroy: function () {
            $.Widget.prototype.destroy.call(this);
        }
    });

}(jQuery));