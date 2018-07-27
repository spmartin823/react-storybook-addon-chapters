import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {
    Pattern,
    H1,
    H3,
    FontReset,
    Copy
} from 'design-system-components';
import cx from 'classnames'
import {
    width,
    height,
    margin,
    padding,
    display,
    textAlign,
} from 'design-system-components/styles'

const propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.string,
    titleIcon: PropTypes.object,
};

export default class TitleBox extends Component {
    render() {
        const {title, subtitle, titleIcon} = this.props;
        return (
            <Pattern porcelain>
                <div className={cx(display.block,margin.horizontalAuto)}>
                    <div className={cx(padding.topFour, padding.bottomTwo)}>
                        {titleIcon}
                    </div>
                    <FontReset>
                        <H1 centered>{title}</H1>
                        <div className={cx(
                            textAlign.center,
                            padding.bottomThree,
                            padding.horizontalThree,
                        )}
                        >
                            <Copy>{subtitle}</Copy>
                        </div>
                    </FontReset>
                </div>
            </Pattern>
        )
    }
}



