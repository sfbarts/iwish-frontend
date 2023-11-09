import { styled } from '@mui/material/styles'
import { Zoom } from '@mui/material'
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip'

//CustomTooltip extends MUI material Tooltip component to make it follow iWish styling.
const CustomTooltip = styled(({ className, ...props }) => (
  <Tooltip
    {...props}
    TransitionComponent={Zoom}
    classes={{ popper: className }}
  />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[1],
    fontSize: 12,
  },
}))

export default CustomTooltip
