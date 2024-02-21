import tippy from 'tippy.js';

import './styles.scss';

export function bindDefinitionTags(element = undefined, options = {}) {
    (element || document).querySelectorAll('abbr[title]').forEach(definition => {
        definition.tippy = tippy(definition, Object.assign({
            theme: 'doc-it',
            content: definition.title,
        }, options));
    });
}

export function unbindDefinitionTags(element = undefined) {
    (element || document.querySelectorAll('abbr[title]')).forEach(definition => {
        definition.tippy?.destroy();
    });
}
