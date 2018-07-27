import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Section from './Section';
import theme from '../theme';
import ReactMarkdown from 'react-markdown';
import cx from 'classnames'
import {
  backgroundColor,
  display,
  height,
  width,
  margin,
} from 'design-system-components/styles'

const propTypes = {
  context: PropTypes.object,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  info: PropTypes.string,
  sections: PropTypes.arrayOf(PropTypes.object),
  addonInfo: PropTypes.object,
  useTheme: PropTypes.bool,
};

const defaultProps = {
  context: {},
  title: '',
  subtitle: '',
  info: '',
  sections: [],
};

export const chapterStyles = {
  header: {
    marginBottom: 60,
  },
  hr: {
    border: 'none',
    backgroundColor: theme.border,
    height: 1,
  },
  title: {
    color: theme.grayDarkest,
    fontSize: 24,
    marginBottom: 10,
  },
  subtitle: {
    color: theme.grayDark,
    fontSize: 16,
    marginBottom: 20,
    marginTop: 0,
  },
  info: theme.infoStyle,
};

export class ChapterDecorator {
  static title(title, useTheme) {
    return (
      <h3 style={useTheme ? chapterStyles.title : {}} className="chapter-h3">{title}</h3>
    );
  }

  static subtitle(subtitle, useTheme) {
    return (
      <span style={useTheme ? chapterStyles.subTitle : {}} className="chapter-subtitle">
        <ReactMarkdown>
          {subtitle}
        </ReactMarkdown>
      </span>
    );
  }

  static info(info, useTheme) {
    return (
      <div style={useTheme ? chapterStyles.info : {}} className="chapter-info">{info}</div>
    );
  }

  static ruler(useTheme) {
    return (
      <hr style={useTheme ? chapterStyles.hr : {}} className="chatper-hr" />
    );
  }

  static main(sections) {
    return (
      <div>
        {sections}
      </div>
    );
  }
}

export default class Chapter extends Component {
  render() {
    const { context, title, subtitle, info, sections, addonInfo, useTheme} = this.props;

    const renderedSections = sections.map((section, index) => {
      const options = section.options || {};
      const sectionProps = {
        context,
        sectionTitle: section.title,
        atomTitle: title,
        subtitle: section.subtitle,
        markDownFile: section.markDownFile,
        ...options,
        addonInfo,
      };
      return (
        <Section key={index} {...sectionProps} useTheme={useTheme}>
          {section.sectionFn(context)}
        </Section>
      );
    });

    return ChapterDecorator.main(renderedSections, useTheme);
  }
}

Chapter.displayName = 'Chapter';
Chapter.propTypes = propTypes;
Chapter.defaultProps = defaultProps;
