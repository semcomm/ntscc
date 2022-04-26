let known = {
'gracehues-photography': {
    'imginfo': 'gracehues-photography',
    'fullres': '',
    'loadingRatio': '66.66666666666666%',
    'left': ['gracehues-photography/NTSCC_KdivN0.022_PSNR32.391_MSSSIM15.453_LPIPS0.043.png', 'NTSCC (Perceptual): 0.022 CBR'],
    'right': [
        ['gracehues-photography/BPG+LDPC_KdivN=0.022_PSNR=31.5982_MS-SSIM=13.4136_LPIPS=0.1935_Q=40.png', 'BPG+LDPC(0.022 CBR)'],
        ['gracehues-photography/BPG+LDPC_KdivN=0.0355_PSNR=33.3398_MS-SSIM=15.1179_LPIPS=0.1534_Q=36.png', 'BPG+LDPC(0.0355 CBR)'],
        ['gracehues-photography/DJSCC_KdivN0.0416_PSNR32.878_LPIPS0.198.png', 'DJSCC(0.0416 CBR)'],
        ['gracehues-photography/original.jpg', 'Original', 'Original'],
    ],
    'thumb': 'gracehues-photography/thumb.png'
},
'kodim15': {
    'imginfo': 'Kodak/kodim15.png',
    'fullres': '',
    'loadingRatio': '66.66666666666666%',
    'left': ['kodim15/NTSCC_KdivN0.039_PSNR33.621_MSSSIM16.453_LPIPS0.024.png', 'NTSCC (Perceptual): 0.039 CBR'],
    'right': [
        ['kodim15/BPG+LDPC_KdivN=0.0427_PSNR=34.2248_MS-SSIM=0.9693_LPIPS=0.0819_Q=31.png', 'BPG+LDPC(0.0427 CBR)'],
        ['kodim15/BPG+LDPC_KdivN=0.0557_PSNR=35.2298_MS-SSIM=0.9752_LPIPS=0.0629_Q=29.png', 'BPG+LDPC(0.0557 CBR)'],
        ['kodim15/DJSCC_KdivN0.0416_PSNR31.103_LPIPS0.157.png', 'DJSCC(0.0416 CBR)'],
        ['kodim15/original.png', 'Original', 'Original'],
    ],
    'thumb': 'kodim15/thumb.png'
},
'kodim02': {
    'imginfo': 'Kodak/kodim02.png',
    'fullres': '',
    'loadingRatio': '66.66666666666666%',
    'left': ['kodim02/NTSCC_KdivN0.023_PSNR31.463_MSSSIM12.115_LPIPS0.066.png', 'NTSCC (Perceptual): 0.023 CBR'],
    'right': [
        ['kodim02/BPG+LDPC_KdivN=0.0224_PSNR=31.9747_MS-SSIM=0.9212_LPIPS=0.1823_Q=34.png', 'BPG+LDPC(0.0224 CBR)'],
        ['kodim02/BPG+LDPC_KdivN=0.0325_PSNR=33.0334_MS-SSIM=0.938_LPIPS=0.1381_Q=32.png', 'BPG+LDPC(0.0325 CBR)'],
        ['kodim02/DJSCC_KdivN0.0416_PSNR31.719_LPIPS0.175.png', 'DeepJSCC(0.0416 CBR)'],
        ['kodim02/original.png', 'Original', 'Original'],
    ],
    'thumb': 'kodim02/thumb.png'
},
'omri-d-cohen': {
    'imginfo': 'omri-d-cohen',
    'fullres': '',
    'loadingRatio': '66.66666666666666%',
    'left': ['omri-d-cohen/NTSCC_KdivN0.018_PSNR25.498_MSSSIM10.771_LPIPS0.128.png', 'NTSCC (Perceptual): 0.018 CBR'],
    'right': [
        ['omri-d-cohen/BPG+LDPC_KdivN0.028_PSNR=24.76_MS-SSIM=0.8896_LPIPS=0.362_Q=42.png', 'BPG+LDPC(0.028 CBR)'],
        ['omri-d-cohen/BPG+LDPC_KdivN0.049_PSNR=26.742_MS-SSIM=0.9305_LPIPS=0.231_Q=39.png', 'BPG+LDPC(0.049 CBR)'],
        ['omri-d-cohen/DJSCC_KdivN0.0208_PSNR25.09_LPIPS0.441.png', 'DeepJSCC(0.0208 CBR)'],
        ['omri-d-cohen/DJSCC_KdivN0.0416_PSNR27.046_LPIPS0.25.png', 'DeepJSCC(0.0416 CBR)'],
        ['omri-d-cohen/original.jpg', 'Original', 'Original'],
    ],
    'thumb': 'omri-d-cohen/thumb.png'
},
};
/// INPUT_DATA_END

let PREFIX = 'image/';
let order = ['gracehues-photography', 'kodim15', 'kodim02', 'omri-d-cohen'];
let currentImage = null;

