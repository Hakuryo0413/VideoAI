export function getNews() {
  return request({
    url: "/news",
    method: "get",
  });
}

export function getNewsById(id) {
  return request({
    url: `/news/${id}`,
    method: "get",
  });
}
