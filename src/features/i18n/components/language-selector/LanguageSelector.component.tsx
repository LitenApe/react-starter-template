import { ChangeEvent, useState } from 'react';

import { I18n } from '~/features/i18n/components';
import { Lang } from '~/features/i18n/services';
import { langToTextKey } from './lang-to-text-key.utility';
import { useLanguage } from '~/features/i18n/hooks';

export function LanguageSelector() {
  const { options, value, onChange } = useViewController();

  return (
    <label>
      <I18n text="common.translation.select.label" />
      <select value={value} onChange={onChange}>
        {options.map(({ value, label }) => (
          <I18n key={value} as="option" text={label} value={value} />
        ))}
      </select>
    </label>
  );
}

function useViewController() {
  const { getLanguage, setLanguage } = useLanguage();
  const [value, setValue] = useState(getLanguage());

  function onChange(event: ChangeEvent<HTMLSelectElement>) {
    const value = event.target.value as Lang;
    setLanguage(value);
    setValue(value);
  }

  const options = Object.values(Lang).map((lang) => ({
    value: lang,
    label: langToTextKey(lang),
  }));

  return {
    options,
    value,
    onChange,
  };
}
