import tippy from 'tippy.js';

import './styles.scss';

export function bindDefinitionTags(element, options = {}) {
    (element || document).querySelectorAll('abbr[title]').forEach(definition => {
        definition.dataset.title = definition.title;
        definition.removeAttribute('title');

        definition.tippy = tippy(definition, Object.assign({}, options, {
            theme: 'doc-it',
            content: definition.dataset.title,
        }));
    });
}

export function unbindDefinitionTags(element) {
    (element || document.querySelectorAll('abbr[data-title]')).forEach(definition => {
        definition.title = definition.dataset.title;
        definition.removeAttribute('data-title');

        definition.tippy.destroy();
    });
}
