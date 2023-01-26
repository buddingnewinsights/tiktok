import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';

import Menu, { MenuItem } from './Menu';
import styles from './Sidebar.module.scss';
import {
    HomeIcon,
    UserGroupIcon,
    LiveIcon,
    HomeActiveIcon,
    UserGroupActiveIcon,
    LiveActiveIcon,
} from '~/components/Icons';
import SuggestAccounts from '~/components/SuggestAccounts';
import * as userService from '~/services/userServices';
import * as followingService from '~/services/followingServices';
import config from '~/config';

const cx = classNames.bind(styles);

const PER_PAGE = 5;

function Sidebar() {
    const [suggestedUsers, setSuggestedUsers] = useState([]);

    useEffect(() => {
        userService
            .getSuggested({ page: 1, perPage: PER_PAGE })
            .then((data) => {
                setSuggestedUsers(data);
            })
            .catch((error) => console.error(error));
    }, []);

    const [followingUsers, setFollowingUsers] = useState([]);

    useEffect(() => {
        followingService
            .getSuggested({ page: 2 })
            .then((data) => {
                setFollowingUsers(data);
            })
            .catch((error) => console.error(error));
    }, []);

    return (
        <aside className={cx('wrapper')}>
            <Menu>
                <MenuItem title="For You" to={config.routes.home} icon={<HomeIcon />} activeIcon={<HomeActiveIcon />} />
                <MenuItem
                    title="Following"
                    to={config.routes.following}
                    icon={<UserGroupIcon />}
                    activeIcon={<UserGroupActiveIcon />}
                />
                <MenuItem title="LIVE" to={config.routes.live} icon={<LiveIcon />} activeIcon={<LiveActiveIcon />} />
            </Menu>

            <SuggestAccounts label="Suggest accounts" data={suggestedUsers} />
            <SuggestAccounts label="Following accounts" data={followingUsers} />
        </aside>
    );
}

export default Sidebar;
