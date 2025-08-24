import { fetchEnrichedExercises } from '../services/wgerService';

useEffect(() => {
  async function loadExercises() {
    try {
      const data = await fetchEnrichedExercises();
      setExercises(data);
    } catch (err) {
      setError("Failed to load exercises.");
    } finally {
      setLoading(false);
    }
  }
  loadExercises();
}, []);