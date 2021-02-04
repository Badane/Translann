import http from "../src/http-common";

class TranslationDataService {
  get(id) {
    return http.get(`/translations/${id}`);
  }
  
  getFromProject(id) {
    return http.get(`/translations/project/${id}`);
  }

  create(data) {
    return http.post("/translations", data);
  }
  
  setKeyFromProject(id,data) {
    return http.put(`/translations/project/${id}`, data);
  }

  update(id, data) {
    return http.put(`/translations/${id}`, data);
  }

  delete(id) {
    return http.delete(`/translations/${id}`);
  }
}

export default new TranslationDataService();