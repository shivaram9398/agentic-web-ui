import { Box, Button, Menu, MenuItem, Stack, Typography } from '@mui/material'
import { useId, useState } from 'react'
import { useLocale } from './locale-context'
import { locales, type Locale } from './messages'

function LocaleLabel({ option }: { option: Locale }) {
  const country = new Intl.DisplayNames([option.id], { type: 'region' }).of(option.region)
  return (
    <Stack
      component="span"
      direction="row"
      sx={{ alignItems: 'center' }}
      spacing={1}
      lang={option.id}
    >
      <Box
        component="img"
        src={new URL(`./flags/${option.region}.svg`, import.meta.url).href}
        alt=""
        sx={{ width: 22, height: 15, objectFit: 'cover', borderRadius: 0.25, flexShrink: 0 }}
      />
      <Box component="span">
        {option.label}{' '}
        <Typography component="span" variant="inherit" color="text.secondary">
          · {country}
        </Typography>
      </Box>
    </Stack>
  )
}

export default function LanguagePicker() {
  const { locale, selectLocale, t } = useLocale()
  const [anchor, setAnchor] = useState<HTMLButtonElement | null>(null)
  const id = useId()

  return (
    <>
      <Button
        id={id}
        variant="outlined"
        aria-haspopup="menu"
        aria-expanded={Boolean(anchor)}
        aria-controls={anchor ? `${id}-menu` : undefined}
        onClick={(event) => setAnchor(event.currentTarget)}
        sx={{
          maxWidth: '100%',
          textAlign: 'start',
          gap: 1,
          flexWrap: 'wrap',
          justifyContent: 'flex-start',
        }}
      >
        {t('languagePicker.language')} <LocaleLabel option={locale} />
        <Box component="span" aria-hidden="true">
          ▾
        </Box>
      </Button>
      <Menu
        anchorEl={anchor}
        open={Boolean(anchor)}
        onClose={() => setAnchor(null)}
        slotProps={{
          list: { id: `${id}-menu`, 'aria-labelledby': id },
          paper: { sx: { maxWidth: 'calc(100vw - 32px)' } },
        }}
      >
        {locales.map((option) => (
          <MenuItem
            key={option.id}
            role="menuitemradio"
            aria-checked={locale.id === option.id}
            selected={locale.id === option.id}
            onClick={() => {
              selectLocale(option)
              setAnchor(null)
            }}
            sx={{ minHeight: 44, whiteSpace: 'normal' }}
          >
            <LocaleLabel option={option} />
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}
