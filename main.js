import tippy from 'tippy.js';

import './styles.scss';

export function bindDefinitionTags(element = undefined, options = {}) {
    (element || document).querySelectorAll('abbr[data-title]').forEach(definition => {
        definition.tippy = tippy(definition, Object.assign({
            theme: 'doc-it',
            content: definition.dataset.title,

            distance: 0,
            duration: 100,
        }, options));
    });
}

export function unbindDefinitionTags(element = undefined) {
    (element || document.querySelectorAll('abbr[data-title]')).forEach(definition => {
        const tippy = definition.tippy;
        if (!tippy) {
            return;
        }

        if (Array.isArray(tippy)) {
            tippy.forEach(instance => instance.destroy());
        } else {
            tippy.destroy();
        }
    });
}
