"use client";

import Link from "next/link";
import { ChangeEvent, useEffect, useState } from "react";
import {
  Award,
  BarChart3,
  CheckCircle2,
  FileText,
  FolderKanban,
  LayoutDashboard,
  LogOut,
  Pencil,
  Plus,
  Quote,
  ShieldCheck,
  Sparkles,
  Trash2,
  UploadCloud,
  UserRound,
} from "lucide-react";
import { isSupabaseConfigured, supabase } from "@/lib/supabase";
import {
  defaultCertifications,
  defaultProjects,
  defaultTestimonials,
  fetchCertifications,
  fetchProjects,
  fetchSiteCopy,
  fetchTestimonials,
  formatUpdated,
  slugify,
  type CertificationRecord,
  type ProjectRecord,
  type TestimonialRecord,
} from "@/lib/content";
import { copy, copyGroups, copyKeys, type CopyKey } from "@/lib/copy";

type TabName = "Overview" | "Projects" | "Certifications" | "Testimonials" | "Site copy" | "Files" | "Profile";

const isLocalId = (id: string) => id.startsWith("default-");

const emptyProjectForm = {
  titleEn: "",
  titleId: "",
  projectType: "Case study",
  bodyEn: "",
  bodyId: "",
  impactValue: "",
  impactLabelEn: "",
  impactLabelId: "",
  tags: "",
};

const initialCopyEdits = () =>
  Object.fromEntries(
    copyKeys.map((key) => [key, { en: copy.en[key], id: copy.id[key] }]),
  ) as Record<CopyKey, { en: string; id: string }>;

