
const PriceConvert = ({price}) => {
  const formattedRupees = price?.toLocaleString('en-IN', {
    style: 'currency',
    currency: 'INR',
  });
  return formattedRupees
}

export default PriceConvert
