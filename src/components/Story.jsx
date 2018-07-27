import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { baseFonts } from '@storybook/components';
import Chapter from './Chapter';
import renderInfoContent from '../utils/info-content';
import theme from '../theme';
import TitleBox from './TitleBox';
import cx from 'classnames'
import $ from 'jquery';

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

const defaultProps = {
  context: {},
  title: '',
  subtitle: '',
  info: '',
  chapters: [],
};

export const storyStyles = {
  story: {
    ...baseFonts,
  },
  header: {
    marginBottom: 60,
  },
  title: {
    color: theme.grayDarkest,
    fontSize: 36,
    marginBottom: 10,
  },
  subtitle: {
    color: theme.grayDark,
    fontSize: 18,
    marginBottom: 20,
    marginTop: 0,
  },
  info: theme.infoStyle,
};

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

  static subtitle(subtitle, useTheme) {
    return (
      <span style={useTheme ? storyStyles.subtitle : {}} className="story-subtitle">{subtitle}</span>
    );
  }

  static info(info, useTheme) {
    return (
      <div style={useTheme ? storyStyles.info : {}} className="story-info">{info}</div>
    );
  }

  static main(header, chapters, useTheme) {
    return (
      <div style={useTheme ? storyStyles.story : {}} className="story">
        <div style={useTheme ? storyStyles.info : {}} className="story-header">{header}</div>
        {chapters}
      </div>
    );
  }
}

export default class Story extends Component {
  render() {
      // title here means the type of element it is.
    const { context, subtitle, title, info, chapters, addonInfo, sectionOptions, titleIcon } = this.props;
    const { useTheme } = sectionOptions;

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

    const renderedChapters = chapters.map((chapter, index) => (
      <Chapter key={index} context={context} addonInfo={addonInfo} useTheme={useTheme} {...chapter} />
    ));

    return StoryDecorator.main(header, renderedChapters, useTheme);
  }
}

Story.displayName = 'Story';
Story.propTypes = propTypes;
Story.defaultProps = defaultProps;
