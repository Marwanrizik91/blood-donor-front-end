import React from 'react';
import SettingsList from '../../general/settingsList';
import SettingsListItem from '../../general/settingsListItem';
import './settingsListScreen.css'
import { useHistory } from 'react-router-dom'
import TitleHeader from '../../general/titleHeader'

const SettingsListScreen = () => {

    const history = useHistory();

    return (
       <div className='settingsListScreen_container'>
           <TitleHeader title='Settings' />
            <SettingsList>
                <SettingsListItem onClick={()=> history.push('/user-settings')} title="Personal" icon='/img/icon-user.svg'/>
                <SettingsListItem onClick={()=> history.push('/reminders')} title="Reminders" icon='/img/icon-notification.svg'/>
                <SettingsListItem onClick={()=> history.push('/how-to-donate')} title="How-To-Donate" icon='/img/icon-how-to-donate.svg'/>
                <SettingsListItem onClick={()=> history.push('/help-support')} title="Help & Support" icon='/img/icon-help-support.svg'/>
                <SettingsListItem onClick={()=> history.push('/contact-us')} title='Contact Us' icon='/img/icon-contact-us.svg'/>
                <SettingsListItem onClick={()=> history.push('/faq')} title='FAQ' icon='/img/icon-FAQ.svg'/>
                <SettingsListItem onClick={()=> history.push('/about')} title='About' icon='/img/icon-about.svg'/>
            </SettingsList>
       </div>
    )
}

export default SettingsListScreen;