export default function AdminPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [active, setActive] = useState<TabName>("Overview");
  const [message, setMessage] = useState("");
  const [loginError, setLoginError] = useState("");

  const [projects, setProjects] = useState<ProjectRecord[]>(defaultProjects);
  const [certifications, setCertifications] = useState<CertificationRecord[]>(defaultCertifications);
  const [testimonials, setTestimonials] = useState<TestimonialRecord[]>(defaultTestimonials);
  const [files, setFiles] = useState<{ name: string; url: string }[]>([]);

  const [showProjectForm, setShowProjectForm] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [projectForm, setProjectForm] = useState(emptyProjectForm);
  const [certForm, setCertForm] = useState({ nameEn: "", nameId: "", issuer: "", year: "" });
  const [testimonialForm, setTestimonialForm] = useState({ quoteEn: "", quoteId: "", authorName: "", authorRole: "" });
  const [copyEdits, setCopyEdits] = useState(initialCopyEdits);

  const [profileId, setProfileId] = useState<string | null>(null);
  const [profileName, setProfileName] = useState("Thomas Oddy Chrisdwianto");
  const [profileRole, setProfileRole] = useState("MIS Analyst · Data & Reporting Automation");
  const [profileEmail, setProfileEmail] = useState("thomasoddyc@gmail.com");
  const [profileLinkedIn, setProfileLinkedIn] = useState("https://linkedin.com/in/thomasoddyc");
  const [profileBio, setProfileBio] = useState("I turn manual reporting workflows into reliable, efficient systems that help teams move with confidence.");
  const [profileBioId, setProfileBioId] = useState("Saya mengubah alur kerja reporting yang manual menjadi sistem yang andal dan efisien agar tim dapat bergerak dengan percaya diri.");
  const [profilePhotoUrl, setProfilePhotoUrl] = useState("");
  const [cvUrl, setCvUrl] = useState("");

  useEffect(() => {
    const client = supabase;
    if (!loggedIn || !client) return;
    const loadAll = async () => {
      const [profile, projectRows, certRows, testimonialRows, copyRows] = await Promise.all([
        client.from("profile").select("*").limit(1).maybeSingle(),
        fetchProjects({ publishedOnly: false }),
        fetchCertifications({ publishedOnly: false }),
        fetchTestimonials({ publishedOnly: false }),
        fetchSiteCopy(),
      ]);
      if (profile.error) setMessage(profile.error.message);
      if (projectRows.length) setProjects(projectRows);
      if (certRows.length) setCertifications(certRows);
      if (testimonialRows.length) setTestimonials(testimonialRows);
      if (copyRows.length) {
        setCopyEdits((current) => {
          const next = { ...current };
          for (const row of copyRows) {
            if (row.copy_key in next) {
              next[row.copy_key as CopyKey] = { en: row.value_en ?? "", id: row.value_id ?? "" };
            }
          }
          return next;
        });
      }
      const data = profile.data;
      if (data) {
        setProfileId(data.id);
        setProfileName(data.full_name ?? "");
        setProfileRole(data.role ?? "");
        setProfileEmail(data.email ?? "");
        setProfileLinkedIn(data.linkedin_url ?? "");
        setProfileBio(data.bio_en ?? "");
        setProfileBioId(data.bio_id ?? "");
        setProfilePhotoUrl(data.profile_photo_url ?? "");
        setCvUrl(data.cv_url ?? "");
      }
    };
    void loadAll();
  }, [loggedIn]);

  const saveProfile = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!supabase) {
      setMessage("Profile changes are shown in preview mode. Connect Supabase to save them.");
      return;
    }
    const profile = {
      ...(profileId ? { id: profileId } : {}),
      full_name: profileName,
      role: profileRole,
      email: profileEmail,
      linkedin_url: profileLinkedIn,
      bio_en: profileBio,
      bio_id: profileBioId,
      profile_photo_url: profilePhotoUrl || null,
      cv_url: cvUrl || null,
      updated_at: new Date().toISOString(),
    };
    const { data, error } = await supabase.from("profile").upsert(profile).select("id").single();
    if (error) {
      setMessage(error.message);
      return;
    }
    setProfileId(data.id);
    setMessage("Profile changes saved.");
  };

  const saveSiteCopy = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!supabase) {
      setMessage("Site copy changes are shown in preview mode. Connect Supabase to save them.");
      return;
    }
    const rows = copyKeys.map((key) => ({
      copy_key: key,
      value_en: copyEdits[key].en.trim(),
      value_id: copyEdits[key].id.trim() || null,
      updated_at: new Date().toISOString(),
    }));
    const { error } = await supabase.from("site_copy").upsert(rows, { onConflict: "copy_key" });
    if (error) {
      setMessage(error.message);
      return;
    }
    setMessage("Site copy saved — the public site now uses these greetings.");
  };

  const uploadProfileAsset = async (event: ChangeEvent<HTMLInputElement>, kind: "photo" | "cv") => {
    const file = event.target.files?.[0];
    if (!file) return;
    const url = await uploadToLibrary(file);
    if (!url) return;
    if (kind === "photo") setProfilePhotoUrl(url);
    else setCvUrl(url);
    setMessage(`${file.name} uploaded. Save the profile to keep the new link.`);
  };

  const uploadToLibrary = async (file: File): Promise<string | null> => {
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      setMessage("Please choose a file smaller than 10MB.");
      return null;
    }
    const safeName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, "-")}`;
    if (!supabase) {
      setFiles((current) => [{ name: file.name, url: "" }, ...current]);
      setMessage(`${file.name} is ready. Connect Supabase to persist uploads.`);
      return null;
    }
    const { error } = await supabase.storage.from("portfolio-files").upload(safeName, file, { upsert: true });
    if (error) {
      setMessage(error.message);
      return null;
    }
    const { data } = supabase.storage.from("portfolio-files").getPublicUrl(safeName);
    setFiles((current) => [{ name: file.name, url: data.publicUrl }, ...current]);
    return data.publicUrl;
  };

  const handleUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    await uploadToLibrary(file);
  };

  const signIn = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoginError("");
    if (!supabase) {
      setLoggedIn(true);
      setMessage("Demo mode active — connect Supabase to enable secure authentication.");
      return;
    }
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setLoginError(error.message);
    else setLoggedIn(true);
  };

  const openProjectForm = (project?: ProjectRecord) => {
    setShowProjectForm(true);
    if (!project) {
      setEditingProjectId(null);
      setProjectForm(emptyProjectForm);
      return;
    }
    setEditingProjectId(project.id);
    setProjectForm({
      titleEn: project.title_en,
      titleId: project.title_id ?? "",
      projectType: project.type ?? "Case study",
      bodyEn: project.body_en ?? "",
      bodyId: project.body_id ?? "",
      impactValue: project.impact_value ?? "",
      impactLabelEn: project.impact_label_en ?? "",
      impactLabelId: project.impact_label_id ?? "",
      tags: project.tags.join(", "),
    });
  };

  const saveProject = async (event: React.FormEvent) => {
    event.preventDefault();
    const titleEn = projectForm.titleEn.trim();
    if (!titleEn) return;
    const payload = {
      slug: slugify(titleEn),
      title_en: titleEn,
      title_id: projectForm.titleId.trim() || null,
      type: projectForm.projectType.trim() || null,
      body_en: projectForm.bodyEn.trim() || null,
      body_id: projectForm.bodyId.trim() || null,
      impact_value: projectForm.impactValue.trim() || null,
      impact_label_en: projectForm.impactLabelEn.trim() || null,
      impact_label_id: projectForm.impactLabelId.trim() || null,
      tags: projectForm.tags.split(",").map((tag) => tag.trim()).filter(Boolean),
      updated_at: new Date().toISOString(),
    };

    if (supabase) {
      const editingRow = projects.find((item) => item.id === editingProjectId);
      if (editingProjectId && editingRow && !isLocalId(editingProjectId)) {
        const { error } = await supabase.from("projects").update(payload).eq("id", editingProjectId);
        if (error) {
          setMessage(error.message);
          return;
        }
        setProjects((current) => current.map((item) => (item.id === editingProjectId ? { ...item, ...payload, tags: payload.tags } : item)));
        setMessage("Project updated.");
      } else {
        const { data, error } = await supabase.from("projects").insert({ ...payload, published: false }).select("*").single();
        if (error) {
          setMessage(error.message);
          return;
        }
        setProjects((current) => [...current, data as ProjectRecord]);
        setMessage("Project saved as a draft.");
      }
    } else {
      const draft: ProjectRecord = {
        id: editingProjectId ?? `default-project-${Date.now()}`,
        slug: payload.slug,
        title_en: payload.title_en,
        title_id: payload.title_id,
        type: payload.type,
        body_en: payload.body_en,
        body_id: payload.body_id,
        impact_value: payload.impact_value,
        impact_label_en: payload.impact_label_en,
        impact_label_id: payload.impact_label_id,
        tags: payload.tags,
        cover_url: null,
        sort_order: projects.length + 1,
        published: false,
        updated_at: payload.updated_at,
      };
      setProjects((current) =>
        editingProjectId ? current.map((item) => (item.id === editingProjectId ? draft : item)) : [...current, draft],
      );
      setMessage("Project added in preview mode. Connect Supabase to persist it.");
    }
    setProjectForm(emptyProjectForm);
    setEditingProjectId(null);
    setShowProjectForm(false);
  };

  const toggleProjectPublished = async (project: ProjectRecord) => {
    const next = !project.published;
    if (supabase && !isLocalId(project.id)) {
      const { error } = await supabase.from("projects").update({ published: next }).eq("id", project.id);
      if (error) {
        setMessage(error.message);
        return;
      }
    }
    setProjects((current) => current.map((item) => (item.id === project.id ? { ...item, published: next } : item)));
    setMessage(next ? `"${project.title_en}" is now published.` : `"${project.title_en}" moved back to draft.`);
  };

  const deleteProject = async (project: ProjectRecord) => {
    if (supabase && !isLocalId(project.id)) {
      const { error } = await supabase.from("projects").delete().eq("id", project.id);
      if (error) {
        setMessage(error.message);
        return;
      }
    }
    setProjects((current) => current.filter((item) => item.id !== project.id));
    setMessage(`"${project.title_en}" deleted.`);
  };

  const createCertification = async (event: React.FormEvent) => {
    event.preventDefault();
    const nameEn = certForm.nameEn.trim();
    if (!nameEn) return;
    const row = {
      name_en: nameEn,
      name_id: certForm.nameId.trim() || null,
      issuer: certForm.issuer.trim() || null,
      year: certForm.year.trim() || null,
      published: true,
    };
    if (supabase) {
      const { data, error } = await supabase.from("certifications").insert(row).select("*").single();
      if (error) {
        setMessage(error.message);
        return;
      }
      setCertifications((current) => [...current, data as CertificationRecord]);
    } else {
      setCertifications((current) => [...current, { id: `default-cert-${Date.now()}`, file_url: null, sort_order: current.length + 1, ...row }]);
    }
    setCertForm({ nameEn: "", nameId: "", issuer: "", year: "" });
    setMessage("Certification added.");
  };

  const toggleCertification = async (cert: CertificationRecord) => {
    const next = !cert.published;
    if (supabase && !isLocalId(cert.id)) {
      const { error } = await supabase.from("certifications").update({ published: next }).eq("id", cert.id);
      if (error) {
        setMessage(error.message);
        return;
      }
    }
    setCertifications((current) => current.map((item) => (item.id === cert.id ? { ...item, published: next } : item)));
    setMessage(next ? `"${cert.name_en}" is now published.` : `"${cert.name_en}" moved back to draft.`);
  };

  const deleteCertification = async (cert: CertificationRecord) => {
    if (supabase && !isLocalId(cert.id)) {
      const { error } = await supabase.from("certifications").delete().eq("id", cert.id);
      if (error) {
        setMessage(error.message);
        return;
      }
    }
    setCertifications((current) => current.filter((item) => item.id !== cert.id));
    setMessage(`"${cert.name_en}" deleted.`);
  };

  const createTestimonial = async (event: React.FormEvent) => {
    event.preventDefault();
    const quoteEn = testimonialForm.quoteEn.trim();
    if (!quoteEn) return;
    const row = {
      quote_en: quoteEn,
      quote_id: testimonialForm.quoteId.trim() || null,
      author_name: testimonialForm.authorName.trim() || null,
      author_role: testimonialForm.authorRole.trim() || null,
      published: true,
    };
    if (supabase) {
      const { data, error } = await supabase.from("testimonials").insert(row).select("*").single();
      if (error) {
        setMessage(error.message);
        return;
      }
      setTestimonials((current) => [...current, data as TestimonialRecord]);
    } else {
      setTestimonials((current) => [...current, { id: `default-testimonial-${Date.now()}`, avatar_url: null, sort_order: current.length + 1, ...row }]);
    }
    setTestimonialForm({ quoteEn: "", quoteId: "", authorName: "", authorRole: "" });
    setMessage("Testimonial added.");
  };

  const toggleTestimonial = async (testimonial: TestimonialRecord) => {
    const next = !testimonial.published;
    if (supabase && !isLocalId(testimonial.id)) {
      const { error } = await supabase.from("testimonials").update({ published: next }).eq("id", testimonial.id);
      if (error) {
        setMessage(error.message);
        return;
      }
    }
    setTestimonials((current) => current.map((item) => (item.id === testimonial.id ? { ...item, published: next } : item)));
    setMessage(next ? "Testimonial is now published." : "Testimonial moved back to draft.");
  };

  const deleteTestimonial = async (testimonial: TestimonialRecord) => {
    if (supabase && !isLocalId(testimonial.id)) {
      const { error } = await supabase.from("testimonials").delete().eq("id", testimonial.id);
      if (error) {
        setMessage(error.message);
        return;
      }
    }
    setTestimonials((current) => current.filter((item) => item.id !== testimonial.id));
    setMessage("Testimonial deleted.");
  };

  if (!loggedIn) {
    return (
      <main className="admin-login-page">
        <div className="admin-login-card">
          <Link href="/" className="admin-brand"><span className="brand-mark">TO</span><span>Thomas Oddy<span>.</span></span></Link>
          <div className="admin-login-heading"><ShieldCheck size={20} /><span>Private workspace</span></div>
          <h1>Welcome back.</h1>
          <p>Manage your portfolio content, projects, and files from one calm workspace.</p>
          <form onSubmit={signIn}>
            <label>Email<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" required /></label>
            <label>Password<input type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="••••••••" required /></label>
            {loginError && <div className="admin-error">{loginError}</div>}
            <button className="admin-primary" type="submit">Sign in <span>→</span></button>
          </form>
          <div className="admin-demo-note"><span className="status-dot" /> {isSupabaseConfigured ? "Supabase authentication connected" : "Preview mode — Supabase not configured yet"}</div>
        </div>
      </main>
    );
  }

  const menu: { name: TabName; icon: typeof LayoutDashboard }[] = [
    { name: "Overview", icon: LayoutDashboard },
    { name: "Projects", icon: FolderKanban },
    { name: "Certifications", icon: Award },
    { name: "Testimonials", icon: Quote },
    { name: "Site copy", icon: Sparkles },
    { name: "Files", icon: FileText },
    { name: "Profile", icon: UserRound },
  ];

  const publishedCount = projects.filter((item) => item.published).length;
  const pad = (value: number) => String(value).padStart(2, "0");

  return (
    <main className="admin-layout">
      <aside className="admin-sidebar">
        <Link href="/" className="admin-brand"><span className="brand-mark">TO</span><span>Thomas Oddy<span>.</span></span></Link>
        <div className="admin-nav-label">Workspace</div>
        <nav>{menu.map((item) => { const Icon = item.icon; return <button className={active === item.name ? "active" : ""} key={item.name} onClick={() => setActive(item.name)}><Icon size={16} />{item.name}</button>; })}</nav>
        <div className="admin-sidebar-bottom"><button onClick={() => setLoggedIn(false)}><LogOut size={16} /> Sign out</button></div>
      </aside>
      <section className="admin-content">
        <header className="admin-header"><div><span className="admin-kicker">Admin workspace / {active}</span><h1>{active}</h1></div><Link className="view-site" href="/">View live site ↗</Link></header>
        {message && <div className="admin-message"><CheckCircle2 size={16} /> {message}<button onClick={() => setMessage("")}>×</button></div>}

        {active === "Overview" && <>
          <div className="admin-welcome"><div><span className="admin-kicker">Good to see you, Thomas</span><h2>Your story, kept current.</h2><p>Update your professional presence without touching the code.</p></div><BarChart3 size={47} /></div>
          <div className="admin-stats"><div><span>Published projects</span><strong>{pad(publishedCount)}</strong><small>{projects.length - publishedCount > 0 ? `${projects.length - publishedCount} draft(s) in progress` : "+ add your next one"}</small></div><div><span>Content items</span><strong>{pad(certifications.length + testimonials.length)}</strong><small>Certifications & testimonials</small></div><div><span>Site status</span><strong className="status-live">Live</strong><small>{isSupabaseConfigured ? "Supabase connected" : "Preview mode"}</small></div></div>
          <div className="admin-panel"><div className="panel-heading"><div><span className="admin-kicker">Content overview</span><h3>Recent projects</h3></div><button className="admin-outline" onClick={() => { setActive("Projects"); openProjectForm(); }}><Plus size={15} /> New project</button></div>{projects.map((project) => <div className="admin-project-row" key={project.id}><span className="project-icon"><FolderKanban size={16} /></span><div><strong>{project.title_en}</strong><span>{project.type ?? "Case study"}</span></div><span className={project.published ? "published-pill" : "draft-pill"}>{project.published ? "Published" : "Draft"}</span><span className="admin-updated">{formatUpdated(project.updated_at ?? project.created_at)}</span><div className="row-actions"><button className="row-action" onClick={() => { setActive("Projects"); openProjectForm(project); }}><Pencil size={12} /> Edit</button></div></div>)}</div>
        </>}

        {active === "Projects" && <div className="admin-panel"><div className="panel-heading"><div><span className="admin-kicker">Portfolio content</span><h3>Projects & case studies</h3></div><button className="admin-primary small" onClick={() => openProjectForm()}><Plus size={15} /> New project</button></div>
          {projects.map((project) => <div className="admin-project-row" key={project.id}><span className="project-icon"><FolderKanban size={16} /></span><div><strong>{project.title_en}</strong><span>{project.type ?? "Case study"} · {project.tags.join(", ") || "no tags"}</span></div><span className={project.published ? "published-pill" : "draft-pill"}>{project.published ? "Published" : "Draft"}</span><div className="row-actions"><button className="row-action" onClick={() => openProjectForm(project)}><Pencil size={12} /> Edit</button><button className="row-action" onClick={() => void toggleProjectPublished(project)}>{project.published ? "Unpublish" : "Publish"}</button><button className="row-action danger" onClick={() => void deleteProject(project)}><Trash2 size={12} /> Delete</button></div></div>)}
          {showProjectForm ? <form className="project-form" onSubmit={saveProject}>
            <label>Project title (EN)<input value={projectForm.titleEn} onChange={(event) => setProjectForm({ ...projectForm, titleEn: event.target.value })} placeholder="e.g. Regulatory reporting automation" required /></label>
            <label>Project title (ID)<input value={projectForm.titleId} onChange={(event) => setProjectForm({ ...projectForm, titleId: event.target.value })} placeholder="e.g. Otomasi regulatory reporting" /></label>
            <label>Content type<input value={projectForm.projectType} onChange={(event) => setProjectForm({ ...projectForm, projectType: event.target.value })} placeholder="e.g. Case study" /><small className="field-hint">Use “Case study” to list it on the Case studies page; any other type appears on the Projects page.</small></label>
            <label>Impact metric<input value={projectForm.impactValue} onChange={(event) => setProjectForm({ ...projectForm, impactValue: event.target.value })} placeholder="e.g. 75%" /></label>
            <label>Impact label (EN)<input value={projectForm.impactLabelEn} onChange={(event) => setProjectForm({ ...projectForm, impactLabelEn: event.target.value })} placeholder="e.g. less processing time" /></label>
            <label>Impact label (ID)<input value={projectForm.impactLabelId} onChange={(event) => setProjectForm({ ...projectForm, impactLabelId: event.target.value })} placeholder="e.g. waktu proses lebih singkat" /></label>
            <label className="full-field">Short description (EN)<textarea value={projectForm.bodyEn} onChange={(event) => setProjectForm({ ...projectForm, bodyEn: event.target.value })} placeholder="What problem did you solve, and how?" /></label>
            <label className="full-field">Short description (ID)<textarea value={projectForm.bodyId} onChange={(event) => setProjectForm({ ...projectForm, bodyId: event.target.value })} placeholder="Masalah apa yang Anda selesaikan, dan bagaimana?" /></label>
            <label className="full-field">Tools / tags<input value={projectForm.tags} onChange={(event) => setProjectForm({ ...projectForm, tags: event.target.value })} placeholder="Excel VBA, Reconciliation, Data validation" /></label>
            <div className="form-actions full-field"><button type="button" className="admin-outline" onClick={() => { setShowProjectForm(false); setEditingProjectId(null); setProjectForm(emptyProjectForm); }}>Cancel</button><button type="submit" className="admin-primary small">{editingProjectId ? "Save changes" : "Save as draft"} <span>→</span></button></div>
          </form> : projects.length === 0 && <div className="empty-admin"><FolderKanban size={30} /><h3>Your projects live here.</h3><p>Add a project with its English and Indonesian story, impact metrics, tools, and images.</p><button className="admin-primary" onClick={() => openProjectForm()}>Create first project <span>→</span></button></div>}
        </div>}

        {active === "Certifications" && <div className="admin-panel"><div className="panel-heading"><div><span className="admin-kicker">Credentials</span><h3>Certifications & learning</h3></div></div>
          {certifications.map((cert) => <div className="admin-project-row" key={cert.id}><span className="project-icon"><Award size={16} /></span><div><strong>{cert.name_en}</strong><span>{cert.issuer ?? ""}{cert.year ? ` · ${cert.year}` : ""}</span></div><span className={cert.published ? "published-pill" : "draft-pill"}>{cert.published ? "Published" : "Draft"}</span><div className="row-actions"><button className="row-action" onClick={() => void toggleCertification(cert)}>{cert.published ? "Unpublish" : "Publish"}</button><button className="row-action danger" onClick={() => void deleteCertification(cert)}><Trash2 size={12} /> Delete</button></div></div>)}
          <form className="project-form" onSubmit={createCertification}>
            <label>Name (EN)<input value={certForm.nameEn} onChange={(event) => setCertForm({ ...certForm, nameEn: event.target.value })} placeholder="e.g. Data & Reporting Practice" required /></label>
            <label>Name (ID)<input value={certForm.nameId} onChange={(event) => setCertForm({ ...certForm, nameId: event.target.value })} placeholder="e.g. Praktik Data & Reporting" /></label>
            <label>Issuer<input value={certForm.issuer} onChange={(event) => setCertForm({ ...certForm, issuer: event.target.value })} placeholder="e.g. Professional development" /></label>
            <label>Year<input value={certForm.year} onChange={(event) => setCertForm({ ...certForm, year: event.target.value })} placeholder="e.g. 2026" /></label>
            <div className="form-actions full-field"><button type="submit" className="admin-primary small">Add certification <span>→</span></button></div>
          </form>
        </div>}

        {active === "Testimonials" && <div className="admin-panel"><div className="panel-heading"><div><span className="admin-kicker">Social proof</span><h3>Testimonials</h3></div></div>
          {testimonials.map((item) => <div className="admin-project-row" key={item.id}><span className="project-icon"><Quote size={16} /></span><div><strong>“{item.quote_en.length > 70 ? `${item.quote_en.slice(0, 70)}…` : item.quote_en}”</strong><span>{item.author_name ?? ""}{item.author_role ? ` · ${item.author_role}` : ""}</span></div><span className={item.published ? "published-pill" : "draft-pill"}>{item.published ? "Published" : "Draft"}</span><div className="row-actions"><button className="row-action" onClick={() => void toggleTestimonial(item)}>{item.published ? "Unpublish" : "Publish"}</button><button className="row-action danger" onClick={() => void deleteTestimonial(item)}><Trash2 size={12} /> Delete</button></div></div>)}
          <form className="project-form" onSubmit={createTestimonial}>
            <label className="full-field">Quote (EN)<textarea value={testimonialForm.quoteEn} onChange={(event) => setTestimonialForm({ ...testimonialForm, quoteEn: event.target.value })} placeholder="What did they say about working with you?" required /></label>
            <label className="full-field">Quote (ID)<textarea value={testimonialForm.quoteId} onChange={(event) => setTestimonialForm({ ...testimonialForm, quoteId: event.target.value })} placeholder="Apa kata mereka tentang bekerja dengan Anda?" /></label>
            <label>Author name<input value={testimonialForm.authorName} onChange={(event) => setTestimonialForm({ ...testimonialForm, authorName: event.target.value })} placeholder="e.g. Associate colleague" /></label>
            <label>Author role<input value={testimonialForm.authorRole} onChange={(event) => setTestimonialForm({ ...testimonialForm, authorRole: event.target.value })} placeholder="e.g. Banking operations" /></label>
            <div className="form-actions full-field"><button type="submit" className="admin-primary small">Add testimonial <span>→</span></button></div>
          </form>
        </div>}

        {active === "Site copy" && <form className="admin-panel" onSubmit={saveSiteCopy}><div className="panel-heading"><div><span className="admin-kicker">Greetings & labels</span><h3>Site copy</h3></div><button className="admin-primary small" type="submit">Save all changes</button></div>
          <p className="field-hint">Every greeting, heading, and label on the public pages. English (EN) and Indonesian (ID) are stored separately — the site shows the one matching the visitor&apos;s language toggle. Use \n for a line break in titles.</p>
          {copyGroups.map((group) => <div className="copy-group" key={group.group}><h3>{group.group}</h3>{group.items.map((item) => <label className="copy-field" key={item.key}>{item.label}<div className="copy-pair"><input value={copyEdits[item.key].en} onChange={(event) => setCopyEdits({ ...copyEdits, [item.key]: { ...copyEdits[item.key], en: event.target.value } })} placeholder="English" /><input value={copyEdits[item.key].id} onChange={(event) => setCopyEdits({ ...copyEdits, [item.key]: { ...copyEdits[item.key], id: event.target.value } })} placeholder="Indonesia" /></div></label>)}</div>)}
        </form>}

        {active === "Files" && <div className="admin-panel"><div className="panel-heading"><div><span className="admin-kicker">Media library</span><h3>Upload files</h3></div></div><label className="upload-zone"><input type="file" onChange={handleUpload} accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.webp" /><UploadCloud size={27} /><strong>Drop a file here, or browse</strong><span>PDF, DOCX, JPG, PNG or WEBP · Max 10MB</span></label>{files.map((file) => <div className="file-preview" key={file.name}><FileText size={18} /><span>{file.url ? <a href={file.url} target="_blank" rel="noreferrer">{file.name}</a> : file.name}</span><span className="published-pill">{file.url ? "Uploaded" : "Ready"}</span></div>)}</div>}

        {active === "Profile" && <form className="admin-panel" onSubmit={saveProfile}><div className="panel-heading"><div><span className="admin-kicker">Public identity</span><h3>Profile details</h3></div><button className="admin-primary small" type="submit">Save changes</button></div><div className="profile-form"><label>Full name<input value={profileName} onChange={(event) => setProfileName(event.target.value)} /></label><label>Primary role<input value={profileRole} onChange={(event) => setProfileRole(event.target.value)} /></label><label>Public email<input type="email" value={profileEmail} onChange={(event) => setProfileEmail(event.target.value)} /></label><label>LinkedIn URL<input value={profileLinkedIn} onChange={(event) => setProfileLinkedIn(event.target.value)} /></label><label className="full-field">Short introduction (EN)<textarea value={profileBio} onChange={(event) => setProfileBio(event.target.value)} /></label><label className="full-field">Short introduction (ID)<textarea value={profileBioId} onChange={(event) => setProfileBioId(event.target.value)} /></label><label>Profile photo<input type="file" accept="image/png,image/jpeg,image/webp" onChange={(event) => uploadProfileAsset(event, "photo")} />{profilePhotoUrl && <small>Uploaded photo is ready to save.</small>}</label><label>CV file<input type="file" accept=".pdf,.doc,.docx" onChange={(event) => uploadProfileAsset(event, "cv")} />{cvUrl && <small><a href={cvUrl} target="_blank" rel="noreferrer">View current CV ↗</a></small>}</label></div></form>}
      </section>
    </main>
  );
}
