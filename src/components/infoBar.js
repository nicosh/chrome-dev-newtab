/*global chrome*/
/* eslint-disable no-undef */

import Stats from './infobar/stats'
import Cache from './infobar/cache'

const Bar = () => {
    return (
        <div className="row mt-3">
            <Cache />
            <Stats/>
        </div>
    )
}
export default Bar