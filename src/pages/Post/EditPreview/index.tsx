// 🔹 Ajustes principais:
// 1. Removida substituição manual de URLs no content
// 2. ImageUpload e CKEditor usam sempre a API
// 3. Mantido carregamento e estado de edição
// 4. Token do localStorage é repassado para ImageUpload

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../../../api";
import { FaAngleDoubleLeft, FaRegEye, FaRegSave, FaRegTrashAlt } from "react-icons/fa";
import ImageUpload from "../../../components/Image/upload";
import './preview.css';

import { parseISO, format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR"; // ✅ import do locale correto

import '../../../ckeditor-build/ckeditor.js'; // UMD
// @ts-ignore
const ClassicEditor = (window as any).ClassicEditor;
import CKEditorWrapper from '../../../ckeditor-build/CKEditorWrapper';

import Player from "../../../components/Player/";
import Tags from "../../../components/Tags/Tags.tsx";
import Categories from "../../../components/Post/Category.tsx";
import AuthorEdit from "../../../components/Post/AuthorEdit.tsx";

type PostType = {
    post_id: number;
    title: string;
    sub_title: string;
    content: string;
    status: string;
    event: number;
    player: number;
    midia: string;
    date_added: string;
    date_modified: string;
    date_scheduled: string;
    image_id: string;
    views: string;
    tags: string;
    autor_id?: number;
    categories?: number[];
    account_id?: string;
    alias: string;
};

export default function PostEdit() {
    const { id } = useParams();
    const navigate = useNavigate();
    const token = localStorage.getItem("token") || "";

    const isNew = !id;

    const [post, setPost] = useState<PostType | null>(null);
    const [title, setTitle] = useState("");
    const [subTitle, setSubTitle] = useState("");
    const [content, setContent] = useState("");
    const [status, setStatus] = useState("1");
    const [scheduled, setScheduled] = useState("");
    const [tags, setTags] = useState("");
    const [author, setAuthor] = useState<number>(0);
    const [categories, setCategories] = useState<number[]>([]);
    const [event, setEvent] = useState(0);
    const [alias, setAlias] = useState("");
    const [player, setPlayer] = useState(0);
    const [midia, setMidia] = useState("");
    const [account_id, setAccountId] = useState("");
    const [release] = useState<"sim" | "nao">("sim");
    const [loading, setLoading] = useState(false);

    const [image_id, setImageId] = useState<string>("");
    const [initialImageId, setInitialImageId] = useState<string>("");
    const [isEditingTitle, setIsEditingTitle] = useState(false);

    // 🔹 Buscar post da API
    useEffect(() => {
        if (!id) return;

        const getPost = async () => {
            try {
                const res = await api.get(`/post/${id}`);
                const data: PostType = res.data;

                setPost(data);
                setTitle(data.title || "");
                setSubTitle(data.sub_title || "");
                setScheduled(data.date_scheduled || "");
                setStatus(String(data.status ?? "1"));
                setAuthor(data.autor_id ?? 0);
                setCategories(data.categories || []);
                setPlayer(data.player ?? 0);
                setAlias(data.alias ?? "");
                setMidia(data.midia ?? "");
                setEvent(data.event ?? 0);
                setAccountId(data.account_id ?? "");
                setTags(data.tags ?? "");
                setContent(data.content || ""); // 🔹 usa direto da API sem substituir localhost

                const imgId = data.image_id?.toString() || "";
                setImageId(imgId);
                setInitialImageId(imgId);

            } catch (err) {
                console.error(err);
                alert("Erro ao buscar post.");
            }
        };

        getPost();
    }, [id]);

    if (id && !post) return <p>Carregando...</p>;

    const editorConfig = {
        toolbar: [
            'heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList',
            'blockQuote', 'insertTable', 'uploadImage', 'undo', 'redo'
        ],
        extraPlugins: [
            function MyCustomUploadAdapterPlugin(editor: any) {
                editor.plugins.get('FileRepository').createUploadAdapter = (loader: any) => {
                    return {
                        upload: () => loader.file.then((file: string | Blob) => {
                            const form = new FormData();
                            form.append('file', file);
                            return fetch('https://apiv2.moveisdevalor.com.br/image', {
                                method: 'POST',
                                body: form,
                            }).then(res => res.json()).then(data => ({ default: data.url }));
                        }),
                        abort: () => { },
                    };
                };
            }
        ],
        image: {
            toolbar: [
                'imageTextAlternative', 'imageStyle:full', 'imageStyle:side',
                '|', 'resizeImage:25', 'resizeImage:50', 'resizeImage:75', 'resizeImage:original'
            ]
        }
    };

    const formatScheduled = (s: string) => {
        if (!s) return "";
        try {
            const date = parseISO(s);
            return format(date, "dd/MM/yyyy HH:mm", { locale: ptBR });
        } catch {
            return s;
        }
    };
    const date = formatScheduled(scheduled);

    // associa imagem a um post (usado tanto na edição quanto logo após criar)
    const associateImageToPost = async (postId: number, newImageId: string) => {
        try {
            await api.put(`/post/${postId}/photo`, { image_id: newImageId, featured: 1 });
            setInitialImageId(newImageId);
        } catch (err) {
            console.error("Erro ao associar imagem ao post:", err);
            alert("Não foi possível atualizar a imagem do post.");
        }
    };

    const handleImageChange = (newId: string) => {
        if (!newId) return;
        setImageId(newId);
        if (!isNew && newId !== initialImageId && post?.post_id) {
            associateImageToPost(post.post_id, newId);
        }
    };

    const handleSave = async () => {
        setLoading(true);
        try {
            const payload = {
                title,
                sub_title: subTitle,
                content,
                status,
                tags,
                autor_id: author,
                date_scheduled: scheduled,
                release,
                categories,
                account_id,
                image_id,
                player,
                alias,
                midia,
            };

            if (isNew) {
                const res = await api.post("/post", payload);
                const newId = res.data?.post_id;
                if (newId && image_id) {
                    await associateImageToPost(Number(newId), image_id);
                }
                alert("Post criado com sucesso!");
                navigate(`/post/${newId}`);
            } else {
                await api.put(`/post/${id}`, payload);
                alert("Post atualizado com sucesso!");
                navigate(`/post/${id}`);
            }
        } catch (err) {
            console.error(err);
            alert("Erro ao salvar post.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            {/* Header */}
            <div className="header-page row">
                <div className="col-3">
                    <h2 className="title-page">Notícias</h2>
                    <p className="url-page">Dashboard / Notícias ({isNew ? "Novo" : "Editar"})</p>
                </div>
                <div className="col-9 d-flex justify-content-end">
                    <button className="btn m-1" onClick={handleSave} disabled={loading}>
                        {loading ? "Salvando..." : <FaRegSave />}
                    </button>
                    <button className="btn m-1" onClick={() => navigate(`/posts`)}><FaAngleDoubleLeft /></button>
                    {!isNew && (
                        <>
                            <button className="btn m-1" onClick={() => navigate(`/post/${id}`)}><FaRegEye /></button>
                            <button className="btn m-1 text-danger"><FaRegTrashAlt /></button>
                        </>
                    )}
                </div>
            </div>

            <div className="row mt-4">
                <div className="col-12">
                    <div className="card">
                        <div className="card-body row">
                            <div className="col-12 col-lg-9">
                                <div className="card-off d-flex align-content-center">
                                    <div className="d-flex justify-content-center">
                                        <div className="col-12 col-md-10 col-lg-9 preview">
                                            {isEditingTitle ? (
                                                <textarea
                                                    value={title}
                                                    onChange={e => setTitle(e.target.value)}
                                                    onBlur={() => setIsEditingTitle(false)}
                                                    autoFocus
                                                    className="form-control mb-2"
                                                />
                                            ) : (
                                                <h1 onClick={() => setIsEditingTitle(true)} style={{ cursor: "pointer" }}>
                                                    {title || "Clique para editar título"}
                                                </h1>
                                            )}

                                            <textarea
                                                value={subTitle}
                                                onChange={e => setSubTitle(e.target.value)}
                                                className="form-control mb-2 sub-title"
                                            />
                                            Revisado | {author} - {date}
                                            <ImageUpload image_id={image_id} token={token} onChange={handleImageChange} />

                                            <div className="mb-3">
                                                <CKEditorWrapper editor={ClassicEditor} data={content} onChange={setContent} config={editorConfig} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-3">
                                <div className="col-6 mb-3">
                                    <select
                                        className="form-select"
                                        value={status}
                                        onChange={(e) => setStatus(e.target.value)}
                                    >
                                        <option value="1">Ativo</option>
                                        <option value="0">Inativo</option>
                                    </select>
                                </div>

                                <div className="mt-3">
                                    <strong>Categorias</strong>
                                    <Categories postId={Number(id) || 0} onChange={setCategories} />
                                </div>

                                <div className="mt-3">
                                    <strong>Autor</strong>
                                    <AuthorEdit authorId={author} onChange={setAuthor} />
                                    <p>ID selecionado: {author ?? "nenhum"}</p>
                                </div>

                                <p className="mt-3">
                                    <strong>Tags</strong>
                                    <Tags initialTags={tags} onChange={setTags} name="tags" />
                                </p>

                                <p className="mt-3">
                                    <strong>Vídeo</strong>
                                    <div className="mb-3">
                                        <div className="input-group">
                                            <input type="text" className="form-control url-midia" value={midia} onChange={e => setMidia(e.target.value)} placeholder="URL do vídeo" />
                                            <Player player={player} setPlayer={setPlayer} />
                                        </div>
                                    </div>
                                </p>

                                <p className="mt-3">
                                    <strong>URL Amigavel</strong>
                                    <div className="mb-3">
                                        <div className="input-group">
                                            <input type="text" className="form-control url-midia" value={alias} onChange={e => setAlias(e.target.value)} placeholder="/minha-noticia" />
                                        </div>
                                    </div>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
