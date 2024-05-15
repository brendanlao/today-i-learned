//SUPABASE
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://buuekobhzpaxvbpiekda.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ1dWVrb2JoenBheHZicGlla2RhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI4Mjg4OTQsImV4cCI6MjAyODQwNDg5NH0.RC19dcOhyG8_tpGtU0i3VwMybaj2TJcsJxOAC-JDqKo";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
