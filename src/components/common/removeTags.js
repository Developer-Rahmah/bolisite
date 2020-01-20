const removeTags = (value) =>
{

  const regex = /<\/?[^>]+(>|$)/g;
const result = value.replace(regex, '');
return result;

}

export { removeTags };
