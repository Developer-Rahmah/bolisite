import {combineReducers} from 'redux';
import sampleReducer from './sampleReducer'
import authReducer from './authReducer'
import homeReducer from './homeReducer'
import MobileAuthenticationReducer from './mobileAuthenticationReducer'
import CarInformationReducer from './carInformationReducer'
import InsuranceCompaniesReducer from './insuranceCompaniesReducer';
import PaymentReducer from './paymentReducer'
import DamageStepReducer from './damageStepReducer'
import ProfileReducer from './profileReducer'
import DrivingLicenseReducer from './drivingLicenseReducer';
import SideBarReducer from './sideBarReducer';
import LifeInsuranceReducer from './lifeInsuranceReducer';
import TravelInsuranceReducer from './travelInsuranceReducer';
import CancerCareProgramReducer from './cancerCareProgramReducer';
import ShippingInsuranceReducer from './shippingInsuranceReducer';
import OrderPageReducer from './ordersPageReducer';
import HelpReducer from './helpReducer';
import ServantInsuranceReducer from './servantInsuranceReducer';
import HealthInsuranceReducer from './healthInsuranceReducer';
import PrivacyReducer from './privacyReducer';
import NotificationReducer from './notificationReducer'
export default combineReducers({
    sampleReducer : sampleReducer,
    authReducer : authReducer,
    homeReducer:homeReducer,
    phone_auth_state:MobileAuthenticationReducer,
    carInformarionReducer:CarInformationReducer,
    insuranceCompaniesReducer:InsuranceCompaniesReducer,
    paymentReducer:PaymentReducer,
    damageStepReducer:DamageStepReducer,
    profileReducer:ProfileReducer,
    drivingLicenseReducer:DrivingLicenseReducer,
    sideBarReducer:SideBarReducer,
    lifeInsuranceReducer:LifeInsuranceReducer,
    travelInsuranceReducer:TravelInsuranceReducer,
    cancerCareProgramReducer:CancerCareProgramReducer,
    shippingInsuranceReducer:ShippingInsuranceReducer,
    orderPageReducer:OrderPageReducer,
    helpReducer:HelpReducer,
    servantInsuranceReducer:ServantInsuranceReducer,
    healthInsuranceReducer:HealthInsuranceReducer,
    privacyReducer:PrivacyReducer,
    notificationReducer:NotificationReducer
})