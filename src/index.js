import React from 'react';
import Story, { StoryDecorator, storyStyles } from './components/Story';
import { ChapterDecorator, chapterStyles } from './components/Chapter';
import { SectionDecorator, sectionStyles } from './components/Section';
import { propTableStyles } from './components/PropTable';
import addonAPI from '@storybook/addons';

export { StoryDecorator, ChapterDecorator, SectionDecorator };
export { storyStyles, chapterStyles, propTableStyles };

const defaultProps = {
  addonInfo: {
    inline: false,
    header: true,
    source: true,
    propTables: [],
    maxPropsIntoLine: 3,
    maxPropObjectKeys: 3,
    maxPropArrayLength: 3,
    maxPropStringLength: 50,
  },
  sectionOptions: {
    showSource: true,
    allowSourceToggling: true,
    showPropTables: false,
    allowPropTablesToggling: true,
    useTheme: true,
  },
};

export default {
  addWithChapters(storyName, storyContentOrFn = {}) {

    return this.add(storyName, (context) => {
      const storyContent = typeof storyContentOrFn === 'function'
          ? storyContentOrFn()
          : storyContentOrFn;

      (storyContent.chapters || []).forEach((chapter) => {
        (chapter.sections || []).forEach((section) => {
          Object.assign(section, {
            options: Object.assign({}, defaultProps.sectionOptions, section.options),
          });
        });
      });

      return (
        <Story
          context={context}
          title={storyContent.category}
          titleIcon={storyContent.titleIcon}
          subtitle={storyContent.subtitle}
          info={storyContent.info}
          chapters={storyContent.chapters}
          {...defaultProps}
        />
      );
    });
  },
};

export function setDefaults(newDefaults) {
  Object.assign(defaultProps.addonInfo, newDefaults.addonInfo);
  Object.assign(defaultProps.sectionOptions, newDefaults.sectionOptions);
  return defaultProps;
}