$(document).ready(function () {
    $('#toggle-aff-fa-footnote').on('click', function (e) {
        $('#footnote-aff-fa').toggle();
        $('#footnote-aff-mi').hide();
    });
    $('#toggle-aff-mi-footnote').on('click', function (e) {
        $('#footnote-aff-mi').toggle();
        $('#footnote-aff-fa').hide();
    });
    $("#view-full-res").hover(
        function() {
            let title = $(this).attr("data-title");
            $('<div/>', {
                text: title,
                class: 'overlay-box'
            }).appendTo(this);
        }, function() {
            $(document).find("div.overlay-box").remove();
        }
    );
    // Add the img tags.
    $("#right-imgs").append($("<img>"));
    $("#left-img").append($("<img>", {"id": "left"}));
    // Setup slider and load first image.
    if ($(".comparison-slider")[0]) {
        let firstImageIndex = 1
        let compSlider = $(".comparison-slider");
        compSlider.each(function () {
            let compSliderWidth = $(this).width() + "px";
            $(this).find(".resize img").css({width: compSliderWidth});
            drags($(this).find(".divider"), $(this).find(".resize"), $(this));
        });
        $(window).on("resize", function () {
            let compSliderWidth = compSlider.width() + "px";
            compSlider.find(".resize img").css({width: compSliderWidth});
        });
        $('.image-selector').empty();
        order.forEach(function (v, index) {
            let thumbID = "img-sel-" + index.toString();
            let img =
                $('<img>', {
                    'id': "img-sel-" + index.toString(),
                    'class': "thumb" + (index === firstImageIndex ? " thumb-active" : "") + " " + thumbID,
                    'src': PREFIX + known[v]['thumb']});
            img.on('click', function (e) {
                let selectedThumb = e.target;
                let selectedThumbClasses = '.' + selectedThumb.className.split(' ').join('.');
                $('.thumb.thumb-active').removeClass('thumb-active');
                $(selectedThumbClasses).addClass('thumb-active');
                $(selectedThumb).addClass('thumb-active');
                let imgSelId = selectedThumb.id;
                let index = parseInt(imgSelId.replace("img-sel-", ""));
                console.log(index);
                let imgName = order[index];
                showImgAndUpdateUI(imgName);
            });
            $('.image-selector').append(img);
        });
        showImgAndUpdateUI(order[firstImageIndex]);
    }
});

function showDividerInfo() {
    $('.divider-info').text('Drag Slider to Compare');
}

function showLeftImg(img, imgInfo, fullres, loadingRatio) {
    console.log('Showing left', img[0]);
    let imgName = img[0];
    let img_caption = img[1];
    $('#left-info-button').text(img_caption);
    $('#img-info-button').text(imgInfo);
    $('#view-full-res').attr('href', fullres);
    let leftImg = $('#left')[0];
    let showing = leftImg.src.split('/').reverse()[0];
    let loadingPlaceholder = $('#loading-placeholder');
    if (showing === imgName) {
        console.log('Left already on', imgName);
        loadingPlaceholder.css('display', 'none');
        showDividerInfo();
        return;
    }
    leftImg.src = PREFIX + imgName;
    if (leftImg.complete) {
        console.log('Loaded image immediately.');
        loadingPlaceholder.css('display', 'none');
        showDividerInfo();
        return;
    }
    let rightImgs = $('#right-imgs'); rightImgs.hide();
    $(leftImg).hide();
    loadingPlaceholder.css('display', 'block');
    loadingPlaceholder.css('padding-top', loadingRatio);
    function loaded() {
        console.log('Loaded image!');
        $(leftImg).show();
        rightImgs.show();
        loadingPlaceholder.css('display', 'none');
        loadingPlaceholder.css('padding-top', '0px');
        removeListeners();
        showDividerInfo();
    }
    function error() { console.log('Error when loading', newLeft); removeListeners(); }
    function removeListeners() {
        leftImg.removeEventListener('load', loaded);
        leftImg.removeEventListener('error', error);
    }
    removeListeners();
    leftImg.addEventListener('load', loaded);
    leftImg.addEventListener('error', error);
}

