function setCookie(name, value, options = {}) {
  const newOptions = { ...options };

  const { expires } = newOptions;

  if (typeof expires === 'number' && expires) {
    const d = new Date();
    d.setTime(d.getTime() + expires * 1000);
    newOptions.expires = d;
  }
  if (newOptions.expires && expires.toUTCString) {
    newOptions.expires = expires.toUTCString();
  }

  const encodedValue = encodeURIComponent(value);

  const updatedCookie = Object.keys(newOptions).reduce((cookie, propName) => {
    const propValue = newOptions[propName];
    let newCookie = `${cookie}; ${propName}`;
    if (propValue !== true) {
      newCookie += `=${propValue}`;
    }
    return newCookie;
  }, `${name}=${encodedValue}`);

  document.cookie = `${updatedCookie};path=/`;
}

function getCookie(name) {
  const matches = document.cookie.match(
    new RegExp(`(?:^|; )${name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1')}=([^;]*)`)
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

function deleteCookie(name) {
  setCookie(name, '', {
    expires: -1
  });
}

export { setCookie, getCookie, deleteCookie };
