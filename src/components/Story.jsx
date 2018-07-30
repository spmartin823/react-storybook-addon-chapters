import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TitleBox from './TitleBox';

export class StoryDecorator {
  static title(title, subtitle, titleIcon) {
    return (
      <TitleBox
        title={title}
        subtitle={subtitle}
        titleIcon={titleIcon}
      />
    );
  }

  static subtitle(subtitle) {
    return (
      <span className="story-subtitle">{subtitle}</span>
    );
  }

  static info(info) {
    return (
      <div className="story-info">{info}</div>
    );
  }

  static main(header, chapters) {
    return (
      <div className="story">
        <div className="story-header">{header}</div>
        {chapters}
      </div>
    );
  }
}

export default class Story extends Component {
  const propTypes = {
    context: PropTypes.object,
    title: PropTypes.string,
    subtitle: PropTypes.string,
    titleIcon: PropTypes.object,
    info: PropTypes.string,
    chapters: PropTypes.arrayOf(PropTypes.object),
    addonInfo: PropTypes.object,
    sectionOptions: PropTypes.object,
  };

  static defaultProps = {
    context: {},
    title: '',
    subtitle: '',
    info: '',
    chapters: [],
  };


  render() {
    // title here means the type of element it is.
    const {context, subtitle, title, sections, addonInfo, titleIcon} = this.props;
    const header = (
      <div>
        {title &&
        <TitleBox
          title={title}
          subtitle={subtitle}
          titleIcon={titleIcon}
        />
        }
      </div>
    );

    const renderedSections = sections.map(({context, sectionTitle, subtitle, markDownFile, addonInfo}, index) => {
      const sectionProps = {
        sectionTitle,
        context,
        subtitle,
        markDownFile,
        addonInfo,
      };
      return (
        <Section key={index} {...sectionProps}>
          {sectionFn(context)}
        </Section>
      );
    });
    return StoryDecorator.main(header, renderedSections);
  }
}
