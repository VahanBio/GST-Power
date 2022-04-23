export function clickOutSide(config) {
    let { ele, preventEle, callback } = config;
    let targetEle = document.querySelector(ele);
    const handleClick = (e) => {
        let isElementVisible = isVisible(targetEle);

        if (!targetEle || !isElementVisible) return;
        let isArray = Array.isArray(preventEle);

        if (isArray) {
            let isOmittedEle = preventEle.some((eleSelector) => {
                if (e.target.closest(eleSelector)) {
                    return true;
                }
            });

            if (isOmittedEle || e.target.closest(ele)) {
                return;
            } else {
                callback(ele);
            }

            return;
        }

        if (!e.target.closest(ele) && !e.target.closest(preventEle)) {
            callback(ele);
        }
    };

    function isVisible(elem) {
        if (!(elem instanceof Element)) throw Error('DomUtil: elem is not an element.');
        const style = getComputedStyle(elem);
        if (style.display === 'none') return false;
        if (style.visibility !== 'visible') return false;
        if (style.opacity < 0.1) return false;
        if (
            elem.offsetWidth +
            elem.offsetHeight +
            elem.getBoundingClientRect().height +
            elem.getBoundingClientRect().width ===
            0
        ) {
            return false;
        }
        const elemCenter = {
            x: elem.getBoundingClientRect().left + elem.offsetWidth / 2,
            y: elem.getBoundingClientRect().top + elem.offsetHeight / 2,
        };
        if (elemCenter.x < 0) return false;
        if (elemCenter.x > (document.documentElement.clientWidth || window.innerWidth)) return false;
        if (elemCenter.y < 0) return false;
        if (elemCenter.y > (document.documentElement.clientHeight || window.innerHeight)) return false;
        let pointContainer = document.elementFromPoint(elemCenter.x, elemCenter.y);
        do {
            if (pointContainer === elem) return true;
        } while ((pointContainer = pointContainer.parentNode));
        return false;
    }

    document.addEventListener('click', handleClick);
}

//example
// clickOutSide({
//     ele: selector,
//     preventEle: optional (selector / array of selector . callback function won't execute when click on any of preventElement),
//     callback: function(el) {}
// })

// clickOutSide({
//     ele: '.navbar',
//     preventEle: '.reset' / ['ele1', 'ele2'],
//     callback: (ele) => {
//         console.log(ele)
//     },
// });
