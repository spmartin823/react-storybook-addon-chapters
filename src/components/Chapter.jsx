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

  static main(header, sections, useTheme) {
    return (
      <div>
        <div style={useTheme ? chapterStyles.header : {}} className="chapter-header">{header}</div>
        {sections}
      </div>
    );
  }
}

const ConcreteBlock = () => {
  return (
      <span
          style={{height: "5px", width: "100px"}}
          className={cx(
              backgroundColor.concreteGrey,
              display.block,
              height.onePointFive,
              margin.topFour,
              margin.bottomTwo,
          )}
      />
  )
};

export default class Chapter extends Component {
  render() {
    const { context, title, subtitle, info, sections, addonInfo, useTheme } = this.props;

    const header = (
      <div>
        <ConcreteBlock />
        {title && ChapterDecorator.title(title)}
        {subtitle && ChapterDecorator.subtitle(subtitle, useTheme)}
        {(subtitle || info) && ChapterDecorator.ruler(useTheme)}
        {info && ChapterDecorator.subtitle(info, useTheme)}
      </div>
    );

    const renderedSections = sections.map((section, index) => {
      const options = section.options || {};
      const sectionProps = {
        context,
        title: section.title,
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

    return ChapterDecorator.main(header, renderedSections, useTheme);
  }
}

Chapter.displayName = 'Chapter';
Chapter.propTypes = propTypes;
Chapter.defaultProps = defaultProps;
