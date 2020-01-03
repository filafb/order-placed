import React, { FC, Fragment } from 'react'
import { FormattedMessage } from 'react-intl'
import { TranslateEstimate } from 'vtex.shipping-estimate-translator'
import { Address } from 'vtex.order-details'
import { useCssHandles, applyModifiers } from 'vtex.css-handles'

const CSS_HANDLES = [
  'parcelHeader',
  'parcelShippingEstimate',
  'parcelSLA',
  'parcelGiftDescription',
  'parcelAddressWrapper',
]

interface Props {
  shippingData: Parcel
  index: number
  numPackages: number
  giftRegistry?: GiftRegistry | null
}

const DeliveryHeader: FC<Props> = ({
  shippingData,
  index,
  numPackages,
  giftRegistry,
}) => {
  const handles = useCssHandles(CSS_HANDLES)
  const multipleDeliveries = numPackages > 1

  return (
    <Fragment>
      <div
        className={`${applyModifiers(
          handles.parcelHeader,
          'delivery'
        )} t-heading-4-ns t-heading-5 mb5`}
        data-testid="shipping-header"
      >
        <FormattedMessage id="store/shipping.header.title" />
        {multipleDeliveries && (
          <FormattedMessage
            id="store/common.header.counter"
            values={{ index: index + 1, numPackages }}
          />
        )}
        <br />
        <small
          className={`${handles.parcelShippingEstimate} c-muted-2 t-small`}
        >
          <TranslateEstimate
            shippingEstimate={shippingData.shippingEstimate}
            scheduled={shippingData.deliveryWindow}
          />
        </small>
        <br />
        <small className={`${handles.parcelSLA} c-muted-2 t-small`}>
          {shippingData.selectedSla}
        </small>
      </div>

      {giftRegistry &&
      giftRegistry.addressId === shippingData.address.addressId ? (
        <div className={`${handles.parcelGiftDescription} c-muted-1`}>
          <FormattedMessage
            id="store/shipping.header.wishlist.address"
            values={{ giftRegistryName: giftRegistry.description }}
          />
        </div>
      ) : (
        <div className={`${handles.parcelAddressWrapper} mb5 mr10-m`}>
          <Address address={shippingData.address} />
        </div>
      )}
    </Fragment>
  )
}

export default DeliveryHeader
