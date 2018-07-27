import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Node from '@storybook/addon-info/dist/components/Node';
import { Pre } from '@storybook/addon-info/dist/components/markdown';
import PropTable from './PropTable';
// import renderInfoContent from '../utils/info-content';
import theme from '../theme';
import ReactMarkdown from 'react-markdown';
import cx from 'classnames'
import {
    backgroundColor,
    display,
    height,
    width,
    margin,
    padding,
    borders,
    borderRadius,
    borderColor,
    fontWeight

} from 'design-system-components/styles'
import  {
    Pattern,
    H1,
    H2,
    H3,
    H4,
    H5,
    FontReset,
    Copy
} from 'design-system-components';

const propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  info: PropTypes.string,
  showSource: PropTypes.bool,
  showPropTables: PropTypes.bool,
  propTables: PropTypes.arrayOf(PropTypes.func),
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
  addonInfo: PropTypes.object,
  useTheme: PropTypes.bool,
};

const defaultProps = {
  context: {},
  title: '',
  subtitle: '',
  info: '',
  showSource: true,
  allowSourceToggling: true,
  showPropTables: false,
  allowPropTablesToggling: true,
};

const ConcreteBlock = (title) => {
    if (typeof title !== 'string') {
        title = 'concrete-block'
    }
    return (
        <span
            id={title.toLowerCase().split(' ').join('-')}
            style={{height: "5px", width: "100px"}}
            className={cx(
                backgroundColor.concreteGrey,
                display.block,
                height.onePointFive,
                margin.horizontalFour,
                margin.topFour,
                margin.bottomTwo,
            )}
        />
    )
};


export class SectionDecorator {
  static main(header, component, documentation) {
    return (
      <div className="section-container">
          {header}
          {component}
          {documentation}
      </div>
    );
  }

  static header(header, sectionTitle) {
    const id = typeof sectionTitle === 'string' ? sectionTitle.toLowerCase().split(' ').join('-') : 'concrete-block'

    return (
        <div className="section-header"
         id={id}
        >
            <ConcreteBlock/>
            <H3>{header}</H3>
        </div>
    );
  }

  static title(title, useTheme) {
    return (
      <h3 className="section-title">{title}</h3>
    );
  }

  static subtitle(subtitle) {
    return (
      <p className={cx(padding.topOne)}>{subtitle}</p>
    );
  }

  static component(component, useTheme) {
    return (
      <div className={
          cx(
              borders.all,
              borderColor.smokeGrey,
              borderRadius.three,
              margin.horizontalFour,
              margin.topTwo,
              padding.horizontalOne,
              padding.verticalOne,
          )
      }
      >
          {component}

      </div>
    );
  }

  static documentation(documentation) {
    return (
      <div>
        <div>{documentation}</div>
      </div>
    );
  }

  static sourceCode(sourceCode) {
    return (
        <div className={cx(
            padding.leftOne,
             )}
        >
            <div
                className={cx(
                    borders.bottom,
                    borderColor.smokeGrey,
                    fontWeight.bold,
                )}
            >
                <h4 style={{'margin-bottom': '5px'}}
                    className="section-subsection-title">Story Source</h4>
            </div>
            <Pre>
          {sourceCode}
        </Pre>
        </div>
    );
  }

  static propTables(propTables) {
    return (
      <div id="this" className={cx(
          padding.leftOne
      )}>
          <div
              className={cx(
                  borders.bottom,
                  borderColor.smokeGrey,
                  fontWeight.bold,
              )}
          >
        <h4  style={{'margin-bottom': '5px', 'margin-top': '5px'}} className="section-subsection-title">Prop Types</h4>
          </div>
        {propTables}
      </div>
    );
  }

  static info(markDownFile, title) {
    return markDownFile ? (
      <div className={cx(
  margin.horizontalFour,
  margin.topTwo,
  padding.verticalOne,
  )}>
          <H2>{`Guidelines for ${title}`}</H2>
        <div >
          {markDownFile}
         </div>
       </div>
     ) : <div> the markdown file did not load</div>;
   }
}


export default class Section extends Component {
  constructor(props) {
    super(props);
  }

  renderSourceCode(useTheme) {
    const addonInfo = this.props.addonInfo;

    const sourceCode = React.Children.map(this.props.children, (root, idx) => (
      <Node key={idx} depth={0} node={root} {...addonInfo} {...this.props} />
    ));

    return SectionDecorator.sourceCode(sourceCode);
  }

  renderPropTables(useTheme) {
    const components = new Map();

    if (!this.props.children) {
      return null;
    }

    if (this.props.propTables) {
      this.props.propTables.forEach(function (component) {
        components.set(component, true);
      });
    }

    // Depth-first traverse and collect components.
    function extract(children) {
      if (!children) {
        return;
      }
      if (Array.isArray(children)) {
        children.forEach(extract);
        return;
      }
      if (children.props && children.props.children) {
        extract(children.props.children);
      }
      if (typeof children === 'string' || typeof children.type === 'string') {
        return;
      }
      if (children.type && !components.has(children.type)) {
        components.set(children.type, true);
      }
    }

    // Extract components from children.
    extract(this.props.children);

    const componentsList = Array.from(components.keys());
    componentsList.sort(function (a, b) {
      return (a.displayName || a.name) > (b.displayName || b.name);
    });

    const propTables = componentsList.map(function (component, idx) {
      return (
        <div key={idx}>
          <h5>&lt;{component.displayName || component.name}&gt; Component</h5>
          <div className={cx(
              margin.leftOne,
          )}
          >
            <PropTable component={component} useTheme={useTheme} />
          </div>
        </div>
      );
    });

    if (!propTables || propTables.length === 0) {
      return null;
    }

    return SectionDecorator.propTables(propTables);
  }

  render() {
    const { sectionTitle, subtitle, children, markDownFile, useTheme, atomTitle } = this.props;

    const header = (
      <div
        className={cx(margin.horizontalFour)}
      >
        {sectionTitle && SectionDecorator.title(sectionTitle, useTheme)}
        {subtitle && SectionDecorator.subtitle(subtitle)}
      </div>
    );

    const documentation = (
        <FontReset>
            <div>
                <div
                    className={cx(
                        borders.all,
                        borderColor.smokeGrey,
                        borderRadius.three,
                        margin.horizontalFour,
                        margin.topTwo,

                        padding.horizontalOne,
                        padding.verticalOne,
                    )}
                >
                    {this.renderSourceCode(useTheme)}
                    {this.renderPropTables(useTheme)}
                </div>
                {markDownFile && SectionDecorator.info(markDownFile, sectionTitle)}
            </div>
        </FontReset>
    );

    return SectionDecorator.main(
      SectionDecorator.header(header, sectionTitle),
      SectionDecorator.component(children),
      SectionDecorator.documentation(documentation),
    );
  }
}

Section.displayName = 'Section';
Section.propTypes = propTypes;
Section.defaultProps = defaultProps;
