import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Section from './Section';
import {
  backgroundColor,
  display,
  height,
  width,
  margin,
} from 'design-system-components/styles'

export default class Chapter extends Component {
  render() {
    debugger;
    const { context, title, addonInfo, markDownFile, sectionFn, subtitle} = this.props;

    const sectionProps = {
      context,
      sectionTitle: title,
      subtitle: subtitle,
      markDownFile: markDownFile,
      addonInfo,
    };
    return (
      <Section {...sectionProps}>
        {sectionFn(context)}
      </Section>
    );
  }
}