function showRights(imgName, imgs) {
    let rightsDiv = $('#right-imgs')[0];
    let rightSelector = $(".right-selector")[0];
    $(rightSelector).empty();
    $(rightsDiv).empty();
    rightsDiv.setAttribute("showing", imgName);
    console.log(imgs, rightsDiv.getAttribute("showing"));
    let buttonGroupDiv = $("<div>", {'class': 'btn-group-vertical btn-group-sm', 'role': 'group'});
    $(rightSelector).append(buttonGroupDiv);
    imgs.forEach(function (item, index) {
        let cls = ["btn", "float-right", "right-sel-button"];
        if (index === 0) {
            cls.push('btn-dark');
            cls.push('active');
        } else {
            cls.push('btn-light');
        }
        cls.push('btn-block');
        let imgName = item[0];
        if (imgName === 'DIVIDER') {
            $(buttonGroupDiv).append($("<button>", {
                "type": "button",
                "class": cls.join(" ")
            }).prop("disabled", true).text(" "));
            return;
        }
        let caption = item[1];
        caption = caption.replace('x', '\u00D7');
        let imgTag = $("<img>", {'src': PREFIX + imgName, 'id': 'right-img-' + index.toString()});
        if (index !== 0) {
            $(imgTag).hide();
        }
        $(rightsDiv).append(imgTag);
        let caption_pre = caption.split('(')[0];
        let caption_post = caption.split('(')[1];
        let button = $("<button>", {
            "type": "button",
            "class": cls.join(" "),
            "id": 'right-btn-idx-' + index.toString()}).text(caption_pre);
        if (caption_post) {  // Not for original
            let span = $('<span>', {'class': 'codec-info'}).text('(' + caption_post);
            button.append(span);
        }
        button.on("click", function (e) {
            let oldActiveButton = $(".right-sel-button.active")[0];
            let oldIndex = oldActiveButton.id.replace('right-btn-idx-', '');
            let newActiveButton = e.target;
            if ($(newActiveButton).hasClass('codec-info')) {
                newActiveButton = $(newActiveButton).parent();
            }
            let newIndex = index.toString();
            if (oldIndex === newIndex) {
                console.log('Already selected!');
                return;
            }
            /// Switch images
            $('#right-img-' + newIndex).show();
            $('#right-img-' + oldIndex).hide();
            /// First disable old button
            $(oldActiveButton).removeClass('active');
            $(oldActiveButton).removeClass('btn-dark');
            $(oldActiveButton).addClass('btn-light');
            /// Set new button
            $(newActiveButton).addClass('active');
            $(newActiveButton).removeClass('btn-light');
            $(newActiveButton).addClass('btn-dark');
            console.log(e.target);

            let compSlider = $(".comparison-slider");
            let selectorWidth = parseFloat($(".right-selector").css("width"));
            let divider = $(compSlider).find(".divider");
            let parentWidth = parseFloat(divider.parent().css("width"));
            let dividerPos = parseFloat(divider.css("left"));
            let dividerOverlapsSelector = dividerPos > (parentWidth - selectorWidth);
            if (dividerOverlapsSelector) {
                let nonOverlapPos = parentWidth - selectorWidth - 30;
                console.log(divider.css("left"), selectorWidth);
                let resizer = $(compSlider).find(".resize");
                divider.css("left", nonOverlapPos);
                resizer.css("width", nonOverlapPos);
            }
        });
        $(buttonGroupDiv).append(button);
    });
}

function showImgAndUpdateUI(imgName) {
    currentImage = imgName;
    console.log('Showing', imgName);
    let imgs = known[imgName];
    let right = imgs['right'];
    showLeftImg(imgs['left'], imgs['imginfo'], imgs['fullres'], imgs['loadingRatio']);
    showRights(imgName, right);
}


function drags(dragElement, resizeElement, container) {
    let touched = false;
    window.addEventListener('touchstart', function () { touched = true; });
    window.addEventListener('touchend', function ()   { touched = false; });
    let dividerInfo = $('.divider-info');
    dragElement.on("mousedown touchstart", function (e) {
        dividerInfo.hide();
        dragElement.addClass("draggable");
        resizeElement.addClass("resizable");
        let startX = e.pageX ? e.pageX : e.originalEvent.touches[0].pageX;
        let dragWidth = dragElement.outerWidth();
        let posX = dragElement.offset().left + dragWidth - startX;
        let containerOffset = container.offset().left;
        let containerWidth = container.outerWidth();
        let minLeft = containerOffset + 10;
        let maxLeft = containerOffset + containerWidth - dragWidth - 10;
        dragElement.parents().on("mousemove touchmove", function (e) {
            if (touched === false) { e.preventDefault(); }  // Prevent selection.
            let moveX = e.pageX ? e.pageX : e.originalEvent.touches[0].pageX;
            let leftValue = moveX + posX - dragWidth;
            leftValue = Math.min(Math.max(leftValue, minLeft), maxLeft);  // Clip
            let widthValue = ((leftValue + dragWidth / 2 - containerOffset) / containerWidth * 100) + "%";
            $(".draggable").css("left", widthValue).on("mouseup touchend touchcancel", function () {
                $(this).removeClass("draggable");
                resizeElement.removeClass("resizable");
            });
            $(".resizable").css("width", widthValue);
        }).on("mouseup touchend touchcancel", function () {
            dragElement.removeClass("draggable");
            resizeElement.removeClass("resizable");
        });
    }).on("mouseup touchend touchcancel", function (e) {
        dragElement.removeClass("draggable");
        resizeElement.removeClass("resizable");
    });
}
