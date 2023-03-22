export const validateImageDimensions = (file, rHeight, rWidth) => {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function (e) {
        var image = new Image();
        image.src = e.target.result;
        image.onload = function () {
            var height = this.height;
            var width = this.width;
            if (height > rHeight || width > rWidth) {
                return false;
            } else {
                return true;
            }
        };
    };
};
