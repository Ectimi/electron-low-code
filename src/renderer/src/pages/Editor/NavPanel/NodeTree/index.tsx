import Box from '@mui/material/Box';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { TreeView } from '@mui/x-tree-view/TreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import editorStore from 'root/renderer/src/store/editor';
import { useSnapshot } from 'valtio';
import materialListToTree from 'root/renderer/src/utils/materialListToTree';
import { IMaterialItem } from 'root/renderer/src/materials/utils/createMaterial';
import { useSafeState } from 'ahooks';

export default function NodeTree() {
  const snap = useSnapshot(editorStore.state);
  const materialList = useSnapshot(editorStore.materialList);
  const nodes = materialListToTree(materialList.value as any);
  const [selected, setSelected] = useSafeState(snap.currentMaterial || 'body');
  const defaultExpanded = ['body'];
  const renderTree = (nodes: IMaterialItem[]) =>
    nodes.map((node) => {
      if (Array.isArray(node.children)) {
        defaultExpanded.push(node.id);
      }
      return (
        <TreeItem
          key={node.id}
          nodeId={node.id}
          label={node.name}
          onClick={() => {
            editorStore.setCurrentMaterial(node.id);
            setSelected(node.id);
          }}
        >
          {Array.isArray(node.children)
            ? renderTree(node.children as any)
            : null}
        </TreeItem>
      );
    });

  return (
    <Box>
      <TreeView
        defaultExpanded={defaultExpanded}
        selected={selected}
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
      >
        <TreeItem
          nodeId="body"
          label="body"
          onClick={() => {
            setSelected(snap.currentMaterial || 'body');
          }}
        >
          {renderTree(nodes)}
        </TreeItem>
      </TreeView>
    </Box>
  );
}
